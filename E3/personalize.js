// pages/api/personalize.js

export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed, use POST' });
    }
  
    const { name, age, preferences } = req.body;
  
    // Validate `name`
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and must be a string' });
    }
  
    // Validate `age`
    if (typeof age !== 'number' || isNaN(age)) {
      return res.status(400).json({ error: 'Age is required and must be a number' });
    }
  
    // Validate `preferences`
    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({ error: 'Preferences are required and must be an object' });
    }
  
    // Check that `preferences` has both `color` and `hobby`
    const { color, hobby } = preferences;
    if (!color || !hobby) {
      return res.status(400).json({ error: 'Preferences must include both color and hobby' });
    }
  
    // If validation passes, create the personalized response
    let responseMessage = {
      greeting: `Hello, ${name}!`,
      ageMessage: `You're ${age} years old.`,
      preferencesMessage: `Your favorite color is ${color} and you enjoy ${hobby}.`
    };
  
    // If age is greater than 18, add a special offer message
    if (age > 18) {
      responseMessage.specialOffer = "You're eligible for our special offers!";
    }
  
    // Send the personalized response as JSON
    res.status(200).json(responseMessage);
  }
  