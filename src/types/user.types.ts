
import { Role } from "./role.enum";

export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
  name: string;
  contact: string;
  age?: number;
  gender?: string;
  createdBy?: string;
  createdAt?: Date;
};

export type UserFormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
  contact: string;
  age?: number;
  gender?: string;
};