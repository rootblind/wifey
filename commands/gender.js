const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class GenderAnalyzeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gender-analyze',
			aliases: ['gender', 'guess-gender', 'analyze-gender', 'gender-guess'],
			group: 'analyze',
			memberName: 'gender',
			description: 'Determines the gender of a name.',
			args: [
				{
					key: 'name',
					prompt: 'What name do you want to determine the gender of?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { name }) {
		try {
			const { body } = await request
				.get(`https://api.genderize.io/`)
				.query({ name });
			if (!body.gender) return msg.say(`I have no idea what gender ${body.name} is.`);
			return msg.say(`I'm ${body.probability * 100}% sure ${body.name} is a ${body.gender} name.`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};