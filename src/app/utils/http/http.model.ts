export type HTTPParams = {
  limit?: number,
  offset?: number,
  rating?: string,
  q?: string,
  api_key?: string,
  lang?: string
}

export type HTTPResponseItems<T> = {
  data: Array<T>,
  meta: Meta,
  pagination:Pagination
}

export type HTTPResponseItem<T> = {
  value: T;
}

interface Meta {
  msg: string,
  response_id: string,
  status: number
}

interface Pagination {
  count: number,
  offset: number,
  total_count: number
}