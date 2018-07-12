import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';

@Injectable()
export class LoginDaoProvider {


  constructor(private _storage: Storage) {
  }

  save(email, passwordHash, token) {
    let promise = this._storage.set('0', { email, passwordHash, token });
    return Observable.fromPromise(promise);
  }

  remove() {
    return this._storage.clear();
  }

  getStorage() {
    let promise = this._storage.get('0');
    return Observable.fromPromise(promise);
  }


}
