{
  /*
import express from "express";
import bodyParser from "body-parser";
import { getStoredItems, storeItems } from "./data/items.js";
import cors from "cors";

const app = express();

app.use(cors()); // Automatically handles all Access-Control headers
app.use(bodyParser.json()); // Parse JSON bodies

// Routes

app.get("/items", async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    res.json({ items: storedItems });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch items." });
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    const item = storedItems.find((item) => item.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    res.json({ item });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch item." });
  }
});

app.post("/items", async (req, res) => {
  try {
    const existingItems = await getStoredItems();
    const itemData = req.body;
    const newItem = {
      ...itemData,
      id: Math.random().toString(),
    };
    const updatedItems = [newItem, ...existingItems];
    await storeItems(updatedItems);
    res.status(201).json({ message: "Stored new item.", item: newItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to store item." });
  }
});

// Start server
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

 */
}
