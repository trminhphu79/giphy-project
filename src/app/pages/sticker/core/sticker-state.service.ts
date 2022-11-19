import { Injectable } from "@angular/core";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({ providedIn: "root" })
export class StickerStateService extends CoreStateService<StickerState> {

  #stickers$ = this.select((state) => state.stickers);
  #updating$ = this.select((state) => state.updating);

  constructor() {
    super(initialState)
  };


  isUpdating$() {
    return this.#updating$;
  }
  
  getSticker$() {
    return this.#stickers$
  }

  setUpdating(value: boolean) {
    this.setState({ updating: value });
  }

  setSticker(value: GIF[]) {
    this.setState({
      stickers: [
        ...this.state.stickers,
        ...value
      ]
    })
  }
  
}

interface StickerState {
  stickers: GIF[],
  updating: boolean,
};

const initialState: StickerState = {
  stickers: [],
  updating: false,
}