//docker ps
//docker exec -it {id} /
//    mongo -u tiagomaniero -p minhasenhasecreta --authenticationBatabase herois
//show dbs -> mostra todos os bancos
//use herois -> mostra contexto
//show collections -> mostra as tabelas(documentos)

/*Inserir
db.herois.insert({
    nome: 'Flash',
    poder: 'velocidade',
    dataNascimento: '1988-01-01'
})
*/

/*listar
db.herois.find()
db.herois.find().preety()
*/

//Mongo aceita código JS
for(let i=0; i<= 100; i++){
    debugger.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade'
    })
}

//db.herois.count() -> traz número de registros
//db.herois.findOne() -> traz um
//db.herois.find().limit(10).sort({ nome : -1 }) ->10 decrescente

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'velocidade',
    dataNascimento: '1988-01-01'
})

//read
db.herois.find()

//update -> se não utilizar o set ele troca todo o documento desse id perdendo informações e se errar o campo ele adiciona um campo novo
db.herois.update({ _id: ObjectId("5645465446") }, {
    $set: {
        nome: 'Mulher-Maravilha'
    }
})

//delete
db.herois.remove({ nome: 'Mulher-Maravilha' })