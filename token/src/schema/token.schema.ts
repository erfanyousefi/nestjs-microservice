import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Types} from "mongoose";

@Schema()
export class Token {
  @Prop({type: Types.ObjectId, ref: "User", required: true})
  userId: string;
  @Prop({required: true})
  token: string;
}
export const TokenSchema = SchemaFactory.createForClass(Token);
export type TokenDocument = HydratedDocument<Token>;
