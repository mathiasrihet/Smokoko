# Smokoko

Dépôt contenant tous les éléments nécessaires au lancement d'un prototype de l'application Smokoko (E-Santé & IoT)

Luc Pinot - Erwan Plantec - Mathias Rihet - Mickael Zlatkov

---
## Liste des éléments

```
cd api_repository
```
Le dossier api_repository utilise Strapi pour simuler une api contenant 3 collections : People, Tamagotchis et Vaps


```
cd createdata_repository
```
Le dossier createdata_repository permet de lancer un script ajoutant 3 utilisateurs à l'api. 
Ces 3 utilisateurs reflèteront les 3 profils suivants (identifiables à leur objnic):
- Le premier fume beaucoup et ne respecte aucun de ses objectifs. (objnic: 2)
- Le second fume peu et respecte tous ses objectifs. (objnic: 8)
- Le troisième fume moyennement, consomme beaucoup trop de nicotine mais ne dépasse pas le nombre de vap qu'il s'est fixé. (objnic: 4)

:bangbang: Le script génère des données mais pas d'images, il faudra donc ajouter les skins de tamagotchi à la main :bangbang:



```
cd tama_repository
```
Le dossier tama_repository constitue le coeur du projet. Son principe de fonctionnement est détaillé dans notice.pdf

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
---
## Lancement du prototype

En l'état, le prototype ne peut fonctionner sans api. Cependant, l'api est déjà initialisée avec 3 utilisateurs typiques. L'utilisation de createdata_repository est donc complètement optionnelle.

### Initialisation de l'api 
http://localhost:1337/ par défault

```
cd api_repository
```
```
npm install
```
Pour installer les dépendances, puis
```
npm run develop
```
Une fois Strapi lancé:
- Créer un compte admin
- Cocher toutes les permissions dans Settings -> USERS & PERMISSIONS PLUGIN -> Roles -> Public, puis sauvegarder
- Upload dans Media Library les 9 images présentes dans le dossier ./skins du dépôt Smokoko

### Génération des données pour l'api 
Dans un second terminal
```
cd createdata_repository
```
```
npm install
```
```
npm start
```

NB: Pour que les tamagotchis puissent s'afficher, il faut retourner dans Strapi,dans la collection Tamagotchis et associer 3 images à chaque tamagotchi (ch1,ch2,ch3)

### Lancement de l'application
http://localhost:3000/ par défaut  
Dans un nouveau terminal
```
cd tama_repository
```
```
npm start
```

Il suffit ensuite de se log avec le pseudo d'un des utilisateurs générés précédemment dans Strapi
