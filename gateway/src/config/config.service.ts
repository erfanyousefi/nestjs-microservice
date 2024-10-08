import {Injectable} from "@nestjs/common";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {config} from "dotenv";
import * as path from "path";
console.log();

export interface IConfigService {
  port: number;
  mailerService: MicroserviceOptions;
  permissionService: MicroserviceOptions;
  tokenService: MicroserviceOptions;
  taskService: MicroserviceOptions;
  userService: MicroserviceOptions;
}
@Injectable()
export class ConfigService {
  private envConfig: Partial<IConfigService>;
  constructor() {
    this.envConfig = {};
    this.envConfig.port = +process.env.GATEWAY_SERVICE_PORT;
    this.envConfig.mailerService = {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.MAILER_SERVICE_PORT,
      },
    };
    this.envConfig.permissionService = {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.PERMISSION_SERVICE_PORT,
      },
    };
    this.envConfig.tokenService = {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.TOKEN_SERVICE_PORT,
      },
    };
    this.envConfig.taskService = {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.TASK_SERVICE_PORT,
      },
    };
    this.envConfig.userService = {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: +process.env.USER_SERVICE_PORT,
      },
    };
  }
  get(key: keyof IConfigService): any {
    return this.envConfig[key];
  }
}
