import {ApiProperty, PickType} from "@nestjs/swagger";

export class UserSignupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
export class LoginDto extends PickType(UserSignupDto, ["email", "password"]) {}
