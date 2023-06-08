import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //verificar se o id foi informado
      const id = HttpRequest?.params?.id;
      const body = HttpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      //Verifica se algum campo que a gente recebeu n faz parte dos campos permitidos para atualizar
      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );
      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }
      //atualiza
      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
