export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}

export interface MeResponse extends User {
  iat: number;
  exp: number;
}
