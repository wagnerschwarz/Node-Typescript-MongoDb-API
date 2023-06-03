import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async () => {
  //config = dotEnv permite usar as variaveis ambientes da aplicacao (logical name)
  config();
  //express = metodos da API (Get/Post/Put...etc )
  const app = express();

  //converte o body que recebemos no req para json
  app.use(express.json());

  await MongoClient.connect();

  //GET Busca usuarios do banco
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  //POST Cria usuarios no banco
  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 9000;
  app.listen(port, () => console.log(`listening on port ${port}! `));
};

main();
