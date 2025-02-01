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
    });

    // Enlarge the center item using IntersectionObserver
    const items = document.querySelectorAll(".item");
    const observerOptions = {
        root: container, // Observe within the scroll container
        rootMargin: "0px",
        threshold: 0.6 // Detect when 60% of the item is in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("enlarged");
            } else {
                entry.target.classList.remove("enlarged");
            }
        });
    }, observerOptions);

    items.forEach(item => observer.observe(item));
});
