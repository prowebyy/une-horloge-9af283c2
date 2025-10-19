// Fonction pour mettre à jour l'horloge
function updateClock() {
    const now = new Date();
    
    // Horloge analogique
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Calcul des angles
    const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 30° par heure + 0.5° par minute
    const minuteAngle = minutes * 6; // 6° par minute
    const secondAngle = seconds * 6; // 6° par seconde
    
    // Application des rotations
    document.getElementById('hour-hand').style.transform = `rotate(${hourAngle}deg) translateY(-10px)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minuteAngle}deg) translateY(-16px)`;
    document.getElementById('second-hand').style.transform = `rotate(${secondAngle}deg) translateY(-18px)`;
    
    // Horloge numérique
    const timeString = now.toLocaleTimeString('fr-FR', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('digital-clock').textContent = timeString;
    
    // Date
    const dateString = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('date').textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    
    // Fuseau horaire
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone').textContent = timezone;
}

// Fonction pour créer les marques des minutes
function createMinuteMarks() {
    const clockFace = document.querySelector('.bg-white\\/10');
    
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) { // Ne pas créer de marques aux positions des heures
            const mark = document.createElement('div');
            const angle = i * 6; // 6° par minute
            const radius = 152; // Rayon du cadran
            const x = Math.sin(angle * Math.PI / 180) * radius;
            const y = -Math.cos(angle * Math.PI / 180) * radius;
            
            mark.className = 'absolute w-1 h-1 bg-white/50 rounded-full';
            mark.style.left = `calc(50% + ${x}px)`;
            mark.style.top = `calc(50% + ${y}px)`;
            
            clockFace.appendChild(mark);
        }
    }
}

// Initialisation
function init() {
    // Mettre à jour l'horloge immédiatement
    updateClock();
    
    // Créer les marques des minutes
    createMinuteMarks();
    
    // Mettre à jour l'horloge toutes les secondes
    setInterval(updateClock, 1000);
    
    // Effet de chargement
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Démarrer l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', init);

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur dans l\'horloge:', e.error);
});