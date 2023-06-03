import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUser implements ICreateUserRepository {
  //inserindo o usuário na collection 'users'
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    //buscando esse usuário para ver se foi criado com sucesso
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    //caso não tenha encontrado, retorne erro
    if (!user) {
      throw new Error("User not created");
    }

    //se encontrou a gente substitui o id com underline pelo id sem underline (model User.ts)
    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
