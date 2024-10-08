import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {TaskPatterns} from "./enum/task.events";
import {TaskDto} from "./interface/task.interface";
import {TaskService} from "./task.service";

@Controller("task")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @MessagePattern(TaskPatterns.CreateUserTask)
  async create(taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }
  @MessagePattern(TaskPatterns.GetUserTasksById)
  async get({userId}: {userId: string}) {
    return this.taskService.getList(userId);
  }
}
