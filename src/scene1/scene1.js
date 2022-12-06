import './scene1.css';
import urlImgVcenter from './images/vcenter.jpg';
import urlImgVleft from './images/vleft.png';
import urlImgVright from './images/vright.jpg';
import urlImgVbottom from './images/vbottom.jpg';
import urlImgCadena from './images/vbottom.jpg';
import urlImgVcenter1 from './images/vcenter1.jpg';
import { GlobalState, nextStep } from '../globalState';
import sentences from "../sentences.json";
import { InstructionPopup } from "../common/InstructionPopup";
import { ConfirmDialog } from '../SweetAlert';


//codeAscii
const LOGIN_PWD = GlobalState.savedState.LOGIN_PASSWORD;
let ascii = "";
for (let i = 0; i < LOGIN_PWD.length; i++) {
    ascii = ascii + " " + LOGIN_PWD[i].charCodeAt(0);
}

const codeAscii = document.querySelector('#codeAscii');
codeAscii.textContent = ascii;

//Easters egg
const shrek = document.querySelector('#shrek');
const btTelevision = document.querySelector('#btTelevision');
toggleElementsVisibility(false, shrek);

//Variables boutons vue horizontale
let btLeft = document.querySelector('#left');
let btRight = document.querySelector('#right');
let btBottom = document.querySelector('#bottom');
let btTop = document.querySelector('#top');

//Visibilité false au debut 
toggleElementsVisibility(false, btLeft, btRight, btBottom);


//Variables boutons cadenas
let btCadenaLeft = document.querySelector('#cadena_gauche');
let btCadenaRight = document.querySelector('#cadena_droite');
let btBackToCadenaL = document.querySelector('#backToLockL');
let btBackToCadenaD = document.querySelector('#backToLockD');
toggleElementsVisibility(false, btCadenaRight, btCadenaLeft, btTop);


//Variable + initialisitation vue visibilité
let vue = document.querySelector('#vue');
vue.src = urlImgVcenter1;

//Variables enigmes + initialisation visibilité
let enigmeCadenaGauche = document.querySelector('#enigmeCadenaGauche');
let enigmeCadenaDroite = document.querySelector('#enigmeCadenaDroite');
let enigmeBinaireCG = document.querySelectorAll('.btBinaryCode');
let enigmeHexaCD = document.querySelectorAll('.btHexaCode');
let btsHexaCode = document.querySelector('#btsHexaCode');
let randomNumberLeft = document.querySelector('#randomNumberLeft');
let randomNumberRight = document.querySelector('#randomNumberRight');
let btValidationLeft = document.querySelector('#btUnlockLeft');
let btValidationRight = document.querySelector('#btUnlockRight');
let imgLockRight = document.querySelector('#lockR');
let imgLockLeft = document.querySelector('#lockL');
let imgUnlockRight = document.querySelector('#unlockR');
let imgUnlockLeft = document.querySelector('#unlockL');
//Random number indice
let randomLeft = Math.floor(Math.random() * 256);
let randomRight = Math.floor(Math.random() * 256);

GlobalState.updateSavedState({ leftHandCode: randomLeft, rightHandCode: randomRight });

//Random number text
randomNumberLeft.textContent = randomLeft;
randomNumberRight.textContent = randomRight;

toggleElementsVisibility(false, enigmeCadenaGauche, enigmeCadenaDroite, ...enigmeBinaireCG, ...enigmeHexaCD, btsHexaCode, randomNumberLeft, imgUnlockLeft, imgUnlockRight);

//Aide hexa jamie
let aideHexa = document.querySelector('#aideHexa');
let btAideHexa = document.querySelector('#btAideHexa');
toggleElementsVisibility(false, aideHexa, btAideHexa);

//Aide binaire
let aideBin = document.querySelector('#aideBin');
let btAideBin = document.querySelector('#btAideBin');
toggleElementsVisibility(false, aideBin, btAideBin);

//Tab bouton binary Code
let binaryCode = [0, 0, 0, 0, 0, 0, 0, 0];

