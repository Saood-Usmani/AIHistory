export const handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      body: JSON.stringify({ error: 'Missing request body' })
    };
  }

  const { inputText } = JSON.parse(event.body);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "ft:gpt-4o-2024-08-06:personal::ANimpQKX",
        messages: [
          { role: "system", content: "You are a historical transcription tagger." },
          { role: "user", content: `Tags for this transcription: '${inputText}'` }
        ],
        max_tokens: 50,
        temperature: 0
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      body: JSON.stringify({ error: 'An error occurred' })
    };
  }
};