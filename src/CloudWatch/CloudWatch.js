'use strict'

const { CloudWatchClient, DescribeAlarmsCommand, DescribeInsightRulesCommand, PutMetricAlarmCommand, DescribeAlarmHistoryCommand } = require("@aws-sdk/client-cloudwatch")
const CWClient = new CloudWatchClient({ region: "us-east-1" })
console.log('🚀 CWClient - ', CWClient)

const { listTopics } = require('../SNS/SNS')

const ALARMS = require('../default_deployments/alarms.json') 

const createAlarm = async (params) => {
    try {
        console.log('🚀 START createAlarm')

        const input = {
            AlarmName : params.AlarmName,
            ComparisonOperator : params.ComparisonOperator,
            EvaluationPeriods : params.EvaluationPeriods,
            ActionsEnabled : params.ActionsEnabled ?? null,
            AlarmActions : params.AlarmActions ?? null,
            AlarmDescription : params.AlarmDescription ?? null,
            DatapointsToAlarm : params.DatapointsToAlarm ?? null,
            Dimensions : params.Dimensions ?? null,
            EvaluateLowSampleCountPercentile : params.EvaluateLowSampleCountPercentile ?? null,
            ExtendedStatistic : params.ExtendedStatistic ?? null,
            InsufficientDataActions : params.InsufficientDataActions ?? null,
            MetricName : params.MetricName ?? null,
            Metrics : params.Metrics ?? null,
            Namespace : params.Namespace ?? null,
            OKActions : params.OKActions ?? null,
            Period : params.Period ?? null,
            Statistic : params.Statistic ?? null,
            Tags : params.Tags ?? null,
            Threshold : params.Threshold ?? null,
            ThresholdMetricId : params.ThresholdMetricId ?? null,
            TreatMissingData : params.TreatMissingData ?? null,
            Unit : params.Unit ?? null,
        }

        console.log('🚀 input', input)
        
        const command = new PutMetricAlarmCommand(input);
        console.log('🚀 command', command)
        const response = await CWClient.send(command);
        console.log('🚀 response', response)

        // TODO - process the alarms here
        return response
    } catch (error) {
        console.error('🚀 createAlarm - error.stack:', error.stack)
        return error.stack
    }
}

const describeAlarms = async (params) => {
    try {
        console.log('🚀 START describeAlarms')

        const input = {
            ActionPrefix : params.ActionPrefix ?? null,
            AlarmNamePrefix : params.AlarmNamePrefix ?? null,
            AlarmNames : params.AlarmNames ?? null,
            AlarmTypes : params.AlarmTypes ?? null,
            ChildrenOfAlarmName : params.ChildrenOfAlarmName ?? null,
            MaxRecords : params.MaxRecords ?? null,
            NextToken : params.NextToken ?? null,
            ParentsOfAlarmName : params.ParentsOfAlarmName ?? null,
            StateValue : params.StateValue ?? null
        }
        console.log('🚀 input', input)
        
        const command = new DescribeAlarmsCommand(input);
        console.log('🚀 command', command)
        const response = await CWClient.send(command);
        console.log('🚀 response', response)

        // TODO - process the alarms here
        return response
    } catch (error) {
        console.error('🚀 describeAlarms - error.stack:', error.stack)
        return error.stack
    }
}

const describeAlarmsHistory = async (params) => {
    try {
        console.log('🚀 START describeAlarmsHistory')
        
        let response = []
        for (let logGroup of params.AlarmName){
            let input = {
                AlarmName : logGroup ?? null,
                AlarmTypes : params.AlarmTypes ?? null,
                StartDate : params.StartTime != null ? new Date(params.StartTime) : null,
                EndDate : params.EndTime != null ? new Date(params.EndTime) : null,
                HistoryItemType : params.HistoryItemType ?? null,
                MaxRecords : params.MaxRecords ?? null,
                NextToken : params.NextToken ?? null,
                ScanBy : params.ScanBy ?? null 
            }
            console.log('🚀 input', input)
            
            let command = new DescribeAlarmHistoryCommand(input)
            console.log('🚀 command', command)
            response.push(await CWClient.send(command))
            console.log('🚀 response', response)
            
            console.log('🚀 params.HistoryREGEX :', params.HistoryREGEX)
            if (params.HistoryREGEX != null){
                // TODO REGEX Make a search in each result object
            }
            //! It can't be used a loop to query a list of AlarmName unless all the alarms to be queried had all the same parameters AlarmTypes, HistoryItemType, ScanBy
            // TODO if the previous constraint is acepted needs to create a loop
        }

       /*
        const input = {
            AlarmName : params.AlarmName ?? null,
            AlarmTypes : params.AlarmTypes ?? null,
            StartDate : params.StartTime != null ? new Date(params.StartTime) : null,
            EndDate : params.EndTime != null ? new Date(params.EndTime) : null,
            HistoryItemType : params.HistoryItemType ?? null,
            MaxRecords : params.MaxRecords ?? null,
            NextToken : params.NextToken ?? null,
            ScanBy : params.ScanBy ?? null, 
        }
        console.log('🚀 input', input)
        console.log('🚀 typeof params.MaxRecords', params.MaxRecords)
        console.log('🚀 typeof input.MaxRecords', input.MaxRecords)
        
        
        console.log('🚀 input', input)
        const command = new DescribeAlarmHistoryCommand(input);
        console.log('🚀 command', command)
        const response = await CWClient.send(command);
        console.log('🚀 response', response)
        

        console.log('🚀 params.HistoryREGEX :', params.HistoryREGEX)
        if (params.HistoryREGEX != null){
            // TODO REGEX Make a search in each result object
        }
        */

        // TODO - process the Alarm History here
        return response
    } catch (error) {
        console.error('🚀 describeAlarmsHistory - error.stack:', error.stack)
        return error.stack
    }
}

