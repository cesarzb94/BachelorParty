document.addEventListener("DOMContentLoaded", function () {
    let words = document.querySelectorAll(".word");
    words.forEach(word => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach(letter => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    const rotateText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        // Rotate out letters of current word
        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        // Reveal and rotate in letters of next word
        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    rotateText();
    setInterval(rotateText, 4000);
});

function createCalendarEvent() {
    const startDate = new Date("2024-11-23");
    const endDate = new Date("2024-11-26");
    const eventName = "Despedida de Soltero - Charly";
    const description = "Juimonooos!";
    const location = "Calle CTP, Barva, Heredia";

    // Format dates in the correct .ics format (YYYYMMDDTHHmmss)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Create .ics file content
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventName}
DESCRIPTION:${description}
DTSTART:${formattedStartDate}
DTEND:${formattedEndDate}
LOCATION:${location}
END:VEVENT
END:VCALENDAR
    `.trim();

    // Create a Blob with the ics content and a downloadable link
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DespedidaSolteroCharly.ics';
    link.click();
    URL.revokeObjectURL(url);
}

// Function to add autoplay to the Spotify iframe
function autoPlaySpotify() {
    const iframe = document.getElementById('spotify-player');
    const autoplaySrc = iframe.src + '&autoplay=1';
    iframe.src = autoplaySrc;
}

// Attempt to autoplay once the iframe has loaded
window.addEventListener('load', autoPlaySpotify);

// Variables to control playback
let isPlaying = false;
const iframe = document.getElementById('spotify-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');

// Function to toggle playback
function togglePlayback() {
    if (isPlaying) {
        const pauseSrc = iframe.src.replace('&autoplay=1', '&autoplay=0');
        iframe.src = pauseSrc; // Stops the autoplay
        playPauseIcon.src = 'play.png'; // Update icon to play
    } else {
        const playSrc = iframe.src + '&autoplay=1';
        iframe.src = playSrc; // Starts autoplay
        playPauseIcon.src = 'pause.png'; // Update icon to pause
    }
    isPlaying = !isPlaying; // Toggle state
}

// Add event listener to the play/pause button
playPauseBtn.addEventListener('click', togglePlayback);