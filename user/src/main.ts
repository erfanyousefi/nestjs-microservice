import {NestFactory} from "@nestjs/core";
import {TcpOptions, Transport} from "@nestjs/microservices";
import {UserModule} from "./user.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      port: +process.env.USER_SERVICE_PORT,
      host: "0.0.0.0",
    },
  } as TcpOptions);
  await app.listen();
  console.log("started user microservice: ", +process.env.USER_SERVICE_PORT);
}
bootstrap();