enigmeBinaireCG.forEach((e) => {
    e.addEventListener('click', () => {
        let idx = parseInt(e.dataset.id);
        binaryCode[idx] = parseInt(e.textContent);

        binaryCode[idx] = binaryCode[idx] == 0 ? 1 : 0; //Remplace if , else

        e.textContent = binaryCode[idx];
    })
})



btValidationLeft.addEventListener('click', () => {
    let binaryResult = "";
    let randomDecimalToString = "";
    for (let i = 0; i < binaryCode.length; i++) {
        binaryResult = binaryResult + binaryCode[i];
    }
    randomDecimalToString = (randomLeft.toString(2));
    if (randomDecimalToString.padStart(8, "0") === binaryResult) {
        btValidationLeft.remove();
        btCadenaLeft.remove();
        imgLockLeft.remove();
        toggleElementsVisibility(true, imgUnlockLeft);
        GlobalState.updateSavedState({ isLeftHandFree: true });
    }
    if (isFree()) {
        const phrase = sentences["libre"];
        new InstructionPopup(phrase.title, phrase.message).render();
    }
})

btValidationRight.addEventListener('click', () => {
    let hexaResult = "";
    let randomDecimalToString = "";
    for (let i = 0; i < hexaCode.length; i++) {
        hexaResult = hexaResult + hexaCode[i].toString(16);
    }
    randomDecimalToString = (randomRight.toString(16));
    if (randomDecimalToString.padStart(2, "0") === hexaResult) {
        btCadenaRight.remove();
        btValidationRight.remove();
        imgLockRight.remove();
        toggleElementsVisibility(true, imgUnlockRight);
        GlobalState.updateSavedState({ isRightHandFree: true });
    }

    if (isFree()) {
        const phrase = sentences["libre"];
        new InstructionPopup(phrase.title, phrase.message).render();
    }
})

let hexaCode = [0, 0];

enigmeHexaCD.forEach((e) => {
    e.addEventListener('click', () => {
        let idx = parseInt(e.dataset.id);
        hexaCode[idx] = parseInt(e.textContent, 16);
        if (hexaCode[idx] >= 0 && hexaCode[idx] < 15) {
            hexaCode[idx] = hexaCode[idx] + 1;
        } else {
            hexaCode[idx] = 0;
        }
        e.textContent = hexaCode[idx].toString(16);

    })
})

enigmeHexaCD.forEach((e) => {
    e.addEventListener('contextmenu', () => {
        let idx = parseInt(e.dataset.id);
        hexaCode[idx] = parseInt(e.textContent, 16);
        if (hexaCode[idx] > 0 && hexaCode[idx] < 16) {
            hexaCode[idx] = hexaCode[idx] - 1;
        } else {
            hexaCode[idx] = 15;
        }
        e.textContent = hexaCode[idx].toString(16);
    });
})

//Disable context menu right click
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);


//Variables boutons indices + initialisation visibilité
let btIndice1 = document.querySelector('#btIndice1'); //indice image du milieu
let btIndice2 = document.querySelector('#btIndice2'); //indice image de droite
let btIndice3 = document.querySelector('#btIndice3'); //indice image de gauche
let btIndice1Carnet = document.querySelector('#btIndice1Carnet'); // Indice carnet
toggleElementsVisibility(false, btIndice3, btIndice2, btIndice1Carnet);
//Variable indices gros plan
let indice3 = document.querySelector('#indice3');
let indice1Garde = document.querySelector('#indice1Garde');
let indice1Carnet = document.querySelector('#indice1Carnet');
let indice2 = document.querySelector('#indice2');
toggleElementsVisibility(false, indice3, indice1Garde, indice1Carnet, indice2);



//Variable pour changer d'images
let idxImg = 1
let tab = [urlImgVleft, urlImgVcenter, urlImgVright];

