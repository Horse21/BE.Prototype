import { Claim } from '../dto/claim';

export class AuthData {
  name: string;
  roles: string[];
  claims: Claim[];
}
