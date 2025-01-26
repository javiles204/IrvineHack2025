let aura = document.querySelector('.lebron-aura');
const lebronHead = document.querySelector('.lebron-image'); 
let multiplier = document.querySelector('.sunshine-multiplier');
let sunshine = document.querySelector('.sunshine');
let auraCount = 0;
let multiplierCount = 1;

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

function incrementAura() {
    auraCount += multiplierCount * 1;
    // only display decimal if decimal
    aura.innerHTML = auraCount.toFixed(2);

    let duplicateLebron = document.createElement('img');
    duplicateLebron.src = './assets/LebronHead.png';
    duplicateLebron.style.position = 'absolute';
    duplicateLebron.style.width = '100px';
    duplicateLebron.style.zIndex = 1;
    lebronHead.style.zIndex = 2;

    const lebronHeadRect = lebronHead.getBoundingClientRect();
    const randomXOffset = Math.random() * 200 - 50;

    duplicateLebron.style.left = `${lebronHeadRect.left + 100}px`; 
    duplicateLebron.style.top = `${lebronHeadRect.top - 50}px`;
    duplicateLebron.style.setProperty('--randomX', `${randomXOffset}px`);
    duplicateLebron.classList.add('drop-lebron');
    
    document.body.appendChild(duplicateLebron);
    setTimeout(() => {
        document.body.removeChild(duplicateLebron); 
    }, 500) 
    
    // GATCHA SYSTEM
    const items = [
        {name: 'LeBron\'s Hairline', weight: 100},
        {name: 'LeBron\'s Basketball', weight: 100},
        {name: 'Lakers\' Court', weight: 50},
        {name: 'Space Jam', weight: 15},
        {name: 'OURBALL', weight: 10},
        {name: 'Lepookie', weight: 5},
        {name: ''}
        {name: 'The King\'s Crown', weight: 1}
    ];
    
    const result = weightedRandomSelection(items);
    console.log(result);
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
