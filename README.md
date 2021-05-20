# Smokoko

Dépôt contenant tous les éléments nécessaires au lancement d'un prototype de l'application Smokoko (E-Santé & IoT)

---
## Liste des éléments

```
cd api_repository
```
Le dossier api_repository permet de lancer une api contenant les profils de 3 utilisateurs :
- Sidney fume beaucoup et ne respecte aucun de ses objectifs.
- Gladys fume peu et respecte tous ses objectifs.
- Nick fume moyennement, consomme beaucoup trop de nicotine mais ne dépasse pas le nombre de vap qu'il s'est fixé.

```
cd createdata_repository
```
Le dossier createdata_repository permet de lancer un script ajoutant 3 utilisateurs à l'api. 
Ces 3 utilisateurs reflèteront les 3 profils décrits ci-dessus.

```
cd tama_repository
```
Le dossier tama_repository constitue le coeur du projet.

---

## Commandes utiles

### Avant utilisation de chacun des 3 éléments, installation des dépendances NPM de cet élément : 

```
npm install
```

ou 

```
yarn
```

### Lancement du prototype

En l'état, le prototype ne peut fonctionner sans api. Cependant, l'api est déjà initialisée avec 3 utilisateurs typiques. L'utilisation de createdata_repository est donc complètement optionnelle.

## Lancement de l'api

```
cd api_repository
```
```
npm start
```

## Lancement du prototype

```
cd tama_repository
```
```
npm start
```

