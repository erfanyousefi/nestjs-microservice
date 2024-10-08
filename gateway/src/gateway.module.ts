import {Module} from "@nestjs/common";
import {ClientProxyFactory} from "@nestjs/microservices";
import {config} from "dotenv";
import * as path from "path";
import {ConfigService} from "./config/config.service";
import {Services} from "./enum/service";
import {UserController} from "./user.controller";
import {TaskController} from "./task.controller";
config({path: path.join(process.cwd(), "..", ".env")});
@Module({
  imports: [],
  controllers: [UserController, TaskController],
  providers: [
    ConfigService,
    
    {
      provide: Services.TOKEN,
      useFactory(configService: ConfigService) {
        const tokenServiceOption = configService.get("tokenService");
        return ClientProxyFactory.create(tokenServiceOption);
      },
      inject: [ConfigService],
    },
    {
      provide: Services.TASK,
      useFactory(configService: ConfigService) {
        const taskServiceOption = configService.get("taskService");
        return ClientProxyFactory.create(taskServiceOption);
      },
      inject: [ConfigService],
    },
    {
      provide: Services.PERMISSION,
      useFactory(configService: ConfigService) {
        const permissionService = configService.get("permissionService");
        return ClientProxyFactory.create(permissionService);
      },
      inject: [ConfigService],
    },
    {
      provide: Services.USER,
      useFactory(configService: ConfigService) {
        const userService = configService.get("userService");
        console.log(userService);
        return ClientProxyFactory.create(userService);
      },
      inject: [ConfigService],
    },
    {
      provide: Services.MAILER,
      useFactory(configService: ConfigService) {
        const mailerService = configService.get("mailerService");
        return ClientProxyFactory.create(mailerService);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
