'use strict';

const { fnIoTMqttPublishCommand } = require('./IotDataPlane')

module.exports.fnPublishMQTTCron = async event => {
    try {
        console.log('🚀 START fnPublishMQTTCron')
        
        const resp =  await fnIoTMqttPublishCommand('')
        console.log('🚀 resp', resp)

        return null
    } catch (error) {
        console.log('🚀 fnPublishMQTTCron - error.stack:', error.stack)
        return null
    } 
};