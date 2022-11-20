import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL_SETTINGS } from "@global-settings";
import { HttpService } from "../http/http.service";

@Injectable({ providedIn: "root" })
export class TagsService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/tags/related/`
  constructor(http: HttpClient) {
    super(http);
  };

  getTags(term?: string) {
    return this.getItems<string>(`${this.URL}${term}`, {})
  }
}