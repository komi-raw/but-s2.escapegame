import { GlobalState, nextStep } from "../../globalState"
import { formatImage, format, STYLE, COLORS } from "./formatEcho"
import helpChmodImg from "./../images/chmod.png"
import { InstructionPopup } from "../../common/InstructionPopup"
import sentences from "./../../sentences.json"

export default {
    qwerty: () => {
        return `_MAN - Documentation QWERTY_ {{ keyboard }}
Ce système est en cours de développement, il reste donc encore des bugs...

Salut ${GlobalState.savedState.loggedIn}, 
nous avons réussi à rentrer dans leur système pour te laisser ce message au plus vite (en espérant que tu le vois). 

Ils vont prochainement renforcer la protection du système,
nous n'avons rien trouvé sur l'attaque, tu devras donc te débrouiller seul.

Ainsi, nous voulions te laisser des instructions pour la suite, personne d'autre ne pourra venir sur cette page.

Tu vas devoir retrouver leur programme de communication, 
pour cela nous avons mis en place une backdoor et t'avons laissés des instructions.

Elles sont codées, car elles sont situées dans une autre page du manuel bien plus accessible aux yeux de tous. 
Les limitations du système nous empêche d'écrire plus ici. Bonne chance !

Maintenant, dirige toi vers "man toto", n'oublie pas le man est ton ami si tu es bloqué à n'importe quel moment.`},

    toto: () => {
        nextStep(40);
        return `_MAN - A Linux Story_ {{ hat-wizard }}
Il était une fois, un héro qui devait sauver le monde.

Pour ce faire, ses instructions étaient nombreuses et il devait absolument les *suivre dans l'ordre*.
Durant son périple, il savait qu'il pourrait toujours compter sur ses vieux amis *eLSa* et *PoWDel* pour retrouver son chemin.

Son périple commença... Il fabriqua *d'un seul coup deux objets magiques depuis la racine*.
Ces objets étaient une *pierre-philosophale* et un *ordinateur-quantique*.

Il devait se rendre dans des lieux extraordinaires pour y déposer ces deux objets.
Des lieux tel que l'*Everest* ou le *Kilimandjaro*, deux impressionnantes *montagnes*.

Mais sur son chemin, il rencontra des monstres, certains de la taille de dossiers, d'autres de petits fichiers.
Pour réussir, il devait se battre contre tous ces monstres et les *éliminer*.

Une fois les monstres vaincus, il restait tout de même un problème.
Il n'avait que deux objets et devait déposer les deux sur chacune des montagnes.
Une solution, grâce à ses pouvoirs, il devait les *copier dans l'autre montagne*.

Une fois ses objets magiques déposés, *il se construit un abri tel un dossier*, entre les deux montagnes.
Depuis cet abri, il ne lui restait qu'une seule chose à faire pour espérer sauver le monde, *il devait invoquer le saint marionnet !*`},

    pwd: () => `Quand tu es perdu, il te dira ou tu es.
Syntaxe: pwd`,

    mv: () => `Avec _mv_, déplacer tu pourras.
Syntaxe: mv <file|folder> <folder>`,

    cp: () => `Avec _cp_, copier tu pourras.
Syntaxe: cp <file|folder> <folder>`,

    rm: () => `Avec _rm_, supprimer tu pourras.
Syntaxe: rm <file1> <file2> ...`,

    mkdir: () => `Avec _mkdir_, créer tu pourras.
Syntaxe: mkdir <folder1> <folder2> ...`,

    cat: () => `Avec _cat_, afficher tu pourras.
Syntaxe: cat <file>`,

    ls: () => `Avec _ls_, lister tu pourras.
Syntaxe: ls (<folder>)`,

    rmdir: () => `Avec _rmdir_, supprimer tu pourras
Syntaxe: rmdir <folder1> <folder2> ...`,

    touch: () => `Avec _touch_, créer tu pourras
Syntaxe: touch <file1> <file2> ...`,

    cd: () => `Avec _cd_, te déplacer tu pourras
Syntaxe: cd <folder>
`,

    route: () => `The _route_ tool help you link two IPs by specifying them.
Use the command this way :
${format("route <origin-IP> <destination-IP> <subnet-mask>", STYLE.UNDERLINE, COLORS.GOOD, COLORS.NONE)}
Example of a wrong utilisation :
${format("route <origin-IP> <subnet-mask> <destination-IP>", STYLE.UNDERLINE, COLORS.BAD, COLORS.NONE)}

A wrong usage of the _route_ tool will lead to an _not functional route_ error.
This error means that a route can not be added between the two IPs.
Verify if the entered values are correct.`,

    tshark: () => `The _tshark_ will display the incoming communications on the local network.
Use the command this way :
_tshark_
Example of a wrong utilisation :
_tshark <any-other-argument>_`,

    equipment: () => `The hub and switch are both network equipments that permits the network configuration to handle connections between machines.
The switch allows to listen every communications on the network.
The hub allows to see every machines on the network.`,

    osi: () => `The OSI model is a communication norm.
All the functionalities have to be set in order for the network communication to work.
The layers are respecting a pre-configured list.
If the layers are wrong. The network configuration will not work properly.`,

    permissions: () => {
        new InstructionPopup(sentences["aide-permissions"].title, sentences["aide-permissions"].message).render();
        return `${formatImage(helpChmodImg)}`
    }
}