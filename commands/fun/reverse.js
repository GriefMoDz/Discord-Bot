const { Command } = require( 'discord.js-commando' );

module.exports = class ReverseCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'reverse',
			group: 'fun',
			memberName: 'reverse',
			description: 'Reverses text.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like Cortana to reverse?',
					type: 'string'
				}
			]
		} );
	}

	run( msg, { text } ) {
		msg.delete()

		return msg.say( text.split( "" ).reverse().join( "" ) );
	}
};
