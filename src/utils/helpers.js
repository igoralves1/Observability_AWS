exports.getEnvVarSessionsVariables = async (processName, event) => {
    try {
      const INFO = {
        resource: event.resource,
        ip: event.requestContext.identity.sourceIp,
        pathParameters: event.pathParameters,
        queryStringParameters: event.queryStringParameters,
        body: event.body,
        jsonParsedBody: JSON.parse(event.body),
        httpMethod: event.httpMethod
      }
  
      console.log(`🚀 START ${processName}`)
      console.log('🚀 resource: ', INFO.resource)
      console.log('🚀 ip: ', INFO.ip)
      console.log('🚀 pathParameters: ', INFO.pathParameters)
      console.log('🚀 queryStringParameters: ', INFO.queryStringParameters)
      console.log('🚀 typeof body: ', typeof INFO.body)
      console.log('🚀 body: ', INFO.body)
      console.log('🚀 jsonParsedBody: ', INFO.jsonParsedBody)
      console.log('🚀 typeof jsonParsedBody: ', typeof INFO.jsonParsedBody)
      console.log('🚀 httpMethod: ', INFO.httpMethod)
      console.log('🚀 INFO: ', INFO)
  
      return INFO
    } catch (error) {
      console.log('🚀 getEnvVarSessionsVariables - error:', error.stack)
      return error.stack
    }
  }