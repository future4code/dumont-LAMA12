import { Request, Response } from "express";
import { Authenticator} from "../business/services/Authenticator"
import { BandInputDTO } from "../business/entities/Band";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../business/services/IdGenerator";

const bandBusiness = new BandBusiness(
   new BandDatabase(),
   new IdGenerator(),
   new Authenticator()
);


export class BandController {
    async signupBand(req: Request, res: Response) {
       try {

         const token: string = req.headers.authorization as string

         if(!token){
             throw new Error("favor fazer login")
         }

          const input: BandInputDTO = {
             band: req.body.band,
             member: req.body.member,
             genre: req.body.genre
          }
          
          if(!input.band || !input.genre || !input.member){
            throw new Error("Favor preencher todos os campos")
        }
           await bandBusiness.createBand(input, token); 
 
          res.status(200).send("banda adicionada com sucesso");
 
       } catch (error) {
          res
             .status(error.statusCode || 400)
             .send({ error: error.message });
       }
    }


    async findBand(req: Request, res: Response) {
      try {

        const token: string = req.headers.authorization as string

        if(!token){
            throw new Error("favor fazer login")
        }

         const input:string = req.body.id
         
         if(!input){
           throw new Error("Favor preencher todos os campos")
       } 

         const data = await bandBusiness.findBand(input);

         res.status(200).send(data);

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }



}