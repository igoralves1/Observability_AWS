'use strict'

const { CloudWatchLogsClient, StartQueryCommand, GetQueryResultsCommand, PutMetricFilterCommand, DescribeLogGroupsCommand, DescribeMetricFiltersCommand, CreateLogGroupCommand } = require("@aws-sdk/client-cloudwatch-logs")
const client = new CloudWatchLogsClient({ region: "us-east-1" })
console.log('🚀 client - ', client)

const METRICFILTERS = require('../default_deployments/metric_filters.json') 
const LOGGROUPS = require('../default_deployments/log_groups.json') 

const getAllLogs = async (params) => {
    try {
        console.log('🚀 START getAllLogs')
        console.log('🚀 params', params)
        
        const input = {
            startTime : params.startTime,
            endTime : params.endTime,
            queryString : params.queryString,
            limit : params.limit != null ? params.limit : null
        }

        // TODO: What should be the best approach? Provide to the API user a open queryString, it can query what he want to query. 
        // TODO: Or lock the queryString as "fields @timestamp, @message|sort @timestamp desc | display @timestamp, @message | filter @message like /${REGEX}/"
        // TODO: and the user simply past the desired REGEX, in this case the string "DEBUG" 


        // * A StartQuery operation must include a logGroupNames or a logGroupName parameter, but not both.
        if (params.logGroupName != null){
            input.logGroupName = params.logGroupName
        } else if(params.logGroupNames != null) {
            input.logGroupNames = params.logGroupNames
        }
        console.log('🚀 input', input)

        const commandStartQuery = new StartQueryCommand(input)
        console.log('🚀 commandStartQuery', commandStartQuery)

        const responseCommandStartQuery = await client.send(commandStartQuery)
        console.log('🚀 responseCommandStartQuery', responseCommandStartQuery)

        const dtQueryId = responseCommandStartQuery.queryId
        console.log('🚀 dtQueryId', dtQueryId)

        const jsonInput = {
            queryId: dtQueryId
        }
        console.log('🚀 jsonInput', jsonInput)

        const commandGetQueryResults = new GetQueryResultsCommand(jsonInput)
        console.log('🚀 commandGetQueryResults', commandGetQueryResults)

        let responseCommandGetQueryResults = await client.send(commandGetQueryResults)
        console.log('🚀 responseCommandGetQueryResults', responseCommandGetQueryResults)

        let counter = 0
        let awaitAwsQueryTime = params.awaitAwsQueryTime*1000
        while (responseCommandGetQueryResults.status === 'Running' || responseCommandGetQueryResults.status === 'Scheduled'){
            await new Promise(resolve => setTimeout(resolve, 1000))
            responseCommandGetQueryResults = await client.send(commandGetQueryResults)
            console.log('🚀 Sleep +1s', responseCommandGetQueryResults)
            counter++
            console.log('🚀 await time(s) =', counter)
            
            // Await time for AWS running queries.
            if(counter>awaitAwsQueryTime){
                break
            }
        }
        responseCommandGetQueryResults.awaitAwsQueryTime = counter
        console.log('🚀 responseCommandGetQueryResults =', responseCommandGetQueryResults)

        const arrCW = responseCommandGetQueryResults.results
        console.log('🚀 arrCW -', arrCW)

        let result = Array()
        if(arrCW.length>0){
            result = arrCW.map(arr => {
                const timestamp = arr.find(obj => obj.field === "@timestamp")?.value ?? "";
                const message = arr.find(obj => obj.field === "@message")?.value ?? "";
                const cwLogGroup = arr.find(obj => obj.field === "@log")?.value.split(':')[1] ?? "";
                return {cwLogGroup, timestamp, message}
            })
        }
        responseCommandGetQueryResults.results = result
        responseCommandGetQueryResults.logGroup = input.logGroupNames ?? input.logGroupName
        console.log('TEST => ', input.logGroupNames ?? input.logGroupName) 

        // TODO: Use Threshold, Period, EvaluationPeriods and link to a step function to grigg an alarm

        return responseCommandGetQueryResults

    } catch (error) {
        console.error('🚀 getAllLogs - error.stack:', error.stack)
        return error.stack
    }
}

