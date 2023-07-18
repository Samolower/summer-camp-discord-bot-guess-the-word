const fs = require('fs');

module.exports = {
    readWord,
    isFileNotEmpty,
    writeWord,
    removeContent
}

function readWord(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.trim().toLowerCase();
  } catch (err) {
    console.error(err);
    return;
  }
}

function isFileNotEmpty(filePath) {
  try {
      const stats = fs.statSync(filePath);
      return stats.size !== 0;
  } catch (err) {
      console.error(err);
      return false;
  }
}

function writeWord(word) {
  const filePath = "./dataFiles/wordtofind.txt";
  fs.writeFile(filePath, word, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function removeContent(filePath) {
  try {
    fs.writeFileSync(filePath, ''); // Écrit une chaîne vide pour vider le fichier
  } catch (error) {
    console.error(error);
  }
}