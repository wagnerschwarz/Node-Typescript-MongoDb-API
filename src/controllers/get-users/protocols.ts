import { User } from "../../models/user";

export interface iGetUsersRepository {
  getUsers(): Promise<User[]>;
}
