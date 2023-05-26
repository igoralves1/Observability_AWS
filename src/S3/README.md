
iot/things/123/message/aggregate
{"metadata":{"sendAlert": true}}



iot_things_externalKey_message_aggregate_retry/555/1683133970273.json

SELECT *, topic() AS topic FROM 'iot/things/+/message/aggregate' WHERE metadata.sendAlert = true

IoT_Foward_Alert
fnDLQIoTFowardAlertS3Insert


1683142284704.json
1683142290517.json
1683142298081.json

fnPostDLQIoTFowardAlertS3RetryMQTT
