import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({example: "task name"})
  name: string;
  @ApiProperty({example: "task description"})
  description: string;
}
