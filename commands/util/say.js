const { Command } = require( 'discord.js-commando' );

module.exports = class SayCommand extends Command {
	constructor( client ) {
		super( client, {
			name: 'say',
			group: 'util',
			memberName: 'say',
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
		return msg.say( text );
	}
};
