const Discord = require( 'discord.js' );
const { Command } = require( 'discord.js-commando' );

module.exports = class LookupCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'lookup',
			aliases: [ 'userinfo' ],
			group: 'util',
			memberName: 'lookup',
			description: 'Lists out basic information about the mentioned user',
			guildOnly: true
		} );
	}

	async run( msg ) {
		msg.delete();

		let member = msg.guild.member( msg.mentions.user.first() );

		if ( member === null ) {
			return msg.reply( "couldn't find the specified user. Please use a mention tag if you haven't done so already." ).then( message => {
				message.delete( 10000 )
			} );
		}

		let embed = new Discord.RichEmbed()
			.setColor( 0x206694 )
			.setAuthor( `${ member.user.tag }`, member.user.avatarURL )
			.setDescription( "User Account Details" )
			.setThumbnail( member.user.avatarURL )
			.addField( "ID", member.user.id, true )
			.addField( "Nickname", member.user.nick ? member.user.nick : "n/a", true )
			.addField( "Status", ( member.user.presence.status ).charAt( 0 ).toUpperCase() + ( member.user.presence.status ).slice( 1 ), true )
			.addField( "Playing", member.user.presence.game ? member.user.presence.game.name : "n/a", true )
			.addField( "Creation Date", member.user.createdAt )
			.addField( "Join Date", member.joinedAt )
			.addField( "Roles", member.roles.map( role => role.name ).join( ", " ) )
			.setTimestamp()
			.setFooter( `Lookup was requested by ${ message.author.username }` );

		msg.channel.send( { embed } ).then( message => {
			message.delete( 20000 )
		} );
	}
};
