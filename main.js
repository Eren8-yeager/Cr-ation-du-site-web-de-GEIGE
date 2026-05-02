const images = [
  '../Img/img2.jpg',
  '../Img/DDD.jpg',
  '../Img/FFF.jpg',
  '../Img/img1.jpg',
];

const slideshow = document.getElementById('slideshow');

// Créer une div par image
images.forEach((src, i) => {
  const slide = document.createElement('div');
  slide.classList.add('slide');
  slide.style.backgroundImage = `url('${src}')`;
  if (i === 0) slide.classList.add('active');
  slideshow.insertBefore(slide, slideshow.firstChild);
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
  slides[currentIndex].classList.remove('active'); // fondu sortant
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');    // fondu entrant
}, 5000);

  //Effet de Reveal and Scroll sur la section d'aperçu

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

observer.observe(document.querySelector('.texteapercu'));
observer.observe(document.querySelector('.imageapercu'));

// Implementation du système d'onglets dans la page formation
function showFiliere(id) {
    document.querySelectorAll('.filiere-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.filiere p').forEach(el => el.classList.remove('active'));

    document.getElementById(id).style.display = 'block';

    if (id === 'industrielle') document.querySelector('.f1').classList.add('active');
    if (id === 'tertiaire') document.querySelector('.f2').classList.add('active');
}