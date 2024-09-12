<div align="center">
  <a href="https://potits-chats.com/" target="_blank">
    <img src="src/assets/logo-potit-chat.png" alt="Logo" width="60" height="60">
  </a>
  <h2 align="center">Potits Chats: Frontend</h2>

  <p align="center">
    Le frontend de Potits Chats, une plateforme d'adoption de chats, développée avec Angular.
    <br />
    <br />
  </p>

  [![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/Potits-chats/frontend/badge)](https://scorecard.dev/viewer/?uri=github.com/Potits-chats/frontend)
</div>

## Table des Matières
<details>
  <summary>Table des Matières</summary>
  
  - [Fonctionnalités](#fonctionnalités)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Documentation](#documentation)
  - [Technologies](#technologies)
  - [Détails de l'Architecture du Projet](#détails-de-larchitecture-du-projet)
  - [Linting et Formatage](#linting-et-formatage)
  - [Extensions](#extensions)
</details>

## Fonctionnalités

- ⚡️ **Rapidité** : Utilise Angular pour des performances rapides et efficaces.
- 🐱 **Adoption de Chats** : Une plateforme dédiée à l’adoption de chats avec des fonctionnalités modernes.
- 🎨 **Interface Réactive** : Utilisation des dernières technologies pour une interface utilisateur fluide et modulaire.
- 🔧 **Modularité** : Composants réutilisables et code bien structuré.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)

- Serveur Backend en cours d'exécution (voir le dépôt [backend](https://github.com/potits-chats/backend))

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Installation

1. Clonez le dépôt du projet :
    ```bash
    git clone https://github.com/potits-chats/frontend.git
    cd frontend
    ```

2. Installez les dépendances du projet :
    ```bash
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires (voir un membre de l'équipe pour obtenir les valeurs).

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Utilisation

Pour démarrer le serveur de développement :
```bash
npm run start:dev
```

Pour construire une version de production :
```bash
npm run build
```

## Documentation

Pour générer la documentation compodoc, exécutez la commande suivante :

```bash
npm run doc
```

Pour visualiser la documentation, ouvrez le fichier `documentation/index.html` dans votre navigateur.

Il y a aussi une documentation potits-chats disponible sur le google drive de l'équipe.


<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Technologies

Ce projet est construit avec les principaux frameworks et bibliothèques suivants :

| Framework/Bibliothèque | Description |
|:-----:|-------------|
| ![Angular][Angular-url] | Framework web pour la création d'applications côté client modernes |
| ![TailwindCSS][TailwindCSS-url] | Framework CSS utilitaire pour un développement UI rapide |
| ![PrimeNG][PrimeNG-url] | Bibliothèque de composants UI pour Angular |
| ![RxJS][RxJS-url] | Programmation réactive avec des observables |
| ![TypeScript][TypeScript-url] | Langage de programmation typé qui se compile en JavaScript |
| ![Pusher][Pusher-url] | API de messagerie en temps réel pour les applications web et mobiles |

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Détails de l'Architecture du Projet

- **src/** : Contient tout le code source de l'application.
  - **assets/** : Ce répertoire contient les ressources statiques comme les images, les fichiers CSS globaux, etc.
  - **components/** : Ce répertoire contient des composants Angular réutilisables. Chaque composant représente une partie de l'interface utilisateur, comme un bouton ou un formulaire.
  - **services/** : Ce répertoire contient les services de l'application, tels que les appels API via HttpClient, les fonctions utilitaires, etc.
  - **views/** : Ce répertoire contient les composants Angular correspondant aux différentes pages de l'application.
  - **app.module.ts** : Le module racine de l'application où sont déclarés les composants et les services.
  - **main.ts** : Le fichier principal d'entrée où Angular est initialisé.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Linting et Formatage

Pour garantir une haute qualité de code et maintenir la cohérence du style, nous utilisons ESLint et Prettier. Voici comment les configurer et les utiliser dans votre projet.

### Installation des Plugins

Assurez-vous que les plugins ESLint et Prettier sont installés :

2. Vérifiez que les fichiers de configuration .eslintrc.js et .prettierrc sont présents à la racine du projet.

### Exécuter ESLint

Pour analyser votre code et vérifier sa conformité avec les règles ESLint, exécutez :

npm run lint   

Ce script analysera tous les fichiers JavaScript et Angular dans le répertoire src et signalera les erreurs ou les avertissements.

Pour corriger automatiquement les erreurs et les avertissements, exécutez :

npm run lint:fix

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Extensions

### Extensions Nécessaires

Les extensions suivantes sont fortement recommandées pour une meilleure expérience de développement :

- ESLint : Intégration d'ESLint pour VS Code.
- Prettier : Extension de formatage de code pour VS Code.
- Angular Language Service : Service de langage pour Angular dans VS Code.

### Extensions Recommandées

Les extensions suivantes sont recommandées pour améliorer la productivité et la qualité du code :
- Tailwind CSS IntelliSense : IntelliSense pour Tailwind CSS.
- Path Intellisense : Autocomplétion des noms de fichiers dans VS Code.
- Auto Rename Tag : Renommage automatique des balises HTML associées.
- Turbo Console Log : Améliore le logging dans la console de débogage.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Angular-url]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[TailwindCSS-url]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Express-url]: https://expressjs.com/
[RxJS-url]: https://img.shields.io/badge/RXJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white
[PrimeNG-url]: https://img.shields.io/badge/PrimeNG-DD0031?style=for-the-badge&logo=primeng&logoColor=white
[TypeScript-url]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Pusher-url]: https://img.shields.io/badge/Pusher-300D4F?style=for-the-badge&logo=pusher&logoColor=white

<!-- Url extensions -->
[ESLint-url]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[Prettier-url]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[AngularLS-url]: https://marketplace.visualstudio.com/items?itemName=Angular.ng-template
[TailwindIntelliSense-url]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
[PathIntellisense-url]: https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense
[AutoRenameTag-url]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
[TurboConsoleLog-url]: https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log
