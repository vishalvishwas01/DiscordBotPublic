const {Client, GatewayIntentBits, Message} = require("discord.js");
const dotenv = require("dotenv")
const fetch = require("node-fetch");
const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Join my discord on https://discord.gg/QTf4nKyu");
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
],
});

client.on('messageCreate', async(message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        
        const parts = message.content.split(" ");
        const url = parts[1];
        
        await message.reply({
            content:"Generating Short ID please wait",
        })

        const res = await fetch(`${process.env.URL}url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url:url }),
        });
        const data = await res.json();
        await message.reply({
        content: `Here is your short URL: ${process.env.URL}` + data.id,
        });

        
    } else {

        message.reply({
            content:"Hi I am vishal's bot"
        })
    }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "create") {
    const url = interaction.options.getString("url");

    await interaction.reply("Generating Short ID please wait...");

    try {
      const res = await fetch(`${process.env.URL}url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      await interaction.editReply(
        "Here is your short URL: https://urlshortner-ccuk.onrender.com/" + data.id
      );
    } catch (error) {
      console.error(error);
      await interaction.editReply("Error while creating short URL");
    }
  }
});


client.login(process.env.LOGIN)