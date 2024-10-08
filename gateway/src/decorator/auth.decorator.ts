import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {AuthGuard} from "src/guard/auth.guard";

export default function Authorization() {
  return applyDecorators(ApiBearerAuth("Authorization"), UseGuards(AuthGuard));
}

//hi
