import express from "express";
import { AddressInfo } from "net";
import { showsRouter } from "./controller/routes/showsRouter";
import { userRouter } from "./controller/routes/userRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/shows", showsRouter);

const server = app.listen(3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
   } else {
      console.error(`Falha ao rodar o servidor.`);
   }
});  