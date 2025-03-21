window.onload = function () {
    let element = document.getElementById("loader");
    element.style.animation = "loading 1.5s ease-in-out 1";
    addEventListener("animationend", function () {
        element.classList.remove("loading");
        element.style.animation = "loaded .8s linear 1 forwards";
        setTimeout(function () {
            document.getElementById("loaderScreen").classList.add("loaded");


        }, 800);
        document.getElementById("loader").addEventListener("transitionend", function () {
            document.body.removeChild(document.querySelector(".loader"));
        })
    })
};

document.addEventListener("mousemove", (event) => {
    document.getElementById("cursor").style.transform = `translate(${event.clientX - 12.5}px, ${event.clientY - 12.5}px)`;
    const topBar = document.getElementById("topBar");
    const cursor = document.getElementById("cursor");
    // test
    topBar.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
    })
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
        background.style.opacity = 0;

        setTimeout(() => {
            background.style.background = newGradient;
            background.style.opacity = 1;
        }, 500);
    }

    updateCenterItem();
});

let menuOpened = true;

function homePage() {

    document.getElementById("home").style.display = "flex";
    document.getElementById("aboutUs").style.display = "none";
    document.getElementById("contact").style.display = "none";
    document.getElementById("subscriptions").style.display = "none";

    // document.getElementById("home").style.animation = "appear 3s";
    // document.getElementById("aboutUs").style.animation = "disappear 3s";
    // document.getElementById("contact").style.animation = "disappear 3s";
    // document.getElementById("subscriptions").style.animation = "disappear 3s";

    document.getElementById("homeUnderline").style.width = "100%";
    document.getElementById("aboutUsUnderline").style.width = "0";
    document.getElementById("contactUnderline").style.width = "0";
    document.getElementById("subscriptionsUnderline").style.width = "0";

    menuOpened = false;
    openMenu();
}

function aboutUsPage() {
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutUs").style.display = "flex";
    document.getElementById("contact").style.display = "none";
    document.getElementById("subscriptions").style.display = "none";

    // document.getElementById("home").style.animation = "disappear 3s";
    // document.getElementById("aboutUs").style.animation = "appear 3s";
    // document.getElementById("contact").style.animation = "disappear 3s";
    // document.getElementById("subscriptions").style.animation = "disappear 3s";

    document.getElementById("homeUnderline").style.width = "0";
    document.getElementById("aboutUsUnderline").style.width = "100%";
    document.getElementById("contactUnderline").style.width = "0";
    document.getElementById("subscriptionsUnderline").style.width = "0";

    menuOpened = false;
    openMenu();
}

function contactPage() {
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutUs").style.display = "none";
    document.getElementById("contact").style.display = "flex";
    document.getElementById("subscriptions").style.display = "none";

    // document.getElementById("home").style.animation = "disappear 3s";
    // document.getElementById("aboutUs").style.animation = "disappear 3s";
    // document.getElementById("contact").style.animation = "appear 3s";
    // document.getElementById("subscriptions").style.animation = "disappear 3s";

    document.getElementById("homeUnderline").style.width = "0";
    document.getElementById("aboutUsUnderline").style.width = "0";
    document.getElementById("contactUnderline").style.width = "100%";
    document.getElementById("subscriptionsUnderline").style.width = "0";

    menuOpened = false;
    openMenu();
}

function subscriptionsPage() {
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutUs").style.display = "none";
    document.getElementById("contact").style.display = "none";
    document.getElementById("subscriptions").style.display = "flex";

    // document.getElementById("home").style.animation = "disappear 3s";
    // document.getElementById("aboutUs").style.animation = "disappear 3s";
    // document.getElementById("contact").style.animation = "disappear 3s";
    // document.getElementById("subscriptions").style.animation = "appear 3s";

    document.getElementById("homeUnderline").style.width = "0";
    document.getElementById("aboutUsUnderline").style.width = "0";
    document.getElementById("contactUnderline").style.width = "0";
    document.getElementById("subscriptionsUnderline").style.width = "100%";

    menuOpened = false;
    openMenu();
}



function openMenu() {

    if (menuOpened === true) {
        document.getElementById("menuLogo").style.top = "0px";
        menuOpened = false;

    } else if (menuOpened === false) {
        document.getElementById("menuLogo").style.top = "-225px";
        menuOpened = true;
    }
}