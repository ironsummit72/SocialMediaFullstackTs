interface ApiResponse {
  status: string;
  code: number;
  message: string;
  data: Object | string | null;
  redirect: string | null;
}
export default class Responses implements ApiResponse {
  status: string;
  code: number;
  message: string;
  data: Object | string | null;
  redirect: string | null;
  constructor(status: string, code: number, message: string, data: Object | string | null, redirect: string | null) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
    this.redirect = redirect;
  }
}
