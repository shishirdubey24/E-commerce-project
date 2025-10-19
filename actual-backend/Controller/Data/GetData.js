// actual-backend/Controller/Data/GetData.js
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const getData = (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, "../../items.json");

    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const items = parsedData.items;

    const start = (page - 1) * limit;
    const paginatedItems = items.slice(start, start + limit);
    //now get the actual images for each item:
    const host = `${req.protocol}://${req.get("host")}`;

    const updatedItems = paginatedItems.map((item) => ({
      ...item,
      image: `${host}/images/${path.basename(item.image)}`,
    }));
    // send paginated response with total count
    res.json({
      items: updatedItems,
      totalItems: items.length,
      currentPage: page,
      totalPages: Math.ceil(items.length / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};
