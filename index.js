let aura = document.querySelector('.lebron-aura');
const lebronHead = document.querySelector('.lebron-image'); 

function incrementAura() {
    aura.innerHTML = parseFloat(aura.innerHTML) + 1

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