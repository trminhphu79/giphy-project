import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL_SETTINGS } from "@global-settings";
import { HttpService } from "../http/http.service";

@Injectable({ providedIn: "root" })
export class TrendingKeywordService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/trending/`

  constructor(http: HttpClient) {
    super(http);
  };

  getTrendingKeyword() {
    return this.getItems<string>(`${this.URL}searches`, {});
  }
}