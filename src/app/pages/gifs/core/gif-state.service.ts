import { Injectable } from "@angular/core";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({providedIn:"root"})
export class GifStateService extends CoreStateService<GifState>{
  
  
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

  setGifs(value: GIF[]) {
    this.setState({
      gifs: [
        ...this.state.gifs,
        ...value
      ]
    })
  }
}


interface GifState {
  gifs: GIF[],
  updating: boolean,
};

const initialState: GifState = {
  gifs: [],
  updating: false,
}