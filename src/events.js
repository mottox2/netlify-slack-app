exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  console.log(JSON.stringify(body, null, 4))

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
