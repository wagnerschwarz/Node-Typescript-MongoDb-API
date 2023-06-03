import { iGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements iGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<User>("users")
      .find({})
      .toArray();

    users[0]._id;

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
