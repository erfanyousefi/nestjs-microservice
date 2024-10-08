import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {InjectModel} from "@nestjs/mongoose";
import {compareSync, genSaltSync, hashSync} from "bcrypt";
import {Model} from "mongoose";
import {lastValueFrom} from "rxjs";
import {IUser, LoginDto, UserId} from "src/interface/user.interface";
import {User, UserDocument} from "src/schema/user.schema";
import {Services} from "./enum/service";
import {TokenPatterns} from "./enum/token.events";

@Injectable()
export class UserService {
  constructor(
    @Inject(Services.TOKEN) private tokenClientService: ClientProxy,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async signup(userDto: IUser) {
    const {email, name, password} = userDto;
    let user = await this.userModel.findOne({email});
    if (user) {
      return {
        error: true,
        status: 409,
        message: "email is duplicate in db",
      };
    }
    const salt = genSaltSync(12);
    const hashed = hashSync(password, salt);
    user = await this.userModel.create({
      name,
      email,
      password: hashed,
    });
    return {
      message: "account created successfully",
      status: 201,
      data: {userId: user._id?.toString()},
    };
  }
  async login(userDto: LoginDto) {
    const {email, password} = userDto;
    let user = await this.userModel.findOne({email});
    if (!user) {
      return {
        error: true,
        status: 401,
        message: "email or password is invalid",
      };
    }
    if (compareSync(password, user.password)) {
      const result = await lastValueFrom(
        this.tokenClientService.send(TokenPatterns.CreateUserToken, {
          userId: user._id,
        })
      );
      if (result?.error) {
        return {
          message: result?.message,
          status: result?.status,
          error: true,
        };
      }
      return {
        message: "logged-in successfully",
        status: 201,
        data: result?.data,
      };
    }
    return {
      error: true,
      status: 401,
      message: "email or password is invalid",
    };
  }
  async findById(userDto: UserId) {
    const {userId} = userDto;
    let user = await this.userModel.findOne({_id: userId});
    if (!user) {
      return {
        error: true,
        status: 404,
        message: "not found user",
      };
    }
    return {
      status: 200,
      data: {user},
    };
  }
}
