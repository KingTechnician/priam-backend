const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const url = process.env.ATLASURI


exports.handler = async function(event,context)
{
    context.callbackWaitsForEmptyEventLoop = false
    const subject = event.queryStringParameters.name || 'World'
    const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    try
    {
        await client.connect()
        var stringToRegex = (s, m) => (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)) ? new RegExp(m[2], m[3].split('').filter((i, p, s) => s.indexOf(i) === p).join('')) : new RegExp(s);
        const query = JSON.parse(event.body).query
        const db = client.db('changeWorthy')
        var regex = stringToRegex(`/${query}/i`)
        const col = db.collection('onlinePosts')
        const myDoc = await col.find({
            title:{$regex:regex}
        }).toArray()
        return {
            statusCode:200,
            headers:{
                "content-type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials":true},
            body:JSON.stringify(myDoc)
        }
    }
    catch (e)
    {
        return {
            statusCode:500,
            body:JSON.stringify({msg:e.message})
        }
    }
    finally
    {
        await client.close()
    }
}