const { Command } = require( 'discord.js-commando' );

module.exports = class SaydCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'sayd',
			group: 'util',
			memberName: 'sayd',
			description: "Make Snowy\'s Assistant say what you wish.",
			args: [
				{
					key: 'text',
					prompt: "What text would you like Snowy\'s Assistant to say?",
					type: 'string'
				}
			]
		} );
	}

	run( msg, { text } ) {
		msg.delete()

		return msg.say( text )
	}
};
