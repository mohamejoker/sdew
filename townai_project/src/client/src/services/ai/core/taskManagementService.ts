
import { taskManager } from '../tasks/taskManager';
import type { AITask } from '../models/aiModels';

export class TaskManagementService {
  /**
   * إدارة المهام
   */
  getTasks(status?: AITask['status']): AITask[] {
    return taskManager.getTasks(status);
  }

  getTaskById(id: string): AITask | undefined {
    return taskManager.getTaskById(id);
  }

  /**
   * إحصائيات الاستخدام
   */
  getUsageStats() {
    return taskManager.getUsageStats();
  }
}
