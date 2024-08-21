export default interface BaseResponse<TEntity> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: TEntity;
}

export interface PagedRespones<TEntity> {
  count: number;
  page: number;
  size: number;
  listItems: TEntity[];
}

export interface FilterBase {
  keyword?: string | '';
  page?: number | 1;
  size?: number | 20;
}
