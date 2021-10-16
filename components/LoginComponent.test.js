const LoginComponent = require("./LoginComponent")

// @ponicode
describe("changePwdType", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Jean-Philippe", "Michael", "Michael"], ["Michael", "Anas", "Pierre Edouard"], ["George", "Edmond", "Anas"]]
        inst = new LoginComponent.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.changePwdType()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_handleSecurity", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Jean-Philippe", "Jean-Philippe"], ["George", "Pierre Edouard", "Michael"], ["Pierre Edouard", "Jean-Philippe", "Anas"]]
        inst = new LoginComponent.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst._handleSecurity(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst._handleSecurity(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst._handleSecurity(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst._handleSecurity(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_handleSecQues", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Jean-Philippe", "Anas", "George"], ["Michael", "George", "Edmond"], ["Jean-Philippe", "George", "Pierre Edouard"]]
        inst = new LoginComponent.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst._handleSecQues(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst._handleSecQues("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst._handleSecQues("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst._handleSecQues(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst._handleSecQues("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst._handleSecQues(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_handleSubmit", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Anas", "Pierre Edouard", "Anas"], ["Edmond", "Michael", "George"], ["Jean-Philippe", "George", "George"]]
        inst = new LoginComponent.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst._handleSubmit()
        }
    
        expect(callFunction).not.toThrow()
    })
})
