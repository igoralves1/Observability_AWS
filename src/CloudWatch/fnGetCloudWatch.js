'use strict';

const { describeAlarms, describeRules, describeAlarmsHistory } = require('./CloudWatch')
const { getEnvVarSessionsVariables } = require('../utils/helpers')

module.exports.fnGetCloudWatch = async event => {
  try {
    const env = await getEnvVarSessionsVariables('fnGetCloudWatch', event)
        
    let response 
    if (env.resource === '/rules') {
      console.log('🚀 resource === /rules')    
      response = await describeRules(env.queryStringParameters ?? '' )
    }
    console.log('🚀 Typeof response', typeof response)
    console.log('🚀 response - ', response)    

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(response, null, 10),
    }
        
  } catch (error) {
      console.error('🚀 fnGetCloudWatch - error.stack:', error.stack)
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