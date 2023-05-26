'use strict';

const { createTopic, subscribeTopic } = require('./SNS')
const { getEnvVarSessionsVariables } = require('../utils/helpers')

module.exports.fnPostSNS = async event => {
  try {
    const env = await getEnvVarSessionsVariables('fnPostSNS', event)
        
    
    let response 
    if (env.resource === '/topic/create') {
      console.log('🚀 resource === /topic/create')    
      response = await createTopic(env.jsonParsedBody ?? '')
    } else if (env.resource === '/topic/subscribe') {
      console.log('🚀 resource === /topic/subscribe')    
      response = await subscribeTopic(env.jsonParsedBody ?? '')
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
      console.error('🚀 fnPostSNS - error.stack:', error.stack)
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