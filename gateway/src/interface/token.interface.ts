import {ServiceResponse} from "./common/response.interface";

export interface TokenPayload {
  userId: string;
}
export interface TokenResponse extends ServiceResponse {
  token?: string;
}
