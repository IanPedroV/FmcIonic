import * as bcrypt from "bcryptjs";

export class EncryptUtils {

  static encryptPassword(password) {
    return bcrypt.hash(password, 10, null);
  }

  static comparePassword(hash, password) {
   return bcrypt.compare(password, hash, null);
  }

}
