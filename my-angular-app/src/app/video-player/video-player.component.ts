import { Component, OnInit, Sanitizer } from '@angular/core';
import { StateService } from '../state.service';
import { Video } from 'src/video.model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  private currentVideo: Video;

  constructor(private stateService: StateService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.stateService.currentVideo.subscribe(video => this.currentVideo = video);
  }

  public goBack(): void {
    this.stateService.setCurrentVideo(null);
    this.router.navigate(['']);
  }

  public sanitizeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
  }

}
