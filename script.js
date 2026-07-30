// Cherry Blossom Animation
function createPetal() {
    const container = document.getElementById("petal-container");
    const petal = document.createElement("div");
    petal.className = "petal";

    // Random shades of pink
    const pinks = [
        "#FFB6C1", // Light pink
        "#FFC0CB", // Pink
        "#FF69B4", // Hot pink
        "#FFB7D1", // Light hot pink
        "#FF88BB", // Medium pink
        "#FFABCD", // Darker light pink
        "#FF99CC", // Soft pink
        "#EE82EE"  // Violet pink (for variety)
    ];

    const randomPink = pinks[Math.floor(Math.random() * pinks.length)];
    petal.style.backgroundColor = randomPink;

    // Random horizontal position
    const randomX = Math.random() * window.innerWidth;
    petal.style.left = randomX + "px";

    // Random animation duration (longer = slower fall)
    const duration = Math.random() * 4 + 6; // 6-10 seconds
    petal.style.animationDuration = duration + "s";

    container.appendChild(petal);
    petal.classList.add("petal-fall");

    // Remove petal from DOM after animation completes
    setTimeout(() => {
        petal.remove();
    }, duration * 2000);
}

// Create petals continuously
function startPetalAnimation() {
    setInterval(createPetal, 100); // Create a new petal every 100ms
}

const images = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg",
    "images/5.jpeg"
];

let currentImageIndex = 0;
let slideshowInterval = null;
let activeBackgroundLayer = 1;
let clickCount = 0;

function startBackgroundSlideshow() {
    if (slideshowInterval) return;

    const layer1 = document.getElementById("bg-layer-1");
    const layer2 = document.getElementById("bg-layer-2");

    layer1.style.backgroundImage = `url('${images[0]}')`;
    layer2.style.backgroundImage = `url('${images[1]}')`;
    layer1.style.opacity = "0";
    layer2.style.opacity = "0";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            layer1.style.opacity = "1";
        });
    });

    slideshowInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const nextImage = images[currentImageIndex];
        const incomingLayer = activeBackgroundLayer === 1 ? layer2 : layer1;
        const outgoingLayer = activeBackgroundLayer === 1 ? layer1 : layer2;

        incomingLayer.style.backgroundImage = `url('${nextImage}')`;
        incomingLayer.style.opacity = "1";
        outgoingLayer.style.opacity = "0";
        activeBackgroundLayer = activeBackgroundLayer === 1 ? 2 : 1;
    }, 2500);
}

function updateBoxContent() {
    const box = document.getElementById("box");
    const heading = box.querySelector("h1");
    const paragraph = box.querySelector("p");

    heading.textContent = "A little surprise for you";
    paragraph.innerHTML = "You arrived so quietly, yet somehow became the loudest thing in my soul.<br>You are the reason tomorrow still bothers to knock on my door.<br>I want to love you in ways that thrill a poet and worry a therapist.<br>If home had a heartbeat, it would borrow yours.<br>Every version of my future keeps rewriting itself just to keep your name in it.<br>Should the stars resign, I'd still have enough light if you looked my way.<br>You are not my whole life... you're simply the part that taught the rest of it how to live.";
}

window.addEventListener("load", () => {
    // Start cherry blossom animation
    startPetalAnimation();

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("butt");
    const box = document.getElementById("box");

    button.addEventListener("click", () => {
        clickCount += 1;

        if (clickCount === 1) {
            // First click
            box.classList.add("activated");
            updateBoxContent();
            startBackgroundSlideshow();
            button.textContent = "Again?";

            setTimeout(() => {
                music.play().catch(err => {
                    console.log("Autoplay blocked:", err);
                });
            }, 500);
        } else if (clickCount === 2) {
            // Second click - change the text and heading
            const heading = box.querySelector("h1");
            const paragraph = box.querySelector("p");

            heading.textContent = "Every time feels like the first time";
            paragraph.innerHTML = "You're my favorite hello and my hardest goodbye.<br>In a life full of uncertainties, you're the only certainty I need.<br>You turn ordinary moments into memories I'll treasure forever.<br>With you, forever doesn't sound long enough.<br>You're not just someone I love, you're someone I can't imagine my life without.";
            button.textContent = "one more";
        } else {
            // Third click - reveal a poem
            const heading = box.querySelector("h1");
            const paragraph = box.querySelector("p");

            heading.textContent = "A little poem for you";
            paragraph.innerHTML = "Jitni talab mujhe hai tujhko dekhne ki,<br>shayad meri aankhen Khuda ne teri bachi mitti se banayi hain.<br>Har dafa tujhe dekhta hoon, lagta hai apni hi kami poori ho gayi,<br>jaise meri rooh ka adhoora hissa aakhir apni jagah laut aaya ho.<br>Ab duaon mein jannat nahi maangta,<br>bas itna chahta hoon ki har zindagi mein<br>meri nazar ka pehla sukoon... sirf tu hi ho.";
            button.textContent = "Made for you";
        }
    });

    setTimeout(() => {
        music.play().catch(err => {
            console.log("Autoplay blocked:", err);
        });
    }, 200);
});