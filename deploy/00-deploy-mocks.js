const { network } = require("hardhat")
const {
    developementChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developementChains.indexOf(network.name) !== -1) {
        log("Local network detected!! Deploying mocks.....")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks are deployed..")
        log("................................................................")
    }
}

module.exports.tags = ["all", "mocks"]
