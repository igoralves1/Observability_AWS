'use strict';

const { getAllLogs } = require('./CloudWatchLogs')
const { getEnvVarSessionsVariables } = require('../utils/helpers')
const Joi = require('joi')

module.exports.fnPostCloudWatchLogs = async event => {
  try {
    const env = await getEnvVarSessionsVariables('fnPostCloudWatchLogs', event)

    // ! Using POST verb to GET data. See details on README.md
    let response = await getAllLogs(env.jsonParsedBody)
    console.log('🚀 response - ', response)    

    // This lambda will search a specific string REGEX pattern inside a log group in a list,
    // 

    return null
        
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