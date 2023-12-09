import Exception from "../exceptions/Exception";
import * as httpStatus from "../constants/https-status";

type User = {
  id: number;
  name: string;
  email: string;
}

type AuthUserCredential = {
  id: string;
}

export default class Validations {
  static userAuthenticated(user: User, authUser: AuthUserCredential) {
    if (!authUser || String(user.id) != authUser.id) {
      throw new Exception(
        "You cannot see this data",
        httpStatus.FORBIDDEN
      )
    }  
  }
}