//Fonctions visibilité
function setVisibilityBtLeftRight() {
    if (idxImg == 0) {
        toggleElementsVisibility(false, btLeft, btBottom, btIndice2, btIndice1, shrek, btTelevision, btPorte);
        toggleElementsVisibility(true, btIndice3, btAideBin);
        shrekOn = false;
    } else if (idxImg == 1) {
        toggleElementsVisibility(true, btLeft, btRight, btBottom, btTelevision);
        toggleElementsVisibility(false, btIndice3, btIndice2);
        if (isFree()) {
            toggleElementsVisibility(true, btPorte);
        }
    } else if (idxImg == 2) {
        toggleElementsVisibility(false, btRight, btBottom, btIndice3, btIndice1, shrek, btTelevision, btPorte);
        toggleElementsVisibility(true, btIndice2, btAideHexa);
        shrekOn = false;
    }
}

function toggleElementsVisibility(show, ...elements) {
    for (const element of elements) {
        if (show) {
            element.classList.remove('invisible');
        } else {
            element.classList.add('invisible');
        }
    }
}



//Boutons fleches
btLeft.addEventListener('click', () => {
    idxImg = idxImg - 1;
    setVisibilityBtLeftRight();
    vue.src = tab[idxImg];
    toggleElementsVisibility(false, btTop, btCadenaLeft, btCadenaRight, enigmeCadenaGauche, indice2, randomNumberRight, aideHexa, btAideHexa, btBack);
})

btRight.addEventListener('click', () => {
    idxImg = idxImg + 1
    setVisibilityBtLeftRight();
    vue.src = tab[idxImg];
    toggleElementsVisibility(false, btTop, btCadenaLeft, btCadenaRight, enigmeCadenaGauche, indice3, randomNumberLeft, btAideBin, aideBin, btBack);
})

btBottom.addEventListener('click', () => {
    vue.src = urlImgVbottom;
    toggleElementsVisibility(false, btPorte, btBottom, btLeft, btRight, enigmeCadenaGauche, btIndice3, btIndice2, btIndice1, btTelevision, shrek);
    toggleElementsVisibility(true, btCadenaLeft, btCadenaRight, btTop);
    shrekOn = false;
})



btTop.addEventListener('click', () => {
    vue.src = urlImgVcenter;
    setVisibilityBtLeftRight();
    toggleElementsVisibility(true, btLeft, btRight)
    toggleElementsVisibility(false, btTop, btCadenaLeft, btCadenaRight, enigmeCadenaGauche, indice1Carnet, indice1Garde, ...enigmeHexaCD, btsHexaCode, enigmeCadenaDroite);
    if (isFree()) {
        btBottom.remove();
    }
    //Step 2
    updateGuardLeft();
})

//remove bt bottom if isFree
if (isFree()) {
    btBottom.remove();
}

//Boutons Cadenas
btCadenaLeft.addEventListener('click', () => {
    vue.src = urlImgCadena;
    toggleElementsVisibility(true, enigmeCadenaGauche, ...enigmeBinaireCG);
    toggleElementsVisibility(false, btCadenaLeft, btCadenaRight, btIndice3, btIndice2, btIndice1, btIndice2, ...enigmeHexaCD, btTop);
})

btCadenaRight.addEventListener('click', () => {
    vue.src = urlImgCadena;
    toggleElementsVisibility(true, enigmeCadenaDroite, ...enigmeHexaCD);
    toggleElementsVisibility(false, btCadenaRight, btCadenaLeft, enigmeCadenaGauche, btIndice3, btIndice2, btIndice1, btTop);
})

btBackToCadenaD.addEventListener('click', () => {
    vue.src = urlImgVbottom;
    toggleElementsVisibility(false, btBottom, btLeft, btRight, enigmeCadenaGauche, enigmeCadenaDroite, btIndice3, btIndice2, btIndice1, btTelevision, shrek);
    toggleElementsVisibility(true, btCadenaLeft, btCadenaRight, btTop);
})

btBackToCadenaL.addEventListener('click', () => {
    vue.src = urlImgVbottom;
    toggleElementsVisibility(false, btBottom, btLeft, btRight, enigmeCadenaGauche, enigmeCadenaDroite, btIndice3, btIndice2, btIndice1, btTelevision, shrek);
    toggleElementsVisibility(true, btCadenaLeft, btCadenaRight, btTop);
})

