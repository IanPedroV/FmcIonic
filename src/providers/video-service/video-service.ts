import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Video} from "../../models/video";
import { MyApp } from '../../app/app.component';

@Injectable()
export class VideoServiceProvider {

  constructor(private _http: HttpClient) {

  }

  list() {
    return this._http.get<Video[]>(MyApp.apiUrl +'/videos');
  }

}
