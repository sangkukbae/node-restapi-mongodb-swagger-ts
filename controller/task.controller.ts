import { APILogger } from "../logger/api.logger";
import { TaskService } from "../service/task.service";

export class TaskController {
  private taskService: TaskService;
  private logger: APILogger;

  constructor() {
    this.taskService = new TaskService();
    this.logger = new APILogger();
  }

  async getTasks() {
    this.logger.info("controller: getTasks", null);
    return await this.taskService.getTasks();
  }

  async createTask(task) {
    this.logger.info("controller: createTask", task);
    return await this.taskService.createTask(task);
  }

  async updateTask(task) {
    this.logger.info("controller : updateTask", task);
    return await this.taskService.updateTask(task);
  }

  async deleteTask(taskId) {
    this.logger.info("controller: deleteTask", taskId);
    return await this.taskService.deleteTask(taskId);
  }
}