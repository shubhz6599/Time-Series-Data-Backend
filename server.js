const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/time_series_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for the time series data
const timeSeriesSchema = new mongoose.Schema({
    timestamp: Date,
    variable1: Number,
    variable2: Number,
    variable3: Number,
    variable4: Number,
    variable5: Number,
    variable6: Number,
    variable7: Number,
    variable8: Number,
    variable9: Number,
    variable10: Number,
});

// Create a model based on the schema
const TimeSeries = mongoose.model('TimeSeries', timeSeriesSchema);

app.use(cors())
// Middleware to parse JSON in request body

app.use(express.json());

// Define the API endpoint to receive and store time series data
app.post('/api/time-series', async (req, res) => {
    try {
        const {
            timestamp = String(new Date()),
            variable1,
            variable2,
            variable3,
            variable4,
            variable5,
            variable6,
            variable7,
            variable8,
            variable9,
            variable10,
        } = req.body;

        // Validate data format and structure (you can customize this)
        console.log(timestamp);
        if (!timestamp || typeof timestamp !== 'string') {
            return res.status(400).json({ error: 'Invalid timestamp' });
        }
        if (variable1 == "" || null) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        // Create a new time series data instance
        const newTimeSeriesData = new TimeSeries({
            timestamp,
            variable1,
            variable2,
            variable3,
            variable4,
            variable5,
            variable6,
            variable7,
            variable8,
            variable9,
            variable10,
        });

        // Save the data to the database
        await newTimeSeriesData.save();

        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/api/time-series/', async (req, res) => {
    try {
        const getData = await TimeSeries.find({});
        res.status(200).send({ "status": "Success", "message": "Data Retrived", "data":getData });


     } catch (e) {
         res.status(400).send(e);
     }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
