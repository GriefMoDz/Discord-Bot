const { Command } = require( 'discord.js-commando' );

module.exports = class SayCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'say',
			group: 'util',
			memberName: 'say',
			description: 'Make Cortana say what you wish.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like Cortana to say?',
					type: 'string'
				}
			]
		} );
	}

	run( msg, { text } ) {
		return msg.say( text, { tts: true } );
	}
};
