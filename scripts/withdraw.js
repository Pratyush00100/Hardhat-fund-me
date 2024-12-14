const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    const gasLimit = 30000000 // Adjust the gas limit as needed
    console.log("Withdrawing from contract...")
    // const gasEstimate = await fundMe.estimateGas.withdraw();
    // console.log(`Estimated gas limit: ${gasEstimate.toString()}`)
    const transactionResponse = await fundMe.withdraw({ gasLimit })
    await transactionResponse.wait()
    console.log("Got it back!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
