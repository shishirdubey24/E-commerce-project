import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolder = "./public/images";
const outputFolder = "./public/newImages";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach((file) => {
  const inputFile = path.join(inputFolder, file);
  const outputFile = path.join(outputFolder, path.parse(file).name + ".webp");

  sharp(inputFile)
    .webp({ quality: 80 })
    .toFile(outputFile)
    .then(() => console.log(`Converted: ${file} -> ${outputFile}`))
    .catch((err) => console.error(`Error converting ${file}:`, err));
});
