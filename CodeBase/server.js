var express = require("express")
var mongoose = require("mongoose")

var app = express()

var conString = "mongodb://admin:admin@ds038319.mlab.com:38319/mylearning"
app.use(express.static(__dirname))

var Chats = mongoose.model("Chats", {
    name: String,
    chat: String
})

mongoose.connect(conString, { useNewUrlParser: true }, (err) => {
    console.log("Database connection", err)
})

app.listen(3000, () => {
    console.log("Well done, now I am listening...")
})


app.post("/chats", async (req, res) => {
  try {
      var chat = new Chats(req.body)
      await chat.save()
      res.sendStatus(200)
  } catch (error) {
      res.sendStatus(500)
      console.error(error)
  }
})