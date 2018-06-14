import {Purchase} from "./purchase";

export interface User {
  id : number;
  email: string,
  passwordHash: string,
  avatar: string,
  pocketNick: string,
  pcNick: string,
  isEmailVerified: boolean,
  isPocketNickVerified: boolean,
  isPcNickVerified: boolean,
  lastLogin: string;
  ip: string;
  purchaseList: Purchase[];
}
