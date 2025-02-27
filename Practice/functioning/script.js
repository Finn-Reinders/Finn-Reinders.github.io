document.addEventListener("DOMContentLoaded", () =>
{
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
        item10: "radial-gradient(circle, rgba(75,62,37,1) 0%, rgba(63,52,37,1) 99%)",
    };

    function duplicateItems()
    {
        const items = Array.from(home.children);
        items.forEach(item => {
            let clone = item.cloneNode(true);
            home.appendChild(clone);
        });
    }

    duplicateItems();

    home.addEventListener("scroll", () => {
        if (home.scrollLeft === 0)
        {
            home.scrollLeft = home.scrollWidth / 2;
        }
        else if (home.scrollLeft + home.clientWidth >= home.scrollWidth - 1)
        {
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

        if (closestItem && closestItem.id in backgroundColors)
        {
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
function openMenu() {

    if (menuOpened === true)
    {
        document.getElementById("menuLogo").style.height = "300px";
        menuOpened = false;
        document.getElementById("menuItemsId").style.display = "block";
    }
    else if (menuOpened === false)
    {
        document.getElementById("menuLogo").style.height = "75px";
        menuOpened = true;
        document.getElementById("menuItemsId").style.display = "none";
    }
}

function homePage()
{

        document.getElementById("home").style.display = "flex";
        document.getElementById("aboutUs").style.display = "none";
        document.getElementById("contact").style.display = "none";
        document.getElementById("subscriptions").style.display = "none";

    document.getElementById("homeUnderline").style.width = "100%";
    document.getElementById("aboutUsUnderline").style.width = "0";
    document.getElementById("contactUnderline").style.width = "0";
    document.getElementById("subscriptionsUnderline").style.width = "0";

}

function aboutUsPage()
{
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutUs").style.display = "flex";
    document.getElementById("contact").style.display = "none";
    document.getElementById("subscriptions").style.display = "none";

    document.getElementById("homeUnderline").style.width = "0";
    document.getElementById("aboutUsUnderline").style.width = "100%";
    document.getElementById("contactUnderline").style.width = "0";
    document.getElementById("subscriptionsUnderline").style.width = "0";
}

function contactPage()
{
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutUs").style.display = "none";
    document.getElementById("contact").style.display = "flex";
    document.getElementById("subscriptions").style.display = "none";

    document.getElementById("homeUnderline").style.width = "0";
    document.getElementById("aboutUsUnderline").style.width = "0";
    document.getElementById("contactUnderline").style.width = "100%";
    document.getElementById("subscriptionsUnderline").style.width = "0";
}

function subscriptionsPage()
{
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutUs").style.display = "none";
    document.getElementById("contact").style.display = "none";
    document.getElementById("subscriptions").style.display = "flex";

    document.getElementById("homeUnderline").style.width = "0";
    document.getElementById("aboutUsUnderline").style.width = "0";
    document.getElementById("contactUnderline").style.width = "0";
    document.getElementById("subscriptionsUnderline").style.width = "100%";
}

