import {HttpStatus} from "@nestjs/common";
import {ITask} from "./task.interface";

export interface ICreateTask {
  message: string;
  status: HttpStatus;
  task?: ITask;
  errors?: {[key: string]: any};
}
