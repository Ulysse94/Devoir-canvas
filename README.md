# Projet Canvas

Ce canvas est un petit jeu où il faut avoir une bonne mémoire.

## Explication du jeu

À gauche de la page, il y a un bouton pour lancer le jeu. Ce bouton a plusieurs états
* Lancer le Jeu --> le joueur doit cliquer pour lancer le script
* Bot Progress --> le joueur voie un chemin qu'il devra reproduire
* Game in process --> lle joueur doit cliquer sur les cases en fonction de la séquence précédente

### La génération des carrés

On met les données dans une constante
``` javascript
const button = {}
button.x = (windowWidth / 2) - 275
button.y = (windowHeight / 2) - 275
button.color = 175
button.identity = 0
```
Et on n'oublie pas de mettre la position et l'identité de chaque carré

``` javascript
positionButton = [button.x, button.y, button.identity]
position.push(positionButton)
```

### Le ciblage aléatoire à copier

Le bouton à gauche lance le jeu.
Et on obtient une séquence aléatoire de carré.
``` javascript
let i = Math.floor(Math.random()*16)
context.beginPath()
context.rect(position[i][0] - 5, position[i][ - 5, 110, 110)
context.fillStyle = 'black'
context.fill()
bot.push(i)
```
Ici, on peut remarquer que c'est le bot qui ne montre pas la séance car il y a une bordure noire sur les carrés sélectionnés.

Pour désigner les carrés, on utilise un setInterval pour qu'ils n'apparaissent pas tous en même temps.

### Le ciblage pour l'utilisateur

Aux cliques de l'utilisateur dans les carrés du canvas uniquement,
``` javascript
for (let i = 0; i < 16; i++) {
    let x = (cursor.x - position[i][0]) / 100
    let y = (cursor.y - position[i][1]) / 100
    if (((0 > x || x > 1) == false) && ((0 > y || y > 1) == false)) {}
}
```
L'identité du carré est extraite
``` javascript
positionButton = [button.x, button.y, button.identity]
position.push(positionButton)
position[i][2] //Identité du carré
```
Puis, celle-ci est comparée avec la séquence du Bot.
S'il y a correspondance, le jeu continu.
S'il n'y a pas de correspondance, le jeu est fini. 

### Niveaux de difficulté

Il y a trois difficultés:
* Simple: 5 carrés à mémoriser
* Moyen: 8 carrés à mémoriser
* Difficile: 10 carrés à mémoriser

Ils sont sélectionnés grâce à
``` html
<option value="5" name="Simple">Simple</option>
<option value="8" name="Moyen">Moyen</option>
<option value="10" name="Difficile">Difficile</option>
```
Mais aussi
``` javascript
counter = document.querySelector("select").value
```

## Features sonores
Il y a quatres types de sons
* victoir (win.mp3)
* défaite (loose.mp3)
* séléction du bot (bot.mp3)
* séléction de l'utilisateur (player.mp3)

