'use strict'

const { SNSClient, CreateTopicCommand, SubscribeCommand, ListTopicsCommand } = require("@aws-sdk/client-sns")
const SNSClienT = new SNSClient({ region: "us-east-1" })
console.log('🚀 SNSClienT - ', SNSClienT)

const createTopic = async (params) => {
    try {
        console.log('🚀 START createTopic')

        const input = {
            Name : params.Name ?? null,
            Attributes : params.Attributes ?? null,
            DataProtectionPolicy : params.DataProtectionPolicy ?? null,
            Tags : params.Tags ?? null
        }
        console.log('🚀 input', input)
        
        const command = new CreateTopicCommand(input);
        console.log('🚀 command', command)
        const response = await SNSClienT.send(command);
        console.log('🚀 response', response)

        // TODO - process the alcreateTopicarms here
        return response
    } catch (error) {
        console.error('🚀 createTopic - error.stack:', error.stack)
        return error.stack
    }
}

const subscribeTopic = async (params) => {
    try {
        console.log('🚀 START subscribeTopic')

        const input = {
            Protocol : params.Protocol,
            TopicArn : params.TopicArn,
            Attributes : params.Attributes,
            Endpoint : params.Endpoint,
            ReturnSubscriptionArn : params.ReturnSubscriptionArn
        }
        console.log('🚀 input', input)
        
        const command = new SubscribeCommand(input);
        console.log('🚀 command', command)
        const response = await SNSClienT.send(command);
        console.log('🚀 response', response)

        // TODO - process the alcreateTopicarms here
        return response
    } catch (error) {
        console.error('🚀 subscribeTopic - error.stack:', error.stack)
        return error.stack
    }
}

const listTopics = async (params) => {
    try {
        console.log('🚀 START listTopics')

        const input = {
            NextToken : params.NextToken ?? null
        }
        console.log('🚀 input', input)
        
        const command = new ListTopicsCommand(input);
        console.log('🚀 command', command)
        const response = await SNSClienT.send(command);
        console.log('🚀 response', response)

        // TODO - process the listTopics here
        return response
    } catch (error) {
        console.error('🚀 listTopics - error.stack:', error.stack)
        return error.stack
    }
}


module.exports = {
    createTopic,
    subscribeTopic,
    listTopics
}