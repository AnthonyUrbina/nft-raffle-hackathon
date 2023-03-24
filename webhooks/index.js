const express = require('express')
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

const db = admin.firestore();


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
                "ticketPrice" : parseInt('0x' + payload[0]["logs"][1]["data"].substring(322)),
                "entries" : [],
                "prizeClaimed" : false,
                "raffleEnded" : false,
                "winner" : "0x0000000000000000000000000000000000000000",
                // TODO: fix erc20address, raffleEndDate, and isAbortable
                "erc20Address" : "0x0000000000000000000000000000000000000000",
                "raffleEndDate" : Date.now() + 1209600,
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
            const enderAddress = '0x' + payload[0]["logs"][0]["data"].substring(66).replace(/^0+/, '')
            console.log("\n\nEndRaffle:payload:\n\n", payload)
            await db.collection("raffles").doc(raffleId.toString()).update({raffleEnded : true})
        }catch(err){
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