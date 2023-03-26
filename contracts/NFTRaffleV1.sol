// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTRaffle{

    event CreateRaffle(uint raffleId, address owner, address nftCollectionAddress, uint nftTokenId, uint reservePrice, uint ticketPrice, uint raffleEndDate);
    event BuyRaffleTickets(uint raffleId, uint numTickets, address buyer);
    event EndRaffle(uint raffleId, address winner);
    event WithdrawPrize(uint raffleId, address winner);

    using Counters for Counters.Counter;
    Counters.Counter private raffleCount;
    enum RaffleStatus{ACTIVE, FINISHED}
    
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

    function createRaffle(address _nftCollectionAddress, uint _nftTokenId, uint _reservePrice, uint _ticketPrice, uint _raffleEndDate) public {
        require(_raffleEndDate > block.timestamp, "Raffle end date must be set in the future");

        Raffles[raffleCount.current()] = Raffle(msg.sender, _nftCollectionAddress, _nftTokenId, _reservePrice, _ticketPrice, 0,  address(0), new address[](0), raffleCount.current(), RaffleStatus.ACTIVE, _raffleEndDate);
        ERC721(_nftCollectionAddress).transferFrom(msg.sender, address(this), _nftTokenId);
        raffleCount.increment();
 
        emit CreateRaffle(raffleCount.current()-1, msg.sender, _nftCollectionAddress, _nftTokenId, _reservePrice, _ticketPrice, _raffleEndDate);
    }

    function buyRaffleTickets(uint _raffleId, uint  _numTickets) public payable {
        require(Raffles[_raffleId].nftCollectionAddress != address(0), "Raffle does not exist!");
        require(Raffles[_raffleId].raffleEndDate > block.timestamp, "Raffle end date has expired");
        require(Raffles[_raffleId].status == RaffleStatus.ACTIVE, "Raffle has ended!");
        require(msg.value == Raffles[_raffleId].ticketPrice * _numTickets, "Did not pay exact eth for desired number of tickets!");

        for (uint i = 0; i < _numTickets; i++) {
            Raffles[_raffleId].entries.push(msg.sender);
        }
        Raffles[_raffleId].ticketsBought += _numTickets;

        emit BuyRaffleTickets(_raffleId, _numTickets, msg.sender);
    }

    function endRaffle(uint _raffleId) public {
        require(Raffles[_raffleId].nftCollectionAddress != address(0), "Raffle does not exist!");
        require(Raffles[_raffleId].winner == address(0x0), "Raffle has already ended!");
        require((Raffles[_raffleId].ticketsBought*Raffles[_raffleId].ticketPrice >= Raffles[_raffleId].reservePrice) || (Raffles[_raffleId].raffleEndDate > block.timestamp), "Conditions to end raffle not met!");
        require(Raffles[_raffleId].entries.length > 0,"There needs to be at least 1 entry to end the raffle.");

        Raffles[_raffleId].winner = Raffles[_raffleId].entries[0];

        emit EndRaffle(_raffleId,  Raffles[_raffleId].winner);
    }

    function withdrawPrize(uint _raffleId) public payable {
        require(Raffles[_raffleId].status == RaffleStatus.ACTIVE, "Prizes already withdrawn!");
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