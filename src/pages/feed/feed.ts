import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Video } from "../../models/video";
import { ArraySorter } from "../../utils/arraySorter";
import { VideoServiceProvider } from '../../providers/video-service/video-service';


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  videos: Array<Video>;

  constructor(private _videoServiceProvider: VideoServiceProvider) {
    _videoServiceProvider.list().subscribe((videos) => {
      this.videos = videos;
      this.videos.length = (this.videos.length > 10) ? 10 : this.videos.length;
      ArraySorter.sortByDate(this.videos, "publishDate");
    });
  }

  formatDate(date) {
    date = new Date(date);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() +
      " às " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
  }

  openLink(url) {
    window.open(url, '_system')
  }

}
