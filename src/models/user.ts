import {Purchase} from "./purchase";

export interface User {
  email: string,
  password: string,
  pocketNick: string,
  pcNick: string,
  verifiedPocketNick: boolean,
  verifiedPcNick: boolean,
  purchaseList: Purchase[];
}
