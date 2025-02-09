export const summarizeText = async (inputText) => {
    const apiKey = ''; // Replace with your actual API key
  
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: inputText,
        parameters: {
          max_length: 100,
          min_length: 25,
          length_penalty: 2.0,
          num_beams: 4,
          early_stopping: true
        }
      })
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  
    const result = await response.json();
    if (result && result.length > 0) {
      return result[0].summary_text;
    } else {
      throw new Error('Unexpected response format');
    }
  };