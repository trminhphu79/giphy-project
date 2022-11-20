import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpService } from "../http/http.service";
import { GLOBAL_SETTINGS } from "@global-settings";
import { Meta } from "../http/http.model";

@Injectable({ providedIn: 'root' })
export class UploadService extends HttpService {
  URL = `${GLOBAL_SETTINGS.domain}/${GLOBAL_SETTINGS.apiVersion}/gifs/`
  constructor(http: HttpClient) {
    super(http)
  };

  uploadFile$(file: any) {
    return this.submitItem<Meta>(this.URL, file)
  }
}