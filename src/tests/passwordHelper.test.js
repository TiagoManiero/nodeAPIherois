const assert = require('assert')
const { describe } = require('joi')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Tiago@31321'
const HASH = ''

describe('user help test suite', function(){
    it('deve gerar um hash apartir de uma senha', async() => {
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })

    it('deve validar a nossa senha', async() => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        //esse result deve retornar true
        assert.ok(result)
    })

    
})