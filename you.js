/* =========================================================
   BIRTHDAY WEBSITE
   ========================================================= */


/* ================= SETTINGS ================= */

// Change this password
const SECRET_PASSWORD = "212205";

// Birthday date
// Format: YYYY-MM-DDTHH:MM:SS
const BIRTHDAY_DATE = "2026-10-22T00:00:00";


/* ================= ELEMENTS ================= */

const passwordScreen = document.getElementById("passwordScreen");
const countdownScreen = document.getElementById("countdownScreen");
const mainContent = document.getElementById("mainContent");

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const passwordError = document.getElementById("passwordError");

const beginBtn = document.getElementById("beginBtn");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const birthdayMessage = document.getElementById("birthdayMessage");

const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
const bgMusic = document.getElementById("bgMusic");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

const heartsContainer = document.getElementById("hearts");



/* ================= PASSWORD ================= */

unlockBtn.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", function(event) {

    // Start music when the visitor begins interacting
    if (!musicPlaying) {
        startMusic();
    }

    if (event.key === "Enter") {
        checkPassword();
    }

});

// Also start music when the password field is tapped
passwordInput.addEventListener("pointerdown", function() {
    if (!musicPlaying) {
        startMusic();
    }
}, { once: true });


function checkPassword() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        passwordError.textContent = "";

        // Try playing immediately from the unlock click
        startMusic();

        passwordScreen.classList.remove("active");

        setTimeout(function() {

            countdownScreen.classList.add("active");

            startCountdown();

        }, 400);

    } else {

        passwordError.textContent =
            "Wrong password... try again ❤️";

        passwordInput.value = "";
        passwordInput.focus();

    }

}

/* ================= COUNTDOWN ================= */

let countdownStarted = false;
let countdownInterval;


function startCountdown() {

    if (countdownStarted) {
        return;
    }

    countdownStarted = true;

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);

}


function updateCountdown() {

    const birthday = new Date(BIRTHDAY_DATE).getTime();

    const now = new Date().getTime();

    const difference = birthday - now;


    if (difference <= 0) {

        clearInterval(countdownInterval);

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        birthdayMessage.textContent =
            "It's finally your special day ❤️";

        beginBtn.disabled = false;

        beginBtn.textContent = "❤️ Begin the Story";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    daysElement.textContent = formatNumber(days);

    hoursElement.textContent = formatNumber(hours);

    minutesElement.textContent = formatNumber(minutes);

    secondsElement.textContent = formatNumber(seconds);

}


function formatNumber(number) {

    return number < 10 ? "0" + number : number;

}


/* ================= BEGIN STORY ================= */

beginBtn.addEventListener("click", function() {

    if (beginBtn.disabled) {
        return;
    }

    countdownScreen.classList.remove("active");

    setTimeout(function() {

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        

    }, 400);

});



/* ================= MUSIC ================= */

let musicPlaying = false;

async function startMusic() {
    try {
        await bgMusic.play();

        musicPlaying = true;
        musicBtn.textContent = "⏸️";
        musicText.textContent = "Music playing";

    } catch (error) {
        musicPlaying = false;
        musicBtn.textContent = "🎵";
        musicText.textContent = "Tap for music";
        console.warn("Music playback failed:", error);
    }
}

/* Play / Pause button */
musicBtn.addEventListener("click", async function() {

    if (bgMusic.paused) {
        await startMusic();
    } else {
        bgMusic.pause();

        musicPlaying = false;
        musicBtn.textContent = "🎵";
        musicText.textContent = "Play our song";
    }

});


/* ================= SCROLL ================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ================= SURPRISE ================= */

surpriseBtn.addEventListener("click", function() {

    surpriseMessage.classList.add("show");

    surpriseBtn.textContent = "❤️ Surprise Opened";

    surpriseBtn.disabled = true;

    createHeartBurst();

});


/* ================= FLOATING HEARTS ================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (10 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 7) + "s";

    heart.style.animationDelay =
        Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);


    setTimeout(function() {

        heart.remove();

    }, 15000);

}


setInterval(createHeart, 700);


/* ================= HEART BURST ================= */

function createHeartBurst() {

    for (let i = 0; i < 25; i++) {

        setTimeout(function() {

            const heart = document.createElement("div");

            heart.className = "heart";

            heart.textContent = "♥";

            heart.style.left =
                (35 + Math.random() * 30) + "%";

            heart.style.bottom =
                (30 + Math.random() * 20) + "%";

            heart.style.fontSize =
                (15 + Math.random() * 25) + "px";

            heart.style.animationDuration =
                (3 + Math.random() * 3) + "s";

            heartsContainer.appendChild(heart);


            setTimeout(function() {
                heart.remove();
            }, 7000);

        }, i * 80);

    }

}


/* ================= PAGE LOAD ================= */

window.addEventListener("load", function() {

    passwordInput.focus();

});

/* ================= CANDLE BLOOM ================= */

const candleSection = document.getElementById("candleSection");
const flame = document.getElementById("flame");
const blowCandleBtn = document.getElementById("blowCandleBtn");
const candleText = document.getElementById("candleText");

let candleFinished = false;


function blowCandle() {

    if (candleFinished) {
        return;
    }

    candleFinished = true;

    // Start candle bloom animation
    candleSection.classList.add("bloom");

    candleText.textContent =
        "Your wish is on its way... ❤️";

    blowCandleBtn.textContent =
        "✨ Wish Made";


    // Create heart burst
    createCandleHearts();


    // Automatically scroll after candle animation
    setTimeout(function() {

        const finalPage =
            document.querySelector(".final-section");

        if (finalPage) {

            finalPage.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 1800);

}


/* Click flame */

flame.addEventListener("click", blowCandle);


/* Click button */

blowCandleBtn.addEventListener("click", blowCandle);


/* ================= CANDLE HEART BURST ================= */

function createCandleHearts() {

    for (let i = 0; i < 35; i++) {

        setTimeout(function() {

            const heart =
                document.createElement("div");

            heart.className = "heart";

            heart.textContent =
                Math.random() > 0.5 ? "♥" : "♡";

            heart.style.left =
                (35 + Math.random() * 30) + "%";

            heart.style.bottom =
                (35 + Math.random() * 15) + "%";

            heart.style.fontSize =
                (12 + Math.random() * 20) + "px";

            heart.style.animationDuration =
                (3 + Math.random() * 3) + "s";

            heartsContainer.appendChild(heart);


            setTimeout(function() {

                heart.remove();

            }, 7000);

        }, i * 50);

    }

}
