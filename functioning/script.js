document.addEventListener("DOMContentLoaded", () => {
    let element = document.getElementById("loader");

    element.style.animation = "loading 1.5s ease-in-out infinite";

    window.onload = function () {

        element.addEventListener("animationiteration", function () {
            element.style.animation = "none"; 
            element.offsetHeight;
            element.style.animation = "loaded .8s linear 1 forwards";

            setTimeout(function () {
                document.getElementById("loaderScreen").classList.add("loaded");
            }, 800);

            element.addEventListener("transitionend", function () {
                const loaderScreen = document.querySelector(".loader");
                if (loaderScreen) {
                    document.body.removeChild(loaderScreen);
                }
            });
        }, { once: true }); 
    };
});
document.addEventListener("DOMContentLoaded", () => {
    const home = document.getElementById("home");
    const background = document.getElementById("background");
    const backgroundColors = {
        item1: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(103,103,103,1) 100%)",
        item2: "radial-gradient(circle, rgba(151,175,209,1) 0%, rgba(84,77,43,1) 95%, rgba(32,24,11,1) 100%)",
        item3: "radial-gradient(circle, rgba(138,121,93,1) 0%, rgba(123,107,82,1) 60%, rgba(51,50,45,1) 100%)",
        item4: "radial-gradient(circle, rgba(164,160,156,1) 0%, rgba(44,48,43,1) 92%, rgba(95,85,66,1) 100%, rgba(63,56,39,1) 100%)",
        item5: "radial-gradient(circle, rgba(144,145,134,1) 0%, rgba(34,39,39,1) 100%)",
        item6: "radial-gradient(circle, rgba(104,125,164,1) 0%, rgba(202,152,101,1) 100%)",
        item7: "radial-gradient(circle, rgba(71,124,178,1) 0%, rgba(115,112,117,1) 84%, rgba(5,1,9,1) 100%)",
        item8: "radial-gradient(circle, rgba(22,19,16,1) 0%, rgba(49,49,54,1) 100%)",
        item9: "radial-gradient(circle, rgba(214,226,241,1) 0%, rgba(98,118,67,1) 100%)",
        item10: "radial-gradient(circle, rgba(102,89,61,1) 0%, rgba(13,11,8,1) 100%)",
    };

    function duplicateItems() {
        const items = Array.from(home.children);
        items.forEach(item => {
            let clone = item.cloneNode(true);
            home.appendChild(clone);
        });

        home.scrollLeft = home.scrollWidth / 2;
    }

    duplicateItems();

    home.addEventListener("scroll", () => {
        if (home.scrollLeft === 0) {
            home.scrollLeft = home.scrollWidth / 2;
        } else if (home.scrollLeft + home.clientWidth >= home.scrollWidth - 1) {
            home.scrollLeft = home.scrollWidth / 4;
        }
        updateCenterItem();
    });

    function updateCenterItem() {
        const items = document.querySelectorAll(".item");
        const containerRect = home.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestItem = null;
        let closestDistance = Infinity;

        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });

        items.forEach(item => item.classList.remove("enlarged"));
        if (closestItem) closestItem.classList.add("enlarged");

        if (closestItem && closestItem.id in backgroundColors) {
            fadeBackground(backgroundColors[closestItem.id]);
        }
    }

    function fadeBackground(newGradient) {
        if (divOpened) {

            background.style.background = newGradient;
            return;
        }
        
        background.style.opacity = "0";
        setTimeout(() => {
            background.style.background = newGradient;
            background.style.opacity = "1";
        }, 500);
    }

    updateCenterItem();


    document.addEventListener("keydown", (event) => {
        if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && divOpened) {
            event.preventDefault();
        }
    });
});

function switchPage(page) {
    const pages = ["home", "subscriptions", "aboutUs", "contact"];

    pages.forEach(p => {
        const section = document.getElementById(p);
        const underline = document.getElementById(`${p}Underline`);

        if (p === page) {
            section.style.display = "flex";
            underline.style.width = "100%";
        } else {
            section.style.display = "none";
            underline.style.width = "0";
        }
    });

    openMenu();
}
let menuOpened = false;

function openMenu() {
    menuOpened = !menuOpened;
    document.getElementById("menuLogo").style.top = menuOpened ? "0px" : "-225px";
}


let divOpened = false;
const video = document.querySelectorAll(".vid");
function clickedDiv() {
    divOpened = !divOpened; 
    const enlargedDiv = document.querySelector(".item.enlarged");
    const home = document.getElementById("home");
    const logos = document.querySelectorAll(".logo");
    const videos = document.querySelectorAll(".vid");
    
    if (enlargedDiv) {
        enlargedDiv.style.minWidth = divOpened ? "98%" : "calc((100% / 5) - 8px)";
        enlargedDiv.style.zIndex = divOpened ? "2" : "1";
        home.style.overflowX = divOpened ? "hidden" : "scroll";

        logos.forEach(logo => {
            if (divOpened) {
                setTimeout(() => {
                    logo.style.transform = "translateX(80%)";
                }, 1000);
                logo.style.width = "30%";
            } else {
                logo.style.transform = "translateX(0)";
                logo.style.width = "90%";
            }
        });

        // Modified video handling
        videos.forEach(video => {
            if (divOpened) {
                // Load the video when div is opened
                if (video.closest('.item') === enlargedDiv) {
                    const videoSrc = video.getAttribute('data-src');
                    if (videoSrc && !video.src) {
                        video.src = videoSrc;
                    }
                    setTimeout(() => {
                        video.style.opacity = "1";
                    }, 1200);
                }
            } else {
                // Reset video when div is closed
                video.style.opacity = "0";
                setTimeout(() => {
                    video.src = '';
                }, 500); // Wait for fade out before removing source
            }
        });
    }
}

function openForm(){
    const form = document.getElementById("form");

    form.classList.add = "open";
}