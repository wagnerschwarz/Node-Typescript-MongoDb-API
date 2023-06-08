import { IController } from "../protocols";
import { iGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUserRepository: iGetUsersRepository) {}

  async handle() {
    try {
      //validar requisição
      // direcionar chamada para o repository
      const users = await this.getUserRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
