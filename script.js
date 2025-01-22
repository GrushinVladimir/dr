document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progress'); // Элемент прогресса
  const video = document.getElementById('video-background'); // Видео

  // Функция для обновления прогресса
  function updateProgress(event) {
    if (event.type === 'progress') {
      // Обновляем прогресс-бар на основе загруженной части видео
      const progressWidth = (video.buffered.end(0) / video.duration) * 100;
      progress.style.width = `${progressWidth}%`;
    } else if (event.type === 'canplaythrough') {
      // Когда видео готово к воспроизведению, скрываем лоадер
      progress.style.width = '100%'; // Убедимся, что прогресс-бар заполнен
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500); // Задержка для плавного исчезновения
    }
  }

  // Отслеживаем прогресс загрузки видео
  video.addEventListener('progress', updateProgress);

  // Отслеживаем, когда видео готово к воспроизведению
  video.addEventListener('canplaythrough', updateProgress);

  // Если видео уже загружено, сразу скрываем лоадер
  if (video.readyState >= 3) { // 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
    progress.style.width = '100%';
    loader.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const text = "Приглашаю тебя на мой день рождения, который состоится 8 февраля в 19:00 в ресторане Завод. Буду рада видеть тебя на этом празднике!";
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
  }, 11000); // Задержка 4.5 секунды
});


const counterElement = document.getElementById('counter');
const img2Element = document.querySelector('.img2');
const gifBox = document.getElementById('gif-box'); // Блок с GIF-изображениями
let currentNumber = 0;
const targetNumber = 26;
const duration = 3000; // Длительность анимации в миллисекундах
const startDelay = 1000; // Задержка перед началом отсчета (1 секунда)
const endDelay = 5500; // Задержка после завершения отсчета (0.5 секунды)
const pulseDelay = 0; // Пауза перед анимацией пульсации (2 секунды)
const gifDisplayTime = 5500; // Время отображения GIF-изображений (4 секунды)
const gifShowDelay = 0; // Задержка перед показом блока (1.5 секунды)
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
          gifBox.style.display = 'block'; // Или 'block', в зависимости от вашего стиля

          // Поочередный показ элементов
          const items = [
            document.querySelector('.item4'), // Первым показываем item4
            document.querySelector('.item1'),  // Затем item1
            document.querySelector('.item2'), // Затем item2
            document.querySelector('.item3') // Затем item3
           
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
          }, gifDisplayTime);
        } else {
          console.error('Элемент gif-box не найден!');
        }
      }, gifShowDelay); // Задержка перед показом блока

      // Ждем завершения анимации, затем скрываем счетчик и показываем изображение
      setTimeout(() => {
        counterElement.style.opacity = '0'; // Исчезновение цифр
        img2Element.style.opacity = '1'; // Появление изображения
      }, endDelay);
    }, pulseDelay); // Пауза перед анимацией
  }
}

// Функция для плавного замедления (ease-out)
function easeOutQuad(t) {
  return t * (2 - t);
}

