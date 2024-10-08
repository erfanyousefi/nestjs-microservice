import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {IUser, LoginDto, UserId} from "./interface/user.interface";
import {UserPatterns} from "./user.event";
import {UserService} from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  // @UseFilters(new CustomRpcExceptionFilter())
  @MessagePattern(UserPatterns.Signup)
  signup(userDto: IUser) {
    return this.userService.signup(userDto);
  }
  @MessagePattern(UserPatterns.Login)
  login(userDto: LoginDto) {
    return this.userService.login(userDto);
  }
  @MessagePattern(UserPatterns.GetUserById)
  findById(userDto: UserId) {
    return this.userService.findById(userDto);
  }
}
