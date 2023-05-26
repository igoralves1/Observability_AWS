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

### CloudWatchLogs SDK V3
- [@aws-sdk/client-cloudwatch-logs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/index.html)
    - [Class StartQueryCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/startquerycommand.html)
    - [Class GetQueryResultsCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/getqueryresultscommand.html)
    - [Class PutMetricFilterCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/putmetricfiltercommand.html)
    - [Class DescribeMetricFiltersCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/describemetricfilterscommand.html)

### AWS CLI
- [Logs CLI](https://docs.aws.amazon.com/cli/latest/reference/logs/index.html#cli-aws-logs)
    - [start-query](https://docs.aws.amazon.com/cli/latest/reference/logs/start-query.html)
        ```
            $aws logs start-query --

            {
                
            }
        ```

    - [put-metric-filter](https://docs.aws.amazon.com/cli/latest/reference/logs/put-metric-filter.html)
        ```
        CODE NOT TESTED YET
            $aws logs put-metric-filter \
                --log-group-name MyApp/access.log \
                --filter-name EventCount \
                --filter-pattern " " \
                --metric-transformations \
                metricName=MyAppEventCount,metricNamespace=MyNamespace,metricValue=1,defaultValue=0
        ```
    - [describe-metric-filters](https://docs.amazonaws.cn/en_us/AmazonCloudWatch/latest/logs/ListingMetricFilters.html)
        ```
        CODE NOT TESTED YET
            $aws logs describe-metric-filters \
                [--log-group-name <value>]
                [--filter-name-prefix <value>]
                [--metric-name <value>]
                [--metric-namespace <value>]
                [--cli-input-json <value>]
                [--starting-token <value>]
                [--page-size <value>]
                [--max-items <value>]
                [--generate-cli-skeleton <value>]
                [--debug]
                [--endpoint-url <value>]
                [--no-verify-ssl]
                [--no-paginate]
                [--output <value>]
                [--query <value>]
                [--profile <value>]
                [--region <value>]
                [--version <value>]
                [--color <value>]
                [--no-sign-request]
                [--ca-bundle <value>]
                [--cli-read-timeout <value>]
                [--cli-connect-timeout <value>]
        ```
### SDK V2 

- [putMetricFilter](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatchLogs.html#putMetricFilter-property)
    ```
    CODE NOT TESTED YET
        {
            filterName: 'STRING_VALUE', /* required */
            filterPattern: 'STRING_VALUE', /* required */
            logGroupName: 'STRING_VALUE', /* required */
            metricTransformations: [ /* required */
                {
                metricName: 'STRING_VALUE', /* required */
                metricNamespace: 'STRING_VALUE', /* required */
                metricValue: 'STRING_VALUE', /* required */
                defaultValue: 'NUMBER_VALUE',
                dimensions: {
                    '<DimensionsKey>': 'STRING_VALUE',
                    /* '<DimensionsKey>': ... */
                },
                unit: Seconds | Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes | Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second | Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second | Gigabits/Second | Terabits/Second | Count/Second | None
                },
                /* more items */
            ]
        }

    Functional JSON

        {
            "filterName": "IoT_API_Auth_Frontend_ERROR",
            "filterPattern": "ERROR",
            "logGroupName": "/aws/lambda/IoT_API_Auth_Frontend",
            "metricTransformations": [
                {
                    "metricName": "metricNameTest_IoT_API_Auth_Frontend_ERROR",
                    "metricNamespace": "xxx/metricNamespaceTest",
                    "metricValue": "1",
                    "defaultValue": null,
                    "unit": "Count"
                }
            ]
        }

    ```

# References
- [Timestamp Converter](http://www.timestamp-converter.com/)
- [Epoch Time Converter](https://www.epochconverter.com/)
- [ISSUE](https://github.com/aws/aws-sdk-js-v3/issues/4080#issuecomment-1289718758)   
- [Creating metric filters - Count log events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html)     

# Notes:
>`fnPostCloudWatchLogs`:   
    - This is a GET operation but we need to use POST because GET requests cannot contain a request body on CloudFront. [Link](https://stackoverflow.com/questions/53786936/aws-get-request-with-body-rejected-by-cloudfront) .  
    - Queries time out after 15 minutes of execution. If your queries are timing out, reduce the time range being searched or partition your query into a number of queries. [Link](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/startquerycommand.html) .  


- [Request Schema Validators](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#request-schema-validators)
- [JSON Schema is a vocabulary that allows you to annotate and validate JSON documents](https://json-schema.org/)
- [serverless framework request validator schema: How to not accept those object key and value pair that is not included in json schema?](https://stackoverflow.com/questions/73753975/serverless-framework-request-validator-schema-how-to-not-accept-those-object-ke)
- [Working with models and mapping templates](https://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html)
- [Joy Validator](https://joi.dev/api/?v=17.7.0#alternatives)



- Some queryString values to be used in `fnPostCloudWatchLogs /logs`:
    - Request body example
    ```json
        {
            "startTime": 1666706400,
            "endTime": 1669059289,
            "logGroupNames": ["/aws/lambda/IoT_API_Auth_Frontend"],
            "queryString": "fields @log, @timestamp, @message|sort @timestamp desc | display @log, @timestamp, @message | filter @message like /ERROR/",
            "awaitAwsQueryTime": null,
            "limit": null
        }

        Exaples of queryString:
        
        "queryString" : "fields @log, @timestamp, @message| sort @timestamp desc"
        "queryString" : "fields @log, @timestamp, @message | filter @message like /ERROR/"
        "queryString" : "fields @log, @timestamp, @message | filter @message like /DEBUG/"
        "queryString" : "fields @log, @timestamp, @message|sort @timestamp desc | filter @message like /DEBUG/",
        "queryString": "fields @log, @timestamp, @message|sort @timestamp desc | filter @message like /auth\\/frontend\\/check/",

    ```

    
    Response exs:
    ```
        {
            "response": {
                "$metadata": {
                    "httpStatusCode": 200,
                    "requestId": "asd8A-720b-44d0-9c14-0669f983943c",
                    "attempts": 1,
                    "totalRetryDelay": 0
                },
                "results": [
                    [
                        {
                            "field": "@timestamp",
                            "value": "2022-11-09 17:49:04.364"
                        },
                        {
                            "field": "@message",
                            "value": "2022-11-09T17:49:04.363Z\tundefined\tERROR\tUncaught Exception \t{\"errorType\":\"Runtime.UserCodeSyntaxError\",\"errorMessage\":\"SyntaxError: Unexpected identifier\",\"stack\":[\"Runtime.UserCodeSyntaxError: SyntaxError: Unexpected identifier\",\"    at _loadUserApp (file:///var/runtime/index.mjs:948:17)\",\"    at async Object.UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:976:21)\",\"    at async start (file:///var/runtime/index.mjs:1137:23)\",\"    at async file:///var/runtime/index.mjs:1143:1\"]}\n"
                        },
                        {
                            "field": "@ptr",
                            "value": "Cm0KMgouODUxMTcxNjc5NjY1Oi9hd3MvbGFtYmRhL2ZuUHVibGlzaE1RVFRDcm9uLWRldhAFEjUaGAIGM14XSQAAAACMnNZ4AAY2voBQAAAHkiABKOz/iezFMDCwno3sxTA4CkC4D0iTF1CJDxgAEAAYAQ=="
                        }
                    ],
                    [
                        {
                            "field": "@timestamp",
                            "value": "2022-11-09 17:49:02.344"
                        },
                        {
                            "field": "@message",
                            "value": "2022-11-09T17:49:02.344Z\tundefined\tERROR\tUncaught Exception \t{\"errorType\":\"Runtime.UserCodeSyntaxError\",\"errorMessage\":\"SyntaxError: Unexpected identifier\",\"stack\":[\"Runtime.UserCodeSyntaxError: SyntaxError: Unexpected identifier\",\"    at _loadUserApp (file:///var/runtime/index.mjs:948:17)\",\"    at async Object.UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:976:21)\",\"    at async start (file:///var/runtime/index.mjs:1137:23)\",\"    at async file:///var/runtime/index.mjs:1143:1\"]}\n"
                        },
                        {
                            "field": "@ptr",
                            "value": "Cm0KMgouODUxMTcxNjc5NjY1Oi9hd3MvbGFtYmRhL2ZuUHVibGlzaE1RVFRDcm9uLWRldhADEjUaGAIGKP6KeQAAAAGA5OilAAY2vn/QAAACkiABKIjwiezFMDCI8InsxTA4AUCXBEinDlDZCBgAEAAYAQ=="
                        }
                    ]
                ],
                "statistics": {
                    "bytesScanned": 345417,
                    "recordsMatched": 383,
                    "recordsScanned": 1620
                },
                "status": "Complete",
                "awaitAwsQueryTime": 3
            }
        }
    ```

[3 ways to send custom metrics to AWS Cloudwatch](https://datachef.co/blog/3-ways-send-custom-metrics-aws/)
[METRIC FILTERS](https://mng.workshop.aws/operations-2022/respond/metricfilter.html)
[]()


## const getAllLogs = async (params)
CloudFormation queryString:
```
"queryString": "fields @log, @timestamp, @message|sort @timestamp desc | display @log, @timestamp, @message | filter @message like /ERROR/" 
```

It will get a CloudWatch response likethis:
```
[
    [
        { field: '@timestamp', value: '2022-10-25 15:30:36.685' },
        { field: '@message', value: 'message1' },
        { field: '@ptr', value: 'aaaa' },
        { field: '@log', value: '123456:/aws/lambda/IoT_Device_Heart_Beat_Monitor' },

    ],
    [
        { field: '@timestamp', value: '2022-10-25 15:30:36.685' },
        { field: '@message', value: 'message2' },
        { field: '@ptr', value: 'bbbb' },
        { field: '@log', value: '123456:/aws/lambda/IoT_Device_Heart_Beat_Monitor2' },

    ],
    [
        { field: '@timestamp', value: '2022-10-25 14:30:36.685' },
        { field: '@message', value: 'message3' },
        { field: '@ptr', value: 'cccc' },
        { field: '@log', value: '123456:/aws/lambda/IoT_Device_Heart_Beat_Monitor3' },

    ],
]
```
That will be converted to the following as a return:
```
[ 
    { 
        cwLogGroup: '/aws/lambda/IoT_Device_Heart_Beat_Monitor',
        timestamp: '2022-10-25 15:30:36.685',
        message: 'message1' 
    },
    { 
        cwLogGroup: '/aws/lambda/IoT_Device_Heart_Beat_Monitor2',
        timestamp: '2022-10-25 15:30:36.685',
        message: 'message2' 
    },
    {   cwLogGroup: '/aws/lambda/IoT_Device_Heart_Beat_Monitor3',
        timestamp: '2022-10-25 14:30:36.685',
        message: 'message3' 
    } 
]
```


## https://api.xxx-xxx.io/<domainName>/observability/metric-filter/create
```
{
    "filterName": "IoT_API_Auth_Frontend_ERROR",
    "filterPattern": "ERROR",
    "logGroupName": "/aws/lambda/IoT_API_Auth_Frontend",
    "metricTransformations": [
        {
            "metricName": "metricNameTest_IoT_API_Auth_Frontend_ERROR",
            "metricNamespace": "xxx/metricNamespaceTest",
            "metricValue": "1",
            "defaultValue": null,
            "unit": "Count"
        }
    ]
}
```

## https://api.xxx-xxx.io/<domainName>/observability/log-group/create
```
{
    "logGroupName" : "/aws/greengrass/GreengrassSystemComponent/us-east-1/System",
    "kmsKeyId" : null,
    "tags" : null
}
```