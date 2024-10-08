import {ServiceResponse} from "../common/response.interface";

export interface IUser {
  id: number;
  email: string;
}
export interface CreateUserResponse extends ServiceResponse {
  userId?: string;
}