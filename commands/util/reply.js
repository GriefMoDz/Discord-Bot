const { Command } = require( 'discord.js-commando' );

module.exports = class ReplyCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'reply',
			group: 'util',
			memberName: 'reply',
			description: 'Sends back a reply to the specified channel.',
			args: [
				{
					key: 'chan',
					prompt: '',
					type: 'string'
				},
				{
					key: 'text',
					prompt: '',
					type: 'string'
				}
			]
		} );
	}

	run( msg, { args } ) {
		msg.delete();

		const { chan, text } = args;

		try {
			client.guilds.map( guild => {
				guild.channels.map( channel => {
					if ( !channel.type == "text" ) return;

					if ( channel.name === chan || chan.id === chan ) {
						channel.send( "`" + message.author.username + " (" + message.author.id + "): " + text + "`" )
					}
				} );
			} );
		} catch ( e ) {
			console.error ( e )
		}
	}
};
