import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../business/error/CustomError";

export class BandDatabase extends BaseDatabase {
 
    public async insertBand(
       id: string,
       band: string,
       member: string,
       genre: string,
    ): Promise<void> {
       try {
          await BaseDatabase.connection.raw(`
          insert into bands values("${id}","${band}","${member}","${genre}")
          `)
       } catch (error) {
          throw new CustomError(500, "An unexpected error ocurred");
       }
   }

   public async selectBand(
      id: string
   ): Promise<any> {
      try {
        const result = await BaseDatabase.connection.raw(`
         select * from bands where id = "${id}"
         `)
        return result[0]

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
  }

}