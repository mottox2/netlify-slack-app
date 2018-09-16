import { WebClient } from '@slack/client'

// 書く
// slack_tokenの取得
// メッセージの取得方法

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const event = body.event
  console.log(JSON.stringify(body, null, 4))

  if (event && event.type === 'reaction_added' && event.item.type === 'message') {
    const web = new WebClient(process.env.SLACK_TOKEN)
    const result = await web.conversations.history({
      latest: event.item.ts,
      limit: 1,
      channel: event.item.channel
    })
    console.log(result)
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
