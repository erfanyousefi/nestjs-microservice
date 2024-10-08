import {HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {TaskStatus} from "./enum/status.enum";
import {TaskDto} from "./interface/task.interface";
import {Task, TaskDocument} from "./schema/task.schema";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(taskDto: TaskDto) {
    const {description, title, userId} = taskDto;
    const task = await this.taskModel.create({
      title,
      description,
      status: TaskStatus.Pending,
      userId,
    });
    return {
      message: "created",
      status: HttpStatus.CREATED,
      error: false,
      data: task,
    };
  }
  async getList(userId: string) {
    const tasks = await this.taskModel.find({userId});
    return {
      message: "successfully",
      data: tasks,
      status: HttpStatus.OK,
    };
  }
}
