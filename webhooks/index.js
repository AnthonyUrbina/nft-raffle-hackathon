require('dotenv/config');
const express = require('express')
const axios = require('axios')
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

const db = admin.firestore();

// push protocol backend sdk initializing
const ethers = require('ethers')
const PushAPI = require("@pushprotocol/restapi");
console.log('SECRET SHHHH', process.env.PUSH_CHANNEL_SECRET)
const PK = `0x${process.env.PUSH_CHANNEL_SECRET}`
const _signer = new ethers.Wallet(PK);


const sendPushNotification = async ({ body, title, cta, img, recipient, type}) => {
    // subset = 4
    // target = 3
    const isTarget = type === 'target'
    type = type === 'target' ? 3 : 4
    let recipients;
    if (isTarget) {
        recipients = `eip155:5:${recipient}`
    } else {
        recipients = []
        console.log('recipient', recipient)
        for (let i = 0; i < recipient.length; i++) {
            const CAIPformat = `eip155:5:${recipient[i]}`
            recipients.push(CAIPformat)
        }
    }
    try {
        await PushAPI.payloads.sendNotification({
            signer: _signer,
            type, // target
            identityType: 2, // direct payload
            notification: {
                title,
                body
            },
            payload: {
                title,
                body,
                cta,
                img,
            },
            recipients, // recipient address
            channel: 'eip155:5:0x07c233C36ac7103bDDD8fdebE9935fE871BF5474', // your channel address
            env: 'staging'
        });
    } catch (err) {
        console.error(err.message)
    }
}

// for push notis
const pulldata = async () => {
    const docRef = db.collection("raffles").doc('33');
    const doc = await docRef.get();

    if (doc.exists) {
        // The document exists, do something with it
        const raffle = doc.data();
        // owner: your raffle has ended
        // loser: you lost the raffle
        // winner: you won the raffle
        const { entries, owner, raffleId, winner, nftTokenId, nftCollectionAddress } = raffle
        // make opensea call
        // grab image, token edition, collection name
        // store in container for later
        // next,
        // store winner
        // store owner
        // for losers, create copy of entries and remove duplicates
        // send off the notifications
        const options = {
            method: 'GET',
            url: `https://eth-goerli.g.alchemy.com/nft/v2/YMYVZZmF7YdOUtdXKVP-OoKjlxhWa7nJ/getNFTMetadata`,
            params: {
                contractAddress: nftCollectionAddress,
                tokenId: nftTokenId,
                refreshCache: 'false'
            },
            headers: { accept: 'application/json' }
        };

        const res = await axios.request(options);
        const { title, media } = res.data;
        const { gateway } = media[0];
        const img = gateway;

        const losers = entries.filter((entry, index) => entries.indexOf(entry) === index)
        console.log('losers:', losers)
        const cta = `/raffles/${raffleId}`
        const groupNotification = 'subset'
        const singleNotification = 'target'
        const loserMessage = 'YOU LOST THE RAFFLE'
        const winnerMessage = 'YOU WON THE RAFFLE'
        const ownerMessage = 'YOUR RAFFLE HAS ENDED'

        // losers
        sendPushNotification({ body: title, title: loserMessage, cta, img, recipient: losers, type: groupNotification })
        // winners
        sendPushNotification({ body: title, title: winnerMessage, cta, img, recipient: winner, type: singleNotification })
        // owners
        sendPushNotification({ body: title, title: ownerMessage, cta, img, recipient: owner, type: singleNotification })
    } else {
        console.log("No such document!");
    }
}

console.log('pulldata', pulldata())

// console.log('apiResponse', sendPushNotification())
const app = express()
const port = 7000

app.get('/', (req, res) => {
    console.log("in index get route")
    console.log("req: \n", req)
    res.send('Hello World!')
})


app.post('/CreateRaffle', (req, res) => {
    console.log("\n/CreateRaffle\n")
    let body = '';
     // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // Parse the request body when complete
    req.on('end', async () => {
        try{
            const payload = JSON.parse(body);
            const raffleData = {
                "raffleId" : parseInt('0x' + payload[0]["logs"][1]["data"].substring(2,66)),
                "owner" : '0x' + payload[0]["logs"][1]["data"].substring(66,130).replace(/^0+/, ''),
                "nftCollectionAddress" : '0x' + payload[0]["logs"][1]["data"].substring(130,194).replace(/^0+/, ''),
                "nftTokenId" : parseInt('0x'+ payload[0]["logs"][1]["data"].substring(194,258).replace(/^0+/, '')),
                "reservePrice" : parseInt('0x' + payload[0]["logs"][1]["data"].substring(258,322)),
                "ticketPrice" : parseInt('0x' + payload[0]["logs"][1]["data"].substring(322, 386)),
                "raffleEndDate" : parseInt('0x' + payload[0]["logs"][1]["data"].substring(386)),
                "entries" : [],
                "prizeClaimed" : false,
                "raffleEnded" : false,
                "winner" : "0x0000000000000000000000000000000000000000",
                // TODO: fix erc20address, raffleEndDate, and isAbortable
                "erc20Address" : "0x0000000000000000000000000000000000000000",
                "isAbortable" : false
            }
            console.log("reserve price: ", payload[0]["logs"][1]["data"].substring(258,322))
            console.log("ticket price: ", payload[0]["logs"][1]["data"].substring(322))

            console.log("\n\npayload:\n\n", payload)
            console.log("\n\nraffleData:\n\n", raffleData)
            await db.collection("raffles").doc(raffleData["raffleId"].toString()).set(raffleData)
        }catch(err){
            res.status(500).send()
        }
    });
    res.status(200).send()
})

