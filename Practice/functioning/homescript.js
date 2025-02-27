document.addEventListener("DOMContentLoaded", () =>
{



    const container = document.getElementById("container");
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
        const items = Array.from(container.children);
        items.forEach(item => {
            let clone = item.cloneNode(true);
            container.appendChild(clone);
        });
    }

    duplicateItems();

    container.addEventListener("scroll", () => {
        if (container.scrollLeft === 0)
        {
            container.scrollLeft = container.scrollWidth / 2;
        }
        else if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1)
        {
            container.scrollLeft = container.scrollWidth / 4;
        }
        updateCenterItem();
    });

    function updateCenterItem() {
        const items = document.querySelectorAll(".item");
        const containerRect = container.getBoundingClientRect();
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


