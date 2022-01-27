const axios = require('axios');

export async function Evaluate(action, first, second) {
  const response = await axios.get(`/api/evaluate?action=${action}&first=${first}&second=${second}`);
  return response.data;
}
