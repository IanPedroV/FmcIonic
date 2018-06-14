import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../models/user";

@Injectable()
export class UserServiceProvider {
  private _user: User;

  constructor(private _http: HttpClient) {

  }

  create(user) {
    return this._http.post('http://192.168.15.13:3000/users/user/', user);
  }

  login(email, password) {
    return this._http.post('http://192.168.15.13:3000/users/login/', {email, password});
  }

  get(id) {
    return this._http.get('http://192.168.15.13:3000/users/login/' + id);
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }


}
