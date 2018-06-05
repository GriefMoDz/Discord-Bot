const { Command } = require( 'discord.js-commando' );

module.exports = class RolesCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'roles',
			aliases: [ 'listroles' ],
			group: 'util',
			memberName: 'roles',
			description: 'Displays a listing of every unique role in Snowy\'s Happy Place',
		} );
	}

	async run( msg ) {
		msg.delete();

		let guild = this.client.guilds.get( "271627706326581250" );

		message.channel.send( guild.roles.map( role => role.name ).join( ", " ) ).then( msg => {
			msg.delete( 20000 )
		} );
	}
};
