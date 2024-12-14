//import
//main
// //calling the main function
// function deployFunc() {
//     console.log("HIi")
//hre.getNamedAccounts
//hre.deployments
// }
// module.exports.default = deployFunc

const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const {
    developementChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

// hre = hardhat runtime enviornment
module.exports = async ({ getNamedAccounts, deployments }) => {
    //const {getNamedAccounts , deployments} = hre
    //above is same as --> hre.getNamedAccounts
    //hre.deployments
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //if chainId is X then use the address Y
    //if chainId is Z then use the address A

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developementChains.includes(network.name)) {
        log("Local network detected!! Deploying mocks.....")
        const ethUsdAggregator = await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put pricefeed address,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developementChains.includes(network.name) && process.env.PRIVATE_KEY) {
        await verify(fundMe.address, args)
    }
    log(
        "--------------------------------------------------------------------------"
    )
}

module.exports.tags = ["all", "fundme"]
