const { Command } = require( 'discord.js-commando' );
const { MessageEmbed } = require( 'discord.js' )
const opus = require( 'node-opus' );

module.exports = class RadioCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'radio',
			group: 'fun',
			memberName: 'radio',
			description: "",
			args: [
				{
					key: 'command',
					prompt: "",
					type: 'string'
				},
				{
					key: 'argument',
					prompt: "",
					type: 'string',
					default: ''
				}
			]
		} );
	}

	async run( msg, { args } ) {
		msg.delete()

		const cross = msg.guild.emojis.find( "name", "small_cross_mark" );

		const { command, argument } = args;

		if ( command === 'join' ) {
			let voiceChannel = msg.member.voiceChannel;

			if ( voiceChannel ) {
				const embed = new MessageEmbed()
					.setColor( 0x206694 )
					.setDescription( ":arrow_right: Connected! Voice channel: `" + voiceChannel.name + "`." );

				msg.channel.send( { embed } ).then( message => {
					message.delete( 10000 );
				} );

				voiceChannel.join().then( connection => {
					const dispatcher = connection.playStream( argument );

					dispatcher.on( 'end', reason => {
						console.log( reason );
					} );
				} );
			} else {
				const embed = new MessageEmbed()
					.setColor( 0x206694 )
					.setDescription( cross + " Unable to connect. Have you joined a voice-chat channel?" );

				msg.channel.send( { embed } ).then( message => {
					message.delete( 10000 );
				} );
			}
		}

		if ( command === 'leave' ) {
			let voiceChannel = msg.guild.voiceConnection;

			if ( voiceChannel ) {
				const embed = new MessageEmbed()
					.setColor( 0x206694 )
					.setDescription( ":arrow_left: Disconnected! Voice channel: `" + voiceChannel.channel.name + "`." );

				msg.channel.send( { embed } ).then( message => {
					message.delete( 10000 );
				} );

				voiceChannel.disconnect()
			} else {
				const embed = new MessageEmbed()
					.setColor( 0x206694 )
					.setDescription( cross + " Unable to leave. I'm not connected to a voice-chat channel." );

				msg.channel.send( { embed } ).then( message => {
					message.delete( 10000 );
				} );
			}
		}
	}
};
