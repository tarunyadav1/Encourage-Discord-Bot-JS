const Discord = require("discord.js")
const fetch = require('node-fetch')
const Database = require("@replit/database")

const db = new Database()

const client = new Discord.Client()

const sadWords = ['sad', "depressed", "unhappy","angry"]

const starterEncouragements = [
  "Cheer up!",
  "Hang in there.",
  "You are a great person / bot!"
]

// database

db.get("encouragements").then(value => {
  if(!value || value.length < 1){
    db.set("encouragements"  , starterEncouragements)
  }
})

function updateEncouragement(message) {
  db.get('encouragements').then()
}


function getQuote(){
  return fetch("https://zenquotes.io/api/random")
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data[0]['q'] + " -" + data[0]['a']
  })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} ` )
})

client.on('message', msg => {

  if(msg.author.bot) return

  if(msg.content === "$inspire"){
    getQuote().then(quote =>  msg.channel.send(quote) )
   
  }

  if(sadWords.some(word => msg.content.includes(word))){
    const encouragement = starterEncouragements[Math.floor(Math.random() * starterEncouragements.length)]
    msg.reply(encouragement)
  }
})






client.login(process.env.TOKEN)