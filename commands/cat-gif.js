const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('catvideo')
        .setDescription('Search shutterstock video'),
	async execute(interaction) {
        try{
		    await interaction.reply(random_image(await search("cat")));
        }
        catch(error){
            console.log(error);
            await interaction.reply('There was an error finding cat videos.')
        }
	},
};

// Gets a response from Shutterstock based on a search query
async function search(query) {
    const { SHUTTERSTOCK_API_TOKEN } = require("../config.json");
    const sstk = require("shutterstock-api");
    sstk.setAccessToken(SHUTTERSTOCK_API_TOKEN);

    const videoApi = new sstk.VideosApi();

    const queryParams = {
        "query": query,
        "keyword_safe_search": true,
        "category": "Animals/Wildlife"
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