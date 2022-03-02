import {ROLE_ADMIN, ROLE_NORMAL} from '@/constants/user';

declare global {
  interface User {
    name: string|undefined;
    _id?: string;
    username?: string;
    password?: string;
    role?: string;
    email?: string;
    name?: string;
  }

  type UserRole = ROLE_ADMIN | ROLE_NORMAL;
}
