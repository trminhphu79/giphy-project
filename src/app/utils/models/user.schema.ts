import { GIF } from '@utils/models';

export interface User {
  content_url: string,
  banner_url: string,
  profile_url: string,
  username: string,
  display_name: string,
  avatar_url: string
};

export interface UserState {
  user: User,
  favorites: GIF[],
  updating: boolean
};

export const INITIAL_USER_STATE: UserState = {
  user: {
    display_name: "",
    content_url: "",
    banner_url: "",
    profile_url: "",
    username: "",
    avatar_url: ''
  },
  favorites: [],
  updating: false
}

export const LOCAL_STORAGE_KEY = "GIF"