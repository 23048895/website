document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showSlide(index) {
        items[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        currentIndex = index;
        items[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    prevButton.addEventListener('click', function () {
        const nextIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        showSlide(nextIndex);
    });

    nextButton.addEventListener('click', function () {
        const nextIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        showSlide(nextIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            showSlide(index);
        });
    });
});
