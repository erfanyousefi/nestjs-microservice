import {Module} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";
import {config} from "dotenv";
import * as path from "path";
import {Token, TokenSchema} from "./schema/token.schema";
import {TokenController} from "./token.controller";
import {TokenService} from "./token.service";
config({path: path.join(process.cwd(), "..", ".env")});
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/microservice"),
    MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}]),
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtService],
})
export class TokenModule {}
