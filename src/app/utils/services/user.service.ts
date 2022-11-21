import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@utils/http";
import { from, of, take } from "rxjs";
import { LOCAL_STORAGE_KEY } from '@utils/models';
@Injectable({ providedIn: "root" })
export class UserStorageService {

  constructor() { }

  public saveData(key: string, value: any) {
    let curentValue: any = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || "") : ""
    if (!curentValue) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      let gifs: Array<any> = Array.isArray(curentValue) ? curentValue : [curentValue];
      gifs.push(value)
      localStorage.setItem(key, JSON.stringify(gifs));
    }
  }

  public getData$(key: string) {
    let currentValue: any = localStorage.getItem(key)
    return currentValue ? of(currentValue) : of([])
  }
}
