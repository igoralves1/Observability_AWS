'use strict';

const { getAllLogs } = require('./CloudWatchLogs')
const { getEnvVarSessionsVariables } = require('../utils/helpers')

module.exports.fnGetCloudWatchLogs = async event => {
  try {
    const env = await getEnvVarSessionsVariables('fnGetCloudWatchLogs', event)

    let response 
    if (env.resource === '/logs') {
      console.log('🚀 resource === /logs')
      response = await getAllLogs(env.queryStringParameters)
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
      console.error('🚀 fnGetCloudWatchLogs - error.stack:', error.stack)
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