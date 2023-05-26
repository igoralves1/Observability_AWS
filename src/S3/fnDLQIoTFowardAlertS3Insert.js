'use strict';
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const client = new S3Client({ region: "us-east-1" })

/**
 * Will process the topic iot/things/{externalKey}/message/aggregate - https://dev-wiki.xxx-xxx.com/en/mqtt-topics
 * 
 *  
 */
module.exports.fnDLQIoTFowardAlertS3Insert = async event => {
  try {
    console.log('🚀 fnDLQIoTFowardAlertS3Insert - Start')
    console.log('fnDLQIoTFowardAlertS3Insert event:', event)
    
    const topic = event.requestPayload.topic
    console.log(`topic: `,topic)

    const externalKey = topic.split("/")[2]
    console.log(`externalKey: `,externalKey)

    const topicDesc = topic.replace(externalKey, "externalKey").replace(/\//g, "_").replace("_retry", "")
    console.log(`topicDesc: `,topicDesc)

    const key = `${topicDesc}_retry/${externalKey}/${Date.now()}.json`
    console.log(`key: `, key)

    const params = {
      Bucket: 'dlqs', 
      Key: key, 
      Body: JSON.stringify(event)
    }
    console.log(`params: `, params)

    const command = new PutObjectCommand(params)
    const putObjResponse = await client.send(command)
    console.log('putObjResponse:',putObjResponse)

    return true
  } catch (error) {
      console.error('🚀 fnDLQIoTFowardAlertS3Insert - error.stack:', error.stack)
      throw error.stack
  } 
}