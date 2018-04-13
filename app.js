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
	console.log( `[READY] Successfully logged into user "${ client.user.username }"!` )

	const duration = ( config.duration % 60000 ) / 1000;

	console.log( `[NOTIFICATION] Activity status will cycle randomly every ${ duration } seconds.` );

	client.user.setActivity( 'Netflix by myself', { type: 3 } );

	client.setInterval( () => {
		const username = users[ Math.floor( Math.random() * users.length ) ];

		client.user.setActivity( 'Netflix with ' + username, { type: 3 } );
	}, config.duration );
} );

client.on( 'disconnect', event => {
	console.warn( `[DISCONNECT] Successfully disconnected with code '${ event.code }'.` )

	process.exit( 0 )
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
	let guild = member.guild

	guild.defaultChannel.send( `**${ member.user.username }** just left **${ member.guild }**. Didn't want you here anyway, smh ;-;.` )
} );

client.on( 'message', message => {
	if ( message.author.id === 173032609465630720 ||  message.guild.id === 261815420326117386 ) {
		for( var i = 0; i < blacklist.length; i++ )
			if ( message.content.includes( blacklist[ i ] ) ) {
				message.delete();

				message.channel.send( { file: [ "./assets/images/prohibited.png" ] } );

				const embed = new Discord.RichEmbed()
					.setColor( 0x206694 )
					.setDescription( ":warning: `" + message.author.username + "` used a blacklisted word (`" + blacklist[ i ] + "`)." );
					.addField( 'MESSAGE', "```js\n" + message.content + "\n```" );

				message.guild.channels.find( 'name', 'weeb_palace' ).send( { embed } );

				break;
			}
		}
	}
} );

client.on( 'error', error => {
	console.error( `[ERROR] `, error )
} );

client.on( 'warn', error => {
	console.warn( `[WARNING] `, error )
} );

client.login( process.env.token );

process.on( 'unhandledRejection', error => {
	console.log( `[FATAL] Unhandled Promise Rejection: `, error )

	process.exit( 1 )
} );

