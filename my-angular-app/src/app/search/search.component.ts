import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Video } from 'src/video.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private showSearch: boolean;
  private currentVideo: boolean;
  
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.showSearch.subscribe(result => this.showSearch = result);
    this.stateService.currentVideo.subscribe(video => this.currentVideo = !!video);
  }

  private search(str: string): void {
    this.stateService.searchYouTube(str);
  }

  private toggleSearch() {
    this.stateService.toggleSearch(!this.showSearch);
  }

}
