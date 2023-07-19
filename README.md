
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/samolower/summer-camp-discord-bot-guess-the-word">
    <img src="images/cryptoFR_summer_camp.png" alt="Crypto FR - Summer Camp" >
  </a>

  <h3 align="center">Crypto FR Summer Camp - Guess the word !</h3>

  <p align="center">
    Devinez les expressions cryptos qui se cachent derrière les images.
    <br />
    <a href="https://github.com/samolower/summer-camp-discord-bot-guess-the-word/issues">Signaler un bug</a>
    ·
    <a href="https://ithub.com/samolower/summer-camp-discord-bot-guess-the-word/issues">Demander une nouvelle fonctionnalité</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Chapitres</summary>
  <ol>
    <li>
      <a href="#about-the-project">Qu'est ce que le projet "Guess the word !" ?</a>
      <ul>
        <li><a href="#built-with">Les technos utilisées</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Démarrer</a>
      <ul>
        <li><a href="#prerequisites">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Utilisation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contribuer</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## Qu'est ce que le projet "Guess the word !" ?

"Guess the word !" fait partie des projets développés lors du Summer Camp Crypto FR 2023.
Le projet est développé par [la communauté Crypto FR](https://communaute-crypto.fr/).

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>


<!-- GETTING STARTED -->
## Démarrer

Voici les instructions à suivre pour démarrer le projet en local.

### Les technos utilisées

Le projet est développé en Javascript avec un serveur NODE.JS et la bibliothèque discord.js.

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

### Prerequisites

Voici les élémens à avoir en local avant de démarrer :
* npm
* Node.js
* Avoir une clée d'API de bot Discord


### Installation

1. Cloner le repo
   ```sh
   git clone https://github.com/Samolower/summer-camp-discord-bot-guess-the-word.git
   ```
2. Se déplacer dans le répertoire du projet
   ```sh
   cd summer-camp-discord-bot-guess-the-word
3. Installation des dépendences
   ```sh
   npm install
   ```
4. Renomer le `.env.sample` en `.env``
   ```sh
   mv .env.sample .env
   ```
5. Modifier la clé d'api du bot dans le `.env`
   ```sh
   BOT_TOKEN="Insert your bot token"
   ```

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>



<!-- USAGE EXAMPLES -->
## Utilisation

1. Créez 3 channels sur votre discord : 
   1. Ladder : Ou le classement des uitlisateurs sera affiché et mis à jour automatiquement par le bot.
   2. Guess : Ou les admins pourront lancer de nouveaux mots avec /guess.
   3. Game : Ou les utilisateurs cherche le mot. Le bot validera automatiquement les réponses.
2. Créer les variables d'environnement dans le fichier .env :
   ```sh
   mv .env-sample .env
   ```
   Avec :
   ```sh
    BOT_TOKEN="Insert your bot token"
    CHAN_ID_NEW_WORD="Where images are added using /guess"
    CHAN_ID_LADDER="Where ladder is displayed"
    CHAN_ID_GAME="Where members can try to find the word"
   ```

3. Inviter le bot sur son discord et lui positionner les droits Admin.
4. Lancer le bot :
   1. En local:
   ```sh
   node main.js
   ```

   2. Via Docker :
   ```sh
   docker compose up
   ```

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

<!-- ROADMAP -->
## Roadmap

Allez sur [open issues](https://github.com/samolower/summer-camp-discord-bot-guess-the-word/issues) afin de suivre la liste des évolutions en cours.

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

<!-- CONTRIBUTING -->
## Contribuer

Le projet est open source et toutes les contributions sont les bienvenues.

Afin de contribuer, voici la marche à suivre :

1. Créer un compte Github
2. Fork le projet
3. Créer sa branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
4. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
5. Push les changements (`git push origin feature/AmazingFeature`)
6. Faire une Pull Request sur Github.

Pour que vos modifications soient acceptées, elles doivent :
- Avoir un commentaire sur chaque commit. En anglais.
- Le code doit être clair et commenté.
- La branche de votre projet doit suivre `feature/feature_name`

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

<!-- LICENSE -->
## Licence

Le projet est open source, distributé sous licence MIT. Voir `LICENCE` pour plus d'informations.

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>


<!-- CONTACT -->
## Contact

Discord : [Discord](https://discord.gg/crypto-fr)

Twitter : [@Crypto_FR_](https://twitter.com/Crypto_FR_)

Project Link : [https://github.com/samolower/summer-camp-discord-bot-guess-the-word](https://github.com/samolower/summer-camp-discord-bot-guess-the-word)

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/samolower/summer-camp-discord-bot-guess-the-word.svg?style=for-the-badge
[contributors-url]: https://github.com/Samolower/summer-camp-discord-bot-guess-the-word/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Samolower/summer-camp-discord-bot-guess-the-word.svg?style=for-the-badge
[forks-url]: https://github.com/Samolower/summer-camp-discord-bot-guess-the-word/network/members
[stars-shield]: https://img.shields.io/github/stars/samolower/summer-camp-discord-bot-guess-the-word.svg?style=for-the-badge
[stars-url]: https://github.com/samolower/summer-camp-discord-bot-guess-the-word/stargazers
[issues-shield]: https://img.shields.io/github/issues/samolower/summer-camp-discord-bot-guess-the-word.svg?style=for-the-badge
[issues-url]: https://github.com/samolower/summer-camp-discord-bot-guess-the-word/issues
[license-shield]: https://img.shields.io/github/license/samolower/summer-camp-discord-bot-guess-the-word.svg?style=for-the-badge
[license-url]: https://github.com/Samolower/summer-camp-discord-bot-guess-the-word/blob/main/LICENSE
