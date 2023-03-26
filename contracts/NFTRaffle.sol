// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

import "hardhat/console.sol";

contract NFTRaffle is VRFConsumerBaseV2 {

    event CreateRaffle(uint raffleId, address owner, address nftCollectionAddress, uint nftTokenId, uint reservePrice, uint ticketPrice, uint raffleEndDate);
    event BuyRaffleTickets(uint raffleId, uint numTickets, address buyer);
    event EndRaffle(uint raffleId, address ender);
    event SetWinner(uint raffleId, address winner);
    event WithdrawPrize(uint raffleId, address winner);

    using Counters for Counters.Counter;
    Counters.Counter private raffleCount;

    enum RaffleStatus{ACTIVE, CLOSED, FINISHED}

    struct Raffle{
        address owner;
        address nftCollectionAddress;
        uint nftTokenId;
        uint reservePrice;
        uint ticketPrice;
        uint ticketsBought;
        address winner;
        address[] entries;
        uint raffleId;
        RaffleStatus status;
        uint raffleEndDate;
    }

    mapping (uint => Raffle) public Raffles;

    VRFCoordinatorV2Interface COORDINATOR;
    LinkTokenInterface LINKTOKEN;

    // Goerli coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

    // Goerli LINK token contract. For other networks, see
    // https://docs.chain.link/docs/vrf-contracts/#configurations
    address link_token_contract = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash =
        0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    // A reasonable default is 100000, but this value could be different
    // on other networks.
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 1;

    // Storage parameters
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    uint64 public s_subscriptionId;
    address s_owner;
    
    uint256 private constant ROLL_IN_PROGRESS = 42;
    //using these two maps to assign vrf results to id
    // map rollers to requestIds
    mapping(uint256 => uint) private s_rollers;
    // map vrf results to rollers
    mapping(uint => uint256) private s_results;

    constructor() VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        LINKTOKEN = LinkTokenInterface(link_token_contract);
        s_owner = msg.sender;
        //Create a new subscription when you deploy the contract.
        createNewSubscription();
    }

    // Assumes the subscription is funded sufficiently.
    function fundAndRequestRandomWords(uint256 amount, uint _raffleId) internal {
        require(s_results[_raffleId] == 0, "Already requested random number for this raffleId.");

        // Contract send LINK to coordinator
        LINKTOKEN.transferAndCall(
            address(COORDINATOR),
            amount,
            abi.encode(s_subscriptionId)
        );
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_rollers[s_requestId] = _raffleId;
        s_results[_raffleId] = ROLL_IN_PROGRESS;
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        s_results[s_rollers[s_requestId]] = randomWords[0];   

        Raffles[s_rollers[s_requestId]].winner = Raffles[s_rollers[s_requestId]].entries[randomWords[0] % Raffles[s_rollers[s_requestId]].entries.length]; 
        Raffles[s_rollers[s_requestId]].status = RaffleStatus.CLOSED;
        emit SetWinner(s_rollers[s_requestId],  Raffles[s_rollers[s_requestId]].winner);
    }

    // Create a new subscription when the contract is initially deployed.
    function createNewSubscription() private onlyOwner {
        s_subscriptionId = COORDINATOR.createSubscription();
        // Add this contract as a consumer of its own subscription.
        COORDINATOR.addConsumer(s_subscriptionId, address(this));
    }

    // Assumes this contract owns link.
    // 1000000000000000000 = 1 LINK
    function topUpSubscription(uint256 amount) external  {
        LINKTOKEN.transferAndCall(
            address(COORDINATOR),
            amount,
            abi.encode(s_subscriptionId)
        );
    }

    function addConsumer(address consumerAddress) external onlyOwner {
        // Add a consumer contract to the subscription.
        COORDINATOR.addConsumer(s_subscriptionId, consumerAddress);
    }

    function removeConsumer(address consumerAddress) external onlyOwner {
        // Remove a consumer contract from the subscription.
        COORDINATOR.removeConsumer(s_subscriptionId, consumerAddress);
    }

    function cancelSubscription(address receivingWallet) external onlyOwner {
        // Cancel the subscription and send the remaining LINK to a wallet address.
        COORDINATOR.cancelSubscription(s_subscriptionId, receivingWallet);
        s_subscriptionId = 0;
    }

    // Transfer this contract's funds to an address.
    // 1000000000000000000 = 1 LINK
    function withdrawLINK(uint256 amount, address to) external onlyOwner {
        LINKTOKEN.transfer(to, amount);
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }

    function createRaffle(address _nftCollectionAddress, uint _nftTokenId, uint _reservePrice, uint _ticketPrice, uint _raffleEndDate) public {
        require(_raffleEndDate > block.timestamp, "Raffle end date must be set in the future!");
        require(_reservePrice > 0, "Reserve price must be greater than 0!");

        raffleCount.increment();
        Raffles[raffleCount.current()] = Raffle(msg.sender, _nftCollectionAddress, _nftTokenId, _reservePrice, _ticketPrice, 0,  address(0), new address[](0), raffleCount.current(), RaffleStatus.ACTIVE, _raffleEndDate);
        ERC721(_nftCollectionAddress).transferFrom(msg.sender, address(this), _nftTokenId);
        
        emit CreateRaffle(raffleCount.current(), msg.sender, _nftCollectionAddress, _nftTokenId, _reservePrice, _ticketPrice, _raffleEndDate);
    }

    function buyRaffleTickets(uint _raffleId, uint  _numTickets) public payable {
        require(Raffles[_raffleId].nftCollectionAddress != address(0), "Raffle does not exist!");
        require(Raffles[_raffleId].raffleEndDate > block.timestamp, "Raffle end date has expired!");
        require(Raffles[_raffleId].status == RaffleStatus.ACTIVE, "Raffle has ended!");
        require(msg.value == Raffles[_raffleId].ticketPrice * _numTickets, "Did not pay exact eth for desired number of tickets!");

        for (uint i = 0; i < _numTickets; i++) {
            Raffles[_raffleId].entries.push(msg.sender);
        }
        Raffles[_raffleId].ticketsBought += _numTickets;

        emit BuyRaffleTickets(_raffleId, _numTickets, msg.sender);
    }

    function endRaffle(uint _raffleId, uint _linkAmount) public {
        require(Raffles[_raffleId].nftCollectionAddress != address(0), "Raffle does not exist!");
        require(Raffles[_raffleId].winner == address(0x0), "Raffle has already ended!");
        require((Raffles[_raffleId].ticketsBought*Raffles[_raffleId].ticketPrice >= Raffles[_raffleId].reservePrice) || (Raffles[_raffleId].raffleEndDate > block.timestamp), "Conditions to end raffle not met!");
        require(Raffles[_raffleId].ticketsBought > 0,"There needs to be at least 1 entry to end the raffle.");

        // User send LINK to contract
        LINKTOKEN.transferFrom(msg.sender, address(this), _linkAmount);

        fundAndRequestRandomWords(_linkAmount, _raffleId);

        emit EndRaffle(_raffleId, msg.sender);
    }

    function withdrawPrize(uint _raffleId) public payable {
        require(Raffles[_raffleId].status == RaffleStatus.CLOSED, "Either prize has already been withdrawn or you are trying to withdraw too early!");
        require(Raffles[_raffleId].nftCollectionAddress != address(0), "Raffle does not exist!");
        require(Raffles[_raffleId].winner != address(0x0), "Winner has not been selected yet!");

        ERC721(Raffles[_raffleId].nftCollectionAddress).transferFrom(address(this), Raffles[_raffleId].winner,  Raffles[_raffleId].nftTokenId);
        Raffles[_raffleId].status = RaffleStatus.FINISHED;
        (bool sent, ) = payable(Raffles[_raffleId].owner).call{value: Raffles[_raffleId].ticketsBought*Raffles[_raffleId].ticketPrice}("");
        require(sent, "Failed to send Ether");
        console.log("Raffle Winner", Raffles[_raffleId].winner , " has withdrawn prize!");

        emit WithdrawPrize(_raffleId, Raffles[_raffleId].winner);
    }

    function getRaffleCount() public view returns (uint) {
        return raffleCount.current();
    }

}