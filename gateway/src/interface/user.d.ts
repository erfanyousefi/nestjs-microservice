declare namespace Express {
  interface Request {
    user?: {
      id: string;
      _id: string;
      name: string;
      email: string;
      password: string;
    };
  }
}
