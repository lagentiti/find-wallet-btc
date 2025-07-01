// Import required modules
const crypto = require('crypto'); // Node.js built-in module for cryptographic operations
const bs58 = require('bs58'); // Library for Base58 encoding

// Export a function to generate a WIF private key
module.exports = () => {
  // Step 1: Generate a random 32-byte private key
  const privateKey = crypto.randomBytes(32);

  // Step 2: Add the WIF prefix (0x80) to the private key
  const extendedKey = Buffer.concat([Buffer.from([0x80]), privateKey]);

  // Step 3: Compute the checksum
  const checksum = crypto.createHash('sha256') // First SHA256 hash
    .update(
      crypto.createHash('sha256') // Second SHA256 hash
        .update(extendedKey)
        .digest()
    )
    .digest()
    .slice(0, 4); // Take the first 4 bytes as the checksum

  // Step 4: Concatenate the extended key and checksum
  const finalKey = Buffer.concat([extendedKey, checksum]);

  // Step 5: Encode the final key in Base58
  const wifPrivateKey = bs58.encode(finalKey);

  // Step 6: Return the WIF private key
  return wifPrivateKey;
};