import { Injectable } from "@angular/core";
import { CoreStateService } from "@utils/state";
import { INITIAL_USER_STATE, GIF, UserState } from '@utils/models';

@Injectable({ providedIn: 'root' })
export class UserStateService extends CoreStateService<UserState> {

  #favorites$ = this.select((state) => state.favorites);
  #user$ = this.select((state) => state.user);
  #updating$ = this.select((state) => state.updating);
  
  constructor() {
    super(INITIAL_USER_STATE);
  };

  isUpdating$() {
    return this.#updating$
  }

  setUpdating(value: boolean) {
    this.setState({ updating: value });
  }

  getUser$() {
    return this.#user$;
  };

  getFavorites$() {
    return this.#favorites$;
  };

  setFavorites(newFavorite: GIF[]) {
    this.setState({ favorites: [...this.state.favorites, ...newFavorite] });
  };

  removeFavorite(selectedItem: GIF) {
    let newFavorites = this.state.favorites.filter((favorite) => favorite.id !== selectedItem.id);
    this.setState({ favorites: newFavorites });
  }
}