//Boutons indices

//Indices 1
btIndice1.addEventListener('click', () => {
    toggleElementsVisibility(true, indice1Garde, btIndice1Carnet);
    toggleElementsVisibility(false, btIndice1, btBottom, btRight, btLeft);
    vue.src = urlImgVcenter;
    GlobalState.updateSavedState({ isGuardLeft: true });
    const phrase = sentences["guard"];
    new InstructionPopup(phrase.title, phrase.message).render();
})

function updateGuardLeft() {
    if (GlobalState.savedState.isGuardLeft) {
        btIndice1.remove();
        toggleElementsVisibility(true, btBottom, btRight, btLeft);
        vue.src = urlImgVcenter;
        nextStep(2);
    }
}


// Guard is left -> disapear 
updateGuardLeft();

btIndice1Carnet.addEventListener('click', () => {
    toggleElementsVisibility(true, indice1Carnet, btTop);
    toggleElementsVisibility(false, btTelevision, shrek, btIndice1, btIndice1Carnet);
    const phrase = sentences["code-ascii"];
    new InstructionPopup(phrase.title, phrase.message).render();

})

//Indices 2
btIndice2.addEventListener('click', () => {
    toggleElementsVisibility(true, indice2, randomNumberRight, btBack);
    toggleElementsVisibility(false, btIndice2);
})

//Indices 3
btIndice3.addEventListener('click', () => {
    toggleElementsVisibility(true, indice3, randomNumberLeft, btBack);
    toggleElementsVisibility(false, btIndice3, btAideBin);
})

//Easter egg
let shrekOn = false;
function setTelevision() {
    if (shrekOn === false) {
        toggleElementsVisibility(true, shrek);
        shrekOn = true;
    } else {
        toggleElementsVisibility(false, shrek);
        shrekOn = false;
    }
}

btTelevision.addEventListener('click', () => {
    setTelevision();
})


//Aide hexa
let jamyOn = false;

function setJamy() {
    if (jamyOn === false) {
        toggleElementsVisibility(true, aideHexa);
        jamyOn = true;
    } else {
        toggleElementsVisibility(false, aideHexa);
        jamyOn = false;
    }
}
btAideHexa.addEventListener('click', () => {
    setJamy();
})

//Aide bin
btAideBin.addEventListener('click', () => {
    toggleElementsVisibility(true, aideBin, btBack);
    toggleElementsVisibility(false, btAideBin, btIndice3)
})

// back

let btBack = document.querySelector('#back');
toggleElementsVisibility(false, btBack);

btBack.addEventListener('click', () => {
    toggleElementsVisibility(false, indice3, indice2, indice1Garde, aideBin, btBack);
    indiceVisibility();

})


function indiceVisibility() {
    if (idxImg == 0) {
        toggleElementsVisibility(true, btIndice3, btAideBin);
    } else if (idxImg == 1) {
        //
    } else if (idxImg == 2) {
        toggleElementsVisibility(true, btAideHexa, btIndice2);
    }
}

//Porte vers etape 2
let btPorte = document.querySelector('#porte');
toggleElementsVisibility(false, btPorte);


btPorte.addEventListener('click', async () => {
    await sendMessageFree();
})



async function sendMessageFree() {
    const result = await ConfirmDialog.fire({ text: "Bravo tu as réussi à te libérer et à sortir de cette salle. Tu peux commencer ta mission. On se retrouve quand tu auras trouvé un ordinateur où te connecter", cancelButtonText: "Non je me sens bien ici", confirmButtonText: "Go go go !" });
    if (result.isConfirmed) {
        nextStep(10)
        GlobalState.updateSavedState({ scene: "scene2" });
    }

}

function isFree() {
    return (GlobalState.savedState.isLeftHandFree && GlobalState.savedState.isRightHandFree);
}

if (GlobalState.savedState.isLeftHandFree) {
    btCadenaLeft.remove();
}

if (GlobalState.savedState.isRightHandFree) {
    btCadenaRight.remove();
}

if (isFree()) {
    toggleElementsVisibility(true, btPorte);
}


export { }