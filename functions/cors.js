exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing URL parameter'
    };
  }

  try {
    const res = await fetch(url);
    const data = await res.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': res.headers.get('content-type') || 'text/plain'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Fetch failed: ' + err.toString()
    };
  }
};
