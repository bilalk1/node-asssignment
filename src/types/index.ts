export interface PaginationOptions {
  page: string;
  pageSize: string;
}
export interface ErrorResponseBody {
  fields: string | object;
  message: string;
  name: string;
  status: number; // Assuming 'status' is a number
  stack: string;
}