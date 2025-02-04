// Ensure elements exist
const time = document.getElementsByClassName('bubbles')[0];
const fish1 = document.getElementById("fish1");
const fish2 = document.getElementById("fish2");
const fish3 = document.getElementById("fish3");
const fish4 = document.getElementById("fish4");

// Define additional elements (Make sure they exist in your HTML)
const text = document.getElementById("text");
const cloud = document.getElementById("cloud");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const explore = document.getElementById("explore");
const rocks = document.getElementById("rocks");
const forest = document.getElementById("forest");
const sky = document.getElementById("sky");
const mountains = document.getElementById("mountains");
const header = document.getElementById("header");
const sun = document.getElementById("sun");
const splash = document.getElementById("splash");

// Padding values for desktop
let fish2move = 100;
let fish3move = 900;
let fish4move = 1200;

if (screen.width < 400) {
    // Change transformation duration and translateY for mobile view
    time.style.setProperty('--transform-duration', '15s');
    time.style.setProperty('--transform-y', '-700vh');

    // Padding values for mobile
    fish2move = 1680;
    fish3move = 3000;
    fish4move = 4300;
}

window.addEventListener('scroll', function () {
    let value = window.scrollY; // Get Scroll Value

    // Apply movement to elements
    if (text) text.style.top = 50 + value * -0.2 + '%';
    if (cloud) cloud.style.left = value * 2 + 'px';

    if (bird1) {
        bird1.style.top = value * 0.1 + 'px';
        bird1.style.left = value * 1 + 'px';
    }

    if (bird2) {
        bird2.style.top = value * -0.1 + 'px';
        bird2.style.left = value * -2 + 'px';
    }

    if (explore) explore.style.marginTop = value * 1.5 + 'px';
    if (rocks) rocks.style.top = value * -0.14 + 'px';
    if (forest) forest.style.top = value * 0.4 + 'px';
    if (sky) sky.style.top = value * 0.25 + 'px';
    if (mountains) mountains.style.top = value * 0.25 + 'px';
    if (header) header.style.top = value * 0.7 + 'px';
    if (sun) sun.style.top = value * 1 + 'px';

    // Prevent splash from moving above sea water
    if (value < 380 && splash) {
        splash.style.top = 20 + value * -0.3 + 'px';
    }

    // Move fishes horizontally with only `left`
    if (fish1) fish1.style.left = (value - 100) + 'px';
    if (fish2) fish2.style.right = (value - 100) + 'px';
    if (fish3) fish3.style.left = (value - 100) + 'px';
    if (fish4) fish4.style.right = (value - 100) + 'px';
});



// Contains the link for all social media handles
var links = document.getElementsByClassName("social-media");

links[0].addEventListener("click", () => { openlink(1) });
links[1].addEventListener("click", () => { openlink(2) });
links[2].addEventListener("click", () => { openlink(3) });
links[3].addEventListener("click", () => { openlink(4) });

function openlink(x) {
    if (x == 1) {
        window.open("https://www.instagram.com/_.vini._02_/", "_blank");
    }
    if (x == 2) {
        window.open("https://www.linkedin.com/in/vineet-kumar-gupta-2833ab196/", "_blank");
    }
    if (x == 3) {
        window.open("https://github.com/VineetKumar02", "_blank");
    }
    if (x == 4) {
        window.open("https://vineet-portfolio-site.netlify.app/", "_blank");
    }
}


async function searchAI() {
    let userInput = document.getElementById("search-input").value.trim();
    let searchResults = document.getElementById("search-results");

    if (userInput === "") return;

    // Show result box and display loading message
    searchResults.style.display = "block";
    searchResults.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCsI-_hZsHlBc55v5TpPPxZLwd17ktq4YY", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userInput }] }]
            })
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging log

        if (data.candidates && data.candidates.length > 0) {
            let aiResponse = data.candidates[0].content.parts[0].text;
            searchResults.innerHTML = `<p><b>Answer:</b> ${aiResponse}</p>`;
        } else {
            searchResults.innerHTML = `<p><b>AI:</b> Sorry, I couldn't find an answer.</p>`;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        searchResults.innerHTML = `<p><b>AI:</b> Oops! Something went wrong. Try again later.</p>`;
    }

    document.getElementById("search-input").value = "";
}
