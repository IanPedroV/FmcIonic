import {FormControl} from '@angular/forms';
import {UserServiceProvider} from "../providers/user-service/user-service";
import "rxjs/add/operator/map";

export class EmailValidator {
  static uniqueEmail(fc: FormControl) {
    return (userService: UserServiceProvider) => {
      return userService.checkEmailNotTaken(fc.value.toLowerCase()).map(res => {
        return res['emailNotTaken'] ? null : {emailTaken: true};
      });
    }
  }

}
