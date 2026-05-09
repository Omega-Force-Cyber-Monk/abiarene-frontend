export interface Meta {
  page: number;
  limit: number;
  total: number;
  count: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
}
