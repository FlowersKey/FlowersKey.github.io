// Elementos del DOM
var audio = document.getElementById('audio');
var playButton = document.getElementById('playButton');
var volumeControl = document.getElementById('volumeControl');
var volumeSlider = document.getElementById('volumeSlider');
var audioLoader = document.getElementById('audioLoader');
var finalMessage = document.getElementById('finalMessage');

// Variables de control
let isPlaying = false;
let hasStarted = false;

// Configurar volumen inicial
audio.volume = 0.7;

// Mostrar loader cuando el audio se está cargando
function showLoader() {
    audioLoader.style.display = 'block';
}

function hideLoader() {
    audioLoader.style.display = 'none';
}

// Función para manejar errores de audio
function handleAudioError() {
    hideLoader();
    playButton.innerHTML = '⚠️';
    playButton.title = 'Error al cargar el audio';
    console.error('Error loading audio file');
}

// Event listeners para el audio
audio.addEventListener('loadstart', showLoader);
audio.addEventListener('canplay', hideLoader);
audio.addEventListener('error', handleAudioError);

// Función para iniciar la reproducción
function startPlayback() {
    if (!hasStarted) {
        // Primera reproducción
        showLoader();
        
        audio.play().then(() => {
            isPlaying = true;
            hasStarted = true;
            hideLoader();
            
            // Ocultar el botón de play
            playButton.style.opacity = '0';
            setTimeout(() => {
                playButton.style.display = 'none';
            }, 300);
            
            // Mostrar control de volumen
            volumeControl.classList.add('show');
            
            // Remover la clase container para iniciar animaciones
            document.body.classList.remove("container");
            
            console.log('Reproducción iniciada exitosamente');
        }).catch((error) => {
            console.error('Error al reproducir:', error);
            hideLoader();
            playButton.innerHTML = '🔄';
            playButton.title = 'Reintentrar reproducir';
        });
    }
}

// Event listener para el botón de play
playButton.addEventListener('click', startPlayback);

// Control de volumen
volumeSlider.addEventListener('input', function() {
    audio.volume = this.value;
    
    // Cambiar ícono según el volumen
    const volumeIcon = document.querySelector('.volume-icon');
    if (this.value == 0) {
        volumeIcon.textContent = '🔇';
    } else if (this.value < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
});

// Función para ocultar el título después de cierto tiempo
function ocultarTitulo() {
    const titulo = document.querySelector(".titulo");
    if (titulo) {
        titulo.style.animation = "fadeOut 3s ease-in-out forwards";
        setTimeout(() => { 
            titulo.style.display = "none"; 
        }, 3000);
    }
}

// Función para mostrar mensaje final
function mostrarMensajeFinal() {
    if (finalMessage) {
        finalMessage.classList.add('show');
        
        // Crear efectos de partículas
        createHeartParticles();
    }
}

// Crear partículas de corazones
function createHeartParticles() {
    const hearts = ['💕', '💖', '💝', '✨', '🌟'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.pointerEvents = 'none';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            heart.style.zIndex = '999';
            heart.style.transition = 'all 4s ease-out';
            document.body.appendChild(heart);

            // Animar hacia arriba
            setTimeout(() => {
                heart.style.transform = `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            }, 100);

            // Remover elemento
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 4100);
        }, i * 200);
    }
}

// Event listeners para eventos del audio
audio.addEventListener('ended', () => {
    console.log('Canción terminada');
    setTimeout(mostrarMensajeFinal, 2000);
});

// Ocultar título después de 3:40 min (220 segundos)
audio.addEventListener('timeupdate', () => {
    if (audio.currentTime > 220 && document.querySelector('.titulo').style.display !== 'none') {
        ocultarTitulo();
    }
});

// Funciones para mejorar la experiencia móvil
function handleVisibilityChange() {
    if (document.hidden && isPlaying) {
        // Pausar cuando la pestaña no está visible (opcional)
        // audio.pause();
    } else if (!document.hidden && hasStarted && !isPlaying) {
        // Reanudar cuando la pestaña vuelve a estar visible
        // audio.play();
    }
}

// Event listener para cambios de visibilidad
document.addEventListener('visibilitychange', handleVisibilityChange);

// Función para prevenir el comportamiento por defecto en dispositivos móviles
function preventDefaultTouch(e) {
    if (e.target === playButton || e.target.closest('.volume-control')) {
        return; // Permitir interacción con controles
    }
    if (e.touches.length > 1) {
        e.preventDefault(); // Prevenir zoom con dos dedos
    }
}

// Agregar event listeners para mejorar la experiencia móvil
document.addEventListener('touchstart', preventDefaultTouch, { passive: false });

// Función para manejar orientación de pantalla en móviles
function handleOrientationChange() {
    setTimeout(() => {
        // Recalcular posiciones si es necesario
        if (window.innerHeight < window.innerWidth) {
            // Landscape mode
            document.body.style.fontSize = '14px';
        } else {
            // Portrait mode
            document.body.style.fontSize = '16px';
        }
    }, 500);
}

window.addEventListener('orientationchange', handleOrientationChange);

// Función de inicialización
function init() {
    console.log('Inicializando página de flores...');
    
    // Verificar si el navegador soporta audio
    if (!audio.canPlayType || !audio.canPlayType('audio/mpeg')) {
        console.warn('El navegador no soporta audio MP3');
        playButton.innerHTML = '⚠️';
        playButton.title = 'Audio no soportado';
        return;
    }
    
    // Precargar el audio
    if (audio.readyState < 2) {
        showLoader();
        audio.load();
    }
    
    console.log('Inicialización completa');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Función para debugging (solo en desarrollo)
function debugInfo() {
    console.log('Estado del audio:', {
        currentTime: audio.currentTime,
        duration: audio.duration,
        paused: audio.paused,
        volume: audio.volume,
        readyState: audio.readyState
    });
}

// Hacer la función disponible globalmente para debugging
window.debugAudio = debugInfo;