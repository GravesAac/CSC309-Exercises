// pages/api/personalize.js

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the data from the body of the request
  const { name, age, preferences } = req.body;

  // Validate the data
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required and should be a string' });
  }
  if (!age || typeof age !== 'number') {
    return res.status(400).json({ error: 'age is required and should be a number' });
  }
  if (!preferences || typeof preferences !== 'object' || !preferences.color || !preferences.hobby) {
    return res.status(400).json({ error: 'preferences object with color and hobby is required' });
  }

  // Create the response messages
  const message = `Hello, ${name}!`;
  const ageMessage = `You're ${age} years old.`;
  const preferencesMessage = `Your favorite color is ${preferences.color} and you enjoy ${preferences.hobby}.`;

  // Additional message for age over 18
  const offerMessage = age > 18 ? "You're eligible for our special offers!" : undefined;

  // Return the personalized response
  return res.status(200).json({
    message,
    ageMessage,
    preferencesMessage,
    offerMessage,  // Use 'offerMessage' instead of 'specialOffer'
  });
}
