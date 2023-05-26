'use strict';

const { fnIoTMqttPublishCommandReaction } = require('./IotDataPlane')

module.exports.fnMqttPublishCommandReaction = async event => {
    try {
        console.log('🚀 START fnMqttPublishCommandReaction')
        
        const resp =  await fnIoTMqttPublishCommandReaction('')
        console.log('🚀 resp', resp)

        return null
    } catch (error) {
        console.log('🚀 fnMqttPublishCommandReaction - error.stack:', error.stack)
        return null
    } 
};