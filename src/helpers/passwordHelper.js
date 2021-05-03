const Bcrypt = require('bcrypt')

const {
    pomisify, promisify
} = require('util')

const hashAsync = promisify(Bcrypt.hash)
const compareAsync = pomisify(Bcrypt.compare)
const SALT = parseInt(process.env.SALT_PWD)   

class PasswordHelper {
    static hashPassword(pass){
        return hashAsync(pass,SALT)
    }

    static comparePassword(pass,hash){
        return compareAsync(pass,hash)
    }
}

module.exports = PasswordHelper