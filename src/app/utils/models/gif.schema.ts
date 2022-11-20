import { User } from "@utils/models";

export interface GIF {
  type: string,
  id: string,
  slug: string,
  url: string,
  bitly_url: string,
  embed_url: string,
  username: string,
  source: string,
  rating: string,
  content_url: string,
  user: User,
  source_tld: string,
  source_post_url: string,
  update_datetime: string,
  create_datetime: string,
  import_datetime: string,
  trending_datetime: string,
  title: string,
  alt_text: string,
  images: any
};

export const INITIAL_GIF_STATE = {};
