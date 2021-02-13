import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { BandInputDTO } from "./entities/Band";
import { Authenticator} from "./services/Authenticator"

export class BandBusiness {

   constructor(
      private BandDatabase: BandDatabase,
      private idGenerator: IdGenerator,
      private authenticator: Authenticator
   ) { }


    async createBand(user: BandInputDTO, token:string) {
    
    const data = this.authenticator.getData(token)
    console.log(user)
    if(data.role !=="ADMIN"){
      throw new Error("apenas administradores tem acesso a essa funcção")
   }
    const id: string = this.idGenerator.generate()

    await this.BandDatabase.insertBand(
        id,
        user.band,
        user.member,
        user.genre
    ); 
    return data
 }

 async findBand(id: string) {

    const result = await this.BandDatabase.selectBand(
       id
   ); 
   return result
}


}