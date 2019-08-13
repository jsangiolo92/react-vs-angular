import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from 'src/video.model';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {

  private searchResults: Video[];
  private watchList: Video[];
  private showSearch: boolean;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.stateService.showSearch.subscribe(result => this.showSearch = result);

    this.stateService.searchResults.subscribe(data => this.searchResults = data);

    this.stateService.getWatchList.subscribe(data => this.watchList = data);
  }

  private addVideoToWatchList(video: Video): void {
    this.stateService.addToWatchList(video);
  }

  private removeVideoFromWatchList(video: Video): void {
    this.stateService.removeFromWatchList(video);
  }

  private toggleSearch(): void {
    this.stateService.toggleSearch(!this.showSearch);
  }

  private goToCurrentVideo(video: Video) {
    this.stateService.setCurrentVideo(video);
    this.router.navigate(['player']);
  }

  ngOnDestroy() {

  }

}
