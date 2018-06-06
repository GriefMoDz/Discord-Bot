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

	run( msg, { text, chan } ) {
		msg.delete();

		let channel_name;
		let guild = this.client.guilds.get( "271627706326581250" );
		let channel = guild.channels.filter( c => c.type == "text" ).find( 'name', chan );

		if ( chan && channel ) {
			channel.send( "`" + msg.author.username + " (" + msg.author.id + "): " + text + "`" );

			channel_name = channel.name;
		} else {
			guild.defaultChannel.send( "`" + msg.author.username + " (" + msg.author.id + "): " + text + "`" );

			channel_name = guild.defaultChannel.name;
		}

		let embed = new Discord.RichEmbed()
			.setColor( 0x206694 )
			.setAuthor( `${ msg.author.tag } said:`, msg.author.avatarURL )
			.setDescription( text )
			.setTimestamp()
			.setFooter( `Message was sent in #${ channel_name }` );

		this.client.channels.get( "435197889350860831" ).send( { embed } );
	}
};
