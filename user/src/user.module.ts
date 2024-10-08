import {Module} from "@nestjs/common";
import {ClientProxyFactory} from "@nestjs/microservices";
import {MongooseModule} from "@nestjs/mongoose";
import {config} from "dotenv";
import * as path from "path";
import {User, UserSchema} from "src/schema/user.schema";
import {ConfigService} from "./config/config.service";
import {Services} from "./enum/service";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
config({path: path.join(process.cwd(), "..", ".env")});
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/microservice"),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
    {
      provide: Services.TOKEN,
      useFactory(configService: ConfigService) {
        const tokenServiceOption = configService.get("tokenService");
        return ClientProxyFactory.create(tokenServiceOption);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
