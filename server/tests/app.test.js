const request = require("supertest")
const {app} = require("../app")


describe("GET /flashcards", () =>{

    describe("when requested the list of flashcards", () =>{

        //should return status code "200"
        test("should return status code 200", async () =>{
            const response = await request(app).get("/flashcard")
            expect(response.statusCode).toBe(200)
         }) 

         //should respond with a json content header
         test("should return  json content header", async () =>{
            const response = await request(app).get("/flashcard")
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
         })

          //should respond with a json array of flashcards objects
          test("should return  json array of flashcards objects", async () =>{
            const response = await request(app).get("/flashcard")
            console.log(response.body)
            expect(response.body[0].content).toBeDefined();
         })

         



    } )

    describe("when the flashcards are missing", () =>{
        //should return status code "400" and a json obj with the error message
   } )

})
