import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from  "./dao/reviewsDAO.js"
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const MongoClient = mongodb.MongoClient;
const ServerApiVersion = mongodb.ServerApiVersion;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.yrfho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
MongoClient.connect(
    uri,
    {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
    })
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
      await ReviewsDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })