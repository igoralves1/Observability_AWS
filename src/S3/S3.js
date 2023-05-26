'use strict'

const { S3Client, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command  } = require("@aws-sdk/client-s3")
const client = new S3Client({ region: "us-east-1" })


/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectsv2command.html
 * @param {"Bucket": '', "Delimiter": '', "Prefix": ''} 
 * EX: {"Bucket": 'dlqs', "Delimiter": '/', "Prefix": 'iot_things_externalKey_message_aggregate_retry/555/'}
 * @returns 
 * [
    {
        "Key": "iot_things_externalKey_message_aggregate_retry/555/1683133970273.json",
        "LastModified": "2023-05-03T17:12:51+00:00",
        "ETag": "\"f819591400adb0216afedb4bf195ffce\"",
        "Size": 903,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "iot_things_externalKey_message_aggregate_retry/555/1683133981733.json",
        "LastModified": "2023-05-03T17:13:02+00:00",
        "ETag": "\"e26dd311d678869bcb666c20c6c57215\"",
        "Size": 903,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "iot_things_externalKey_message_aggregate_retry/555/1683133996601.json",
        "LastModified": "2023-05-03T17:13:17+00:00",
        "ETag": "\"dadc42fb5e67d2803ff1ed576eae4385\"",
        "Size": 903,
        "StorageClass": "STANDARD"
    }
]
 */
const fnGetListS3Objects = async (params) => {
    try {
        console.log('🚀 START fnGetListS3Objects')
  
        console.log('🚀 params: ', params)

        // S3 GetObjectsList
        const command = new ListObjectsV2Command(params)
        const getListObjectsResponse = await client.send(command)
        console.log('getListObjectsResponse:', getListObjectsResponse)
        const contents = getListObjectsResponse.Contents
        console.log('contents:', contents)
        
        return contents
    } catch (error) {
        console.error('🚀 fnGetListS3Objects - error.stack:', error.stack)
        throw error.stack
    }
  }

/**
 * 
 * @param {"Bucket": '', "Key": ''} 
 * @returns 
 */
const fnGetS3ObjectBody = async (params) => {
    try {
        console.log('🚀 START fnGetS3ObjectBody')

        console.log('🚀 params: ', params)
  
        // S3 GetObject
        const command = new GetObjectCommand(params)
        const getObjectResponse = await client.send(command)
        console.log('getObjectResponse:', getObjectResponse)
        
        // Get S3 Object Body
        const bodyResponseStr = await getObjectResponse.Body.transformToString()
        const s3BodyResponseObj = JSON.parse(bodyResponseStr)
        console.log('s3BodyResponseObj:', s3BodyResponseObj)
        
        return s3BodyResponseObj
    } catch (error) {
        console.error('🚀 fnGetS3ObjectBody - error.stack:', error.stack)
        throw error.stack
    }
  }
  
/**
 * 
 * @param {"Bucket": '', "Key": ''} 
 * @returns 
 */
const fnDeleteS3Object = async (params) => {
try {
    console.log('🚀 START fnDeleteS3Object')

    console.log('🚀 params: ', params)

    const delObjCommand = new DeleteObjectCommand(params)
    const delS3ObjResponse = await client.send(delObjCommand)      
    return delS3ObjResponse
} catch (error) {
    console.error('🚀 fnDeleteS3Object - error.stack:', error.stack)
    throw error.stack
}
}

/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/listobjectsv2commandoutput.html 
 * @param ListObjectsV2CommandOutput 
 * EX: 
 * [
    {
        "Key": "iot_things_externalKey_message_aggregate_retry/555/1683133970273.json",
        "LastModified": "2023-05-03T17:12:51+00:00",
        "ETag": "\"f819591400adb0216afedb4bf195ffce\"",
        "Size": 903,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "iot_things_externalKey_message_aggregate_retry/555/1683133981733.json",
        "LastModified": "2023-05-03T17:13:02+00:00",
        "ETag": "\"e26dd311d678869bcb666c20c6c57215\"",
        "Size": 903,
        "StorageClass": "STANDARD"
    },
    {
        "Key": "iot_things_externalKey_message_aggregate_retry/555/1683133996601.json",
        "LastModified": "2023-05-03T17:13:17+00:00",
        "ETag": "\"dadc42fb5e67d2803ff1ed576eae4385\"",
        "Size": 903,
        "StorageClass": "STANDARD"
    }
]
 * @returns list of keys
   Ex:
    [ 
        'iot_things_externalKey_message_aggregate_retry/555/1683133970273.json',
        'iot_things_externalKey_message_aggregate_retry/555/1683133981733.json',
        'iot_things_externalKey_message_aggregate_retry/555/1683133996601.json' 
    ]
 */
const objectKeys = async (params) => {
    try {
        console.log('🚀 START objectKeys')

        console.log('🚀 params: ', params)

        let keysObj = params.map(obj => { return obj.Key })
        console.log(keysObj) 
        
        return keysObj
    } catch (error) {
        console.error('🚀 objectKeys - error.stack:', error.stack)
        throw error.stack
    }
}

const objectKeysDate = async (params) => {
    try {
        console.log('🚀 START objectKeysDate')

        console.log('🚀 params: ', params)

        let dts = params
        .map(obj => { 
            let dt = obj.Key.split("/")[2].split(".")[0]
            console.log(dt)
            return dt
        })
        console.log(dts)
        
        return dts
    } catch (error) {
        console.error('🚀 objectKeysDate - error.stack:', error.stack)
        throw error.stack
    }
}

module.exports = {
    fnGetS3ObjectBody,
    fnDeleteS3Object,
    fnGetListS3Objects,
    objectKeys,
    objectKeysDate
}