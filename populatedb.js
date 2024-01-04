const mongoose = require("mongoose");
const Item = require("./models/item");

// Get MongoDB URL and collection name from command line arguments
const mongoDBUrl = process.argv[2];
const collectionName = "items"; // Specify the collection name
if (!mongoDBUrl) {
  console.error("Usage: node populatedb.js <mongoDBUrl>");
  process.exit(1);
}

// Connect to the MongoDB database
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection was successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Set the collection name when creating the Item model
const ItemInCollection0 = mongoose.model("Item", Item.schema, collectionName);

// Function to create and save a random item in the specified collection
const createRandomItem = async () => {
  try {
    const randomItem = new ItemInCollection0({
      name: "Random Item",
      description: "This is a randomly generated item.",
      category: "Random Category",
      price: Math.random() * 100, // Random price between 0 and 100
      numberInStock: Math.floor(Math.random() * 50), // Random stock between 0 and 50
    });

    await randomItem.save();
    console.log(
      "Random item added to the database in Collection0:",
      randomItem
    );
  } catch (error) {
    console.error("Error creating and saving random item:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the function to create and save a random item
createRandomItem();
