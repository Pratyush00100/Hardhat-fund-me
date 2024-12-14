const { deployments, ethers, getNamedAccounts } = require("hardhat")

async function main() {
    // Get deployer account
    const { deployer } = await getNamedAccounts()

    // Ensure deployments are available
    await deployments.fixture(["all"])

    // Get the contract instance
    const fundMe = await ethers.getContract("FundMe", deployer)

    // Check if the contract instance is defined
    if (!fundMe) {
        throw new Error(
            "FundMe contract instance not found. Make sure the contract is deployed correctly."
        )
    }

    try {
        // Estimate the gas limit for the withdraw function
        const gasEstimate = await fundMe.withdraw.estimateGas
        console.log(`Estimated gas limit: ${gasEstimate.toString()}`)
    } catch (error) {
        console.error("Error estimating gas limit:", error)
        throw error
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Main execution error:", error)
        process.exit(1)
    })
