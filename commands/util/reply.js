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
					key: 'text',
					prompt: '',
					type: 'string'
				},
				{
					key: 'chan',
					prompt: '',
					type: 'string',
					default: ''
				}
			]
		} );
	}

	run( msg, { chan, text } ) {
		msg.delete();

		let channel_name;
		let guild = client.guilds.get( "271627706326581250" );
		let channel = guild.channels.filter( c => c.type == "text" ).find( 'name', chan );

		if ( chan && channel ) {
			channel.send( "`" + message.author.username + " (" + message.author.id + "): " + text + "`" );

			channel_name = channel.name;
		} else {
			guild.defaultChannel.send( "`" + message.author.username + " (" + message.author.id + "): " + text + "`" );

			channel_name = guild.defaultChannel.name;
		}

		let embed = new Discord.RichEmbed()
			.setColor( 0x206694 )
			.setAuthor( `${ message.author.tag } said:`, message.author.avatarURL )
			.setDescription( text )
			.setTimestamp()
			.setFooter( `Message was sent in #${ channel_name }` );

		client.channels.get( "435197889350860831" ).send( { embed } );
	}
};