const describeRules = async (params) => {
    try {
        console.log('🚀 START describeRules')

        const input = {
            MaxResults : params.MaxResults,
            NextToken : params.NextToken
        }
        console.log('🚀 input', input)
        
        const command = new DescribeInsightRulesCommand(input);
        console.log('🚀 command', command)
        const response = await CWClient.send(command);
        console.log('🚀 response', response)

        // TODO - process the alarms here
        return response
    } catch (error) {
        console.error('🚀 describeRules - error.stack:', error.stack)
        return error.stack
    }
}


/**
 * 
 * @param {*} params 
 * 
 * POST Payload body examples:
   {} - Empty Object
  
   Object containing AlarmActions only
   {
       "AlarmActions" : [
        "arn:aws:sns:us-east-1:851171679665:NO_ACTION_TOPIC"
        ]
    }

    Object containing SnsTopicName only
    {
       "SnsTopicName" : "SlackDispatch"
    }
 * @returns 
 */
const deployAlarms = async (params) => {
    try {
        console.log('🚀 START deployAlarms')
        
        let alarmActions = []
        
        
        console.log('🚀 params.SnsTopicName', params.SnsTopicName)
        if (params.SnsTopicName){
            console.log('🚀 params.SnsTopicName', params.SnsTopicName)
            
            const listTopicsRes = await listTopics({})
            console.log('🚀 listTopicsRes', listTopicsRes)
            let topics = listTopicsRes.Topics
            console.log('🚀 topics', topics)

            const SnsTopicName = params.SnsTopicName
            console.log('🚀 SnsTopicName', SnsTopicName)

            let res = topics.filter(it => new RegExp(SnsTopicName).test(it.TopicArn))
            console.log('🚀 res[0].TopicArn', res[0].TopicArn)
            
            alarmActions.push(res[0].TopicArn)
        } else{
            alarmActions = params.AlarmActions ?? null
        }

        console.log('🚀 alarmActions', alarmActions)
        
        console.log('🚀 ALARMS', ALARMS)
       
        for (const alarm of ALARMS){
            console.log('🚀 alarm', alarm)
            
            let input = {
                AlarmName : alarm.AlarmName,
                ComparisonOperator : alarm.ComparisonOperator,
                EvaluationPeriods : alarm.EvaluationPeriods,
                ActionsEnabled : alarm.ActionsEnabled ?? null,
                AlarmActions : alarmActions,
                AlarmDescription : alarm.AlarmDescription ?? null,
                DatapointsToAlarm : alarm.DatapointsToAlarm ?? null,
                Dimensions : alarm.Dimensions ?? null,
                EvaluateLowSampleCountPercentile : alarm.EvaluateLowSampleCountPercentile ?? null,
                ExtendedStatistic : alarm.ExtendedStatistic ?? null,
                InsufficientDataActions : alarm.InsufficientDataActions ?? null,
                MetricName : alarm.MetricName ?? null,
                Metrics : alarm.Metrics ?? null,
                Namespace : alarm.Namespace ?? null,
                OKActions : alarm.OKActions ?? null,
                Period : alarm.Period ?? null,
                Statistic : alarm.Statistic ?? null,
                Tags : alarm.Tags ?? null,
                Threshold : alarm.Threshold ?? null,
                ThresholdMetricId : alarm.ThresholdMetricId ?? null,
                TreatMissingData : alarm.TreatMissingData ?? null,
                Unit : alarm.Unit ?? null,
            }
            console.log('🚀 input', input)
            await new Promise(resolve => setTimeout(resolve, 500)) //Avoid Error - Throttling: Rate exceeded...
            let command = new PutMetricAlarmCommand(input);
            console.log('🚀 command', command)
            let response = await CWClient.send(command);
            console.log('🚀 response', response)
        }


        return "Deployed"
    } catch (error) {
        console.error('🚀 deployAlarms - error.stack:', error.stack)
        return error.stack
    }
}

module.exports = {
    describeAlarms,
    describeAlarmsHistory,
    describeRules,
    createAlarm,
    deployAlarms
}