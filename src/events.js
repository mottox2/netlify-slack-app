import { WebClient } from '@slack/client'
import Octokit from '@octokit/rest'

// ## 書く
// slack_tokenの取得
// メッセージの取得方法
// web.conversations APIを叩くのに必要な権限
// => https://api.slack.com/methods/conversations.history

// https://github.com/settings/tokens

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && slackEvent.type === 'reaction_added' && slackEvent.item.type === 'message') {
    const web = new WebClient(process.env.SLACK_TOKEN)
    const res = await web.conversations.history({
      latest: slackEvent.item.ts,
      limit: 1,
      channel: slackEvent.item.channel,
      inclusive: true
    })
    const message = res.messages[0]
    const octkit = new Octokit()
    octkit.authenticate({
      type: 'oauth',
      token: process.env.GITHUB_TOKEN
    })

    const content = (new Buffer('変換前の文字列')).toString('base64')

    octokit.repos.createFile({
      owner: 'mottox2',
      repo: 'netlify-slack-app',
      path: `data/${slackEvent.item.ts}.txt`,
      message: 'Added by netlify-slack-app',
      content
    })
    
    console.log(JSON.stringify(message, null, 4))
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
