module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/*
Liste des fonctionnalités/options utilisées dans ce fichier :

- content : Définit les fichiers à scanner pour générer les classes CSS utilisées (ici tous les fichiers JS/TS/JSX/TSX du dossier src).
- theme : Permet de personnaliser le thème Tailwind (ici, rien n'est étendu).
- plugins : Permet d'ajouter des plugins Tailwind (aucun ici).

Ce fichier sert à configurer Tailwind CSS pour le projet React.
*/