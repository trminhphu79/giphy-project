import { Injectable } from "@angular/core";
import { UserStateService } from "../core/user-state.service";
import { finalize, from, take } from 'rxjs';
import { UserStorageService } from "@utils/services";
import { LOCAL_STORAGE_KEY } from '@utils/models';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  constructor(
    private __userState: UserStateService,
    private __userStorage: UserStorageService
  ) { }

  getUser$() {
    return this.__userState.getUser$();
  };

  isUpdating$(){
    return this.__userState.isUpdating$();
  }
  getFavorites() {
    return this.__userState.getFavorites$();
  };

  public loadGifs() {
    this.__userState.setUpdating(true)
    this.__userStorage.getData$(LOCAL_STORAGE_KEY).pipe(
      take(1),
      finalize(() => {
        this.__userState.setUpdating(false)
      })
    ).subscribe({
      next: (res) => {
        this.__userState.setFavorites(res);
      },
      error: (err) => {
        throw err
      }
    })
  }

  public getDataById() {

  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}