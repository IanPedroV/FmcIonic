import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(private _http: HttpClient) {
  }

  create(user) {
    return this._http.post('http://192.168.15.13:3000/users/user/', user);
  }

  checkEmailNotTaken(email){
    return this._http.post('http://192.168.15.13:3000/users/checkEmailNotTaken', email);
  }



}
