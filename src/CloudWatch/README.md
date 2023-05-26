[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<p align="center">
  <a href="https://xxx-xxx.com/">
    <img src="https://xxx-xxx.com/wp-content/uploads/2022/02/xxx_LOGO_FULL_light-bg-120x47.png" alt="Logo" width="200" height="78">
  </a>

  <h3 align="center">xxx Data Operations Observability-API | YAML Repo</h3>

  <p align="center">
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gitlab.com/xxx-xxx/connect/operations/observability-api">View Repository</a>
    ·
    <a href="https://xxx-xxx-apis.postman.co/workspace/AWS_Account_Management~e7b4d126-2d92-432f-8253-1873502ce950/collection/23742319-751e1b9f-2c5b-47b0-8897-3020384a5bde?ctx=documentation">View API in POSTMAN</a>
    ·
    <a href="">Report Bug</a>
    ·
    <a href="">Request Feature</a>
    ·
    <a href="">JIRA Ticket</a>
  </p>
</p>
<br />
<br />
<br />


# CloudWatch SDK V3

- [@aws-sdk/client-cloudwatch](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/index.html)
    - [Class PutMetricAlarmCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/classes/putmetricalarmcommand.html)
        - createAlarm = async (params):
            - *AlarmName : <string | undefined>* 
                The name for the alarm. This name must be unique within the Region,
            - *ComparisonOperator : <ComparisonOperator | string | undefined>*
                The arithmetic operation to use when comparing the specified statistic and threshold. The specified statistic value is used as the first operand. The values LessThanLowerOrGreaterThanUpperThreshold, LessThanLowerThreshold, and GreaterThanUpperThreshold are used only for alarms based on anomaly detection models.
            - *EvaluationPeriods : <number | undefined>*
                The number of periods over which data is compared to the specified threshold.
            - *ActionsEnabled <undefined | false | true>*
                Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.
            - *AlarmActions : <string[ ]>*
                The actions to execute when this alarm transitions to the ALARM state from any other state. Each action is specified as an Amazon Resource Name (ARN).
            - *AlarmDescription : <>*
            - *DatapointsToAlarm : <>*
            - *Dimensions : <>*
            - *EvaluateLowSampleCountPercentile : <>*
            - *ExtendedStatistic : <>*
            - *InsufficientDataActions : <>*
            - *MetricName : <>*
            - *Metrics : <>*
            - *Namespace : <>*
            - *OKActions : <>*
            - *Period : <>*
            - *Statistic : <>*
            - *Tags : <>*
            - *Threshold : <>*
            - *ThresholdMetricId : <>*
            - *TreatMissingData : <>*
            - *Unit : <>*
            
    - [Class DescribeAlarmsCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/classes/describealarmscommand.html)
        - Filters (ALL OPTIONALS) : Retrieves the specified alarms. You can filter the results by specifying a prefix for the alarm name, the alarm state, or a prefix for any action.
            - ActionPrefix
            - AlarmNamePrefix
            - AlarmNames
            - AlarmTypes
            - ChildrenOfAlarmName
            - MaxRecords
            - NextToken
            - ParentsOfAlarmName
            - StateValue
             
    - [Class DescribeAlarmHistoryCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/classes/describealarmhistorycommand.html)

        - Filters (ALL OPTIONALS) :
            - *AlarmName* : The name of the alarm.
            - *AlarmTypes* : `MetricAlarm` | `StateUpdate` | `Action` - Use this parameter to specify whether you want the operation to return metric alarms or composite alarms. If you omit this parameter, only metric alarms are returned. When `StateUpdate` the `HistorySummary` will be from `OK to ALARM` or `from ALARM to OK` or a combination with `INSUFFICIENT_DATA`.
            - *StartDate* : `MM-DD-YYYY hh:mm:ss` | `YYYY-MM-DD hh:mm:ss` | `2022-10-27T15:12:11.932Z`.The starting date to retrieve alarm history. Ex: `2022-10-27T15:12:11.932Z` OR `2022-10-27 10:10:10` OR `10-27-2022 10:10:10`.
            - *EndDate* : `MM-DD-YYYY hh:mm:ss` | `YYYY-MM-DD hh:mm:ss` | `2022-10-27T15:12:11.932Z`. The ending date to retrieve alarm history. Ex: `2022-10-27T15:12:11.932Z` OR `2022-10-27 10:10:10` OR `10-27-2022 10:10:10`.
            - *HistoryItemType* : `ConfigurationUpdate` | `StateUpdate` | `Action`. The type of alarm histories to retrieve. 
            - *MaxRecords* : The maximum number of alarm history records to retrieve.
            - *NextToken* : The token returned by a previous call to indicate that there is more data available.
            - *ScanBy* : `TimestampDescending` | `TimestampAscending`. Specified whether to return the newest or oldest alarm history first. Specify TimestampDescending to have the newest event history returned first, and specify TimestampAscending to have the oldest history returned first.
            - *HistorySummary* : `REGEX` pattern to filter the Alarm history. Ex: `ALARM to OK` OR `OK to ALARM` OR `INSUFFICIENT_DATA to ALARM` OR `any other pattern`. This is not an AWS attribute.

        - Output:
        ```
            "$metadata": {
                "httpStatusCode": 200,
                "requestId": "da8b44c1-17dc-4df8-95cc-5586ab804596",
                "attempts": 1,
                "totalRetryDelay": 0
            }
            "AlarmHistoryItems": [
                {
                    "AlarmName": "API_My_IoT_Thing_History_A_WriteThrottleEvents",
                    "AlarmType": "MetricAlarm",
                    "Timestamp": "2022-11-02T15:55:30.960Z",
                    "HistoryItemType": "ConfigurationUpdate",
                    "HistorySummary": "Alarm \"API_My_IoT_Thing_History_A_WriteThrottleEvents\" created",
                    "HistoryData": "{\"version\":\"1.0\",\"type\":\"Create\",\"createdAlarm\":{\"alarmName\":\"API_My_IoT_Thing_History_A_WriteThrottleEvents\",\"alarmDescription\":\"API Alarm cretion Test\",\"alarmArn\":\"arn:aws:cloudwatch:us-east-1:851171679665:alarm:API_My_IoT_Thing_History_A_WriteThrottleEvents\",\"alarmConfigurationUpdatedTimestamp\":\"2022-11-02T15:55:30.959+0000\",\"namespace\":\"AWS/DynamoDB\",\"metricName\":\"WriteThrottleEvents\",\"statistic\":\"Sum\",\"period\":60,\"dimensions\":[{\"value\":\"PutItem\",\"name\":\"Operation\"},{\"value\":\"IoT_Thing_History_A\",\"name\":\"TableName\"}],\"threshold\":1.0,\"comparisonOperator\":\"GreaterThanOrEqualToThreshold\",\"evaluationPeriods\":1,\"stateValue\":\"INSUFFICIENT_DATA\",\"stateUpdatedTimestamp\":\"2022-11-02T15:55:30.959+0000\",\"actionsEnabled\":true,\"alarmActions\":[\"arn:aws:sns:us-east-1:851171679665:My_IoT_Thing_History_A_WriteThrottleEvents\"],\"insufficientDataActions\":[],\"okactions\":[]}}"
                },
            ]  
        ```
    - [Class DescribeInsightRulesCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/classes/describeinsightrulescommand.html)

### AWS CLI

- [Cloudwatch CLI](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/index.html#cli-aws-cloudwatch)
    - [describe-insight-rules](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/describe-insight-rules.html)
        ```
            $aws cloudwatch describe-insight-rules

            Output
            {
                "InsightRules": []
            }
        ```

    - [describe-alarms](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/describe-alarms.html)
        ```
            $aws cloudwatch describe-alarms

            Output
            {
                "MetricAlarms": [
                    {
                        "AlarmName": "My_IoT_Thing_History_A_WriteThrottleEvents",
                        "AlarmArn": "arn:aws:cloudwatch:us-east-1:851171679665:alarm:My_IoT_Thing_History_A_WriteThrottleEvents",
                        "AlarmDescription": "Number of write events which exceeded our provisioned write throughput in the selected time period, per min. Alarm when WriteThrottleEvents is greater than 1. These metrics should always be equal to zero.",
                        "AlarmConfigurationUpdatedTimestamp": "2022-11-01T18:34:27.272000+00:00",
                        "ActionsEnabled": true,
                        "OKActions": [],
                        "AlarmActions": [
                            "arn:aws:sns:us-east-1:851171679665:My_IoT_Thing_History_A_WriteThrottleEvents"
                        ],
                        "InsufficientDataActions": [],
                        "StateValue": "OK",
                        "StateReason": "initializing",
                        "StateUpdatedTimestamp": "2022-11-01T18:39:28.381000+00:00",
                        "MetricName": "WriteThrottleEvents",
                        "Namespace": "AWS/DynamoDB",
                        "Statistic": "Sum",
                        "Dimensions": [
                            {
                                "Name": "TableName",
                                "Value": "IoT_Thing_History_A"
                            },
                            {
                                "Name": "Operation",
                                "Value": "PutItem"
                            }
                        ],
                        "Period": 60,
                        "EvaluationPeriods": 1,
                        "Threshold": 1.0,
                        "ComparisonOperator": "GreaterThanOrEqualToThreshold"
                    },
                    ...
                ]
            }    

        ```
    

    - [describe-alarm-history](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/describe-alarm-history.html)

        Ex:

        ```
            $aws cloudwatch describe-alarm-history \
                --alarm-name 
                --start-date
                --end-date
                --no-paginate
                --scan-by TimestampDescending
                --debug
                --output json


            {
                "AlarmHistoryItems": [
                    {
                        "Timestamp": "2014-04-09T18:59:06.442Z",
                        "HistoryItemType": "StateUpdate",
                        "AlarmName": "myalarm",
                        "HistoryData": "{\"version\":\"1.0\",\"oldState\":{\"stateValue\":\"ALARM\",\"stateReason\":\"testing purposes\"},\"newState\":{\"stateValue\":\"OK\",\"stateReason\":\"Threshold Crossed: 2 datapoints were not greater than the threshold (70.0). The most recent datapoints: [38.958, 40.292].\",\"stateReasonData\":{\"version\":\"1.0\",\"queryDate\":\"2014-04-09T18:59:06.419+0000\",\"startDate\":\"2014-04-09T18:44:00.000+0000\",\"statistic\":\"Average\",\"period\":300,\"recentDatapoints\":[38.958,40.292],\"threshold\":70.0}}}",
                        "HistorySummary": "Alarm updated from ALARM to OK"
                    },
                    {
                        "Timestamp": "2014-04-09T18:59:05.805Z",
                        "HistoryItemType": "StateUpdate",
                        "AlarmName": "myalarm",
                        "HistoryData": "{\"version\":\"1.0\",\"oldState\":{\"stateValue\":\"OK\",\"stateReason\":\"Threshold Crossed: 2 datapoints were not greater than the threshold (70.0). The most recent datapoints: [38.839999999999996, 39.714].\",\"stateReasonData\":{\"version\":\"1.0\",\"queryDate\":\"2014-03-11T22:45:41.569+0000\",\"startDate\":\"2014-03-11T22:30:00.000+0000\",\"statistic\":\"Average\",\"period\":300,\"recentDatapoints\":[38.83996,39.714],\"threshold\":70.0}},\"newState\":{\"stateValue\":\"ALARM\",\"stateReason\":\"testing purposes\"}}",
                        "HistorySummary": "Alarm updated from OK to ALARM"
                    }
                ]
            }



        ```



    - [put-metric-alarm](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-metric-alarm.html)
        > Note: Before to create an Alarm, need to create a topic using the SNS class. The topic is needed to assign to `--alarm-actions` parameter during the following step (command).

        ```
            $aws cloudwatch put-metric-alarm \
                --alarm-name IoT_Thing_History_A_WriteThrottleEvents \
                --alarm-description "Number of write events which exceeded our provisioned write throughput in the selected time period, per min. Alarm when WriteThrottleEvents is greater than 1. These metrics should always be equal to zero." \
                --namespace AWS/DynamoDB \
                --metric-name WriteThrottleEvents \
                --dimensions Name=TableName,Value="IoT_Thing_History_A" Name=Operation,Value="PutItem"\
                --statistic Sum \
                --threshold 1 \
                --comparison-operator GreaterThanOrEqualToThreshold \
                --period 60 \
                --evaluation-periods 1 \
                --alarm-actions arn:aws:sns:us-east-1:475073686398:IoT_Thing_History_A_WriteThrottleEvents 

            TEST - Set the Alarm to `--state-value OK` and then to `--state-value ALARM` 

            $aws cloudwatch set-alarm-state --alarm-name IoT_Thing_History_A_WriteThrottleEvents --state-reason "initializing" --state-value OK
            $aws cloudwatch set-alarm-state --alarm-name IoT_Thing_History_A_WriteThrottleEvents --state-reason "initializing" --state-value ALARM
        ```

### AWS CloudFormation Reference
  - [AWS::CloudWatch::Alarm](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-alarm.html)
  - [cloudwatch Alarm actions with multiple SNS topics usind cloudformation](https://stackoverflow.com/questions/36440088/cloudwatch-alarm-actions-with-multiple-sns-topics-usind-cloudformation)


```
    Type: AWS::CloudWatch::Alarm
    Properties: 
        ActionsEnabled: Boolean
        AlarmActions: 
            - String
        AlarmDescription: String
        AlarmName: String
        ComparisonOperator: String
        DatapointsToAlarm: Integer
        Dimensions: 
            - Dimension
        EvaluateLowSampleCountPercentile: String
        EvaluationPeriods: Integer
        ExtendedStatistic: String
        InsufficientDataActions: 
            - String
        MetricName: String
        Metrics: 
            - MetricDataQuery
        Namespace: String
        OKActions: 
            - String
        Period: Integer
        Statistic: String
        Threshold: Double
        ThresholdMetricId: String
        TreatMissingData: String
        Unit: String


    CloudFormation
        CloudWatchAlarm:
            Type: AWS::CloudWatch::Alarm
            Properties:
            AlarmActions:
                - !Ref SNSTopic
            AlarmDescription: "Number of write events which exceeded our provisioned write throughput in the selected time period (per min). Alarm when WriteThrottleEvents is greater than 1. These metrics should always be equal to zero."
            Dimensions:
                -
                Name: "TableName"
                Value: "IoT_Thing_History_A"
                -
                Name=: "Operation",
                Value="PutItem"
            ComparisonOperator:  GreaterThanOrEqualToThreshold
            EvaluationPeriods: 1
            MetricName: WriteThrottleEvents
            Namespace: AWS/DynamoDB
            Period: 60
            Statistic: Sum
            Threshold: 1    
```

```BASH
#!/bin/bash
instances=(instanceId1 instanceId2 etc)
for i in "${instances[@]}"; do
    aws cloudwatch put-metric-alarm \
        --alarm-name cpu-mon-${i} \
        --alarm-description "Alarm when CPU exceeds 70 percent" \
        --metric-name CPUUtilization \
        --namespace AWS/EC2 \
        --statistic Average \
        --period 300 \
        --threshold 70 \
        --comparison-operator GreaterThanThreshold  \
        --dimensions "Name=InstanceId,Value=${i}" \
        --evaluation-periods 2 \
        --alarm-actions arn:aws:sns:us-east-1:111122223333:MyTopic \
        --unit Percent
done
```

# References
- [Using Amazon CloudWatch alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
    > - `Period` is the length of time to evaluate the metric or expression to create each individual data point for an alarm. It is expressed in seconds. If you choose one minute as the period, the alarm evaluates the metric once per minute.
    > - `Evaluation Periods` is the number of the most recent periods, or data points, to evaluate when determining alarm state. 
    > - `Datapoints to Alarm` is the number of data points within the Evaluation Periods that must be breaching to cause the alarm to go to the ALARM state. The breaching data points don't have to be consecutive, but they must all be within the last number of data points equal to Evaluation Period.

- [Serverless AWS Alerts Plugin](https://www.serverless.com/plugins/serverless-plugin-aws-alerts)
    > A Serverless plugin to easily add CloudWatch alarms to functions

- [Improved management of Amazon CloudWatch Alarms using AWS Systems Manager OpsCenter](https://aws.amazon.com/blogs/mt/improved-management-amazon-cloudwatch-alarms-using-aws-systems-manager-opscenter/)

- [Timestamp Converter](http://www.timestamp-converter.com/)
- [Epoch Time Converter](https://www.epochconverter.com/)
- [ISSUE](https://github.com/aws/aws-sdk-js-v3/issues/4080#issuecomment-1289718758)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://gitlab.com/xxx-xxx/connect/operations/observability-api/-/graphs/main

[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://gitlab.com/xxx-xxx/connect/operations/observability-api/-/issues

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/xxxdata/

### Alarms Examples
```JSON
[
  {
    "AlarmName": "Lambdas_Errors",
    "AlarmActions": [],
    "AlarmDescription": "This alarm will trigger when the blue line goes above the red line for 1 datapoints within 1 hour.",
    "Namespace": "AWS/Lambda",
    "MetricName": "Errors",
    "Statistic": "Sum",
    "Threshold": 1,
    "ComparisonOperator": "GreaterThanOrEqualToThreshold",
    "Period": 60,
    "EvaluationPeriods": 1
  },
  {
    "AlarmName": "DynamoDB_IoT_Thing_History_A_WriteThrottleEvents",
    "AlarmActions": [],
    "AlarmDescription": "Number of write events which exceeded our provisioned write throughput in the selected time period, per min. Alarm when WriteThrottleEvents is greater than 1. These metrics should always be equal to zero.",
    "Namespace": "AWS/DynamoDB",
    "MetricName": "WriteThrottleEvents",
    "Dimensions": [
      {
        "Name": "TableName",
        "Value": "IoT_Thing_History_A"
      },
      {
        "Name": "Operation",
        "Value": "PutItem"
      }
    ],
    "Statistic": "Sum",
    "Threshold": 1,
    "ComparisonOperator": "GreaterThanOrEqualToThreshold",
    "Period": 60,
    "EvaluationPeriods": 1
  },
  {
    "AlarmName" : "API2-AlarmCreationTestAllLambdas",
    "AlarmActions" : ["arn:aws:sns:us-east-1:851171679665:My_IoT_Thing_History_A_WriteThrottleEvents"],
    "AlarmDescription" : "This alarm will trigger when the blue line goes above the red line for 1 datapoints within 1 hour.",
    "Namespace" : "AWS/Lambda",
    "MetricName" : "Errors",
    "Statistic" : "Sum",
    "Threshold" : 1,
    "ComparisonOperator" : "GreaterThanOrEqualToThreshold",
    "Period" : 60,
    "EvaluationPeriods" : 1
}
]
```


## [Why is my CloudWatch alarm in INSUFFICIENT_DATA state?](https://aws.amazon.com/premiumsupport/knowledge-center/cloudwatch-alarm-insufficient-data-state/)

- [Configuring how CloudWatch alarms treat missing data](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data)



## Deploy Default