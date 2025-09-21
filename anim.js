// Sincronizar las letras con la canción (Here Comes the Sun - The Beatles)
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de letras mejorado con efectos especiales
var lyricsData = [
  {"text":"💕 Para mi cielo más hermoso 💕","time":0},
  {"text":"Here Comes The Sun ☀️","time":15.36},
  {"text":"Here Comes The Sun","time":19.01},
  {"text":"And I say","time":20.53},
  {"text":"It's all right ✨","time":22.56},
  {"text":"♪♪♪♪♪♪♪♪♪","time":24.91},
  {"text":"Little darling","time":27.37},
  {"text":"It's been a long cold lonely winter","time":29.78},
  {"text":"Little darling","time":35.74},
  {"text":"It feels like years since it's been here","time":36.62},
  {"text":"Here comes the Sun (doo, doo, doo) ☀️","time":42.12},
  {"text":"Here comes the Sun","time":43.2},
  {"text":"And I say","time":48.54},
  {"text":"It's all right","time":50.38},
  {"text":"Te amo infinito 💛","time":52.88},
  {"text":"Little darling","time":59.45},
  {"text":"The smiles returning to the faces","time":61.34},
  {"text":"Little darling","time":67.1},
  {"text":"It seems like years since it's been here","time":68.24},
  {"text":"Here comes the Sun ☀️","time":74.56},
  {"text":"Here comes the Sun ♪♫♪","time":78.69},
  {"text":"And I say","time":80.64},
  {"text":"It's all right","time":82.37},
  {"text":"Eres mi sol y mis estrellas ✨","time":85.33},
  {"text":"Sun, Sun, Sun, here it comes ☀️","time":96.53},
  {"text":"Sun, Sun, Sun, here it comes","time":102.31},
  {"text":"Sun, Sun, Sun, here it comes ♫","time":114.32},
  {"text":"Sun, Sun, Sun, here it comes ☀️✨","time":120.04},
  {"text":"Little darling","time":131.71},
  {"text":"I feel that ice is slowly melting","time":134.1},
  {"text":"Little darling","time":140.09},
  {"text":"It seems like years since it's been clear","time":141.66},
  {"text":"Here comes the Sun (doo, doo, doo) ☀️","time":146.91},
  {"text":"Here comes the Sun","time":150.78},
  {"text":"And I say","time":153.28},
  {"text":"It's all right ✨","time":154.6},
  {"text":"Here comes the Sun (doo, doo, doo)","time":160.23},
  {"text":"Here comes the Sun ☀️","time":164.14},
  {"text":"It's all right","time":167.89},
  {"text":"It's all right","time":173.76},
  {"text":"Eres la luz de mis días 💕","time":181.64}
];

// Variables para efectos visuales
let currentLyricIndex = -1;
let isTransitioning = false;

// Función para crear efectos de partículas en las letras especiales
function createTextParticles(text) {
    if (text.includes('☀️') || text.includes('✨') || text.includes('💕')) {
        const particles = ['✨', '⭐', '💫', '🌟'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.position = 'fixed';
                particle.style.pointerEvents = 'none';
                particle.style.left = (Math.random() * window.innerWidth) + 'px';
                particle.style.top = (Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.2) + 'px';
                particle.style.fontSize = '1.5rem';
                particle.style.zIndex = '50';
                particle.style.transition = 'all 2s ease-out';
                particle.style.opacity = '1';
                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.style.transform = `translateY(-100px) rotate(360deg)`;
                    particle.style.opacity = '0';
                }, 100);

                setTimeout(() => {
                    if (document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, 2100);
            }, i * 100);
        }
    }
}

// Función mejorada para actualizar las letras
function updateLyrics() {
    if (!audio || audio.paused) return;
    
    var t = audio.currentTime;
    let newLyricIndex = -1;

    // Buscar la línea actual
    for (let i = 0; i < lyricsData.length; i++) {
        const start = lyricsData[i].time;
        const end = (i < lyricsData.length - 1) ? lyricsData[i + 1].time : audio.duration || 200;
        
        if (t >= start && t < end) {
            newLyricIndex = i;
            break;
        }
    }

    // Solo actualizar si cambió la línea
    if (newLyricIndex !== currentLyricIndex && newLyricIndex !== -1) {
        currentLyricIndex = newLyricIndex;
        const currentLine = lyricsData[newLyricIndex];
        
        if (currentLine && !isTransitioning) {
            isTransitioning = true;
            
            // Fade out actual
            lyrics.style.opacity = '0';
            lyrics.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                // Cambiar texto y aplicar efectos especiales
                lyrics.innerHTML = currentLine.text;
                
                // Efectos especiales para textos importantes
                if (currentLine.text.includes('💕') || 
                    currentLine.text.includes('Te amo') || 
                    currentLine.text.includes('Eres')) {
                    lyrics.style.color = '#FF69B4';
                    lyrics.style.textShadow = '0 0 20px rgba(255, 105, 180, 0.8), 2px 2px 8px rgba(0, 0, 0, 0.8)';
                    lyrics.style.fontSize = '36px';
                    createTextParticles(currentLine.text);
                } else if (currentLine.text.includes('☀️') || currentLine.text.includes('Sun')) {
                    lyrics.style.color = '#FFD700';
                    lyrics.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.6), 2px 2px 8px rgba(0, 0, 0, 0.8)';
                    lyrics.style.fontSize = '34px';
                } else if (currentLine.text.includes('♪') || currentLine.text.includes('♫')) {
                    lyrics.style.color = '#00FFFF';
                    lyrics.style.textShadow = '0 0 15px rgba(0, 255, 255, 0.6), 2px 2px 8px rgba(0, 0, 0, 0.8)';
                    lyrics.style.fontSize = '30px';
                } else {
                    lyrics.style.color = '#FFD700';
                    lyrics.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.4)';
                    lyrics.style.fontSize = '32px';
                }
                
                // Fade in con efecto
                lyrics.style.opacity = '1';
                lyrics.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 300);
                
            }, 200);
        }
    }
    
    // Si no hay línea actual, ocultar
    if (newLyricIndex === -1 && lyrics.style.opacity !== '0') {
        lyrics.style.opacity = '0';
        lyrics.innerHTML = '';
        currentLyricIndex = -1;
    }
}

