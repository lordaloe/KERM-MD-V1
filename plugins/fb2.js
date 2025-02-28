const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "fb2",
    desc: "Downloads a Facebook video using the API and sends it with its caption.",
    react: "📹",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { text, reply }) => {
    try {
        // Extract the Facebook video URL from the command arguments
        const args = text.split(" ");
        const videoUrl = args[1];
        if (!videoUrl) {
            return reply("❌ Please provide a Facebook video URL. Example: *facebook https://www.facebook.com/...*");
        }

        // Construct the API URL with the provided video URL (encoded to handle special characters)
        const apiUrl = `https://api.giftedtech.my.id/api/download/facebook?apikey=gifted&url=${encodeURIComponent(videoUrl)}`;
        console.log(`Requesting API: ${apiUrl}`);

        // Make a GET request to the API
        const response = await axios.get(apiUrl);
        if (!response.data) {
            return reply("❌ No response from API.");
        }

        // Check if the API returned an error
        if (response.data.error) {
            return reply(`❌ API Error: ${response.data.error}`);
        }

        // Extract video details from the API response
        // The API is assumed to return a "result" object with properties "url" for the video link and "caption" for the caption.
        const result = response.data.result;
        if (!result) {
            return reply("❌ Unable to retrieve video details from API.");
        }
        const downloadLink = result.url || result.link;
        const caption = result.caption || "Facebook Video";

        if (!downloadLink) {
            return reply("❌ Unable to get the video download link from API.");
        }

        // Send the video file with the caption to the chat
        await conn.sendFile(m.from, downloadLink, "video.mp4", caption, m);
    } catch (e) {
        console.error('Error while executing facebook command:', e);
        reply("❌ An error occurred while executing the command.");
    }
});
