const express = require("express")
const cors = require("cors")
const monk = require("monk")
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv").config()

const app = express()
const PORT = 5000 || process.env.PORT
const db = monk("localhost/twitterClone" || process.env.MONGO_URI)
const tweets = db.get("tweets")

console.log(process.env)


app.use(cors())
app.use(express.json())



app.listen(PORT, () => {
    console.log("listening on http://localhost:%d", PORT)
})



app.get("/tweets", (req,res) => {
    tweets.find()
        .then(tweets => {
            res.json(tweets)
        })
})


function isValidTweet(tweet){
    return tweet.name && tweet.name.toString().trim() !== '' && tweet.name.toString().trim().length <= 50 &&
    tweet.message && tweet.message.toString().trim() !== '' && tweet.message.toString().trim().length <= 140;
}


app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })
)


app.post("/tweets", (req,res) => {
    if(isValidTweet(req.body)){
        const tweet = {
            "name": req.body.name.toString(),
            "message" : req.body.message.toString(),
            "date": new Date()
        }

        tweets
            .insert(tweet)
            .then(createdTweet => {
                res.json(createdTweet)
            })

    }else{
        res.status(422)
        res.json({message: "invalid input"})
    }
})