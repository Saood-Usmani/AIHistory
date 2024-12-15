import axios from 'axios';

export const handler = async (event) => {
  const { inputText } = JSON.parse(event.body);

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "ft:gpt-4o-2024-08-06:personal::ANimpQKX",
      messages: [
        { role: "system", content: "You are a historical transcription tagger." },
        { role: "user", content: `Tags for this transcription: '${inputText}'` }
      ],
      max_tokens: 50,
      temperature: 0
    }, {
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(response.data)
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