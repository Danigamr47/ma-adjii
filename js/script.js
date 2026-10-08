document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ÉLÉMENTS
    ===================================================== */

    const backgroundMusic = document.getElementById("backgroundMusic");
    const openSurprise = document.getElementById("openSurprise");
    const envelope = document.getElementById("envelope");

    const musicButton = document.getElementById("musicButton");
    const musicIcon = document.getElementById("musicIcon");

    const letterText = document.getElementById("letterText");
    const letterSignature = document.getElementById("letterSignature");
    const continueButton = document.getElementById("continueButton");

    const nextStepButton = document.getElementById("nextStepButton");

    const reasonTitle = document.getElementById("reasonTitle");
    const reasonText = document.getElementById("reasonText");
    const reasonNumber = document.getElementById("reasonNumber");
    const reasonButton = document.getElementById("reasonButton");
    const reasonCounter = document.getElementById("reasonCounter");
    const reasonsFinal = document.getElementById("reasonsFinal");
    const finalContinueButton = document.getElementById("finalContinueButton");

    const giftCards = document.querySelectorAll(".gift-card");
    const giftMessage = document.getElementById("giftMessage");
    const giftMessageText = document.getElementById("giftMessageText");
    const unlockButton = document.getElementById("unlockButton");

    const cakeArea = document.getElementById("cakeArea");
    const blowMessage = document.getElementById("blowMessage");
    const birthdayFinal = document.getElementById("birthdayFinal");

    const progressDots = document.querySelectorAll(".progress-dot");
    const progressLines = document.querySelectorAll(".progress-line");


    /* =====================================================
       COMPTE À REBOURS — OUVERTURE LE 14 OCTOBRE À 23H59
    ===================================================== */

    const countdownScreen = document.getElementById("countdownScreen");
    const countdownUnlocked = document.getElementById("countdownUnlocked");
    const countdownOpenButton = document.getElementById("countdownOpenButton");
    const countdownDays = document.getElementById("countdownDays");
    const countdownHours = document.getElementById("countdownHours");
    const countdownMinutes = document.getElementById("countdownMinutes");
    const countdownSeconds = document.getElementById("countdownSeconds");

    // 14 octobre 2026 à 23h59, heure locale de l'appareil.
    const unlockDate = new Date(2026, 9, 14, 23, 59, 0, 0);

    let countdownInterval = null;

    function pad(value) {
        return String(value).padStart(2, "0");
    }

    function unlockSurpriseEntrance() {

        document.body.classList.remove("countdown-lock");
        document.body.classList.add("countdown-unlocked-state");
        document.body.classList.add("countdown-waiting-to-open");

        if (countdownScreen) {
            countdownScreen.classList.add("hidden");
        }

        if (countdownUnlocked) {
            countdownUnlocked.classList.add("visible");
        }

        document.querySelectorAll("main section, .letter-section, .memories-section, .reasons-section, .surprise-section, .cake-section")
            .forEach((section) => {
                section.inert = false;
            });

        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    function updateCountdown() {

        const remaining = unlockDate.getTime() - Date.now();

        if (remaining <= 0) {
            unlockSurpriseEntrance();
            return;
        }

        const totalSeconds = Math.floor(remaining / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (countdownDays) countdownDays.textContent = pad(days);
        if (countdownHours) countdownHours.textContent = pad(hours);
        if (countdownMinutes) countdownMinutes.textContent = pad(minutes);
        if (countdownSeconds) countdownSeconds.textContent = pad(seconds);
    }

    function initCountdown() {

        if (!countdownScreen) return;

        const isUnlocked = Date.now() >= unlockDate.getTime();

        if (isUnlocked) {
            unlockSurpriseEntrance();
            return;
        }

        document.body.classList.add("countdown-lock");

        document.querySelectorAll(".letter-section, .memories-section, .reasons-section, .surprise-section, .cake-section")
            .forEach((section) => {
                section.inert = true;
            });

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    initCountdown();

    if (countdownOpenButton && openSurprise) {
        countdownOpenButton.addEventListener("click", () => {

            document.body.classList.remove("countdown-waiting-to-open");

            if (countdownUnlocked) {
                countdownUnlocked.classList.remove("visible");
            }

            // Le clic vient directement de l'utilisatrice :
            // la musique peut donc démarrer sans problème de politique autoplay.
            openSurprise.click();
        });
    }


    let surpriseOpened = false;
    let currentReason = 0;
    let candlesBlown = false;

    const openedGifts = new Set();


    /* =====================================================
       LETTRE
    ===================================================== */

    const loveLetter = `Ma ADJIII ❤️

Aujourd'hui, ce n'est pas simplement ton anniversaire.

C'est aussi l'occasion de te rappeler à quel point tu comptes pour moi.

Il y a tellement de petites choses que j'aime chez toi...

Ta façon de parler, tes réactions, tes petites habitudes,
les moments où tu me fais rire sans même le vouloir.

Et puis il y a tous ces souvenirs qu'on a déjà créés ensemble.

Certains étaient prévus.

D'autres complètement improvisés.

Mais au final, ce sont souvent ces moments-là
que je préfère.

Dama la bëgg.

Et aujourd'hui, je voulais simplement te faire
une petite surprise à la hauteur de la personne
que tu es pour moi.

Joyeux anniversaire ma ADJIII. ❤️`;


    /* =====================================================
       OUVRIR LA SURPRISE
    ===================================================== */

    if (openSurprise) {

        openSurprise.addEventListener("click", async () => {

            if (surpriseOpened) return;

            surpriseOpened = true;
            openSurprise.disabled = true;

            document.body.classList.add("surprise-started");

            if (envelope) {
                envelope.classList.add("open");
            }


            /* MUSIQUE */

            if (backgroundMusic) {

                backgroundMusic.volume = 0.6;

                try {

                    await backgroundMusic.play();

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                    if (musicIcon) {
                        musicIcon.textContent = "♫";
                    }

                } catch (error) {

                    console.log(
                        "Lecture audio bloquée.",
                        error
                    );

                }

            }


            createHearts();


            /* LETTRE */

            const letterSection =
                document.getElementById("letterSection");

            if (letterSection) {

                letterSection.classList.add("section-visible");

                setTimeout(() => {

                    letterSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 700);

            }


            setTimeout(() => {
                typeLetter();
            }, 1000);

        });

    }


    /* =====================================================
       MUSIQUE
    ===================================================== */

    if (musicButton && backgroundMusic) {

        musicButton.addEventListener("click", async () => {

            if (backgroundMusic.paused) {

                try {

                    await backgroundMusic.play();

                    musicButton.classList.add("playing");

                    if (musicIcon) {
                        musicIcon.textContent = "♫";
                    }

                } catch (error) {

                    console.log(
                        "Impossible de reprendre la musique.",
                        error
                    );

                }

            } else {

                backgroundMusic.pause();

                musicButton.classList.remove("playing");

                if (musicIcon) {
                    musicIcon.textContent = "♪";
                }

            }

        });

    }


    /* =====================================================
       LETTRE — MACHINE À ÉCRIRE
    ===================================================== */

    function typeLetter() {

        if (!letterText) return;

        letterText.textContent = "";

        if (letterSignature) {
            letterSignature.classList.remove("visible");
        }

        if (continueButton) {
            continueButton.classList.remove("visible");
        }

        let index = 0;
        const speed = 28;


        function write() {

            if (index < loveLetter.length) {

                letterText.textContent +=
                    loveLetter.charAt(index);

                index++;

                setTimeout(write, speed);

            } else {

                letterText.classList.add("typing-complete");

                if (letterSignature) {
                    letterSignature.classList.add("visible");
                }

                if (continueButton) {
                    setTimeout(() => {
                        continueButton.classList.add("visible");
                    }, 500);
                }

            }

        }

        write();

    }


    /* =====================================================
       LETTRE → SOUVENIRS
    ===================================================== */

    if (continueButton) {

        continueButton.addEventListener("click", () => {

            const memoriesSection =
                document.getElementById("memoriesSection");

            if (memoriesSection) {

                memoriesSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       APPARITION DES SOUVENIRS
    ===================================================== */

    const memoryCards =
        document.querySelectorAll(".memory-card, .extra-photo");


    if ("IntersectionObserver" in window) {

        const memoryObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            memoryObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        memoryCards.forEach((card) => {
            memoryObserver.observe(card);
        });

    } else {

        memoryCards.forEach((card) => {
            card.classList.add("visible");
        });

    }


    /* =====================================================
       LIGHTBOX DES PHOTOS
    ===================================================== */

    const memoryLightbox =
        document.getElementById("memoryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const lightboxClose =
        document.getElementById("lightboxClose");


    const memoryPhotos =
        document.querySelectorAll(
            ".memory-image img, .extra-photo img"
        );


    memoryPhotos.forEach((photo) => {

        photo.addEventListener("click", () => {

            if (!memoryLightbox || !lightboxImage) {
                return;
            }

            lightboxImage.src = photo.src;
            lightboxImage.alt = photo.alt;


            const card =
                photo.closest(".memory-card");

            const extraPhoto =
                photo.closest(".extra-photo");


            if (card && lightboxCaption) {

                const text =
                    card.querySelector(
                        ".memory-content > p:last-child"
                    );

                if (text) {

                    lightboxCaption.textContent =
                        text.textContent.trim();

                } else {

                    lightboxCaption.textContent =
                        photo.alt;

                }

            } else if (extraPhoto && lightboxCaption) {

                lightboxCaption.textContent =
                    photo.alt;

            }


            memoryLightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    function closeLightbox() {

        if (!memoryLightbox) return;

        memoryLightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (memoryLightbox) {

        memoryLightbox.addEventListener("click", (event) => {

            if (event.target === memoryLightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            memoryLightbox &&
            memoryLightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });


    /* =====================================================
       SOUVENIRS → RAISONS
    ===================================================== */

    if (nextStepButton) {

        nextStepButton.addEventListener("click", () => {

            const reasonsSection =
                document.getElementById("reasonsSection");

            if (reasonsSection) {

                reasonsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       LES 5 RAISONS
    ===================================================== */

    const reasons = [

        {
            title: "Parce que tu es toi. ❤️",

            text:
                "Tu as ta façon d'être, tes petites habitudes, ton caractère... et c'est justement tout ça qui fait que tu es unique à mes yeux."
        },

        {
            title:
                "Parce que tu rends mes journées différentes. 📱",

            text:
                "Même un simple appel, un message ou une petite conversation avec toi peut complètement changer ma journée. Parfois, il ne faut vraiment pas grand-chose."
        },

        {
            title:
                "Parce que tu me fais rire. 😂",

            text:
                "Avec toi, même les situations les plus improbables peuvent devenir des souvenirs dont on rigole encore. Et franchement, nos aventures... dama leen bëgg."
        },

        {
            title:
                "Parce que je suis fier de toi. 🎓",

            text:
                "Je suis fier de tout ce que tu accomplis et de la personne que tu deviens. Ton BAC n'est qu'une étape parmi toutes celles qui t'attendent encore. Et moi, je serai là pour applaudir les prochaines."
        },

        {
            title:
                "Parce qu'avec toi, je me sens bien. ❤️",

            text:
                "Au fond, c'est peut-être la raison la plus importante. Avec toi, je peux rire, parler, être moi-même et simplement profiter du moment. Sama xol, c'est tout ce que je peux dire."
        }

    ];


    function displayReason(index) {

        if (!reasonTitle || !reasonText) return;

        const reason = reasons[index];


        reasonTitle.classList.remove("reason-changing");
        reasonText.classList.remove("reason-changing");

        void reasonTitle.offsetWidth;


        reasonTitle.textContent = reason.title;
        reasonText.textContent = reason.text;


        if (reasonNumber) {

            reasonNumber.textContent =
                `${String(index + 1).padStart(2, "0")} / 05`;

        }


        if (reasonCounter) {

            reasonCounter.textContent =
                `${index + 1} sur 5`;

        }


        reasonTitle.classList.add("reason-changing");
        reasonText.classList.add("reason-changing");

    }


    displayReason(0);


    if (reasonButton) {

        reasonButton.addEventListener("click", () => {

            if (currentReason < reasons.length - 1) {

                currentReason++;

                displayReason(currentReason);

            } else {

                reasonButton.classList.add("hidden");

                if (reasonCounter) {
                    reasonCounter.classList.add("hidden");
                }

                if (reasonsFinal) {
                    reasonsFinal.classList.add("visible");
                }

            }

        });

    }


    /* =====================================================
       RAISONS → CADEAUX
    ===================================================== */

    if (finalContinueButton) {

        finalContinueButton.addEventListener("click", () => {

            const surpriseSection =
                document.getElementById("surpriseSection");

            if (surpriseSection) {

                surpriseSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       CADEAUX
    ===================================================== */

    const giftMessages = [

        `Tu as choisi le petit mot... 💌

Alors voici quelque chose que je ne te dis peut-être pas assez :

j'aime vraiment la personne que tu es.

Tes petites manies, ton caractère, tes réactions...

même quand tu me fais lever les yeux au ciel 😂

tout ça fait partie de la personne que j'aime.`,

        `Tu as choisi la surprise... 🎁

Mais finalement, la vraie surprise,
ce n'est pas ce cadeau.

C'est le fait que parmi toutes les personnes
que j'aurais pu rencontrer,
j'ai eu la chance de te rencontrer toi.

Et ça...

sama xol, je ne l'échangerais pour rien. ❤️`,

        `Tu as choisi la rose... 🌹

Une rose pour une fille qui mérite
beaucoup plus qu'une simple rose.

Alors je te souhaite une vie remplie
de belles choses, de réussite,
de bonheur et de moments
qui te feront sourire.

Et si je peux être là pour certains
de ces moments...

je serai là. ❤️`

    ];


    giftCards.forEach((card) => {

        card.addEventListener("click", () => {

            const index =
                Number(card.dataset.gift);


            if (!giftMessages[index]) return;


            openedGifts.add(index);


            /* Animation flip */

            card.classList.add("flipped");
            card.classList.add("opened");


            if (giftMessage && giftMessageText) {

                giftMessageText.textContent =
                    giftMessages[index];

                giftMessage.classList.remove("visible");

                void giftMessage.offsetWidth;

                giftMessage.classList.add("visible");


                setTimeout(() => {

                    giftMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 150);

            }


            if (
                openedGifts.size ===
                giftCards.length
            ) {

                setTimeout(() => {

                    if (unlockButton) {

                        unlockButton.classList.add(
                            "visible"
                        );

                    }

                }, 500);

            }

        });

    });


    /* =====================================================
       CADEAUX → GÂTEAU
    ===================================================== */

    if (unlockButton) {

        unlockButton.addEventListener("click", () => {

            const cakeSection =
                document.getElementById("cakeSection");

            if (cakeSection) {

                cakeSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       GÂTEAU
    ===================================================== */

    function blowCandles() {

        if (candlesBlown) return;

        candlesBlown = true;

        cakeArea.classList.add("blown");


        if (blowMessage) {

            blowMessage.classList.add("hidden");

        }


        setTimeout(() => {

            createConfetti();

        }, 800);


        setTimeout(() => {

            if (birthdayFinal) {

                birthdayFinal.classList.add("visible");

                setTimeout(() => {

                    birthdayFinal.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 150);

            }

        }, 1500);

    }


    if (cakeArea) {

        cakeArea.addEventListener(
            "click",
            blowCandles
        );


        cakeArea.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    blowCandles();

                }

            }
        );

    }


    /* =====================================================
       CONFETTIS
    ===================================================== */

    function createConfetti() {

        const colors = [
            "#b38b50",
            "#8b3a45",
            "#70806a",
            "#d4b277",
            "#774133",
            "#ead8bd"
        ];


        for (let i = 0; i < 90; i++) {

            const confetti =
                document.createElement("div");

            confetti.className = "confetti";


            confetti.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            confetti.style.left =
                Math.random() * 100 + "vw";


            confetti.style.animationDuration =
                2.5 +
                Math.random() * 2.5 +
                "s";


            confetti.style.animationDelay =
                Math.random() * 0.8 +
                "s";


            document.body.appendChild(confetti);


            setTimeout(() => {

                confetti.remove();

            }, 6000);

        }

    }


    /* =====================================================
       CŒURS
    ===================================================== */

    function createHearts() {

        for (let i = 0; i < 25; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "floating-heart";

            heart.textContent =
                "♥";


            heart.style.left =
                Math.random() * 100 + "%";


            heart.style.animationDelay =
                Math.random() * 2 + "s";


            heart.style.animationDuration =
                3 +
                Math.random() * 3 +
                "s";


            document.body.appendChild(heart);


            setTimeout(() => {

                heart.remove();

            }, 6000);

        }

    }


    /* =====================================================
       ANIMATION DES SECTIONS
    ===================================================== */

    const sections =
        document.querySelectorAll(
            ".letter-section, " +
            ".memories-section, " +
            ".reasons-section, " +
            ".surprise-section, " +
            ".cake-section"
        );


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "section-visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    } else {

        sections.forEach((section) => {

            section.classList.add(
                "section-visible"
            );

        });

    }


    /* =====================================================
       PROGRESSION
    ===================================================== */

    const progressSections = [

        document.getElementById("heroSection"),
        document.getElementById("letterSection"),
        document.getElementById("memoriesSection"),
        document.getElementById("reasonsSection"),
        document.getElementById("surpriseSection"),
        document.getElementById("cakeSection")

    ].filter(Boolean);


    function updateProgress() {

        if (!progressSections.length) return;


        const position =
            window.scrollY +
            window.innerHeight * 0.35;


        let currentIndex = 0;


        progressSections.forEach(
            (section, index) => {

                if (
                    position >=
                    section.offsetTop
                ) {

                    currentIndex = index;

                }

            }
        );


        progressDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

                dot.classList.toggle(
                    "completed",
                    index < currentIndex
                );

            }
        );


        progressLines.forEach(
            (line, index) => {

                line.classList.toggle(
                    "active",
                    index < currentIndex
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateProgress
    );


    updateProgress();


    console.log(
        "❤️ Ma ADJIII — site chargé."
    );

});