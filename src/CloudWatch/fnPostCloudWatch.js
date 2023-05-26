'use strict';

const { describeAlarms, createAlarm, describeAlarmsHistory, deployAlarms } = require('./CloudWatch')
const { getEnvVarSessionsVariables } = require('../utils/helpers')
const Joi = require('joi')

module.exports.fnPostCloudWatch = async event => {
  try {
    // ! Using POST verb to GET data. See details on README.md
    const env = await getEnvVarSessionsVariables('fnPostCloudWatch', event)
    let response  = {}
    // TODO: Evaluate request body validation [Joi] VS [Serverless(AWS)-Request Schema Validators]. See README.md

    if (env.resource === '/alarm/create') {
      console.log('🚀 resource === /alarm/create')    
      response = await createAlarm(env.jsonParsedBody ?? '')
    }  else if (env.resource === '/alarms/history/describe') {
      console.log('🚀 resource === /alarms/history/describe')    
      response = await describeAlarmsHistory(env.jsonParsedBody ?? '' )
    }  else if (env.resource === '/alarms/describe') {
      console.log('🚀 resource === /alarms/describe')    
      response = await describeAlarms(env.jsonParsedBody ?? '' )
    }  else if (env.resource === '/alarms/deploy') {
      console.log('🚀 resource === /alarms/deploy')    
      response = await deployAlarms(env.jsonParsedBody ?? '' )
    }
    console.log('🚀 response - ', response)    

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(
        {
          response: response,
        },
        null,
        2
      ),
    }
        
  } catch (error) {
      console.error('🚀 fnPostCloudWatch - error.stack:', error.stack)
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(error.stack)
      }
  } 
}