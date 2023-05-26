



### Force Alarm to state value ALARM in order to test.
[set-alarm-state](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/set-alarm-state.html)
```
aws cloudwatch set-alarm-state --alarm-name "Rules_Engine_Error_Alarm" --state-value ALARM --state-reason "testing purposes"

aws cloudwatch set-alarm-state --alarm-name "GG_Fatal_Error_Alarm" --state-value ALARM --state-reason "testing purposes"

aws cloudwatch set-alarm-state --alarm-name "GG_Sandbox_Error_Alarm" --state-value ALARM --state-reason "testing purposes"

aws cloudwatch set-alarm-state --alarm-name "Lambdas_Errors" --state-value ALARM --state-reason "testing purposes"

aws cloudwatch set-alarm-state --alarm-name "IoT_Thing_History_A_WriteThrottleEvents" --state-value ALARM --state-reason "testing purposes"
```


### Create a TestSlackDispatchAlarm using POSTMAN. Use ROOT credentoals - Option 3: Use individual values in your AWS service client: (AWS Access Key Id, AWS Secret access key, AWS session token) 
```
{
    "AlarmName" : "TestSlackDispatchAlarm",
    "AlarmActions" : ["arn:aws:sns:us-east-1:851171679665:SlackDispatch"],
    "AlarmDescription" : "This alarm will send a message to slack",
    "Namespace" : "xxx/greengrass",
    "MetricName" : "metricName_Rules_Engine_Error",
    "Statistic" : "Sum",
    "Threshold" : 1,
    "ComparisonOperator" : "GreaterThanOrEqualToThreshold",
    "Period" : 60, 
    "EvaluationPeriods" : 1
}
```

```
const data = `
    - AlarmName: ${parsedmessageStr.AlarmName}
    - AlarmDescription: ${parsedmessageStr.AlarmDescription}
    - MetricName: ${parsedmessageStr.Trigger.MetricName}
    - AWSAccountId: ${parsedmessageStr.AWSAccountId}
    - Namespace: ${parsedmessageStr.Trigger.Namespace}
    - Timestamp: ${parsedmessageStr.StateChangeTime}
    `
    const data = {
      "AlarmName" : parsedmessageStr.AlarmName,
      "AlarmDescription" : parsedmessageStr.AlarmDescription,
      "MetricName" : parsedmessageStr.Trigger.MetricName,
      "AWSAccountId" : parsedmessageStr.AWSAccountId,
      "Namespace" : parsedmessageStr.Trigger.Namespace,
      "Timestamp" : parsedmessageStr.StateChangeTime
    }
    const data = JSON.stringify(slackResp)

```


```
{
        "fallback": "Plain-text summary of the attachment.",
        "color": "#960000",
        "pretext": "Optional text that appears above the attachment block",
        "author_name": "Bobby Tables",
        "author_link": "http://flickr.com/bobby/",
        "author_icon": "http://flickr.com/icons/bobby.jpg",
        "title": "Slack API Documentation",
        "title_link": "https://api.slack.com/",
        "text": data,
        "fields": [
            {
                "title": "Priority",
                "value": "High",
                "short": false
            }
        ],
        "image_url": "http://my-website.com/path/to/image.jpg",
        "thumb_url": "http://example.com/path/to/thumb.png",
        "footer": "Slack API",
        "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        "ts": 123456789
    }
```

### References
- [Building attachments](https://api.slack.com/messaging/composing/layouts#building-attachments)