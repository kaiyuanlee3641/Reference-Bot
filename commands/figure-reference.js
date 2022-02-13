const { SlashCommandBuilder } = require('@discordjs/builders');
const { createClient } =require('pexels');
const { PEXELS_API_TOKEN } = require("../config.json")
const client = createClient(PEXELS_API_TOKEN);

module.exports = {
	data: new SlashCommandBuilder()
        .setName('figure')
        .setDescription('Finds a random figure drawing reference photograph for you')
        .addStringOption(option => 
            option.setName('bodypart')
            .setDescription('The specific body part you want to draw, if you have one')
            .setRequired(false)
            .addChoice('Feet', 'only bare feet')
            .addChoice('Hands', 'hands')
            .addChoice('Arms', 'arms')
            .addChoice('Legs', 'legs')
            .addChoice('Head', 'face'))
        .addStringOption(option => 
            option.setName('chromosomes')
            .setDescription('Which biological gender if any')
            .setRequired(false)
            .addChoice('XX', 'female')
            .addChoice('XY', 'male'))
,
	async execute(interaction) {
        let query = ""
        if(interaction.options.getString('bodypart') === null) {
            query = "model person full body"
        }
        else {
            query = interaction.options.getString('bodypart');
        }
        // Tack on 'gender' if requested
        if (interaction.options.getString('chromosomes')) {
            query = query + " " + interaction.options.getString('chromosomes')
        }
        console.log(query);
        await interaction.reply(await random_image(query));
	},
};

// Gets a response from Pexels based on a search query
async function search(query) {

    const queryParams = {
        "query": query,
        "per_page": 1,
        "size": "medium"
    };
    return await client.photos.search(queryParams);
}

async function random_image(query) {
    // Gets a random image from the results
    // console.log(response);

    // Get the number of responses
    const first_results = await search(query)
    const total_results = first_results.total_results

    // To improve quality, don't go beyond the 100th image
    const page = Math.ceil(Math.random()*(Math.min(total_results/2, 100)))

    // Get a specific page
    queryParams = {
        "query": query,
        "page": page,
        "per_page": 1,
        "size": "medium"
    };
    const newSearch = await client.photos.search(queryParams)

    return newSearch.photos[0]["src"]["original"]
}