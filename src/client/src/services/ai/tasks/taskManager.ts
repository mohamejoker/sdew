
import { AITask } from '../models/aiModels';

/**
 * مدير المهام للذكاء الاصطناعي
 */
export class TaskManager {
  private tasks: AITask[] = [];

  /**
   * إضافة مهمة جديدة
   */
  addTask(task: Omit<AITask, 'id' | 'createdAt'>): AITask {
    const newTask: AITask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * تحديث حالة المهمة
   */
  updateTask(id: string, updates: Partial<AITask>): AITask | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
    return this.tasks[taskIndex];
  }

  /**
   * الحصول على المهام
   */
  getTasks(status?: AITask['status']): AITask[] {
    if (status) {
      return this.tasks.filter(task => task.status === status);
    }
    return this.tasks;
  }

  /**
   * الحصول على مهمة محددة
   */
  getTaskById(id: string): AITask | undefined {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * حذف مهمة
   */
  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length < initialLength;
  }

  /**
   * إحصائيات الاستخدام
   */
  getUsageStats(): {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    totalTokensUsed: number;
    totalCost: number;
  } {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
    const failedTasks = this.tasks.filter(t => t.status === 'failed').length;
    const totalTokensUsed = this.tasks.reduce((sum, t) => sum + (t.tokensUsed || 0), 0);
    const totalCost = this.tasks.reduce((sum, t) => sum + (t.cost || 0), 0);

    return {
      totalTasks,
      completedTasks,
      failedTasks,
      totalTokensUsed,
      totalCost
    };
  }
}

export const taskManager = new TaskManager();
