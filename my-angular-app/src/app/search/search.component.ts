import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Video } from 'src/video.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private userInput: string = '';
  private showSearch: boolean;
  private currentVideo: boolean;
  
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.showSearch.subscribe(result => this.showSearch = result);
    this.stateService.currentVideo.subscribe(video => this.currentVideo = !!video);
  }

  private search(): void {
    this.stateService.searchYouTube(this.userInput);
  }

  private toggleSearch() {
    this.stateService.toggleSearch(!this.showSearch);
  }

}
