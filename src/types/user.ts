export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  message: string
  success: boolean
}

export interface ICreateUser {
  name: string
  email: string
  password: string
}

export interface ICreateUserResponse {
  message: string
  success: boolean
}