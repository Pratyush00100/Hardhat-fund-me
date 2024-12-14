// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "./AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        //abi
        //address 0x694AA1769357215DE4FAC081bf1f309aDC325306
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        //price of eth in terms of usd
        return uint(answer * 1e10);
    }

    // function getVersion() internal view returns (uint) {
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(
    //         0x694AA1769357215DE4FAC081bf1f309aDC325306
    //     );
    //     return priceFeed.version();
    // }

    function getConversionRate(
        uint ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint ethPrice = getPrice(priceFeed);
        uint ethAmountinUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountinUsd;
    }
}
