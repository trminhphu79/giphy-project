import { Injectable } from "@angular/core";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({ providedIn: "root" })
export class MyGifStateService extends CoreStateService<MyGifState> {

  #gifs$ = this.select((state) => state.gifs);
  #updating$ = this.select((state) => state.updating);

  constructor() {
    super(initialState)
  };

  isUpdating$() {
    return this.#updating$;
  }

  getGifs$() {
    return this.#gifs$
  }

  setUpdating(value: boolean) {
    this.setState({ updating: value });
  }

  setGifs(value: any) {
    this.setState({ gifs: value });
  }
}

interface MyGifState {
  gifs: any[],
  updating: boolean,
};

const initialState: MyGifState = {
  gifs: [],
  updating: false,
}