import validator from "validator";

import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      //verifica se os campos obrigatórios foram enviados
      const requiredFields = ["firstName", "lastName", "email", "password"];

      //para cada campo do array
      for (const field of requiredFields) {
        //se não foi enviado um dos campos do array no nosso body, dispararmos o erro
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      //verificar se o e-mail é válido (asd@gmail.com)
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid!");
      }

      //se estiver tudo certo, cria usuario e retorna 201/body user
      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );
      //Sucesso
      return created<User>(user);
    } catch (erro) {
      return serverError();
    }
  }
}
