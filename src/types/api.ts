export type ApiReturn<T> = {
  code: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export interface PaginatedApiResponse<DataType> {
  code: number;
  status: string;
  data: DataType;
  meta: {
    last_page: number;
    total: number;
  };
}
