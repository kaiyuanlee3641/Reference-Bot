const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Get a random image, use a search term if you\'d like')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Search query')
            .setRequired(false)),
	async execute(interaction) {
        try{
            if (interaction.options.getString("input") === null) query = ""; else query = interaction.options.getString("input");
            await interaction.reply(random_image(await search(interaction.options.getString("input"))));
        }
        catch(error){
            console.log(error)
            await interaction.reply('There was an error finding image.')
        }
	},
};

// Gets a response from Shutterstock based on a search query
async function search(query) {
    const { SHUTTERSTOCK_API_TOKEN } = require("../config.json");
    const sstk = require("shutterstock-api");
    sstk.setAccessToken(SHUTTERSTOCK_API_TOKEN);

    const imagesApi = new sstk.ImagesApi();

    const queryParams = {
        "query": query,
        "image_type": "photo",
        "keyword_safe_search": true
    };

    return await imagesApi.searchImages(queryParams);
}

function random_image(response) {
    // Gets a random image from the results
    // console.log(response);
    // console.log(response.data)
    return response.data[Math.floor(Math.random()*response.data.length)]
            ["assets"]["preview_1000"]["url"]
}