import { Authenticator} from "../src/business/services/Authenticator"
import { BandInputDTO } from "../src/business/entities/Band";
import { BandBusiness } from "../src/business/BandBusiness";
import { BandDatabase } from "../src/data/BandDatabase";
import { IdGenerator } from "../src/business/services/IdGenerator";


const bandBusiness = new BandBusiness(
    new BandDatabase(),
    new IdGenerator(),
    new Authenticator()
 );

describe("createBand",()=>{    
    const input: BandInputDTO = {
        band: "testband",
        member: "testmember",
        genre: "testgenre"
    }

     const normalToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MDJkMGY1LWNkZDctNGUwMS04YzJkLWJiNmNhN2Q3MDBhMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2MTMzMTEyMjcsImV4cCI6MTYxMzM5NzYyN30.x6WjYfZpjORZ7lGie-LZVPDddHcpp3G7VXZK-Eb8LDY"

    test("should return `apenas administradores tem acesso a essa funcção` for user without admin token",async ()=>{
        expect.assertions(1)
        try {

            await bandBusiness.createBand(input,normalToken)

        } catch (error) {
            expect(error.message).toEqual("apenas administradores tem acesso a essa função")
        }
    })


    test("should return a error if name already exists",async ()=>{
        const adminToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZTVmY2IxLTdhMTYtNDdhMi1hYTljLWIzZmU0ZDRiMWE3NiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYxMzMxMjkxMywiZXhwIjoxNjEzMzk5MzEzfQ.yHpg-zUNCiBnnSqjudUamx_0RJly7yaydCxUQLIr4lM"
        expect.assertions(1)
        try {

            await bandBusiness.createBand(input,adminToken)

        } catch (error) {
            expect(error.message).toEqual("An unexpected error ocurred")
        }
    }) 
    })



    describe("findBand",()=>{

      test("invalid Id",async ()=>{

        expect( await bandBusiness.findBand("aaaaaa")).toStrictEqual([])

      })

      test("invalid Id",async ()=>{
      expect.assertions(1)
        try {

        await bandBusiness.findBand("")

       } catch (error) {
        expect(error.message).toStrictEqual("favor digitar id")
       }
        

      })


    })