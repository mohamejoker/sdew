import request from 'supertest';
import { app } from '../src/server/index';

describe('Admin & API Integration', () => {
  let token: string;
  let createdServiceId: string;
  let createdOrderId: string;
  let createdUserId: string;

  it('should register a new admin user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'admin_test', password: 'admin1234' });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('admin_test');
    createdUserId = res.body.id;
  });

  it('should login as admin and get JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin_test', password: 'admin1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should create a new service', async () => {
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'خدمة اختبارية',
        price: '100',
        features: ['ميزة 1', 'ميزة 2'],
        buttonText: 'جرب الآن',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('خدمة اختبارية');
    createdServiceId = res.body.id;
  });

  it('should fetch all services (admin)', async () => {
    const res = await request(app)
      .get('/api/services')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: createdUserId,
        serviceId: createdServiceId,
        link: 'https://test.com',
        quantity: 1,
        originalPrice: 100,
        finalPrice: 100,
        profit: 0,
      });
    expect(res.statusCode).toBe(201);
    createdOrderId = res.body.id;
  });

  it('should fetch all orders (admin)', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a notification', async () => {
    const res = await request(app)
      .post('/api/notifications')
      .send({
        userId: createdUserId,
        title: 'تنبيه جديد',
        body: 'رسالة تنبيهية',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('تنبيه جديد');
  });

  it('should fetch notifications for user', async () => {
    const res = await request(app)
      .get(`/api/notifications/user/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ... يمكن إضافة اختبارات إضافية لصلاحيات الأدمن وتعديل البيانات
});
