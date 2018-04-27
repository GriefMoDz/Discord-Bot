const { BOT_DURATION, BOT_PREFIX, BOT_OWNER, BOT_TOKEN } = process.env;
const { CommandoClient } = require( 'discord.js-commando' );
const { MessageEmbed } = require( 'discord.js' );
const path = require( 'path' );

const client = new CommandoClient( {
	commandPrefix: BOT_PREFIX,
	owner: BOT_OWNER,
	disableEveryone: true,
	unknownCommandResponse: false,
	disabledEvents: [ 'TYPING_START' ]
} );

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

	const duration = ( BOT_DURATION % 60000 ) / 1000;

	console.log( `[NOTIFICATION] Activity status will cycle randomly every ${ duration } seconds.` );

	client.user.setActivity( `${ client.users.size } users`, { type: 2 } );

	client.setInterval( () => {
		const guild = client.users;
		const members = guild.filter( member => member.presence.status !== 'offline' && !member.bot ).map( member => member.username );

		if ( member.length > 1 ) {
			client.user.setActivity( members[ Math.floor( Math.random() * members.length ) ], { type: 2 } );
		} else {
			client.user.setActivity( 'myself', { type: 2 } );
		}
	}, BOT_DURATION );
} );

client.on( 'message', message => {
	if ( message.author.bot || message.channel.type == "dm" ) {
		return;
	}
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

client.on( 'error', error => {
	console.error( `[ERROR] `, error );
} );

client.on( 'warn', error => {
	console.warn( `[WARNING] `, error );
} );

client.login( BOT_TOKEN );

process.on( 'unhandledRejection', error => {
	console.log( `[FATAL] Unhandled Promise Rejection: `, error );

	process.exit( 1 );
} );
