import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Video} from "../../models/video";

@Injectable()
export class VideoServiceProvider {

  constructor(private _http: HttpClient) {

  }

  list() {
    return this._http.get<Video[]>('http://192.168.15.13:3000/videos');
  }

}
