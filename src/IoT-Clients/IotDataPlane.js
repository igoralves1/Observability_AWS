'use strict'

const { IoTDataPlaneClient, PublishCommand } = require("@aws-sdk/client-iot-data-plane");
const clientIoT = new IoTDataPlaneClient({ region: "us-east-1" })
console.log('🚀 clientIoT', clientIoT)


const fnIoTMqttPublishCommand = async (params) => {
  try {
    console.log('🚀 START fnIoTMqttPublishCommand')
    
    let topic = params.topic
    console.log('🚀 topic: ', topic)
    
    let payload = params.payload
    console.log('🚀 payload: ', payload)
    
    let sendParams = {
      topic: topic,
      payload: JSON.stringify(payload),
      qos: '0'
    }
    console.log('🚀 sendParams: ', sendParams)
    
    const command = new PublishCommand(sendParams)
    console.log('🚀 command: ', command)

    const response = await clientIoT.send(command)
    console.log('🚀 response: ', response)

    return response
  } catch (error) {
    console.log('🚀 fnIoTMqttPublishCommand - error.stack: ', error.stack)
    throw error.stack
  }
}

const fnIoTMqttPublishCommandReaction = async (params) => {
  try {
    console.log('🚀 START fnIoTMqttPublishCommandReaction')
    
    let topic = `iot/things/+/message/aggregate`
    console.log('🚀 topic', topic)
    
    let payload = {
      "path" : "some/payload",
      "temp": "bigger or equal than 5"
    }
    console.log('🚀 payload', payload)
    

    /*
    SELECT *, metadata.deviceClass as deviceClass, metadata.offlineTimeout as offlineTimeout, 
    (messageTimestamp + 2592000) AS ttl, FROM 'iot/things/+/message/aggregate'

    */

    let params = {
      topic: topic,
      payload: JSON.stringify(payload),
      qos: '0'
    }
    console.log('🚀 params', params)
    
    const command = new PublishCommand(params)
    console.log('🚀 command', command)


    const response = await clientIoT.send(command)
    console.log('🚀 response', response)

    return response
  } catch (error) {
    console.log('🚀 fnIoTMqttPublishCommandReaction - error.stack:', error.stack)
    return error.stack
  }
}

module.exports = {
  fnIoTMqttPublishCommand,
  fnIoTMqttPublishCommandReaction
}