import { WebClient } from '@slack/client'

// 書く
// slack_tokenの取得
// メッセージの取得方法

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && slackEvent.type === 'reaction_added' && slackEvent.item.type === 'message') {
    const web = new WebClient(process.env.SLACK_TOKEN)
    const result = await web.conversations.history({
      latest: slackEvent.item.ts,
      limit: 1,
      channel: slackEvent.item.channel
    })
    console.log(result)
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
