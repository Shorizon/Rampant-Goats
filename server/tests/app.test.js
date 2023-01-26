const request = require("supertest")
const { app } = require("../app")


describe("GET /flashcards", () => {

    describe("when requested the list of flashcards", () => {

        //should return status code "200"
        test("should return status code 200", async () => {
            const response = await request(app).get("/flashcard")
            expect(response.statusCode).toBe(200)
        })

        //should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).get("/flashcard")
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a json array of flashcards objects
        test("should return a json array of flashcards objects", async () => {
            const response = await request(app).get("/flashcard")
            expect(response.body[0].content).toBeDefined();
        })

        //should respond with the number of keys of the json object: 8
        test("should return the number of keys of the json oobject: 8", async () => {
            const response = await request(app).get("/flashcard")
            expect(Object.keys(response.body[0]).length).toBe(8);
        })


    })

})

describe("GET /flashcards/:category", () => {

    describe("when requested the list of flashcards with a category", () => {

        let category = "History"

        //should return status code "200"
        test("should return status code 200", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.statusCode).toBe(200)
        })

        //should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a json array of flashcards objects
        test("should return a json array of flashcards objects", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.body[0].content).toBeDefined();
        })

        //should respond with a the number of keys of the json object: 8
        test("should return the number of keys of the json object: 8", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(Object.keys(response.body[0]).length).toBe(8);
        })

        //should not return a different category 
        test("should not return a different category of flashcards objects", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            for (let e of response.body) {
                expect(e.category).toBe(category)
            }
        })

    })

    describe("when requested the list of flashcards with a category that doesn't exists", () => {
        let category = "Math"
        //should return status code "404"
        test("should return status code 404", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.statusCode).toBe(404)
        })

        //should respond with a json content header
        test("should return  json content header", async () => {

            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a json file containing the error 
        test("should return a json gile containing the error ", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.body.error).toBe(`There is no flashcard with such category: ${category}`)
        })

    })

    describe(`GET /flashcard/login/:username/:password`, () => {

        describe("when requested to login with correct credentials: ", () => {
            
            let username = "test"
            let password = "123"





        })

    })

})
