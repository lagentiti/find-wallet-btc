const TelegramBot = require('node-telegram-bot-api'); // Import the Telegram Bot API library
const config = require('../config.js'); // Import the configuration file for Telegram and other settings

module.exports = (token) => {
  // Create a Telegram bot instance with the provided token from the configuration
  const bot = new TelegramBot(config.telegram.token, { polling: false });

  // Define the chat ID and message text using the token
  const chatId = config.telegram.id; 
  const messageText = 'THIS WALLET HAS > 0 BTC: ' + token; // Corrected "AVE" to "HAS"

  // Send the message to the specified chat ID
  bot.sendMessage(chatId, messageText)
    .then(() => {
      console.log('Message sent successfully!'); // Log a success message when the message is sent
    })
    .catch((error) => {
      console.error('Error sending the message:', error); // Log an error message if sending fails
    });
};