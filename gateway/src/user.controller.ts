import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Req,
} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {Request} from "express";
import {catchError, lastValueFrom} from "rxjs";
import Authorization from "./decorator/auth.decorator";
import {LoginDto, UserSignupDto} from "./dto/user.dto";
import {Services} from "./enum/service";
import {TokenPatterns} from "./enum/token.events";
import {UserPatterns} from "./enum/user.event";
import {ServiceResponse} from "./interface/common/response.interface";
import {TokenPayload} from "./interface/token.interface";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    @Inject(Services.USER) private userClientService: ClientProxy,
    @Inject(Services.TOKEN) private tokenClientService: ClientProxy
  ) {}

  @Post("signup")
  @ApiConsumes("application/x-www-form-urlencoded")
  async signup(@Body() userDto: UserSignupDto) {
    const userResponse: ServiceResponse = await lastValueFrom(
      this.userClientService.send(UserPatterns.Signup, userDto).pipe(
        catchError((err) => {
          throw err;
        })
      )
    );
    if (!userResponse?.error && userResponse?.data) {
      const tokenPayload: TokenPayload = {
        userId: userResponse?.data?.userId,
      };
      const tokenResponse: ServiceResponse = await lastValueFrom(
        this.tokenClientService.send(
          TokenPatterns.CreateUserToken,
          tokenPayload
        )
      );
      if (tokenResponse?.data) {
        return {
          token: tokenResponse?.data?.token,
        };
      }
      throw new HttpException(tokenResponse?.message, tokenResponse?.status);
    }
    throw new HttpException(userResponse?.message, userResponse?.status);
  }
  @Post("login")
  @ApiConsumes("application/x-www-form-urlencoded")
  async login(@Body() loginDto: LoginDto) {
    const loginResponse: ServiceResponse = await lastValueFrom(
      this.userClientService.send(UserPatterns.Login, loginDto).pipe(
        catchError((err) => {
          throw err;
        })
      )
    );
    if (!loginResponse?.error && loginResponse?.data) {
      return {
        token: loginResponse?.data?.token,
      };
    }
    throw new HttpException(loginResponse?.message, loginResponse?.status);
  }
  @Post("logout")
  @Authorization()
  async logout(@Req() req: Request) {
    const {user} = req;
    return await lastValueFrom(
      this.tokenClientService
        .send(TokenPatterns.TokenDestroy, {userId: user?._id})
        .pipe(
          catchError((err) => {
            throw err;
          })
        )
    );
  }
}
