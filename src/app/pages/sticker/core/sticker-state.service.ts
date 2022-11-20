import { Injectable } from "@angular/core";
import { LIMIT, Pagination } from "@utils/http";
import { GIF } from "@utils/models";
import { CoreStateService } from "@utils/state";

@Injectable({ providedIn: "root" })
export class StickerStateService extends CoreStateService<StickerState> {

  #stickers$ = this.select((state) => state.stickers);
  #updating$ = this.select((state) => state.updating);
  #trendingKeyword$ = this.select((state) => state.trending_keyword);
  #panigation$ = this.select((state) => state.pagination);

  constructor() {
    super(initialState)
  };

  isUpdating$() {
    return this.#updating$;
  }

  getSticker$() {
    return this.#stickers$
  }

  getPanigation$() {
    return this.#panigation$
  }

  getTrendingKeyword$() {
    return this.#trendingKeyword$
  }
  setUpdating(value: boolean) {
    this.setState({ updating: value });
  }

  setSticker(value: GIF[]) {
    this.setState({ stickers: [...this.state.stickers, ...value] })
  }

  setPagination(value: Pagination) {
    this.setState({ pagination: value })
  }

  setTrendingKeywords(value: string[]) {
    this.setState({ trending_keyword: [...value] })
  }

  clearStickers() {
    this.setState({
      stickers: []
    })
  };

  clearKeyword() {
    this.setState({
      trending_keyword: []
    })
  }
}

interface StickerState {
  stickers: GIF[],
  updating: boolean,
  trending_keyword: string[],
  pagination: Pagination
};

const initialState: StickerState = {
  stickers: [],
  trending_keyword: [],
  updating: false,
  pagination: {
    offset: 0,
    count: LIMIT,
    total_count: 0
  }
}