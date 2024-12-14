const {
    increaseTo,
} = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time")
const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { developementChains } = require("../../helper-hardhat-config")

!developementChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", function () {
          let fundMe
          let deployer
          let mockV3Aggregator
          const sendValue = ethers.parseEther("1") //1 ETH
          beforeEach(async function () {
              //deploy our hardhat contract
              //using hardhat deploy
              // const accounts = await ethers.getSigners()
              // const accountZero = accounts[0]

              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
              // console.log("Deployer Address:", deployer);
              // console.log("FundMe Address:", fundMe.address);
          })

          describe("fund", async function () {
              it("It fails if you dont send enough eths", async function () {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "you need to spend more eth!!"
                  )
              })
              it("updates the amount funded to the data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = fundMe.getAddressToAmountFunded(deployer)
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("Adds funders to array of funders ", async function () {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, deployer)
              })
          })

          describe("withdraw", async function () {
              beforeEach(async function () {
                  await fundMe.fund({ value: sendValue })
              })
              it("withdraw ETH from a single founder", async function () {
                  //arrange
                  //assert
                  //act
                  //this will be our order for testing in this add fuction

                  //arrange
                  const startingFundMeBalance =
                      await ethers.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await ethers.provider.getBalance(deployer)

                  //act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReciept = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReciept
                  //how to get the gasCost this will be donw by debugging and breakpointing just see how
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await ethers.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await ethers.provider.getBalance(deployer)

                  //address
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance.add(startingDeployerBalance),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })

              it("Only allows the owner to withdraw", async function () {
                  const accounts = await ethers.getSigners()
                  const attacker = accounts[1]
                  const attackerConnectedContract = await fundMe.connect(
                      attacker
                  )
                  await expect(
                      attackerConnectedContract.withdraw()
                  ).to.be.revertedWith("FundMe__NotOwner")
              })
          })
      })

// describe("constructor", function () {
//
//     it("Sets the aggregator addresses correctly", async function () {
//         const response = await fundMe.priceFeed()
//         assert.equal(response, mockV3Aggregator.address)

//     })

//})
