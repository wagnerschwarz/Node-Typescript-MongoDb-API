import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { iGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUserRepository: iGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      //validar requisição
      // direcionar chamada para o repository
      const users = await this.getUserRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
