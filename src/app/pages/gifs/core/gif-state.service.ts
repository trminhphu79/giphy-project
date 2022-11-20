import { Injectable } from "@angular/core";
import { LIMIT, Pagination } from "@utils/http";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({ providedIn: "root" })
export class GifStateService extends CoreStateService<GifState>{

  #gifs$ = this.select((state) => state.gifs);
  #updating$ = this.select((state) => state.updating);
  #trendingKeyword$ = this.select((state) => state.trending_keyword);
  #panigation$ = this.select((state) => state.pagination);

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

  getPanigation$() {
    return this.#panigation$
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

  setPagination(value: Pagination) {
    this.setState({ pagination: value })
  }

  setTrendingKeywords(value: string[]) {
    this.setState({
      trending_keyword: [
        ...value
      ]
    })
  };

  clearGif() {
    this.setState({
      gifs: []
    })
  }

  clearKeyword() {
    this.setState({
      trending_keyword: []
    })
  }
}

interface GifState {
  gifs: GIF[],
  updating: boolean,
  trending_keyword: string[],
  pagination: Pagination
};

const initialState: GifState = {
  gifs: [],
  trending_keyword: [],
  updating: false,
  pagination: {
    offset: 0,
    count: LIMIT,
    total_count: 0
  }
}