import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL_SETTINGS } from "@global-settings";
import { HTTPParams, HttpService, TypeData } from "@utils/http";
import { GIF } from "../models/gif.schema";

@Injectable({ providedIn: "root" })
export class GifService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/gifs/`
  constructor(http: HttpClient) {
    super(http);
  };

  getGifList$(options: HTTPParams) {
    options['type'] = TypeData.GIF;
    return this.getItems<GIF>(`${this.URL}`, options)
  }

  getTrending$(options: HTTPParams) {
    options['type'] = TypeData.GIF;
    return this.getItems<GIF>(`${this.URL}trending`, options);
  }

  getRandom$(options: HTTPParams) {
    options['type'] = TypeData.GIF;
    return this.getItems<GIF>(`${this.URL}random`, options);
  }

  searchByTrendingKeyword$(options?:HTTPParams){
    return this.getItems<GIF>(`${this.URL}search`, options);
  }
}