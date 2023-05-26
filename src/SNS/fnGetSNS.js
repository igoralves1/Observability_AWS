'use strict';

const { listTopics } = require('./SNS')
const { getEnvVarSessionsVariables } = require('../utils/helpers')

module.exports.fnGetSNS = async event => {
  try {
    const env = await getEnvVarSessionsVariables('fnGetSNS', event)
        
    let response 
    if (env.resource === '/topics') {
      console.log('🚀 resource === /topics')    
      response = await listTopics(env.queryStringParameters ?? '')
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
      console.error('🚀 fnGetSNS - error.stack:', error.stack)
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