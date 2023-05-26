'use strict';
const axios = require('axios').default

module.exports.fnSlackDispatchAlarm = async event => {
  try {
    console.log('🚀 fnSlackDispatchAlarm')   
    let records = event.Records
    let rec0 = records[0]
    console.log('🚀 rec0: ', rec0)
    let messageStr = rec0.Sns.Message
    console.log('🚀 messageStr: ', messageStr)
    
    const parsedmessageStr = JSON.parse(messageStr)
    console.log('🚀 parsedmessageStr: ', parsedmessageStr)
    //TODO connect with dynamo and get the account name. 
    const data = `
    - MetricName: ${parsedmessageStr.Trigger.MetricName}
    - AWSAccountId: ${parsedmessageStr.AWSAccountId}
    - Namespace: ${parsedmessageStr.Trigger.Namespace}
    - Timestamp: ${parsedmessageStr.StateChangeTime}
    `

    const dt = Date.now()
    
    const payload = {
      attachments: [{
        "color": "#960000",
        "pretext": "xxx-xxx Observability API - Alarms",
        "author_name": `AlarmName: ${parsedmessageStr.AlarmName}`,
        "title": `${parsedmessageStr.AlarmDescription}`,
        "text": data,
        "fields": [
            {
                "title": "Priority",
                "value": "High",
                "short": false
            }
        ],
        "footer": "xxx-xxx Observability API",
        "ts": `${dt}`
      }]
    }

    const options = {
      method: 'post',
      baseURL: 'https://hooks.slack.com/services/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',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: JSON.stringify( )
    }
    console.log('options: ',options)
    const resp = await axios.request(options)

    return resp
        
  } catch (error) {
      console.error('🚀 fnSlackDispatchAlarm - error.stack:', error.stack)
      return error.stack
  } 
}