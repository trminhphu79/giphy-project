import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL_SETTINGS } from "@global-settings";
import { HTTPParams } from "../../http/http.model";
import { Clip } from "../../models/clip.schema";
import { HttpService } from './../../http/http.service';

@Injectable({ providedIn: "root" })
export class TrendingClipsService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/clips/trending`
  constructor(http: HttpClient) {
    super(http);
  };

  getClips$(options?: HTTPParams) {
    return this.getItems<Clip>(`${this.URL}`, options);
  }
}