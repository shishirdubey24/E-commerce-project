import fs from "fs";
import path from "path";

const filePath = path.join("public", "items.json");
const raw = fs.readFileSync(filePath, "utf-8");
let json = JSON.parse(raw);

const nestedItems = json.items[0];

const updatedNestedItems = nestedItems.map((item) => {
  if (item.image) {
    const fileName = path.basename(item.image, path.extname(item.image)); // e.g., "13"
    item.image = `/newImages/${fileName}.webp`;
  }
  return item;
});

json.items[0] = updatedNestedItems;

fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
