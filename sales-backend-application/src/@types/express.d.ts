interface User {
  id: string;
  name: string;
  email: string;
}

declare namespace Express {
  export interface Request {
    user: User
  }
}