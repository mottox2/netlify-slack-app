exports.handler = function(event, context, callback) {
  const response = {
    "text": "It's 80 degrees right now.",
    "attachments": [
      {
        "text":"Partly cloudy today and tomorrow"
      }
    ]
  }

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response)
  })
}
