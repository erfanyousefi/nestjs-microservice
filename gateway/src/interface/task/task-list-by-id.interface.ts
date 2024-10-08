import {HttpStatus} from "@nestjs/common";
import {ITask} from "./task.interface";

export interface IGetUserTasksById {
  message: string;
  status: HttpStatus;
  tasks: ITask[];
}
