let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');
const fallbackImage = 'images/fallback.jpg';

document.querySelector('.next').addEventListener('click', () => {
    moveToNextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    moveToPrevSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        moveToSlide(index);
    });
});

function moveToNextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

function moveToPrevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1;
    }
    updateCarousel();
}

function moveToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Load fallback image if original fails
slides.forEach(slide => {
    const img = slide.querySelector('img');
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback also fails
        this.src = fallbackImage;
    };
});

// Initialize the first dot as active
dots[0].classList.add('active');

// Preload images and set fallback if needed
window.addEventListener('load', () => {
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        const tempImage = new Image();
        tempImage.src = img.src;
        tempImage.onerror = function() {
            img.src = fallbackImage;
        };
    });
});