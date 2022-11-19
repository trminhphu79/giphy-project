import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL_SETTINGS } from "@global-settings";
import { HTTPParams } from "../http/http.model";
import { HttpService } from "../http/http.service";
import { GIF } from "../models/gif.schema";

@Injectable({ providedIn: "root" })
export class StickerService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/stickers/`
  constructor(http: HttpClient) {
    super(http);
  };

  getStickers$(options?: HTTPParams) {
    return this.getItems<GIF>(`${this.URL}`, options);
  }

  getTrending$(options?: HTTPParams) {
    return this.getItems<GIF>(`${this.URL}trending`, options);
  }

  getRandom$(options?: HTTPParams) {
    return this.getItems<GIF>(`${this.URL}random`, options);
  }
}