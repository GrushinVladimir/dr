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
        // Показываем видео через 3.5 секунды
        setTimeout(() => {
          const videoElement = document.querySelector('video');
          videoElement.style.opacity = '1'; // Делаем видео видимым

          // Скрываем видео через 7.9 секунды после появления
          setTimeout(() => {
              videoElement.style.opacity = '0'; // Делаем видео невидимым

              // Показываем GIF через 0.5 секунды после исчезновения видео
              setTimeout(() => {
                  const gifElement = document.getElementById('gif-image');
                  gifElement.style.opacity = '1'; // Делаем GIF видимым
              }, 500); // 500 миллисекунд = 0.5 секунды
          }, 10000); // 7900 миллисекунд = 7.9 секунды
      }, 5500); // 3500 миллисекунд = 3.5 секунды

      const counterElement = document.getElementById('counter');
      const img2Element = document.querySelector('.img2');
      const gifBox = document.getElementById('gif-box'); // Блок с GIF-изображениями
      let currentNumber = 0;
      const targetNumber = 26;
      const duration = 3000; // Длительность анимации в миллисекундах
      const startDelay = 1000; // Задержка перед началом отсчета (1 секунда)
      const endDelay = 5500; // Задержка после завершения отсчета (0.5 секунды)
      const pulseDelay = 0; // Пауза перед анимацией пульсации (2 секунды)
      const gifDisplayTime = 4000; // Время отображения GIF-изображений (4 секунды)
      const gifShowDelay = 800; // Задержка перед показом блока (1.5 секунды)
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