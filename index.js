// Import modules for handling different tasks
const bddSearch = require('./src/bddSearch.js'); // Handles searching in the database
const bddCreate = require('./src/bddCreate.js'); // Handles creating new database entries
const bot = require('./src/telegramBot.js'); // Manages sending messages via Telegram
const wallet = require('./src/wallet.js'); // Checks or manages wallet balances
const token = require('./src/tokenGenerator.js'); // Generates unique tokens

// Repeatedly execute the logic at 1-second intervals (1000 milliseconds)
setInterval(() => {
  let tk = token(); // Generate a new token and assign it to 'tk'

  // Check if the token exists in the database
  if (bddSearch(tk) == 1) {
    bddCreate(tk); // If it exists, create a new database entry for it

    // Check if the associated wallet has a positive balance
    if (wallet(tk) == 1) {
      bot(tk); // Send a notification via the Telegram bot
      return console.log(tk + " telegram message is sent"); // Log a success message
    } else {
      return console.log(tk + " 0 btc"); // Log a message if wallet balance is 0 BTC
    }
  } else {
    return console.log(tk + " 0 btc"); // Log a message if the token does not exist in the database
  }
}, 1000); // Repeat the process every second