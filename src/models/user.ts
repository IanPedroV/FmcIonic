import {Purchase} from "./purchase";

export interface User {
  email: string,
  password: string,
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
