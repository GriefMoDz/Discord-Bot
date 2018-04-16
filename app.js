const Discord = require( 'discord.js' );
const { CommandoClient } = require( 'discord.js-commando' );
const config = require( './config.json' );
const path = require( 'path' );

const client = new CommandoClient( {
	commandPrefix: config.prefix,
	owner: config.owners,
	disableEveryone: true,
	unknownCommandResponse: false,
	disabledEvents: [ 'TYPING_START' ]
} );

const blacklist = require( './assets/json/blacklist' );
const users = require( './assets/json/users' );

client.registry
	.registerDefaultTypes()
	.registerGroups( [
		[ 'fun', 'Fun' ],
		[ 'moderate', 'Moderation' ],
		[ 'util', 'Utility' ]
	] )
	.registerDefaultGroups()
	.registerDefaultCommands( {
		commandState: false,
		help: false,
		ping: false,
		prefix: false
	} )
	.registerCommandsIn( path.join( __dirname, 'commands' )
);

client.on( 'ready', () => {
	console.log( `[READY] Successfully logged into user "${ client.user.username }"!` );

	const duration = ( config.duration % 60000 ) / 1000;

	console.log( `[NOTIFICATION] Activity status will cycle randomly every ${ duration } seconds.` );

	client.user.setActivity( 'Netflix by myself', { type: 3 } );

	client.setInterval( () => {
		const username = users[ Math.floor( Math.random() * users.length ) ];

		client.user.setActivity( 'Netflix with ' + username, { type: 3 } );
	}, config.duration );
} );

client.on( 'disconnect', event => {
	console.warn( `[DISCONNECT] Successfully disconnected with code '${ event.code }'.` );

	process.exit( 0 );
} );

client.on( 'guildMemberAdd', member => {
	let guild = member.guild;

	if ( member.user.bot ) {
		let bot_role = guild.roles.find( 'name', 'IT Team 🔨' );
	
		member.addRole( bot_role );
	} else {
		let role = guild.roles.find( 'name', 'General Population 🌏' );
	
		member.addRole( role );
	}
} );

client.on( 'guildMemberRemove', member => {
	let guild = member.guild;

	guild.defaultChannel.send( `**${ member.user.username }** just left **${ member.guild }**. Didn't want you here anyway, smh ;-;.` );
} );

client.on( 'message', message => {
	let guild = message.guild;

	const alt_codes = [ "À", "Á", "Â", "Ã", "Ä", "Å", "à", "á", "â", "ã", "ä", "å", "Ò", "Ó", "Ô", "Õ", "Õ", "Ö", "Ø", "ò", "ó", "ô", "õ", "ö", "ø", "È", "É", "Ê", "Ë", "è", "é", "ê", "ë", "ð", "Ç", "ç", "Ð", "Ì", "Í",
			   "Î", "Ï", "ì", "í", "î", "ï", "Ù", "Ú", "Û", "Ü", "ù", "ú", "û", "ü", "Ñ", "ñ", "Š", "š", "Ÿ", "ÿ", "ý", "Ž", "ž" ]

	if ( alt_codes.some( character => message.content.includes( character ) ) ) {
		message.delete();

		const embed = new Discord.RichEmbed()
			.setColor( 0x206694 )
			.setDescription( ":no_entry_sign: Sorry, but the following character `(" + character + "`) has been blacklisted by someone that inherits a higher role than you." )
			.setFooter( "If your name is Atlas, you can kindly fuck off and form swear words with Alt Codes somewhere else." );

		message.channel.send( { embed } ).then( msg => {
			msg.delete( 30000 );
		} );
	}

	if ( guild.defaultChannel && message.author.id === 173032609465630720 ) {
		for( var i = 0; i < blacklist.length; i++ ) {
			if ( message.content.toLowerCase().includes( blacklist[ i ] ) ) {
				message.delete();

				message.channel.sendFile( './assets/images/prohibited.png' ).then( msg => {
					msg.delete( 30000 );
				} );

				const embed = new Discord.RichEmbed()
					.setColor( 0x206694 )
					.setDescription( ":warning: `" + message.author.username + "` tried to use a blacklisted word (`" + blacklist[ i ] + "`) in the `" + message.channel.name + "` text channel." )
					.addField( 'Message Sent', "```js\n" + message.content + "\n```" );

				message.guild.channels.find( 'name', 'log' ).send( { embed } );

				break;
			}
		}
	}
} );

client.on( 'error', error => {
	console.error( `[ERROR] `, error );
} );

client.on( 'warn', error => {
	console.warn( `[WARNING] `, error );
} );

client.login( process.env.token );

process.on( 'unhandledRejection', error => {
	console.log( `[FATAL] Unhandled Promise Rejection: `, error );

	process.exit( 1 );
} );
