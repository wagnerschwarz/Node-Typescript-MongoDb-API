import validator from "validator";

import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //verifica se os campos obrigatórios foram enviados
      const requiredFields = ["firstName", "lastName", "email", "password"];

      //para cada campo do array
      for (const field of requiredFields) {
        //se não foi enviado um dos campos do array no nosso body, dispararmos o erro
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return { statusCode: 400, body: `Field ${field} is required` };
        }
      }

      //verificar se o e-mail é válido (asd@gmail.com)
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return { statusCode: 400, body: "E-mail is invalid!" };
      }

      //se estiver tudo certo, cria usuario e retorna 201/body user
      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: user,
      };
    } catch (erro) {
      return {
        //erro de servidor/algo deu problema na conexao/camada mais interna
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
