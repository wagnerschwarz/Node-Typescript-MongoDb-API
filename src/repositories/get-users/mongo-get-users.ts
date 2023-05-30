import { iGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements iGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Wagner",
        lastName: "Schwarz",
        email: "wagnerschwarz@outlook.com",
        password: "123",
      },
    ];
  }
}
