// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "./priceConverter.sol";
// get funds from the users
// withdrae these funds
// set a minimum funding value in usd

// our aim should be to use the tricks and methods to reduce gas usage
// at last see the ways to make the code gas efficient
// constant , immutable

//order for better formatting of solidity code
// 1 pragma statements
// 2 import statements
// 3 interfaces
// 4 libraries
// 5 contracts

//error codes -
error FundMe__NotOwner();

//contracts
/**
 * @title A contract for funding me
 * @author Pratyush Singh
 * @notice This contract is to demo a sample funding contracts
 * @dev This implements priceFeeds as our Library
 */
contract FundMe {
    //type deckarations
    using PriceConverter for uint256;

    uint public constant minimumUsd = 50 * 1e18; //1*10**18
    address[] private funders;
    mapping(address => uint) private addressToAmountFunded;
    address private immutable i_owner;

    AggregatorV3Interface private priceFeed;

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        //want to be abe to send a minimum fund amount in usd
        // how can we send eth to this contract
        require(
            (msg.value.getConversionRate(priceFeed)) >= minimumUsd,
            "you are not giving me enough"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    } // 18 decimals for eth and wei

    function withdraw() public onlyOwner {
        // Using a single loop to reset the mapping values and clear the funders array
        address[] memory fundersArray = funders;
        for (
            uint256 funderIndex = 0;
            funderIndex < fundersArray.length;
            funderIndex++
        ) {
            address funder = fundersArray[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        // Resetting the funders array
        funders = new address[](0);

        // Withdrawing the funds using call (recommended method)
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    // modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        //require(msg.sender == i_owner , "Sender is not owner");
        _;
    }

    // error new way can save gas!!

    /// what happens if someone sends this contract ETH without calling the fund function
    //recieve()
    //fallback()

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return funders[index];
    }

    function getAddressToAmountFunded(
        address funder
    ) public view returns (uint256) {
        return addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }
}
// function withdraw() public onlyOwner {
//     //   require(msg.sender == owner , "Sender is not owner");
//     for (
//         uint256 funderIndex = 0;
//         funderIndex < funders.length;
//         funderIndex + 1
//     ) {
//         // strting index , ending index, step amount
//         //code
//         address funder = funders[funderIndex];
//         addressToAmountFunded[funder] = 0;
//     }
//     // now we need to reset the array
//     funders = new address[](0); // reset with 0 values

//     // we need to actually withdraw thw funds also
//     // 3 different ways to send money from a contract
//     //1.transfer
//     //2.send
//     //3.call

//     //1.transfer
//     // payable( msg.sender).transfer(address(this).balance); // by default msg.sender = adress
//     //but now we typecasted it above as payable(msg.sender) = payable address

//     //2.send
//     //bool sendSuccsess= payable(msg.sender).send(address(this).balance);
//     //require(sendSuccsess , "Send failed");

//     //3.call ---- it is alower level commannd
//     (bool callSuccess, ) = payable(msg.sender).call{
//         value: address(this).balance
//     }("");
//     require(callSuccess, "Call Failed");
// }
