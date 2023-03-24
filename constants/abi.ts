export const ERC20ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"raffleId","type":"uint256"},
{"indexed":false,"internalType":"uint256","name":"numTickets","type":"uint256"},{"indexed":false,"internalType":"address","name":"buyer",
"type":"address"}],"name":"BuyRaffleTickets","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256",
"name":"raffleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,
"internalType":"address","name":"nftCollectionAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"nftTokenId",
"type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reservePrice","type":"uint256"},{"indexed":false,"internalType":"uint256",
"name":"ticketPrice","type":"uint256"}],"name":"CreateRaffle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256",
"name":"raffleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"ender","type":"address"}],"name":"EndRaffle","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"raffleId","type":"uint256"},{"indexed":false,"internalType":"address",
"name":"winner","type":"address"}],"name":"WithdrawPrize","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
"name":"Raffles","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"nftCollectionAddress",
"type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"},{"internalType":"uint256","name":"reservePrice","type":"uint256"},
{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsBought","type":"uint256"},
{"internalType":"address","name":"winner","type":"address"},{"internalType":"uint256","name":"raffleId","type":"uint256"},
{"internalType":"enum NFTRaffle.RaffleStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"_raffleId","type":"uint256"},{"internalType":"uint256","name":"_numTickets","type":"uint256"}],
"name":"buyRaffleTickets","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftCollectionAddress",
"type":"address"},{"internalType":"uint256","name":"_nftTokenId","type":"uint256"},{"internalType":"uint256","name":"_reservePrice","type":"uint256"},
{"internalType":"uint256","name":"_ticketPrice","type":"uint256"}],"name":"createRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"_raffleId","type":"uint256"}],"name":"endRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"getRaffleCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"_raffleId","type":"uint256"}],"name":"withdrawPrize","outputs":[],"stateMutability":"payable","type":"function"}]