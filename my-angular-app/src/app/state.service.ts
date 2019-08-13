import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../video.model';
import { apiKey } from '../api-key';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private url = 'https://www.googleapis.com/youtube/v3/search?';

  public constructor() {}
}