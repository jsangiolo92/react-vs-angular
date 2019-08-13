import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from 'src/video.model';
import { apiKey } from '../api-key';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private url = 'https://www.googleapis.com/youtube/v3/search?';
  private searchResults$: BehaviorSubject<Video[]> = new BehaviorSubject([]);
  private watchList: Video[] = [];
  private watchList$: BehaviorSubject<Video[]> = new BehaviorSubject([]);
  private showSearch$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private currentVideo$: BehaviorSubject<Video> = new BehaviorSubject(null);

  public get searchResults(): Observable<Video[]> {
    return this.searchResults$.asObservable();
  }

  public get getWatchList(): Observable<Video[]> {
    return this.watchList$.asObservable();
  }

  public get showSearch(): Observable<boolean> {
    return this.showSearch$.asObservable();
  }

  public get currentVideo(): Observable<Video> {
    return this.currentVideo$.asObservable();
  }

  public constructor(private http: HttpClient) {}


  public searchYouTube(queryString: string): void {
    const options = {
      key: apiKey,
      q: queryString,
      maxResults: 20,
      videoEmbeddable: true,
      part: 'snippet',
      type: 'video'
    };

    this.http.get(this.url, {params: <any>options}).subscribe( (res) => {
      const data = this.mapYouTubeResponse(res);
      this.searchResults$.next(data);
    })

  }

  public mapYouTubeResponse(resObject: any): Video[] {
    const items = resObject.items;
    return items.map( (item) => {
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url
      }
    })
  }

  public addToWatchList(video: Video): void {
    this.watchList.push(video);
    this.watchList$.next(this.watchList);
  }

  public removeFromWatchList(videoToRemove: Video): void {
    const indexToRemove = this.watchList.findIndex((video) => video.videoId === videoToRemove.videoId);
    this.watchList.splice(indexToRemove, 1);
    this.watchList$.next(this.watchList);
  }

  public toggleSearch(bool: boolean) {
    this.showSearch$.next(bool);
  }

  public setCurrentVideo(video: Video): void {
    this.currentVideo$.next(video);
  }

}

