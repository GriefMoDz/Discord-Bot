const { Command } = require( 'discord.js-commando' );
const { MessageEmbed } = require( 'discord.js' );

module.exports = class PingCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'ping',
			aliases: [ 'pong' ],
			group: 'util',
			memberName: 'ping',
			description: 'Checks the bot\'s ping to the Discord server.',
			guarded: true
		} );
	}

	async run( msg ) {
		msg.delete();

		const embed = new Discord.RichEmbed()
			.setColor( 0x206694 )
			.setDescription( ":ping_pong: Pong! The API latency is: `" + Math.round( this.client.ping * 10 ) / 10 + " ms`." );

		msg.channel.send( { embed } ).then( message => {
			message.delete( 10000 );
		} );
	}
};
