const {REST, Routes, ApplicationCommandOptionType} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const commands = [
  {
    name: 'create',
    description: 'Creates a new short URL',
    options: [
      {
        name: "url",
        description: "The URL you want to shorten",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.LOGIN);

(async()=>{
    try {
        console.log('Started refreshing application (/) commands.');
        
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();