const Mongoose = require('mongoose')

Mongoose.connect('mongodb://tiagomaniero:minhasenhasecreta@localhost:27017/herois', 
    { useNewUrlParser: true }, function(error){
        if(!error) return
        console.log('Falha na conexão', error) 
    })

const connection = Mongoose.connection

connection.once('open', () => console.log('database rodando'))

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.Model('herois',heroiSchema)

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder:  'dinheiro'
    })

    const listItens = await model.find()
}

main()

