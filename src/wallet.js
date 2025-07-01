// Import required modules
const axios = require('axios'); // For making HTTP requests
const bitcoin = require('bitcoinjs-lib'); // For Bitcoin key and address management
const { ECPairFactory } = require('ecpair'); // For generating key pairs
const tinysecp = require('tiny-secp256k1'); // Cryptographic library for ECPair

// Create the ECPair instance
const ECPair = ECPairFactory(tinysecp);

/**
 * Checks the balance of a Bitcoin address
 * @param {string} privateKeyWIF - Private key in WIF format
 * @returns {Promise<number>} - 0 (error), 1 (> 0 BTC), or 2 (0 BTC)
 */
module.exports = async (privateKeyWIF) => {
  try {
    // Generate the public key and Bitcoin address
    const keyPair = ECPair.fromWIF(privateKeyWIF); // Convert WIF key to a key pair
    const publicKey = keyPair.publicKey; // Get the public key

    // Generate the Bitcoin address from the public key
    const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(publicKey) });

    // API URL to fetch the address information
    const apiUrl = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`;

    // API request to get the address balance
    const response = await axios.get(apiUrl);

    // Retrieve the balance from the response data
    const balance = response.data.balance;

    // Return 1 if balance > 0 BTC, else return 2
    return balance > 0 ? 1 : 2;
  } catch (error) {
    console.error('Error checking balance:', error.message);
    return 0; // Return 0 in case of an error
  }
};