export interface userInfo{
  user:UserSesion;
  token:string;
  id?: number
}
export interface UserSesion {
  id?:number;
  name:string;
  state:boolean;
  username:string;
  role:string;
  permissions:[]

}