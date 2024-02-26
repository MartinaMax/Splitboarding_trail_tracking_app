const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Swagger require
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");

// Swagger setup
const swaggerDef = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDef));

// Importing routes
const trailRoutes = require("./routes/trail");
const authRoutes = require("./routes/authorization")

require("dotenv-flow").config();


// Parse request of content type JSON
app.use(bodyParser.json());


mongoose.connect 
(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB database:" + error ));

mongoose.connection.once("open", () => console.log("Connected succesfully to MongoDB"))



// CRUD 
app.use("/api/trail", trailRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port:" + PORT);
})

module.exports = app;