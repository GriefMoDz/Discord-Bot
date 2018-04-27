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

		msg.channel.fetchMessages( {
			limit: 1,
			around: id
		} ).then( message => {
			let quote = message.first();

			var embed = new Discord.RichEmbed()
				.setColor( 0x206694 )
				.setDescription( `:pencil: ${ msg.author.username } published a quote of ${ quote.author.username }.` )
				.addField( 'Message Quoted:', "```css\n" + quote.content + "\n```" );

			msg.guild.channels.find( "name", "log" ).send( { embed } );

			embed = new Discord.RichEmbed()
				.setColor( 0x206694 )
				.setAuthor( `${ quote.author.username } (${ quote.author.id })`, quote.author.avatarURL )
				.setDescription( quote.content )
				.setFooter( `Created at ${ quote.createdAt }` );

			msg.guild.channels.find( "name", "archives" ).send( { embed } );
		} );
	}
};
