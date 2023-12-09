import Exception from "../exceptions/Exception";
import * as httpStatus from "../constants/https-status";

type AuthUserCredential = {
  id: string;
}

class ValidationClass {
  userAuthenticated(user: { id: number; name: string; email: string; } | undefined, authUser: AuthUserCredential) {
    if (!authUser || String(user?.id) !== authUser.id) {
      throw new Exception(
        "You cannot see this data",
        httpStatus.FORBIDDEN
      )
    }  
  }
}

export default new ValidationClass();