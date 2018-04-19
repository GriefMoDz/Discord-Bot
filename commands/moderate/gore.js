const Discord = require( 'discord.js' );
const { Command } = require( 'discord.js-commando' );

module.exports = class GoreCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'gore',
			group: 'moderate',
			memberName: 'gore',
			description: "Automatically adds the 'Disgusting Person 🤢' role to the message caller.",
		} );
	}

	async run( msg ) {
		msg.delete();

		const role = msg.guild.roles.find( "name", "Disgusting Person 🤢" );

		if ( role ) {
			if ( msg.member.roles.find( "name", "Disgusting Person 🤢" ) ) {
				const embed = new Discord.RichEmbed()
					.setColor( 0x206694 )
					.setDescription( ":small_cross_mark: Well, this embarrassing. It seems you've already been assigned to the `Disgusting Person 🤢` role. Would you like to remove access? Type `Y` for 'Yes' or `N` for 'No'." )

				msg.channel.send( { embed } ).then( message => {
					msg.channel.awaitMessages( result => result.delete(), {
						max: 1,
						time: 30000,
						errors: [ 'time' ]
					} ).then( ( collected ) => {
						if ( collected.first().content === 'Y' ) {
							const embed = new Discord.RichEmbed()
								.setColor( 0x206694 )
								.setDescription( ":small_check_mark: You've been removed from the `Disgusting Person 🤢` role. Take care, `" + msg.author.username + "`!" );

							msg.member.removeRole( role );

							return msg.channel.send( { embed } );
						} else if ( collected.first().content === 'N' ) {
							return;
						}
					} ).catch( () => {
						const embed = new Discord.RichEmbed()
							.setColor( 0x206694 )
							.setDescription( ":timer: Timed out! You didn't answer the question in time." )

						msg.channel.send( { embed } ).then( message => {
							message.delete( 10000 );
						} );
					} );

					message.delete( 30000 );
				} );
			} else {
				const embed = new Discord.RichEmbed()
					.setColor( 0x206694 )
					.setDescription( ":small_check_mark: You've been automatically assigned to the `Disgusting Person 🤢` role. Stay safe, `" + msg.author.username + "`!" );

				msg.member.addRole( role );

				msg.channel.send( { embed } );
			}
		} else {
			const embed = new Discord.RichEmbed()
				.setColor( 0x206694 )
				.setDescription( ":small_cross_mark: Couldn't find `Disgusting Person 🤢` role. Does it exist?" );

			msg.channel.send( { embed } ).then( message => {
				message.delete( 10000 );
			} );
		}
	}
};
