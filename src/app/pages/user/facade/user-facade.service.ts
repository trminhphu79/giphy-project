import { Injectable } from "@angular/core";
import { UserApiService } from "@utils/services";
import { UserStateService } from "../core/user-state.service";

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  constructor(
    private __userAPI: UserApiService,
    private __userState: UserStateService
  ) { }

  getUser$() {
    return this.__userState.getUser$();
  };

  getFavorites() {
    return this.__userState.getFavorites$();
  };
}