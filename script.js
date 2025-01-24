document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('progress');
  const images = document.querySelectorAll('img');
  let loadedImages = 0;

  // Функция для обновления прогресс-бара
  function updateProgress() {
    loadedImages++;
    const progress = (loadedImages / images.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Если все изображения загружены, скрываем лоадер
    if (loadedImages === images.length) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500); // Задержка перед скрытием лоадера
      }, 500); // Задержка перед началом исчезновения
    }
  }

  // Проверяем, загружены ли изображения
  images.forEach(img => {
    if (img.complete) {
      updateProgress();
    } else {
      img.addEventListener('load', updateProgress);
      img.addEventListener('error', updateProgress); // На случай ошибки загрузки
    }
  });

  // Если на странице нет изображений, сразу скрываем лоадер
  if (images.length === 0) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
});







document.addEventListener("DOMContentLoaded", function () {
  const text = "Приглашаю тебя на мой день рождения, который состоится 8 февраля В 22:00 Гастропаб ZAVOD г. Минск пр-т Машерова 19. Буду рада видеть тебя на этом празднике!";
  const textElement = document.getElementById("text-content");
  let index = 0;

  // Задержка перед началом написания текста
  setTimeout(() => {
    function typeWriter() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 65); // Задержка между буквами
      }
    }

    typeWriter();
  }, 11000); // Задержка 11 секунд

  const counterElement = document.getElementById('counter');
  const img2Element = document.querySelector('.img2');
  const gifBox = document.getElementById('gif-box'); // Блок с GIF-изображениями
  const bacImage = document.querySelector('.bac'); // Изображение, которое нужно показать после gif-box
  counterElement.style.left = '50%';
  counterElement.style.top = '60%';
  counterElement.style.transform = 'translate(-50%, -50%)';
  if (!bacImage) {
    console.error('Элемент .bac не найден!');
  }

  let currentNumber = 0;
  const targetNumber = 26;
  const duration = 3000; // Длительность анимации в миллисекундах
  const startDelay = 1000; // Задержка перед началом отсчета (1 секунда)
  const endDelay = 3500; // Задержка после завершения отсчета (0.5 секунды)
  const pulseDelay = 800; // Пауза перед анимацией пульсации (2 секунды)
  const gifDisplayTime = 4000; // Время отображения GIF-изображений (4 секунды)
  const gifShowDelay = -1800; // Задержка перед показом блока (1.5 секунды)
  let startTime = null; // Время начала анимации (будет задано после задержки)

  // Задержка перед началом отсчета
  setTimeout(() => {
    startTime = Date.now(); // Задаем время начала анимации после задержки
    updateCounter(); // Запускаем анимацию отсчета
  }, startDelay);

  // Функция для обновления счетчика
  function updateCounter() {
    const elapsedTime = Date.now() - startTime; // Прошедшее время
    const progress = Math.min(elapsedTime / duration, 1); // Прогресс от 0 до 1

    // Применяем ease-out для плавного замедления
    currentNumber = Math.floor(targetNumber * easeOutQuad(progress));

    // Ограничиваем число до targetNumber
    if (currentNumber > targetNumber) {
      currentNumber = targetNumber;
    }

    counterElement.textContent = currentNumber; // Обновляем текст
    counterElement.setAttribute('data-double', currentNumber); // Обновляем data-double

    if (currentNumber < targetNumber) {
      requestAnimationFrame(updateCounter); // Продолжаем анимацию
    } else {
      // Когда отсчет достигает 26, ждем 2 секунды, затем запускаем анимацию
      setTimeout(() => {
        counterElement.classList.add('pulse'); // Добавляем класс для анимации

        // Ждем 1.5 секунды перед показом блока с GIF-изображениями
        setTimeout(() => {
          if (gifBox) {
            gifBox.style.display = 'flex'; // Или 'block', в зависимости от вашего стиля

            // Поочередный показ элементов
            const items = [
              document.querySelector('.item4'), // Первым показываем item4
              document.querySelector('.item2'), // Затем item2
              document.querySelector('.item3'), // Затем item3
              document.querySelector('.item1')  // Затем item1
            ];

            function showItemsSequentially(index) {
              if (index >= items.length) return; // Останавливаемся, если все элементы показаны

              // Показываем текущий элемент
              items[index].style.display = 'block';

              // Через 1 секунду показываем следующий элемент
              setTimeout(() => {
                showItemsSequentially(index + 1);
              }, 1000); // Задержка 1 секунда
            }

            // Начинаем поочередный показ элементов
            showItemsSequentially(0);

            // Скрываем блок через 4 секунды (после показа всех элементов)
            setTimeout(() => {
              gifBox.style.display = 'none';

              // Плавное появление изображения .bac
              if (bacImage) {
                fadeIn(bacImage, 3000); // Длительность анимации 2 секунды
              } else {
                console.error('Элемент .bac не найден!');
              }
            }, gifDisplayTime);
          } else {
            console.error('Элемент gif-box не найден!');
          }
        }, gifShowDelay); // Задержка перед показом блока

        // Ждем завершения анимации, затем скрываем счетчик и показываем изображение
        setTimeout(() => {
          counterElement.style.opacity = '0'; // Исчезновение цифр
        // Появление изображения  img2Element.style.opacity = '1'; 
        }, endDelay);
      }, pulseDelay); // Пауза перед анимацией
    }
  }

  // Функция для плавного появления
  function fadeIn(element, duration) {
    let opacity = 0;
    const interval = 50; // Интервал обновления (в миллисекундах)
    const delta = interval / duration; // Шаг изменения прозрачности

    const timer = setInterval(() => {
      opacity += delta;
      element.style.opacity = opacity;

      if (opacity >= .6) {
        clearInterval(timer); // Останавливаем анимацию, когда opacity достигает 1
      }
    }, interval);
  }

  // Функция для плавного замедления (ease-out)
  function easeOutQuad(t) {
    return t * (2 - t);
  }
});
