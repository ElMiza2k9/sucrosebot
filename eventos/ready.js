/**
 * @param {import("discord.js").Client} client 
 */
module.exports = async (client) => {
    const array = [
        {
            name: `a!help | 0.0.1`,
            type: `PLAYING`
        }
    ];

    setInterval(() => {
        function presence() {
            client.user.setPresence({
                status: "idle",
                activity: array[Math.floor(Math.random() * array.length)]
            });
        }

        presence();
    }, 10000);

    console.log("Estoy lista! ♥");
};
