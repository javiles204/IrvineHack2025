let aura = document.querySelector('.lebron-aura');
const lebronHead = document.querySelector('.lebron-image'); 
let multiplier = document.querySelector('.sunshine-multiplier');
let sunshine = document.querySelector('.sunshine');
let auraCount = 0;
let multiplierCount = 1;

function incrementAura() {
    auraCount += multiplierCount * 1;
    // only display decimal if decimal
    aura.innerHTML = auraCount.toFixed(2);

    if (Math.random() < 1) {
        sunshinePopup();
    }

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
    multiplierCount += 0.05;
    multiplier.innerHTML = multiplierCount;
});

setInterval(() => {
    if (auraCount >= 50 && Math.random() < 0.5) { 
        sunshinePopup();
    }
}, Math.random() * 5000 + 5000);