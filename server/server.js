const express = require('express');
const axios = require('axios');
const dotenv = require("dotenv").config();
const cors = require('cors'); // Import cors

const key = process.env.apiKey;

const app = express();

// Enable all CORS requests
app.use(cors());

// Define routes
// Function to fetch n stocks
const fetchStocks = async (n) => {
    try {
        const response = await axios.get('https://api.polygon.io/v3/reference/tickers/', {
            params: {
                apiKey: key,
                limit: n,
            },
        });

        const stocks = response.data.results.map((stock, index) => {
            const openPrice = stock.day?.open;
            return {
                name: stock.name,
                symbol: stock.ticker,
                last_updated_utc: stock.last_updated_utc,  
                openPrice: openPrice !== undefined ? openPrice : Math.floor(Math.random() * 1000) + 50,
            };
        });

        return stocks;
    } catch (error) {
        // console.error('Error fetching stocks:', error);
        return [];
    }
};

// Route to fetch n stocks
app.get('/api/stocks/:n', async (req, res) => {
    const { n } = req.params;
    const stocks = await fetchStocks(parseInt(n, 10));
    res.json(stocks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
