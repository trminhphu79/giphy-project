export type HTTPParams = {
  limit?: number,
  offset?: number,
  rating?: string,
  q?: string,
  api_key?: string,
  lang?: string,
  type?: TypeData
}

export type HTTPResponseItems<T> = {
  data: Array<T>,
  meta: Meta,
  pagination: Pagination
}

export type HTTPResponseItem<T> = {
  value: T;
}

export interface Meta {
  msg: string,
  response_id: string,
  status: number
}

export interface Pagination {
  count: number,
  offset: number,
  total_count: number
}

export const LIMIT = 20;
export enum TypeData {
  STICKER = 'sticker',
  GIF = 'gif',
}