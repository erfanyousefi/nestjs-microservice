import {Module} from "@nestjs/common";
import {config} from "dotenv";
import * as path from "path";
config({path: path.join(process.cwd(), "..", ".env")});
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class MailerModule {}
