const Discord = require( 'discord.js' )
const { Command } = require( 'discord.js-commando' );
const opus = require( 'opusscript' );

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

	async run( msg, args ) {
		msg.delete()

		const { command, argument } = args;

		if ( command === "join" ) {
			let voiceChannel = msg.member.voiceChannel;

			if ( voiceChannel ) {
				voiceChannel.join().then( connection => {
					let stream = "http://wz3web.scahw.com.au/live/3fox_128.stream/playlist.m3u8";

					const embed = new Discord.RichEmbed()
						.setColor( 0x206694 )
						.setDescription( ":arrow_right: Connected! Voice channel: `" + voiceChannel.name + "`." );

					msg.channel.send( { embed } ).then( message => {
						message.delete( 10000 );
					} );

					connection.playStream( stream );
				} );
			} else {
				const embed = new Discord.RichEmbed()
					.setColor( 0x206694 )
					.setDescription( ":negative_squared_cross_mark: Unable to connect. Have you joined a voice-chat channel?" );

				msg.channel.send( { embed } ).then( message => {
					message.delete( 10000 );
				} );
			}
		}

		if ( command === "leave" ) {
			let voiceChannel = msg.member.voiceChannel;

			if ( voiceChannel ) {
				voiceChannel.leave()
			} else {
				const embed = new Discord.RichEmbed()
					.setColor( 0x206694 )
					.setDescription( ":negative_squared_cross_mark: Unable to leave. I'm not connected to a voice-chat channel." );

				msg.channel.send( { embed } ).then( message => {
					message.delete( 10000 );
				} );
			}
		}
	}
};
