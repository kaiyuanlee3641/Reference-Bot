const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('randvideo')
        .setDescription('Search shutterstock video')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Search query')
            .setRequired(true)),
	async execute(interaction) {
        try{
		    await interaction.reply(random_image(await search(interaction.options.getString("input"))));
        }
        catch(error){
            console.log(error)
            await interaction.reply('There was an error finding videos.')
        }
	},
};

// Gets a response from Shutterstock based on a search query
async function search(query) {
    const SHUTTERSTOCK_API_TOKEN = process.env.SHUTTERSTOCK_API_TOKEN;
    const sstk = require("shutterstock-api");
    sstk.setAccessToken(SHUTTERSTOCK_API_TOKEN);

    const videoApi = new sstk.VideosApi();

    const queryParams = {
        "query": query,
        "keyword_safe_search": true
    };

    return await videoApi.searchVideos(queryParams);
}

function random_image(response) {
    // Gets a random image from the results
    // console.log(response);
    // console.log(response.data)
    return response.data[Math.floor(Math.random()*response.data.length)]
            ["assets"]["preview_mp4"]["url"]
}