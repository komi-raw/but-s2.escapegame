import { GlobalState } from "./globalState";

export function getCurrentStepAnswer() {
    const stepAnswer = stepsAnswers[GlobalState.savedState.step]
    if (stepAnswer) {
        return stepAnswer();
    }
    return "Pas de solution prévue pour cette étape";
}

export const stepsAnswers = {
    0: () => "E0: Cliquez sur next pour continuer",
    1: () => "E1: Cliquez sur le garde en haut à droite, puis sur le bout de papier qui dépasse de sa poche (vous n'avez pas besoin de retenir le code)",
    2: () => `E1: Cliquez sur la flèche du bas pour voir les cadenas à déverrouiller,
le code de gauche est ${GlobalState.savedState.leftHandCode.toString(2).padStart(8, "0")}, le code de droite est ${GlobalState.savedState.rightHandCode.toString(16).padStart(2, "0")}`,
    10: () => `E2: Il faut taper la commande login, entrer votre nom, puis le mot de passe: ${GlobalState.savedState.LOGIN_PASSWORD}`,
    20: () => `E3: Il faut ouvrir le fichier broken_mouse (commande ls pour voir tous les fichiers), commande: 
cat broken_mouse.
Le fichier cache la commande pour accéder à la suite: man qwerty`,
    30: () => `E4: A la fin du texte qui s'ouvre se trouve la commande pour continuer:
man toto`,
    40: () => `E4: Le texte indique une série de commandes à entrer de manière codée (il est possible de faire un CTRL + C et CTRL + V dans le terminal):
cd /
touch pierre-philosophale ordinateur-quantique
cd mountains
rmdir python cerbere minotaure
rm kraken nyarlathotep
cd ..
mv pierre-philosophale mountains/kilimandjaro
mv ordinateur-quantique mountains/kilimandjaro
cd mountains/kilimandjaro
cp pierre-philosophale ../everest
cp ordinateur-quantique ../everest
cd ..
mkdir abri
cd abri
marionnet`,
    50: () => `E5: Un nouveau dossier network-info a été créé, il faut aller dedans, commandes:
cd ../../network-info
ls`,
    60: () => `E5: Ensuite, il faut faire cat OSI (tous les autres fichiers sont des leurres).
Puis entrer le mot de passe 004 (il s'agit du code représentant les permissions appliquées au fichier sur Linux).`,
    90: () => `E6: La prochaine commande est en bas du fichier, il s'agit de ipconvert
Le masque réseau à entrer est ${maskSizeToMask(GlobalState.savedState.MASK_SIZE)}`,
    100: () => `E7: Il faut maintenant entrer la commande conflictresolve. Puis, comme le texte l'indique, il faut compléter le modèle OSI avec la commande suivante:
setequipment switch transport
Il faut choisir le switch car le hub envoie les informations vers toutes les machines connectées (pas très discret).`,
    110: () => `E8: Maintenant, il est nécessaire d'entrer la commande tshark`,
    120: () => `E9: Pour contacter notre équipe, il faut créer une route entre les deux machines (la notre et celle du gouvernement). Pour cela, il faut entrer la commande:
route ${GlobalState.savedState.IP} ${GlobalState.savedState.IP_GOV} ${maskSizeToMask(GlobalState.savedState.MASK_SIZE)}`,
    130: () => `E9: Il ne reste plus qu'à contacter notre équipe, en faisant un:
ping ${GlobalState.savedState.IP_GOV}`,
}

function maskSizeToMask(maskSize) {
    let resultingIp = ""
    let last = 255;

    for (let y = 0; y < (maskSize - maskSize % 8) / 8; y++) {
        resultingIp += "255.";
    }

    for (let i = 0; i < 32 - maskSize; i++) {
        last -= Math.pow(2, i);
    }

    return resultingIp + last;
}

