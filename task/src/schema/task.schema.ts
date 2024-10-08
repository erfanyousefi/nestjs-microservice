import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {TaskStatus} from "src/enum/status.enum";

@Schema()
export class Task {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  userId: string;
  @Prop({enum: TaskStatus})
  status: string;
}
export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);
