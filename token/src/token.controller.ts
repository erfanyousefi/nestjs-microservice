import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {TokenPatterns} from "./enum/token.events";
import {TokenService} from "./token.service";
export type UserTokenPayload = {userId: string};
export type VerifyToken = {token: string};
@Controller("token")
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @MessagePattern(TokenPatterns.CreateUserToken)
  async createUserToken({userId}: UserTokenPayload) {
    return this.tokenService.createToken(userId);
  }
  @MessagePattern(TokenPatterns.VerifyToken)
  async verifyToken({token}: VerifyToken) {
    return this.tokenService.verifyToken(token);
  }
  @MessagePattern(TokenPatterns.TokenDestroy)
  async destroyToken({userId}: UserTokenPayload) {
    return this.tokenService.destroyToken(userId);
  }
}
