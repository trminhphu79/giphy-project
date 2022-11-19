import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@utils/http";
@Injectable({ providedIn: "root" })
export class UserApiService extends HttpService {
  constructor(http: HttpClient) {
    super(http);
  };
}