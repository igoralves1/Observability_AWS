'use strict';

const { getAllLogs, describeLogGroups, createMetricFilter, describeMetricFilter, deployMetricFilters, createLogGroup, deployLogGroup  } = require('./CloudWatchLogs')
const { getEnvVarSessionsVariables } = require('../utils/helpers')
const Joi = require('joi')

module.exports.fnPostCloudWatchLogs = async event => {
  try {
    // ! Using POST verb to GET data. See details on README.md
    const env = await getEnvVarSessionsVariables('fnPostCloudWatchLogs', event)
    let response = {}
    // TODO: Evaluate request body validation [Joi] VS [Serverless(AWS)-Request Schema Validators]. See README.md
    
    if (env.resource === '/logs/describe') {
      response = await getAllLogs(env.jsonParsedBody)
    } else if (env.resource === '/log-groups/describe') {
      response = await describeLogGroups(env.jsonParsedBody)
    } else if (env.resource === '/log-group/create') {
      response = await createLogGroup(env.jsonParsedBody)
    } else if (env.resource === '/log-groups/deploy') {
      response = await deployLogGroup(env.jsonParsedBody)
    } else if (env.resource === '/metric-filter/create') {
      response = await createMetricFilter(env.jsonParsedBody)
    } else if (env.resource === '/metric-filter/describe') {
      response = await describeMetricFilter(env.jsonParsedBody)
    } else if (env.resource === '/metric-filter/deploy') {
      response = await deployMetricFilters(env.jsonParsedBody)
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
      console.error('🚀 fnPostCloudWatchLogs - error.stack:', error.stack)
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