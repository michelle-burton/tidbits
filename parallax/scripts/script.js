console.log('JS file loaded');

const layers = document.querySelectorAll('.layer');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  layers.forEach((layer, index) => {
    const speed = (index + 1) * 25;
    layer.style.transform = `translate(${x * speed}px, ${y * speed}px) scale(1.08)`;
  });
});
