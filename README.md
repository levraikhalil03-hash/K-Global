# K-Global

K-Global est une page d'accueil de navigateur avec une ambiance nébuleuse et une recherche qui envoie réellement l'utilisateur vers Google.

## Fonctionnement

- La barre de recherche lance une vraie requête vers `https://www.google.com/search`.
- Par défaut, Google s'ouvre dans l'onglet courant pour donner l'impression d'un vrai départ vers Google.
- L'option **Ouvrir Google dans un nouvel onglet** permet de garder K-Global ouvert pendant que Google s'ouvre à côté.
- Les recherches rapides et l'historique local relancent aussi de vraies recherches Google.
- Le retour à K-Global se fait avec le bouton retour du navigateur, ou en gardant K-Global ouvert grâce à l'option nouvel onglet.

## Développement

```bash
npm run start
```

## Build

```bash
npm run build
```
index.html
