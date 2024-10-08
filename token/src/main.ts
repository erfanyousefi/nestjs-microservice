import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {TokenModule} from "./token.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TokenModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.TOKEN_SERVICE_PORT,
      },
    }
  );
  await app.listen();
  console.log("token microservice started: ", +process.env.TOKEN_SERVICE_PORT);
}
bootstrap();
