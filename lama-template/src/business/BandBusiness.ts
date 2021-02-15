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


    async createBand(band: BandInputDTO, token:string) {
    
    const data = this.authenticator.getData(token)
    if(data.role !=="ADMIN"){
      throw new Error("apenas administradores tem acesso a essa função")
   }
    const id: string = this.idGenerator.generate()

    await this.BandDatabase.insertBand(
        id,
        band.band,
        band.member,
        band.genre
    ); 
    return data
 }

 async findBand(id: string) {

   if(!id){
      throw new Error("favor digitar id")
   }

    const result = await this.BandDatabase.selectBand(
       id
   ); 
   return result
}


}