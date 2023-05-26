# SNS SDK V3
- [@aws-sdk/client-sns](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/)
    - [Class CreateTopicCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/classes/createtopiccommand.html)
    - [Class SubscribeCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/classes/subscribecommand.html)
- [@aws-sdk/sdkclient-sts](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sts/index.html#aws-sdkclient-sts)

### AWS CLI

- [create-topic](https://docs.aws.amazon.com/cli/latest/reference/sns/create-topic.html)
    
    - Command line create topic
        ```bash
            $aws sns create-topic \
                --name "API_Test_IoT_Thing_History_A_WriteThrottleEvents"\
                --attributes DisplayName="IoT_Thing_History_A_WriteThrottleEvents"

        ```

    - This topic has no action. Endpoint: `/observability/topic/create`

        ```json
            {
                "Name" : "NO_ACTION_TOPIC",
                "Attributes" : null,
                "DataProtectionPolicy" : null,
                "Tags" : null
            }
        ```

- [subscribe](https://docs.aws.amazon.com/cli/latest/reference/sns/subscribe.html)
    ```
        $aws sns subscribe \
            --topic-arn arn:aws:sns:us-east-1:851171679665:API_Test_IoT_Thing_History_A_WriteThrottleEvents \
            --protocol email 
            --notification-endpoint igor.alves@xxx-xxx.com 

        Note: "SubscriptionArn": "pending confirmation"


        {
            "Name" : "NO_ACTION_TOPIC",
            "Attributes" : null,
            "DataProtectionPolicy" : null,
            "Tags" : null
        }

    ```