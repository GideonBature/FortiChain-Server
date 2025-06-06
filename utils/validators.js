const Joi = require('joi');

// Wallet validation schema
const walletSchema = Joi.object({
  address: Joi.string()
    .required()
    .trim()
    .custom((value, helpers) => {
      // Ethereum address: 0x followed by 40 hex characters
      const ethereumPattern = /^0x[a-fA-F0-9]{40}$/;
      // Starknet address: 0x followed by 64 hex characters
      const starknetPattern = /^0x[a-fA-F0-9]{64}$/;
      // Stellar address: G followed by 55 characters (A-Z, 2-7)
      const stellarPattern = /^G[A-Z2-7]{55}$/;

      if (
        ethereumPattern.test(value) ||
        starknetPattern.test(value) ||
        stellarPattern.test(value)
      ) {
        return value;
      }

      // Custom error message that explains the expected formats
      return helpers.message('Invalid wallet address format. Please provide a valid Ethereum address (0x followed by 40 hex characters), Starknet address (0x followed by 64 hex characters), or Stellar address (G followed by 55 characters)');
    }, 'wallet address validation'),
  role: Joi.string()
    .required()
    .valid('project_owner', 'researcher', 'validator', 'admin')
});

// Validate wallet data
const validateWallet = (data) => {
  return walletSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateWallet
};
