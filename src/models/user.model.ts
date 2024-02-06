import { Roles } from "./roles";

export interface UserInfo {
  id: number;
  name: string;
  username: string;
  token:string;
  rol: Roles;
  permissions:[];
}
