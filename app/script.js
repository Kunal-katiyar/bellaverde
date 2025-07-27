document.addEventListener("DOMContentLoaded", () => {
    // Select the image
    const slideInImage = document.querySelector('.image-container img');

    if (!slideInImage) {
        console.error('Image not found in the DOM!');
        return;
    }

    // Create an IntersectionObserver
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                console.log('Intersection entry:', entry); // Debugging log
                if (entry.isIntersecting) {
                    console.log('Image is in view!');
                    slideInImage.classList.add('visible'); // Add visible class
                    observer.unobserve(slideInImage); // Stop observing after animation triggers
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the image is visible
    );

    // Start observing the image
    observer.observe(slideInImage);
});
