document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('progress');
  const images = document.querySelectorAll('img');
  let loadedImages = 0;

  function updateProgress() {
    loadedImages++;
    const progress = (loadedImages / images.length) * 100;
    progressBar.style.width = `${progress}%`;

    if (loadedImages === images.length) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 500);
    }
  }

  images.forEach(img => {
    if (img.complete) {
      updateProgress();
    } else {
      img.addEventListener('load', updateProgress);
      img.addEventListener('error', updateProgress);
    }
  });

  if (images.length === 0) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }

  const text = "Приглашаю тебя на мой день рождения, который состоится 8 февраля В 22:00 Гастропаб ZAVOD г. Минск пр-т Машерова 19. Буду рада видеть тебя на этом празднике!";
  const textElement = document.getElementById("text-content");
  let index = 0;

  setTimeout(() => {
    function typeWriter() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 65);
      }
    }

    typeWriter();
  }, 11000);

  const counterElement = document.getElementById('counter');
  const img2Element = document.querySelector('.img2');
  const gifBox = document.getElementById('gif-box');
  const bacImage = document.querySelector('.bac');

  counterElement.style.left = '50%';
  counterElement.style.top = '60%';
  counterElement.style.position = 'fixed';
  counterElement.style.transform = 'translate(-50%, -50%)';

  let currentNumber = 0;
  const targetNumber = 26;
  const duration = 3000;
  const startDelay = 1000;
  const endDelay = 3500;
  const pulseDelay = 800;
  const gifDisplayTime = 3000;
  const gifShowDelay = 800;
  let startTime = null;

  setTimeout(() => {
    startTime = Date.now();
    updateCounter();
  }, startDelay);

  function updateCounter() {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    currentNumber = Math.floor(targetNumber * easeOutQuad(progress));

    if (currentNumber > targetNumber) {
      currentNumber = targetNumber;
    }

    counterElement.textContent = currentNumber;
    counterElement.setAttribute('data-double', currentNumber);

    if (currentNumber < targetNumber) {
      requestAnimationFrame(updateCounter);
    } else {
      setTimeout(() => {
        counterElement.classList.add('pulse');

        setTimeout(() => {
          if (gifBox) {
            gifBox.style.display = 'flex';

            const items = [
              document.querySelector('.item4'),
              document.querySelector('.item2'),
              document.querySelector('.item3'),
              document.querySelector('.item1')
            ];

            function showItemsSequentially(index) {
              if (index >= items.length) return;
              items[index].style.display = 'block';
              setTimeout(() => {
                showItemsSequentially(index + 1);
              }, 1000);
            }

            showItemsSequentially(0);

            setTimeout(() => {
              gifBox.style.display = 'none';

              if (bacImage) {
                fadeIn(bacImage, 3000);
              } else {
                console.error('Элемент .bac не найден!');
              }
            }, gifDisplayTime);
          } else {
            console.error('Элемент gif-box не найден!');
          }
        }, gifShowDelay);

        setTimeout(() => {
          counterElement.style.opacity = '0';
        }, endDelay);
      }, pulseDelay);
    }
  }

  function fadeIn(element, duration) {
    let opacity = 0;
    const interval = 50;
    const delta = interval / duration;

    const timer = setInterval(() => {
      opacity += delta;
      element.style.opacity = opacity;

      if (opacity >= .6) {
        clearInterval(timer);
      }
    }, interval);
  }

  function easeOutQuad(t) {
    return t * (2 - t);
  }
});