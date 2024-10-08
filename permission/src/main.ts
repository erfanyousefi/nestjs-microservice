import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {PermissionModule} from "./permission.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PermissionModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.PERMISSION_SERVICE_PORT,
      },
    }
  );
  await app.listen();
  console.log(
    "permission service started: ",
    +process.env.PERMISSION_SERVICE_PORT
  );
}
bootstrap();