app.post('/BuyRaffleTickets', (req, res) => {
    console.log("\n/BuyRaffleTickets\n")
    let body = '';
    // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try{
            // parse data
            const payload = JSON.parse(body);
            const raffleId =  parseInt('0x' + payload[0]["logs"][0]["data"].substring(2,66))
            const numTickets = parseInt('0x'+ payload[0]["logs"][0]["data"].substring(66,130))
            const buyerAddress = '0x' + payload[0]["logs"][0]["data"].substring(130).replace(/^0+/, '')
            const newEntries = Array(numTickets).fill(buyerAddress)

            console.log("numTickets:",payload[0]["logs"][0]["data"].substring(66,130))
            console.log("\n\nBuyRaffleTickets:payload:\n\n", payload)
            console.log("data:\n",payload[0]["logs"][0] )
            console.log("adding these new(", numTickets,")entries:\n", newEntries, "\nto raffle of id: ",raffleId  )
            // write all entries to db
            const docRef = db.collection("raffles").doc(raffleId.toString())
            const raffleDoc = await docRef.get();
            const currentEntries = raffleDoc.get("entries");
            await docRef.update({entries: [...currentEntries, ...newEntries]});

            console.log("finished wriging")
        }catch(err){
            console.log(err)
            res.status(500).send()
        }
    });

    res.status(200).send()
})

app.post('/EndRaffle', (req, res) => {
    console.log("\n/EndRaffle\n")

    let body = '';
    // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try{
            const payload = JSON.parse(body);
            console.log(payload)
            const raffleId =  parseInt('0x' + payload[0]["logs"][0]["data"].substring(2,66))
            const winnerAddress = '0x' + payload[0]["logs"][0]["data"].substring(66).replace(/^0+/, '')
            console.log("\n\nEndRaffle:payload:\n\n", payload)
            await db.collection("raffles").doc(raffleId.toString()).update({raffleEnded : true, winner : winnerAddress})
            // for push notis
            const docRef = db.collection("raffles").doc(raffleId.toString());
            const doc = await docRef.get();

            if (doc.exists) {
                // The document exists, do something with it
                const raffle = doc.data();
                // owner: your raffle has ended
                // loser: you lost the raffle
                // winner: you won the raffle
                const { entries, owner, raffleId, winner, nftTokenId, nftCollectionAddress } = raffle
                // make opensea call
                // grab image, token edition, collection name
                // store in container for later
                // next,
                // store winner
                // store owner
                // for losers, create copy of entries and remove duplicates
                // send off the notifications
                const options = {
                    method: 'GET',
                    url: `https://eth-goerli.g.alchemy.com/nft/v2/YMYVZZmF7YdOUtdXKVP-OoKjlxhWa7nJ/getNFTMetadata`,
                    params: {
                        contractAddress: nftCollectionAddress,
                        tokenId: nftTokenId,
                        refreshCache: 'false'
                    },
                    headers: { accept: 'application/json' }
                };

                const res = await axios.request(options);
                const { title, media } = res.data;
                const { gateway } = media[0];
                const img = gateway;

                const losers = entries.filter((entry, index) => entries.indexOf(entry) === index)
                console.log('losers:', losers)
                const cta = `/raffles/${raffleId}`
                const groupNotification = 'subset'
                const singleNotification = 'target'
                const loserMessage = 'YOU LOST THE RAFFLE'
                const winnerMessage = 'YOU WON THE RAFFLE'
                const ownerMessage = 'YOUR RAFFLE HAS ENDED'

                // losers
                sendPushNotification({ body: title, title: loserMessage, cta, img, recipient: losers, type: groupNotification })
                // winners
                sendPushNotification({ body: title, title: winnerMessage, cta, img, recipient: winner, type: singleNotification })
                // owners
                sendPushNotification({ body: title, title: ownerMessage, cta, img, recipient: owner, type: singleNotification })
            } else {
                console.log("No such document!");
            }
            console.log('result', result)
        } catch(err){
            console.log(err)
            res.status(500).send()
        }
    });

    res.status(200).send()
})

app.post('/WithdrawPrize', (req, res) => {
    console.log("\n/WithdrawPrize\n")

    let body = '';
    // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try{
            const payload = JSON.parse(body);
            console.log(payload)
            const raffleId =  parseInt('0x' + payload[0]["logs"][1]["data"].substring(2,66))
            const winnerAddress = '0x' + payload[0]["logs"][1]["data"].substring(66).replace(/^0+/, '')
            console.log("\n\nEndRaffle:payload:\n\n", payload)
            await db.collection("raffles").doc(raffleId.toString()).update({prizeClaimed : true, winner: winnerAddress})
        }catch(err){
            console.log(err)
            res.status(500).send()
        }
    });

    res.status(200).send()

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