// Función para crear efectos de lluvia de pétalos
function createPetalRain() {
    const petals = ['🌸', '🌺', '🌻', '🌷', '💐'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.textContent = petals[Math.floor(Math.random() * petals.length)];
            petal.style.position = 'fixed';
            petal.style.pointerEvents = 'none';
            petal.style.left = Math.random() * window.innerWidth + 'px';
            petal.style.top = '-50px';
            petal.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            petal.style.zIndex = '5';
            petal.style.transition = 'all 8s linear';
            petal.style.opacity = '0.8';
            document.body.appendChild(petal);

            setTimeout(() => {
                petal.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
                petal.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                if (document.body.contains(petal)) {
                    document.body.removeChild(petal);
                }
            }, 8100);
        }, i * 800);
    }
}

// Función para efectos especiales en momentos clave
function triggerSpecialEffects(time) {
    // Lluvia de pétalos en momentos románticos
    if (time >= 52 && time <= 54) { // "Te amo infinito"
        createPetalRain();
    }
    
    if (time >= 85 && time <= 87) { // "Eres mi sol y mis estrellas"
        createPetalRain();
    }
    
    if (time >= 181 && time <= 183) { // "Eres la luz de mis días"
        createPetalRain();
    }
}

// Loop principal mejorado usando requestAnimationFrame
let lastTime = -1;
function loop() {
    if (audio && !audio.paused) {
        const currentTime = audio.currentTime;
        
        // Solo actualizar si el tiempo cambió significativamente
        if (Math.abs(currentTime - lastTime) > 0.1) {
            updateLyrics();
            triggerSpecialEffects(currentTime);
            lastTime = currentTime;
        }
    }
    
    requestAnimationFrame(loop);
}

// Iniciar el loop
requestAnimationFrame(loop);

// Función para ocultar título con efecto mejorado
function ocultarTituloConEfecto() {
    const titulo = document.querySelector(".titulo");
    if (titulo && titulo.style.display !== "none") {
        // Efecto de desvanecimiento más suave
        titulo.style.transition = "all 3s ease-in-out";
        titulo.style.opacity = "0";
        titulo.style.transform = "translateY(-30px) scale(0.9)";
        
        setTimeout(() => { 
            titulo.style.display = "none"; 
        }, 3000);
    }
}

// Event listeners para mejorar la sincronización
if (audio) {
    // Cuando comience la reproducción
    audio.addEventListener('play', () => {
        console.log('Audio started - lyrics sync activated');
        currentLyricIndex = -1; // Reset
    });
    
    // Cuando se pause
    audio.addEventListener('pause', () => {
        console.log('Audio paused - lyrics sync paused');
    });
    
    // Cuando termine
    audio.addEventListener('ended', () => {
        console.log('Audio ended');
        lyrics.style.opacity = '0';
        lyrics.innerHTML = '';
        
        // Efecto final de pétalos
        setTimeout(() => {
            createPetalRain();
            createPetalRain(); // Doble lluvia al final
        }, 1000);
    });
    
    // Ocultar título después de 3:40 min
    audio.addEventListener('timeupdate', () => {
        if (audio.currentTime > 220) {
            ocultarTituloConEfecto();
        }
    });
}

// Función de utilidad para debugging
function debugLyrics() {
    console.log('Lyrics Debug:', {
        currentTime: audio?.currentTime,
        currentLyricIndex,
        isTransitioning,
        totalLyrics: lyricsData.length
    });
}

// Función para saltar a una parte específica de la canción (para testing)
function jumpToTime(seconds) {
    if (audio) {
        audio.currentTime = seconds;
        console.log(`Jumped to ${seconds} seconds`);
    }
}

// Hacer funciones disponibles globalmente para debugging
window.debugLyrics = debugLyrics;
window.jumpToTime = jumpToTime;

// Optimización para dispositivos móviles
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reducir efectos en móviles para mejor rendimiento
        const originalCreateTextParticles = createTextParticles;
        const originalCreatePetalRain = createPetalRain;
        
        createTextParticles = function(text) {
            // Reducir partículas en móvil
            if (Math.random() > 0.5) {
                originalCreateTextParticles(text);
            }
        };
        
        createPetalRain = function() {
            // Menos pétalos en móvil
            const petals = ['🌸', '🌺'];
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const petal = document.createElement('div');
                    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
                    petal.style.position = 'fixed';
                    petal.style.pointerEvents = 'none';
                    petal.style.left = Math.random() * window.innerWidth + 'px';
                    petal.style.top = '-50px';
                    petal.style.fontSize = '1rem';
                    petal.style.zIndex = '5';
                    petal.style.transition = 'all 6s linear';
                    petal.style.opacity = '0.6';
                    document.body.appendChild(petal);

                    setTimeout(() => {
                        petal.style.transform = `translateY(${window.innerHeight + 100}px) rotate(360deg)`;
                        petal.style.opacity = '0';
                    }, 100);

                    setTimeout(() => {
                        if (document.body.contains(petal)) {
                            document.body.removeChild(petal);
                        }
                    }, 6100);
                }, i * 1000);
            }
        };
    }
}

// Aplicar optimizaciones al cargar
document.addEventListener('DOMContentLoaded', optimizeForMobile);

console.log('Lyrics animation system loaded successfully');