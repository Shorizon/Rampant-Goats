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
        test("should return a json file containing the error ", async () => {
            const response = await request(app).get(`/flashcard/${category}`)
            expect(response.body.error).toBe(`There is no flashcard with such category: ${category}`)
        })

    })

})


describe(`GET /flashcard/login/:username/:password`, () => {

    describe("when requested to login with correct credentials: ", () => {

        let username = "test"
        let password = "123"

        //should return status code "200"
        test("should return status code 200", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.statusCode).toBe(200)
        })

        // should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a json array of user objects
        test("should return a json array of flashcards objects", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.body[0].username).toBeDefined();
        })

        //should respond with a the number of keys of the json object: 2
        test("should return the number of keys of the json object: 2", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(Object.keys(response.body[0]).length).toBe(2);
        })
        //should not return any value for the password key
        test("should not return any value for the password key", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.body.password).toBe();
        })



    })
    describe("when requested to login with incorrect credentials: ", () => {


        let username = "test"
        let password = "121231323"

        //should return status code "404"
        test("should return status code 404", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.statusCode).toBe(404)
        })


        // should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })


        //should respond with a json file containing the error 
        test("should return a json file containing the error ", async () => {
            const response = await request(app).get(`/flashcard/login/${username}/${password}`)
            expect(response.body.error).toBe("username and password do not match")
        })


    })
})

describe(`POST /flashcard`, () => {

    describe("when requested to add a new card: ", () => {

        data = {
            "content": "SAMPLE TEXT",
            "answer1": "SAMPLE TEXT",
            "answer2": "SAMPLE TEXT",
            "answer3": "SAMPLE TEXT",
            "answer4": "SAMPLE TEXT",
            "corAnswer": "SAMPLE TEXT",
            "category": "SAMPLE TEXT",
            "corIndex": 0
        }

        //should return status code "201"
        test("should return status code 201", async () => {
            const response = await request(app).post(`/flashcard/`).send(data)
            expect(response.statusCode).toBe(201)
        })
        // should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).post(`/flashcard/`).send(data)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a json file of a flashcard json objects
        test("should return a json array of flashcards objects", async () => {
            const response = await request(app).post(`/flashcard/`).send(data)
            expect(response.body.content).toBeDefined();
        })

        //should respond with a the number of keys of the json object: 8
        test("should return the number of keys of the json object: 2", async () => {
            const response = await request(app).post(`/flashcard/`).send(data)
            expect(Object.keys(response.body).length).toBe(8);
        })


    })
    describe("when requested to add an incomplete card: ", () => {
        wrongdata = {
            "content": "SAMPLE TEXT",
            "answer1": "SAMPLE TEXT",
            "answer2": "SAMPLE TEXT",
            "answer3": "SAMPLE TEXT",
            "answer4": undefined,
            "corAnswer": "SAMPLE TEXT",
            "category": "SAMPLE TEXT",
            "corIndex": 0
        }
        //should return status code "400"
        test("should return status code 400", async () => {
            const response = await request(app).post(`/flashcard/`).send(wrongdata)
            expect(response.statusCode).toBe(400)
        })


        // should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).post(`/flashcard/`).send(wrongdata)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })


        //should respond with a json file containing the error 
        test("should return a json file containing the error ", async () => {
            const response = await request(app).post(`/flashcard/`).send(wrongdata)
            expect(response.body.error).toBe("your flashcard is missing something!")
        })

        //should return 400 if the index is not a number
        test("should return a json file containing the error ", async () => {
            wrongdata.corIndex = "not a number"
            const response = await request(app).post(`/flashcard/`).send(wrongdata)
            expect(response.statusCode).toBe(400)
        })



    })

})

describe(`POST /flashcard/signup`, () => {


    describe("when requested to register with a new ID: ", () => {
        user = {
            username: "new",
            password: "new"
        }

        //should return status code "201"
        test("should return status code 201", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(user)
            expect(response.statusCode).toBe(201)
        })
        // should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(user)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a the number of keys of the json object: 1
        test("should return the number of keys of the json object: 1", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(user)
            expect(Object.keys(response.body).length).toBe(1);
        })

    })
    describe("when requested to register with a taken ID: ", () => {

        userT = {
            username: "test",
            password: "new"
        }

        //should return status code "409"
        test("should return status code 201", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(userT)
            expect(response.statusCode).toBe(409)
        })
        // should respond with a json content header
        test("should return  json content header", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(userT)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        //should respond with a the number of keys of the json object: 1
        test("should return the number of keys of the json object: 1", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(userT)
            expect(Object.keys(response.body).length).toBe(1);
        })

        //should respond with a json file containing the error 
        test("should return a json file containing the error ", async () => {
            const response = await request(app).post(`/flashcard/signup`).send(userT)
            expect(response.body.error).toBe("ID is already taken")
        })


    })
})
