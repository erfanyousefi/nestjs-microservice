import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "./config/config.service";
import {AppModule} from "./gateway.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("NestJS-Microservice-Gateway")
    .setVersion("v1")
    .addTag("user")
    .addTag("task")
    .addBearerAuth(
      {
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer",
      },
      "Authorization"
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/", app, document);
  const configService = app.get(ConfigService);
  console.log(configService.get("port"));
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(configService.get("port"), () => {
    console.log("http://localhost:" + configService.get("port"));
  });
}
bootstrap();
