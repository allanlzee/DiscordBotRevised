const Discord = require('discord.js'); 

const client = new Discord.Client(); 

const prefix = '$'; 

const fs = require('fs'); 

client.commands = new Discord.Collection(); 
// client.messages = new Discord.Collection(); 

// Role IDs: use \@ROLE to get the ID from the Discord message box
const programmer = "840318933910683690"; 
const functionalBot = "840319357627924590"; 
const BETAbot = "840319423410733147"; 
const closedBot = "840319468835176457";
const admin = "840332334753382481";  
 
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js')); 
for (const file of commandFiles) {
    const command = require(`./commands/${file}`); 

    client.commands.set(command.name, command); 
}

client.once('ready', () => {
    console.log("Allan's Bot is ONLINE!");

    client.user.setActivity("JavaScript"); 
    client.guilds.cache.forEach((guild) => {
        console.log(guild.name); 
        guild.channels.cache.forEach((channel) => {
            console.log(` -> ${channel.name} ${channel.type} ${channel.id}`); 
        }); 
        // General Chat ID: 839660448957464627
    }); 

    // Sends Message to the General Chat
    let generalChannel = client.channels.cache.get("839660448957464627");
    generalChannel.send("Allan's Bot is ONLINE!");
    //generalChannel.send("https://github.com/allanlzee"); 

});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(" "); 
    const command = args.shift().toLowerCase(); 

    message.guild.emojis.cache.forEach(customEmoji => {
        console.log(`${customEmoji.name} ${customEmoji.id}`);
        message.react(customEmoji); 
    }); 

    if (message.content.startsWith(prefix)) {
        processCommand(message, args, command); 
    }
});


function processCommand(message, args, command) {
    const firstArgument = args[0]; 
    let secondArgument = undefined; 
    let thirdArgument = undefined; 

    console.log(args);
    console.log(command);

    if (arguments.length >= 2) {
        secondArgument = args[1]; 
    }

    if (arguments.length >= 3) {
        thirdArgument = args[2]; 
    }
    
    let author = message.author.toString();

    switch(command) {
        case "hello":
            client.commands.get('hello').execute(message, args, author);  
            break; 

        case "bot_code":
            client.commands.get('bot_code').execute(message, args); 
            break; 

        case "add_role":
            client.commands.get('add_role').execute(message, args);
            break;

        case "add_role_admin":
            client.commands.get('add_role_admin').execute(message, args); 
            break; 

        case "kick_permissions":
            client.commands.get('kick_permissions').execute(message, args); 
            break;

        case "voice_permissions":
            client.commands.get('voice_permissions').execute(message, args); 
            break; 

        case "roles":
            client.commands.get('roles').execute(message, args); 
            break; 

        case "kick":
            client.commands.get('kick').execute(message, args);
            break;  
        
        case "ban":
            client.commands.get('ban').execute(message, args, user, userTag);
            break; 

        case "roles_permissions":
            client.commands.get('roles_permissions').execute(message, args); 
            break; 

        case "commands":
            client.commands.get('commands').execute(message, args, Discord); 
            break; 

        case "remove_role":
            client.commands.get('remove_role').execute(message, args);
            break; 

        default:
            message.channel.send("Not a valid command."); 
            break; 
    }

}

client.login('TOKEN'); 