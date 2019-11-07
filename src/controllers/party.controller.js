module.exports = app => {
    getAllParties = (req, res) => {
        res.send("All Parties");
    }

    app.get('/api/parties', getAllParties);
}