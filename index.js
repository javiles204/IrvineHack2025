const lebronHead = document.querySelector('.lebron-image'); 

let aura = document.querySelector('.lebron-aura');
let auraCount = 0;

let multiplier = document.querySelector('.sunshine-multiplier');
let multiplierCount = 1;
let sunshine = document.querySelector('.sunshine');

let auraPerClick = 1;
let auraPerSecond = 0;
let multiplierRate = 0.5;

let slamDunkCost = document.getElementById('slam-dunk-cost');
let slamDunkLvl = document.getElementById('slam-dunk-level');
const slamDunk = {costCount:10, lvlCount:1};

let sunshineCost = document.getElementById('you-are-my-sunshine-cost');
let sunshineLvl = document.getElementById('you-are-my-sunshine-level');
const youAreMySunshine = {costCount:50, lvlCount:1};

let legacyCost = document.getElementById('kings-legacy-cost');
let legacyLvl = document.getElementById('kings-legacy-level');
const kingsLegacy = {costCount:25, lvlCount:0};

const openPackButton = document.getElementById('openPack');

function incrementAura() {
    auraCount += multiplierCount * auraPerClick;
    aura.innerHTML = auraCount.toFixed(2);

    const duplicateLebron = document.createElement('img');
    duplicateLebron.src = './assets/LebronHead.png';
    duplicateLebron.style.position = 'absolute';
    duplicateLebron.style.width = '100px';
    duplicateLebron.style.zIndex = 1;
    lebronHead.style.zIndex = 2;

    const lebronHeadRect = lebronHead.getBoundingClientRect();
    const randomXOffset = Math.random() * 200 - 50;
    const randomX = Math.random() * 400 - 200;
    const randomRotation = Math.random() < 0.5 ? -1 : 1;
    const firstRotation = randomRotation * 270
    const secondRotation = randomRotation * 380
    const thirdRotation = randomRotation * 780

    duplicateLebron.style.left = `${lebronHeadRect.left + 100}px`; 
    duplicateLebron.style.top = `${lebronHeadRect.top - 50}px`;
    duplicateLebron.style.setProperty('--randomX', `${randomX}px`);
    duplicateLebron.style.setProperty('--firstRotation', `${firstRotation}deg`);
    duplicateLebron.style.setProperty('--secondRotation', `${secondRotation}deg`);
    duplicateLebron.style.setProperty('--thirdRotation', `${thirdRotation}deg`);
    duplicateLebron.classList.add('drop-lebron');
    
    document.body.appendChild(duplicateLebron);
    setTimeout(() => {
        document.body.removeChild(duplicateLebron); 
    }, 500)
}

function sunshinePopup() {
    sunshine.classList.remove('hidden');

    const randomX = Math.random() * (window.innerWidth - sunshine.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - sunshine.offsetHeight);

    sunshine.style.position = "absolute";
    sunshine.style.left = `${randomX}px`;
    sunshine.style.top = `${randomY}px`;

    setTimeout(() => {
        sunshine.classList.add('hidden');
    }, 1500);
}

sunshine.addEventListener('click', () => {
    sunshine.classList.add('hidden');
    multiplierCount += 0.1;
    multiplier.innerHTML = multiplierCount.toFixed(2);
});

setInterval(() => {
    if (auraCount > 0 && Math.random() < multiplierRate) { 
        sunshinePopup();
    }
}, Math.random() * 5000 + 5000);

function incrementMultiplierRate() { //youAreMySunshine
    if (auraCount >= youAreMySunshine.costCount) {
        multiplierRate += 0.1;
        auraCount -= youAreMySunshine.costCount;
        aura.innerHTML = auraCount.toFixed(2);

        youAreMySunshine.costCount *= 2;
        sunshineCost.innerHTML = youAreMySunshine.costCount;

        youAreMySunshine.lvlCount++;
        sunshineLvl.innerHTML = youAreMySunshine.lvlCount;
    }
}

