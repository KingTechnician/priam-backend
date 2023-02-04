const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

exports.handler = async event =>
{

    const subject = event.queryStringParameters.name || 'World'
    return {
        statusCode:200,
        headers:{
            "content-type":"application/json",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Credentials":true},
        body:JSON.stringify({"Response":"Doing a good job"})
    }
}