const describeLogGroups = async (params) => {
    try {
        console.log('🚀 START describeLogGroups')

        const input = {
            limit : params.limit ?? null,
            logGroupNamePrefix : params.logGroupNamePrefix ?? null,
            nextToken : params.nextToken ?? null
        }
        console.log('🚀 input', input)

        const command = new DescribeLogGroupsCommand(input)
        console.log('🚀 command', command)

        const response = await client.send(command)
        console.log('🚀 response', response)

        return response

    } catch (error) {
        console.error('🚀 describeLogGroups - error.stack:', error.stack)
        return error.stack
    }
}

const createLogGroup = async (params) => {
    try {
        console.log('🚀 START createLogGroup')

        const input = {
            logGroupName : params.logGroupName,
            kmsKeyId : params.kmsKeyId ?? null,
            tags : params.tags ?? null
        }
        console.log('🚀 input', input)

        const command = new CreateLogGroupCommand(input)
        console.log('🚀 command', command)

        const response = await client.send(command)
        console.log('🚀 response', response)

        return response

    } catch (error) {
        console.error('🚀 createLogGroup - error.stack:', error.stack)
        return error.stack
    }
}

const deployLogGroup = async (params) => {
    try {
        console.log('🚀 START deployLogGroup')
        console.log('🚀 LOGGROUPS', LOGGROUPS)

        for (let logGroup of LOGGROUPS){
            const input = {
                logGroupName : logGroup.logGroupName,
                kmsKeyId : logGroup.kmsKeyId ?? null,
                tags : logGroup.tags ?? null
            }
            console.log('🚀 input', input)

            const command = new CreateLogGroupCommand(input)
            console.log('🚀 command', command)

            const response = await client.send(command)
            console.log('🚀 response', response)
        }

        return "Log Groups Deployed"

    } catch (error) {
        console.error('🚀 deployLogGroup - error.stack:', error.stack)
        return error.stack
    }
}

const createMetricFilter = async (params) => {
    try {
        console.log('🚀 START createMetricFilter')

        const input = {
            filterName : params.filterName,
            filterPattern : params.filterPattern,
            logGroupName : params.logGroupName,
            metricTransformations : params.metricTransformations,

        }

        console.log('🚀 input', input)

        const command = new PutMetricFilterCommand(input)
        console.log('🚀 command', command)

        const response = await client.send(command)
        console.log('🚀 response', response)

        return response

    } catch (error) {
        console.error('🚀 createMetricFilter - error.stack:', error.stack)
        return error.stack
    }
}

const describeMetricFilter = async (params) => {
    try {
        console.log('🚀 START describeMetricFilter')

        const input = {
            filterNamePrefix : params.filterNamePrefix ?? null,
            limit : params.limit ?? null,
            logGroupName : params.logGroupName ?? null,
            metricName : params.metricName ?? null,
            metricNamespace : params.metricNamespace ?? null,
            nextToken : params.nextToken ?? null
        }

        console.log('🚀 input', input)

        const command = new DescribeMetricFiltersCommand(input)
        console.log('🚀 command', command)

        const response = await client.send(command)
        console.log('🚀 response', response)

        return response

    } catch (error) {
        console.error('🚀 describeMetricFilter - error.stack:', error.stack)
        return error.stack
    }
}

const deployMetricFilters = async (params) => {
    try {
        console.log('🚀 START deployMetricFilters')

        console.log('🚀 METRICFILTERS', METRICFILTERS)
       
        for (const metricFilter of METRICFILTERS){
            console.log('🚀 metricFilter', metricFilter)
            
            let input = {
                filterName: metricFilter.filterName,
                filterPattern: metricFilter.filterPattern,
                logGroupName: metricFilter.logGroupName,
                metricTransformations: metricFilter.metricTransformations
            }
            console.log('🚀 input', input)

            const command = new PutMetricFilterCommand(input)
            console.log('🚀 command', command)

            const response = await client.send(command)
            console.log('🚀 response', response)
        }

        return "Metric Filters Deployed"

    } catch (error) {
        console.error('🚀 deployMetricFilters - error.stack:', error.stack)
        return error.stack
    }
}

module.exports = {
    getAllLogs,
    describeLogGroups,
    createLogGroup,
    deployLogGroup,
    createMetricFilter,
    describeMetricFilter,
    deployMetricFilters
}