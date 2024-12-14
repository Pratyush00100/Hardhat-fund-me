const { ethers, getNamedAccounts, network } = require("hardhat")
const { developementChains } = require("../../helper-hardhat-config")
const {
    increaseTo,
} = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time")
const { assert } = require("ethers")
//last step in your developement journey

developementChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.parseEther("2")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("Allows people to fund and withdraw", async function () {
              await fundMe.fund({ sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
