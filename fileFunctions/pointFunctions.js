const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
    loadPoints,
    savePoints
}

async function loadPoints() {
  const points = new Map();

  try {
    // Lire le contenu du fichier POINTS_FILE de manière asynchrone
    const content = await readFileAsync("./dataFiles/points.txt", 'utf8');

    // Analyser le contenu et charger les points dans la map
    content.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length === 2) {
        const playerId = parts[0];
        const playerPoints = parseInt(parts[1]);
        points.set(playerId, playerPoints);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return points;
}

async function savePoints(sortedPlayers) {
    try {
      // Créer le contenu à écrire dans le fichier
      const content = sortedPlayers
        .map(entry => `${entry[0]}:${entry[1]}`)
        .join('\n');
  
      // Écrire le contenu dans le fichier POINTS_FILE de manière asynchrone
      await writeFileAsync("./dataFiles/points.txt", content, 'utf8');
    } catch (error) {
      console.error(error);
    }
  }