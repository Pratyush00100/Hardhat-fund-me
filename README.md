# Blockchain and Solidity Project
This project marks my first venture into blockchain development. I dedicated extensive hours to researching blockchain concepts, writing and testing smart contracts, and optimizing for gas efficiency.
This project is an implementation based on Patrick Collins' blockchain and Solidity course on freeCodeCamp. It involves creating, deploying, and interacting with a decentralized application (DApp) using Hardhat, ethers.js, and Solidity.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

This project demonstrates the development of a DApp using Ethereum smart contracts. It includes features such as:

- Writing and deploying smart contracts using Hardhat
- Interacting with contracts via ethers.js
- Testing contracts using Mocha and Chai
- Optimizing gas usage
- Using various tools and plugins for development and testing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm/yarn installed
- Basic understanding of JavaScript and Solidity
- Familiarity with blockchain and Ethereum concepts

## project-structure

blockchain-solidity-project/
├── contracts/            # Solidity smart contracts
│   └── FundMe.sol        # Example contract
├── scripts/              # Deployment and interaction scripts
│   ├── deploy.js         # Deployment script
│   ├── withdraw.js       # Withdraw funds script
│   └── estimateGas.js    # Gas estimation script
├── test/                 # Test files
│   └── FundMe.test.js    # Example test
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── hardhat.config.js     # Hardhat configuration
├── package.json          # Project configuration and dependencies
└── README.md             # Project documentation

## deployment

To deploy the contracts to a local Hardhat network, run: yarn hardhat node

In a new terminal, deploy the contracts: 
yarn hardhat run scripts/deploy.js --network localhost

To deploy to a testnet (e.g., Sepolia), update the .env file with your API keys and run:
yarn hardhat run scripts/deploy.js --network sepolia


## scripts

Deploy: scripts/deploy.js

Withdraw: scripts/withdraw.js

Estimate Gas: scripts/estimateGas.js

To run any script, use:
yarn hardhat run scripts/<script-name>.js --network <network-name>

## testing
Run the test suite using Hardhat:
yarn hardhat test

## linting-and-formatting
ESLint: To lint the contracts folder:
yarn eslint contracts --fix

Prettier: To format the entire project:
yarn prettier --write .

## license
This project is licensed under the MIT License.

## acknowledgements

Acknowledgements
This project marks my first venture into blockchain development, guided by Patrick Collins' comprehensive course on freeCodeCamp. I dedicated extensive hours to researching blockchain concepts, writing and testing smart contracts, and optimizing for gas efficiency.

Personal Efforts
Research & Learning: Immersed myself in blockchain fundamentals and Solidity programming.

Hands-On Development: Developed and debugged smart contracts.

Testing & Optimization: Ensured reliability and efficiency through rigorous testing.

Resources & Tools
Patrick Collins: Provided invaluable tutorials and guidance.

freeCodeCamp: Offered a wealth of educational resources.

Community: Received support from forums and open-source contributors.

Tools: Utilized Hardhat, ethers.js, Mocha, Chai, ESLint, and Prettier for development and testing.

This project is just the beginning of my journey into the world of blockchain. The knowledge and skills I've gained will serve as a solid foundation for future projects and contributions.

