import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {MailerModule} from "./mailer.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.MAILER_SERVICE_PORT,
      },
    }
  );
  await app.listen();
  console.log("mailer service started: ", process.env.MAILER_SERVICE_PORT);
}
bootstrap();
