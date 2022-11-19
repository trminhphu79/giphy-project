import { Injectable } from "@angular/core";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({ providedIn: 'root' })
export class HomeStateSerivce extends CoreStateService<GifState> {

  #gifs$ = this.select((state) => state.gifs);
  #gifUpdating$ = this.select((state) => state.gifUpdating);

  #sticker$ = this.select((state) => state.stickers);
  #stickerUpdating$ = this.select((state) => state.stickerUpdating);

  constructor() {
    super(initialState)
  };

  isGifUpdating$() {
    return this.#gifUpdating$
  }

  setGifUpdating(value: boolean) {
    this.setState({ gifUpdating: value });
  }

  isStickerUpdating$() {
    return this.#stickerUpdating$;
  }

  setStickerUpdating(value: boolean) {
    this.setState({ stickerUpdating: value });
  }


  getGifs$() {
    return this.#gifs$
  };

  getSticker$() {
    return this.#sticker$
  };

  setGifs(value: GIF[]) {
    this.setState({
      gifs: [
        ...this.state.gifs,
        ...value
      ]
    });
  };

  clearGifs() {
    this.setState({
      gifs: []
    });
  }

  clearStickers() {
    this.setState({
      stickers: []
    });
  }
  
  setStickers(value: GIF[]) {
    this.setState({
      stickers: [
        ...this.state.stickers,
        ...value
      ]
    });
  };
}

interface GifState {
  gifs: GIF[],
  stickers: GIF[],
  gifUpdating: boolean,
  stickerUpdating: boolean,
};

const initialState: GifState = {
  gifs: [],
  stickers: [],
  gifUpdating: false,
  stickerUpdating: false,
}