function incrementAPC() { //slamDunk
    if (auraCount >= slamDunk.costCount) {
        auraPerClick++;
        auraCount -= slamDunk.costCount;
        aura.innerHTML = auraCount.toFixed(2);

        slamDunk.costCount *= 2;
        slamDunkCost.innerHTML = slamDunk.costCount;

        slamDunk.lvlCount++;
        slamDunkLvl.innerHTML = slamDunk.lvlCount;
    }
}

function incrementAPS() { //kingsLegacy
    if (auraCount >= kingsLegacy.costCount) {
        auraPerSecond++;
        auraCount -= kingsLegacy.costCount;
        aura.innerHTML = auraCount.toFixed(2);

        kingsLegacy.costCount *= 2;
        legacyCost.innerHTML = kingsLegacy.costCount;

        kingsLegacy.lvlCount++;
        legacyLvl.innerHTML = kingsLegacy.lvlCount;
    }
}

setInterval(() => {
    if (auraPerSecond > 0) giveAuraPerSecond();
}, 1000);


function giveAuraPerSecond() {
    auraCount += auraPerSecond * multiplierCount;
    aura.innerHTML = auraCount.toFixed(2);
}

function getCumulativeWeights(items) {
    let cumulativeWeights = [];
    let totalWeight = 0;

    items.forEach(item => {
        totalWeight += item.weight;
        cumulativeWeights.push(totalWeight);
    });

    return {cumulativeWeights, totalWeight};
}

function weightedRandomSelection(items) {
    const {cumulativeWeights, totalWeight} = getCumulativeWeights(items);

    const randomNum = Math.random() * totalWeight;

    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (randomNum < cumulativeWeights[i]) {
            return items[i].name;
        }
    }
}

let duplicateItem;
let duplicateText;
const items = [
    {name: 'Leforehead', weight: 90, img: './assets/Leforehead.png', value: 100},
    {name: 'LA Court', weight: 70, img: './assets/LebronCourt.png', value: 300},
    {name: 'LeBron\'s Basketball', weight: 60, img: './assets/LebronBasketball.png', value: 500},
    {name: 'Space Jam', weight: 50, img: './assets/SpaceJam.png', value: 750},
    {name: 'OURBALL', weight: 30, img: './assets/OurBall.png', value: 1500},
    {name: 'Lepookie', weight: 10, img: './assets/Lepookie.png', value: 3000},
    {name: 'The King\'s Crown', weight: 1, img: './assets/KingsCrown.png', value: 10000}
];

openPack.addEventListener('click', () => {
    if (auraCount < 500) {
        return;
    }

    auraCount -= 500;
    aura.innerHTML = auraCount.toFixed(2);
    const result = weightedRandomSelection(items);
    console.log(result);

    const selectedItem = items.find(item => item.name === result);

    if (duplicateItem != null)
        document.body.removeChild(duplicateItem);
    if (duplicateText != null)
        document.body.removeChild(duplicateText);

    duplicateItem = document.createElement('img');
    duplicateItem.src = selectedItem.img;
    duplicateItem.style.position = 'absolute';
    duplicateItem.style.width = '200px';

    duplicateText = document.createElement('h3');
    duplicateText.textContent = selectedItem.name + " - +" + selectedItem.value;
    duplicateText.style.position = 'absolute';
    duplicateText.style.color = 'white';
    duplicateText.style.fontFamily = 'monospace';
    duplicateText.style.fontSize = '20px';
    duplicateText.style.width = '200px';
    duplicateText.style.textAlign = 'center';
    duplicateText.style.textShadow = `
    -3px -3px 0 #000,  
     3px -3px 0 #000,  
    -3px  3px 0 #000,  
     3px  3px 0 #000`;

    const openPackRect = openPackButton.getBoundingClientRect();
    
    duplicateItem.style.left = `${openPackRect.left}px`; 
    duplicateItem.style.top = `${openPackRect.bottom + 70}px`;
    duplicateText.style.left = `${openPackRect.left}px`; 
    duplicateText.style.top = `${openPackRect.bottom - 10}px`;
    document.body.appendChild(duplicateItem);
    document.body.appendChild(duplicateText);

    auraCount += selectedItem.value;
    aura.innerHTML = auraCount.toFixed(2);
});