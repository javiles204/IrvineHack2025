const lebronHead = document.querySelector('.lebron-image'); 

let aura = document.querySelector('.lebron-aura');
let auraCount = 0;

let multiplier = document.querySelector('.sunshine-multiplier');
let multiplierCount = 1;
let sunshine = document.querySelector('.sunshine');

let cost = document.querySelector('.item-cost');
let costCount = 10;

let auraPerClick = 1;

let itemLvl = document.querySelector('.item-level');
let defaultLvl = 1;

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
    if (auraCount > 0 && Math.random() < 0.5) { 
        sunshinePopup();
    }
}, Math.random() * 5000 + 5000);

function incrementAPC() {
    if (auraCount >= costCount) {
        auraPerClick++;
        auraCount -= costCount;
        aura.innerHTML = auraCount.toFixed(2);

        costCount *= 3;
        cost.innerHTML = costCount;

        defaultLvl++;
        itemLvl.innerHTML = defaultLvl;
    }
}