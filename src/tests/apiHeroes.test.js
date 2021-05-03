const assert = require('assert')
const api = require('./../api')

let app = {}
const TOKEN = ''
const headers = {
    Authorization: TOKEN
}
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin',
    poder: 'Marreta'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Falcao Negro',
    poder: 'Flechas'
}

let MOCK_ID = ''

describe('Suite de teste API Heroes', function(){
    this.beforeAll(async () =>{
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/herois&skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode,200)
        assert.ok(Array.isArray(dados))
    })

    it('listar/herois - deve retornar erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AAAAA'
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const erroResult = {
            "statusCode": 400,
            "erro": "BadRequest",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query",
                "keys": ["limit"]
            }
        }
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode,400)
        assert.deepStrictEqual(result.payload,JSON.stringify(erroResult))
    })
    
    it('listar/herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000
        const NAME = MOCK_HEROI_INICIAL.nome
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode,200)
        assert.deepStrictEqual(dados[0].nome === NAME)
    })

    it('cadastrar herois POST - /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            headers,
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id,undefined)
        assert.deepStrictEqual(message, 'Heroi cadastrado com sucesso')
    })

    it('atualizar PATCH - /herois/:id', async() => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message,'Heroi atualizado com sucesso')
    })

    it('atualizar PATCH - /herois/:id - não deve atualizar com id incorreto', async() => {
        const _id = `${MOCK_ID}01`
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Não encontrado no banco'
        }
        assert.ok(statusCode === 412)
        assert.deepStrictEqual(dados,expected)
    })

    it('remover DELETE - /herois/id', async() => {
        const id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode =  result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message,'Heroi removido com sucesso')
    })

    it('remover DELETE - /herois/id não deve remover', async() => {
        const id = `${MOCK_ID}01`
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode =  result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Não encontrado no banco'
        }
        assert.ok(statusCode === 412)
        assert.deepStrictEqual(dados.message,expected)
    })

    it('remover DELETE - /herois/id não deve remover com id inválido', async() => {
        const id = `ID_IN`
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode =  result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An Internal Server Error occurred'
        }
        assert.ok(statusCode === 500)
        assert.deepStrictEqual(dados.message,expected)
    })
})