import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {TaskModule} from "./task.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.TASK_SERVICE_PORT,
      },
    }
  );
  await app.listen();
  console.log("task microservice started: ", +process.env.TASK_SERVICE_PORT);
}
bootstrap();
