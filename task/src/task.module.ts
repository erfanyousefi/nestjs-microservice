import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {config} from "dotenv";
import * as path from "path";
import {Task, TaskSchema} from "./schema/task.schema";
import {TaskController} from "./task.controller";
import {TaskService} from "./task.service";
config({path: path.join(process.cwd(), "..", ".env")});
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/microservice"),
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
