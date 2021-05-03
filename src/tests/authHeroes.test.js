const assert = require('assert')
const api = require('../api')
const Context = require('../db/strategies/bases/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema')

let app = {}
const USER = {
    username: '',
    password: ''
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '' 
}

describe('Auth teste suite', function() {
    this.beforeAll(async() =>{
        app = await api
        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        const result = await model.update(null, USER_DB, true)
    })

    it('deve obter um token', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepStrictEqual(statusCode,200)
        assert.ok(dados.token.length > 10)
    })

    it('deve retornar não autorizado com login errado', async() =>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'Tiago',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepStrictEqual(statusCode,401)
        assert.deepStrictEqual(dados.error,'Unauthorized')
    })
})

