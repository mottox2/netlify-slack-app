import { WebClient } from '@slack/client'

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && slackEvent.type === 'channel_created') {
    const web = new WebClient(process.env.SLACK_TOKEN)
    await web.chat.postMessage({
      channel: 'slack_test',
      text: `channel_added: <#${slackEvent.channel.id}>`,
    })
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}