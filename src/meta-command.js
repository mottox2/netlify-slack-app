import scrape from 'mini-scrape'

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)

  const response = {
    "text": "OK",
  }

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response)
  })
}
