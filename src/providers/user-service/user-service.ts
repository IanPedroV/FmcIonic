import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../models/user";

@Injectable()
export class UserServiceProvider {
  public user: User;

  constructor(private _http: HttpClient) {

  }

  create(user) {
    return this._http.post('http://192.168.15.13:3000/users/user/', user);
  }

  login(email, password) {
    return this._http.post('http://192.168.15.13:3000/users/login/', {email, password});
  }


}
