import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {Request} from "express";
import {lastValueFrom} from "rxjs";
import Authorization from "./decorator/auth.decorator";
import {CreateTaskDto} from "./dto/task.dto";
import {TaskPatterns} from "./enum/task.events";
import {ServiceResponse} from "./interface/common/response.interface";

@Controller("task")
@ApiTags("task")
export class TaskController {
  constructor(@Inject("TASK_SERVICE") private taskServiceClient: ClientProxy) {}

  @Get()
  @Authorization()
  async tasks(@Req() req: Request) {
    const {_id: userId} = req.user;
    const taskResponse: ServiceResponse = await lastValueFrom(
      this.taskServiceClient.send(TaskPatterns.GetUserTasksById, {userId})
    );
    return {
      message: taskResponse.message,
      data: {
        tasks: taskResponse.data,
      },
    };
  }
  @Post()
  @Authorization()
  async create(@Body() taskDto: CreateTaskDto, @Req() req: Request) {
    const {_id: userId} = req.user;
    const {error, message, status, data}: ServiceResponse = await lastValueFrom(
      this.taskServiceClient.send(
        TaskPatterns.CreateUserTask,
        Object.assign({}, taskDto, {userId})
      )
    );
    if (error) {
      throw new HttpException(
        {
          message,
          data: null,
          error,
        },
        status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return {
      message,
      status,
      data,
    };
  }
}
