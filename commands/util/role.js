const Discord = require( 'discord.js' );
const { Command } = require( 'discord.js-commando' );

module.exports = class RoleCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'role',
			aliases: [ 'roleinfo' ],
			group: 'util',
			memberName: 'role',
			description: 'Lists out basic information about the specified role',
			args: [
				{
					key: 'text',
					prompt: '',
					type: 'string'
				}
			]
		} );
	}

	async run( msg, { text } ) {
		msg.delete();

		let guild = client.guilds.get( "271627706326581250" );
		let role = guild.roles.find( 'name', text );

		if ( role === null ) {
			return msg.reply( "couldn't find the specified role. Does it exist?" ).then( message => {
				message.delete( 10000 )
			} );
		}

		let embed = new Discord.RichEmbed()
			.setColor( role.color )
			.setAuthor( `${ role.name }#${ role.id }`, role.guild.iconURL )
			.setDescription( "Role Summary Details" )
			.setThumbnail( role.guild.iconURL )
			.addField( "ID", role.id, true )
			.addField( "Name", role.name, true )
			.addField( "Guild", role.guild, true )
			.addField( "Permissions Bitfield", role.permissions, true )
			.addField( "Creation Date", role.createdAt )
			.addField( "Members", role.members.array().join( ", " ) ? role.members.array().join( ", " ) : "n/a" )
			.setTimestamp()
			.setFooter( `Role was requested by ${ msg.author.username }` );

		msg.channel.send( { embed } ).then( message => {
			message.delete( 20000 )
		} );
	}
};
