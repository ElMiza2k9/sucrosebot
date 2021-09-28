module.exports = async (client) => {
    client.on("raw", (data) => {
        client.manager.updateVoiceState(data)
    })
};