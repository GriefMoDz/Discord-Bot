const Discord = require( 'discord.js' );
const { Command } = require( 'discord.js-commando' );

module.exports = class QuoteCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'quote',
			aliases: [ 'archive' ],
			group: 'moderate',
			memberName: 'quote',
			description: 'Quotes content from a message ID and fowards it to the #archives channel.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Which message ID do you want to quote?',
					type: 'string'
				}
			]
		} );
	}

	async run( msg, { id } ) {
		msg.delete();

		msg.channel.messages.fetch( {
			around: id,
			limit: 1
		} ).then( quote => {
			const embed = new Discord.RichEmbed()
				.setColor( 0x206694 )
				.setAuthor( '${quote.first().author.tag}', quote.first().author.avatarURL() )
				.setDescription( quote.first().content )
				.setTimestamp();

			msg.guild.channels.find( 'name', 'archives' ).send( { embed } );
		} );
	}
};
