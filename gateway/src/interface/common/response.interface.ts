import {HttpStatus} from "@nestjs/common";

export interface ServiceResponse {
  message: string;
  error?: boolean;
  status: HttpStatus;
  data: any;
}
