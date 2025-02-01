document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");

    function duplicateItems() {
        const items = Array.from(container.children);
        items.forEach(item => {
            let clone = item.cloneNode(true);
            container.appendChild(clone);
        });
    }

    duplicateItems();

    container.addEventListener("scroll", () => {
        if (container.scrollLeft === 0) {
            container.scrollLeft = container.scrollWidth / 2;
        } else if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
            container.scrollLeft = container.scrollWidth / 4;
        }
        // Check the currently centered item on scroll
        updateCenterItem();
    });

    function updateCenterItem() {
        const items = document.querySelectorAll(".item");
        const containerRect = container.getBoundingClientRect(); // Get container's dimensions
        const containerCenter = containerRect.left + containerRect.width / 2; // Container's center

        let closestItem = null;
        let closestDistance = Infinity;

        items.forEach(item => {
            const rect = item.getBoundingClientRect(); // Get item's bounding box
            const itemCenter = rect.left + rect.width / 2; // Item's center
            const distance = Math.abs(containerCenter - itemCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });

        // Add 'enlarged' to the closest item and remove it from others
        items.forEach(item => item.classList.remove("enlarged"));
        if (closestItem) closestItem.classList.add("enlarged");
    }

    // Run the function initially to make sure the first item is marked correctly
    updateCenterItem();
});