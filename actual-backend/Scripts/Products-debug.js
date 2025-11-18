// actual-backend/Scripts/Products-debug.js
// Run from actual-backend/:  node Scripts/Products-debug.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ConnectDb from "../Model/MongoDB.js";
import ProductModel from "../Model/ProductSchema.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const itemsPath = path.join(__dirname, "../items.json");

// Load + normalize JSON (supports either: [ ... ] OR { "items": [ ... ] })
let parsed;
try {
  const raw = fs.readFileSync(itemsPath, "utf8");
  parsed = JSON.parse(raw);
} catch (err) {
  console.error("FAILED to load/parse items.json:", err.message);
}

const itemsArray = Array.isArray(parsed)
  ? parsed
  : Array.isArray(parsed.items)
  ? parsed.items
  : null;

if (!itemsArray) {
  console.error(
    "items.json does not contain an array at root or an 'items' array property."
  );
}

console.log("Loaded items type: array");
console.log("Total items in file:", itemsArray.length);

// Diagnostics: find missing id, missing required fields, duplicate ids, leading-space keys
const missingId = [];
const missingFields = [];
const duplicateIds = [];
const idSet = new Set();
const leadingSpaceKeys = new Set();

for (let i = 0; i < itemsArray.length; i++) {
  const it = itemsArray[i];

  if (!it || typeof it !== "object") {
    missingFields.push({ index: i, reason: "not an object", item: it });
    continue;
  }

  // detect leading-space keys like " discount_percentage"
  Object.keys(it).forEach((k) => {
    if (k !== k.trim()) leadingSpaceKeys.add(k);
  });

  // id checks
  if (!("id" in it) || it.id === undefined || String(it.id).trim() === "") {
    missingId.push({ index: i, item: it });
  } else {
    const id = String(it.id).trim();
    if (idSet.has(id)) duplicateIds.push({ index: i, id });
    idSet.add(id);
  }

  // check presence of image/company (schema had these as required previously)
  const required = ["image", "company"];
  const miss = required.filter(
    (f) => !(f in it) || it[f] === undefined || String(it[f]).trim() === ""
  );
  if (miss.length)
    missingFields.push({ index: i, id: it.id, missing: miss, item: it });
}

// Summary
console.log("\nProblems summary:");
console.log(" - items missing id:", missingId.length);
console.log(
  " - items missing required fields (image/company):",
  missingFields.length
);
console.log(" - duplicate ids:", duplicateIds.length);
console.log(
  " - leading-space keys found:",
  leadingSpaceKeys.size ? [...leadingSpaceKeys] : 0
);

// Print examples (small sample)
if (missingId.length) {
  console.log("\nExamples missing id (first 5):");
  console.log(JSON.stringify(missingId.slice(0, 5), null, 2));
}
if (missingFields.length) {
  console.log("\nExamples missing fields (first 5):");
  console.log(JSON.stringify(missingFields.slice(0, 5), null, 2));
}
if (duplicateIds.length) {
  console.log("\nDuplicate id examples (first 5):");
  console.log(JSON.stringify(duplicateIds.slice(0, 5), null, 2));
}

if (leadingSpaceKeys.size) {
  console.log("\nLeading-space keys detected (you should rename these keys):");
  console.log([...leadingSpaceKeys]);
}

// Build valid items (filter out entries missing id)
const validItems = itemsArray.filter(
  (it) =>
    it &&
    typeof it === "object" &&
    "id" in it &&
    it.id !== undefined &&
    String(it.id).trim() !== ""
);

if (validItems.length === 0) {
  console.error("No valid items to insert. Fix items.json and re-run.");
}

console.log("\nValid items count (will insert):", validItems.length);

// OPTIONAL: If you want to auto-fix leading-space keys, uncomment helper below and run normalize instead.
// function fixLeadingKeys(obj) { /* implement if needed */ }

// Insert valid items (connect to DB, clear collection, insert)
const InsertProducts = async () => {
  try {
    await ConnectDb(); // should connect mongoose
    console.log("DB connected. Clearing existing Products collection...");
    await ProductModel.deleteMany({});
    console.log("Inserting valid items...");
    await ProductModel.insertMany(validItems, { ordered: false });
    console.log("Inserted valid items successfully.");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    try {
      await mongoose.disconnect();
    } catch (e) {
      /* ignore */
      console.log(e);
    }
  }
};

InsertProducts();
