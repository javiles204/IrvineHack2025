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
const youAreMySunshine = {costCount:10, lvlCount:1};

let legacyCost = document.getElementById('kings-legacy-cost');
let legacyLvl = document.getElementById('kings-legacy-level');
const kingsLegacy = {costCount:10, lvlCount:0};

function incrementAura() {
    auraCount += multiplierCount * auraPerClick;
    // only display decimal if decimal
    aura.innerHTML = auraCount.toFixed(2);

    const duplicateLebron = document.createElement('img');
    duplicateLebron.src = './assets/LebronHead.png';
    duplicateLebron.style.position = 'absolute';
    duplicateLebron.style.width = '100px';

    const lebronHeadRect = lebronHead.getBoundingClientRect();
    const randomXOffset = Math.random() * 400 - 100;

    duplicateLebron.style.left = `${lebronHeadRect.left + randomXOffset}px`; 
    duplicateLebron.style.top = `${lebronHeadRect.top - 300}px`;
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
    }, 1000);
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
        multiplierRate += 0.05;
        auraCount -= youAreMySunshine.costCount;
        aura.innerHTML = auraCount.toFixed(2);

        youAreMySunshine.costCount *= 3;
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

        slamDunk.costCount *= 3;
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

        kingsLegacy.costCount *= 3;
        legacyCost.innerHTML = kingsLegacy.costCount;

        kingsLegacy.lvlCount++;
        legacyLvl.innerHTML = kingsLegacy.lvlCount;
    }
}

setInterval(() => {
    if (auraPerSecond > 0) giveAuraPerSecond();
}, 1000);


function giveAuraPerSecond() {
    auraCount += auraPerSecond;
    aura.innerHTML = auraCount.toFixed(2);
}