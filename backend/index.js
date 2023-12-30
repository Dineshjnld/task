const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 4000;

const uri = "mongodb+srv://dineshjnld:Dineshjnld22@cluster0.nqs3gl4.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: false, // Set to true in production with valid certificates
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/data', async (req, res) => {
  try {
    await client.connect();

    // Specify the database and collection
    const database = client.db("scheduler");
    const collection = database.collection("Doctor");

    // Query the collection and retrieve data
    const result = await collection.find({}).toArray();

    res.json(result[0].data); // Send the data as JSON response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
