// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Анимация появления элементов при прокрутке (IntersectionObserver)
document.addEventListener("DOMContentLoaded", function() {
  const hiddenElements = document.querySelectorAll('.hidden');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  hiddenElements.forEach(el => observer.observe(el));

  // Функция для создания нового треугольника
  function createTriangle(side) {
    const triangle = document.createElement('div');
    triangle.className = 'triangle';
    
    // Случайный размер треугольника (от 10 до 20 пикселей)
    const borderSize = Math.floor(Math.random() * 11) + 10;
    const borderBottomSize = borderSize * 2; 
    triangle.style.borderLeft = `${borderSize}px solid transparent`;
    triangle.style.borderRight = `${borderSize}px solid transparent`;
    triangle.style.borderBottom = `${borderBottomSize}px solid var(--main-green)`;
    
    // Случайное горизонтальное положение в пределах контейнера
    const pos = Math.random() * 100; // 0 - 100%
    if (side === 'left') {
      triangle.style.left = `${pos}%`;
    } else {
      triangle.style.right = `${pos}%`;
    }
    
    // Случайная длительность анимации от 20 до 30 секунд
    const duration = Math.random() * 10 + 20;
    triangle.style.animationDuration = `${duration}s`;
    
    // Добавляем треугольник в соответствующий контейнер
    const container = document.querySelector(`.side-triangles.${side}`);
    container.appendChild(triangle);
    
    // Удаляем треугольник после завершения анимации
    triangle.addEventListener('animationend', () => {
      triangle.remove();
    });
  }
  
  // Спавним новые треугольники с интервалом для левой и правой сторон
  setInterval(() => {
    createTriangle('left');
  }, 1500);
  
  setInterval(() => {
    createTriangle('right');
  }, 1500);
});
