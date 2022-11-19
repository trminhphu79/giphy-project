import { Injectable } from "@angular/core";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({ providedIn: "root" })
export class GifStateService extends CoreStateService<GifState>{


  #gifs$ = this.select((state) => state.gifs);
  #updating$ = this.select((state) => state.updating);
  #trendingKeyword$ = this.select((state) => state.trending_keyword);

  constructor() {
    super(initialState)
  };


  isUpdating$() {
    return this.#updating$;
  }

  getGifs$() {
    return this.#gifs$
  }

  getTrendingKeyword$() {
    return this.#trendingKeyword$
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

  setTrendingKeywords(value: string[]) {
    this.setState({
      trending_keyword: [
        ...this.state.trending_keyword,
        ...value
      ]
    })
  }
}


interface GifState {
  gifs: GIF[],
  updating: boolean,
  trending_keyword: string[]
};

const initialState: GifState = {
  gifs: [],
  trending_keyword: [],
  updating: false,
}