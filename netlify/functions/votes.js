const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const url = process.env.ATLASURI

exports.handler = async function(event,context)
{
    const subject = event.queryStringParameters.name || 'World'
    const idNumbers = JSON.parse(event.body).idNumbers
    const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    try
    {
        await client.connect()
        const db = client.db('changeWorthy')
        const col = db.collection('postCounts')
        const myDoc = await col.find({
            identification:{$in:idNumbers}
        }).toArray()
        return {
            statusCode:200,
            headers:{
                "content-type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials":true,
                "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control_Allow-Headers":"Origin, Content-Type, X-Auth-Token"},
            body:JSON.stringify(myDoc)
        }
    }
    catch(e)
    {
        return{
            statusCode:500,
            headers:{
                "content-type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials":true,
                "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control_Allow-Headers":"Origin, Content-Type, X-Auth-Token"},
            body:JSON.stringify({msg:e.message})
            }
    }
    finally
    {
        await client.close()
    }
}