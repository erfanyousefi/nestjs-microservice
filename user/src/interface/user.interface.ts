export interface IUser {
  email: string;
  password: string;
  name: string;
}
export interface UserId {
  userId: string;
}
export interface LoginDto extends Omit<IUser, "name"> {}
