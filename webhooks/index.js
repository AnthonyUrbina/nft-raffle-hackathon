const express = require('express')
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const app = express()
const port = 7000

app.post('/CreateRaffle', (req, res) => {
    let body = '';
     // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // Parse the request body when complete
    req.on('end', async () => {
        const payload = JSON.parse(body);
        const raffleData = {
            "raffleId" : parseInt(payload[0]["logs"][1]["data"].substring(2,66)),
            "owner" : '0x' + payload[0]["logs"][1]["data"].substring(66,130).replace(/^0+/, ''),
            "nftCollectionAddress" : '0x' + payload[0]["logs"][1]["data"].substring(130,194).replace(/^0+/, ''),
            "nftTokenId" : payload[0]["logs"][1]["data"].substring(194,258).replace(/^0+/, ''),
            "reservePrice" : parseInt(payload[0]["logs"][1]["data"].substring(258,322)),
            "ticketPrice" : parseInt(payload[0]["logs"][1]["data"].substring(322)),
            "entries" : [],
            "prizeClaimed" : false,
            "raffleEnded" : false,
            "winner" : "0x0000000000000000000000000000000000000000",
            // TODO: fix erc20address, raffleEndDate, and isAbortable
            "erc20Address" : "0x0000000000000000000000000000000000000000",
            "raffleEndDate" : Date.now() + 1209600,
            "isAbortable" : false
        }

        console.log("\n\npayload:\n\n", payload)
        console.log("\n\nraffleData:\n\n", raffleData)
        await db.collection("raffles").doc(raffleData["raffleId"]).set(raffleData)

    });
    res.send('Success')
})

app.post('/BuyRaffleTickets', (req, res) => {
    let body = '';
    // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const payload = JSON.parse(body);
        const raffleId =  parseInt(payload[0]["logs"][0]["data"].substring(2,66))
        const numTickets = parseInt(payload[0]["logs"][0]["data"].substring(66,130))
        const buyerAddress = '0x' + payload[0]["logs"][1]["data"].substring(130).replace(/^0+/, '')
        const newEntries = Array(numTickets).fill(buyerAddress)

        console.log("\n\nBuyRaffleTickets:payload:\n\n", payload)
        await db.collection("raffles").doc(raffleId).update({entries : firebase.firestore.FieldValue.arrayUnion(...newEntries)})
    });

    res.send('Success')
})

app.post('/EndRaffle', (req, res) => {
    let body = '';
    // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const payload = JSON.parse(body);
        const raffleId =  parseInt(payload[0]["logs"][0]["data"].substring(2,66))
        const enderAddress = '0x' + payload[0]["logs"][0]["data"].substring(66).replace(/^0+/, '')


        console.log("\n\nEndRaffle:payload:\n\n", payload)
        await db.collection("raffles").doc(raffleId).update({raffleEnded : true})
    });

    console.log("EndRaffle:body \n\n",req.body)
    res.send('Success')
})

app.post('/WithdrawPrize', (req, res) => {
    let body = '';
    // Collect the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const payload = JSON.parse(body);
        const raffleId =  parseInt(payload[0]["logs"][1]["data"].substring(2,66))
        const winnerAddress = '0x' + payload[0]["logs"][1]["data"].substring(66).replace(/^0+/, '')


        console.log("\n\nEndRaffle:payload:\n\n", payload)
        await db.collection("raffles").doc(raffleId).update({prizeClaimed : true, winner: winnerAddress})
    });

    console.log("WithdrawPrize:body \n\n",req.body)
    res.send('Success')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})