import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {HttpArgumentsHost} from "@nestjs/common/interfaces";
import {ClientProxy} from "@nestjs/microservices";
import {Request} from "express";
import {lastValueFrom} from "rxjs";
import {Services} from "src/enum/service";
import {TokenPatterns} from "src/enum/token.events";
import {UserPatterns} from "src/enum/user.event";
import {ServiceResponse} from "src/interface/common/response.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Services.USER) private userClientService: ClientProxy,
    @Inject(Services.TOKEN) private tokenClientService: ClientProxy
  ) {}
  async canActivate(context: ExecutionContext) {
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request: Request = httpContext.getRequest<Request>();
    const {authorization} = request?.headers;
    if (!authorization)
      throw new UnauthorizedException("authorization is required");
    const [bearer, token] = authorization.split(" ");
    if (!bearer || !token)
      throw new UnauthorizedException("authorization is required");
    if (bearer?.toLowerCase() !== "bearer")
      throw new UnauthorizedException("authorization is required");
    const verifyResult: ServiceResponse = await lastValueFrom(
      this.tokenClientService.send(TokenPatterns.VerifyToken, {token})
    );
    if (verifyResult?.error)
      throw new HttpException(verifyResult.message, verifyResult.status);
    const {data} = verifyResult;
    if (!data?.userId) throw new UnauthorizedException("not found account");
    const userResult: ServiceResponse = await lastValueFrom(
      this.userClientService.send(UserPatterns.GetUserById, {
        userId: data?.userId,
      })
    );
    if (userResult?.error) {
      throw new HttpException(userResult.message, userResult.status);
    }
    if (!userResult?.data?.user)
      throw new UnauthorizedException("not found user account");
    request.user = userResult?.data?.user;
    return true;
  }
}
