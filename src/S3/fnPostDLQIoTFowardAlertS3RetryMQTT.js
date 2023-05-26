'use strict';
const { S3Client, GetObjectCommand, DeleteObjectCommand  } = require("@aws-sdk/client-s3")
const client = new S3Client({ region: "us-east-1" })

const { fnIoTMqttPublishCommand } = require('../IoT-Clients/IotDataPlane')
const { fnGetS3ObjectBody, fnDeleteS3Object, fnGetListS3Objects, objectKeys } = require('./S3')


const objectKeysProcess = async ( params ) => {
  try {
    console.log('🚀 objectKeysProcess - Start')
    console.log('params:', params)

    let mqttParams = {"topic":null, "payload":null}
    let resp = {"delS3ObjResponseObj": null, "mqttResp":null}

    // Get S3 Object Body
    let s3ObjectBody = await fnGetS3ObjectBody(params)
    console.log('s3ObjectBody:', s3ObjectBody)
    
    // Create MQTT mqttParams and publish it
    let topicStr = `${s3ObjectBody.requestPayload.topic}/retry`
    console.log('topicStr:', topicStr)

    // Fix that later. This is because this same code is used by 2 diferent paths
    mqttParams.topic = topicStr.replace("/retry/retry","/retry")
    delete s3ObjectBody.requestPayload.topic
    mqttParams.payload = s3ObjectBody.requestPayload

    resp.mqttResp =  await fnIoTMqttPublishCommand(mqttParams)
    console.log('resp.mqttResp:', resp.mqttResp)

    // Delete S3 Object if mqtt was published
    if (resp.mqttResp.$metadata.httpStatusCode) {
      let deleteObjResult = await fnDeleteS3Object(params)
      console.log('deleteObjResult:', deleteObjResult)
      console.log('deleteObjResult.DeleteMarker:', deleteObjResult.DeleteMarker)
      if(deleteObjResult.DeleteMarker){
        resp.delS3ObjResponseObj = deleteObjResult.VersionId
      }
    }

    console.log('resp:', resp)
    return resp    
  } catch (error) {
      console.error('🚀 objectKeysProcess - error.stack:', error.stack)
      throw error.stack
  }
}

/**
  Examples of payload in the endpoint .../observability/dlq/iot_things_externalKey_message_aggregate_retry
  [
      {"externalKey":"123", "timestamp":[]}
  ]

  [
      {"externalKey":"123", "timestamp":[1683042539686]}
  ]

  [
      {"externalKey":"123", "timestamp":[1683042539686, 1683042544277]}
  ]

  [
      {"externalKey":"456", "timestamp":[1683042539686, 1683042544277]},
      {"externalKey":"222", "timestamp":[1683042539686, 1683042544277]},
      {"externalKey":"zzz", "timestamp":[1683042539686, 1683042544277]},
  ]
 * @param {*} event 
 * @returns 
 */
module.exports.fnPostDLQIoTFowardAlertS3RetryMQTT = async event => {
  try {
    console.log('🚀 fnPostDLQIoTFowardAlertS3RetryMQTT - Start')
    console.log('fnPostDLQIoTFowardAlertS3RetryMQTT event:', event)
    
    const bd = JSON.parse(event.body)
    
    const BUCKET = 'dlqs'
    const prefix = 'iot_things_externalKey_message_aggregate_retry'
    let externalKey = ""
    let timestamp = []
    let s3ObjectParams = {
      "Bucket":  BUCKET, 
      "Key": ''
    }
    let resp = []

    for (const element of bd) {     
        externalKey = element.externalKey
        timestamp = element.timestamp

        if(timestamp.length){
          console.log('timestamp.length > 0 for externalKey: ', externalKey)

          // Loop trhough the provided timestamp list for that specific externalKey and process it
          for (let dt of timestamp) {
            let key = `${prefix}/${externalKey}/${dt}.json`
            console.log('key LOOP:', key)
            s3ObjectParams.Key = key
            console.log('s3ObjectParams LOOP:', s3ObjectParams)

            let objectKeysProcessResp = await objectKeysProcess(s3ObjectParams)
            resp.push(objectKeysProcessResp)
          }  
        } else { // No timestamp list provided. Meaning process all files for that externalKey
          console.log('timestamp.length = 0 for externalKey: ', externalKey)
          
          // get the S3ObjectListKeys for that specific externalKey and process it
          let objList = await fnGetListS3Objects({"Bucket": s3ObjectParams.Bucket, "Delimiter": '/', "Prefix": `${prefix}/${externalKey}/`})
          console.log('objList: ', objList)
          
          let keysObj = await objectKeys(objList)
          console.log('keysObj: ', keysObj)

          for (let key of keysObj){
            // Process for each keyObject
            s3ObjectParams.Key = key
            console.log('s3ObjectParams LOOP:', s3ObjectParams)

            let objectKeysProcessResp = await objectKeysProcess(s3ObjectParams)
            resp.push(objectKeysProcessResp)
          }

        }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(
        {
          "response": resp
        },
        null,
        2
      ),
    }
  } catch (error) {
      console.error('🚀 fnPostDLQIoTFowardAlertS3RetryMQTT - error.stack:', error.stack)
      throw error.stack
  } 
}