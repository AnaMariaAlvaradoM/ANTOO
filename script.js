const WA_NUMBER = "573222254618";
let modalSwiperInstance = null;

const products = {
  g20: {
    title: "Binder G20",
    price: "$95.000",
    images: ["imagenes/g20_2.png","imagenes/g20_3.png","imagenes/g20_4.png","imagenes/g20_1.png"],
    features: [
      "Ganchos de 3 posiciones al costado para ajuste personalizado",
      "Gancho de 2 posiciones en un hombro",
      "Doble panel de tela en frente y atrás para mayor compresión",
      "Ideal para uso diario",
      "Binder con mayor compresión"
    ],
    sizes: ["XS","S","M","L","XL","XXL"],
    colors: [{name:"Negro",hex:"#111"},{name:"Blanco",hex:"#fff"},{name:"Beige",hex:"#d4bfab"},{name:"Canela",hex:"#b8956b"}]
  },
  andra: {
    title: "Binder Andra",
    price: "$95.000",
    images: ["imagenes/andra_1.png","imagenes/andra_2.png","imagenes/andra_3.png"],
    features: [
      "Sin ganchos ni sistema de cierre",
      "Doble panel de tela en frente para mayor compresión",
      "Su postura es más fácil de poner",
      "Ideal para uso diario"
    ],
    sizes: ["XS","S","M","L","XL","XXL"],
    colors: [{name:"Negro",hex:"#111"},{name:"Blanco",hex:"#fff"},{name:"Beige",hex:"#d4bfab"},{name:"Canela",hex:"#b8956b"}]
  },
  ash: {
    title: "Binder Ash",
    price: "$115.000",
    images: ["imagenes/ash_1.png","imagenes/ash_2.png","imagenes/ash_3.png"],
    features: [
      "Binder largo tipo camisilla",
      "Sin ganchos ni sistema de cierre",
      "Doble panel de tela en frente para mayor compresión",
      "Perfecto para uso diario y cómodo"
    ],
    sizes: ["XS","S","M","L","XL","XXL"],
    colors: [{name:"Negro",hex:"#111"},{name:"Blanco",hex:"#fff"},{name:"Beige",hex:"#d4bfab"},{name:"Canela",hex:"#b8956b"}]
  },
  aqua_largo: {
    title: "Aqua Largo",
    price: "$85.000",
    images: ["imagenes/aquaLargo1.png","imagenes/aquaLargo2.png","imagenes/aquaLargo3.png"],
    features: [
      "Binder para piscina, mar, río y vacaciones",
      "Largo tipo camisilla",
      "Doble panel de tela en frente para mayor compresión",
      "Tejido especial resistente al agua"
    ],
    sizes: ["XS","S","M","L","XL","XXL"],
    colors: [{name:"Negro",hex:"#111"},{name:"Verde",hex:"#6b7f6b"}]
  },
  aqua_corto: {
    title: "Aqua Corto",
    price: "$75.000",
    images: ["imagenes/aquaCorto1.png","imagenes/aquaCorto2.png"],
    features: [
      "Binder de baño versión corta",
      "Doble panel de tela en frente para mayor compresión",
      "Ideal para playa, piscina y río",
      "Tejido especial resistente al agua",
      "Compresión suave"
    ],
    sizes: ["XS","S","M","L","XL","XXL"],
    colors: [{name:"Negro",hex:"#111"},{name:"Verde",hex:"#6b7f6b"}]
  }
};

// ── Inicializar carruseles de cards ──────────────────────────────────────────
// Cada uno con su propio selector único para evitar conflictos
document.addEventListener('DOMContentLoaded', function() {
  const carouselConfigs = [
    { sel: '.carousel-g20' },
    { sel: '.carousel-andra' },
    { sel: '.carousel-ash' },
    { sel: '.carousel-aqua-largo' },
    { sel: '.carousel-aqua-corto' }
  ];

  carouselConfigs.forEach(({ sel }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    new Swiper(el, {
      loop: true,
      autoplay: { delay: 2000, disableOnInteraction: false },
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
      effect: 'fade',
      allowTouchMove: false 
    });
  });
});

// ── Estado del modal ─────────────────────────────────────────────────────────
let selectedSize = "";
let selectedColor = "";
let currentProduct = "";

function openModal(id) {
  const p = products[id];
  if (!p) return;
  currentProduct = id;
  selectedSize = "";
  selectedColor = "";

  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-price').textContent = p.price;

  // Imágenes del swiper del modal
  const wrapper = document.getElementById('modal-swiper-wrapper');
  const images = p.images || [];
  wrapper.innerHTML = images.map(img =>
    `<div class="swiper-slide"><img src="${img}" class="modal-img" alt="${p.title}" loading="lazy"></div>`
  ).join('');

  if (modalSwiperInstance) {
    modalSwiperInstance.destroy(true, true);
    modalSwiperInstance = null;
  }

  setTimeout(() => {
    modalSwiperInstance = new Swiper('.modal-swiper', {
      loop: images.length > 1,
      pagination: { el: '.modal-swiper .swiper-pagination', clickable: true },
      on: {
    click: function() { this.slideNext(); }
  }
    });
  }, 50);

  // Características
  document.getElementById('modal-features').innerHTML =
    p.features.map(f => `<li>${f}</li>`).join('');

  // Tallas
  document.getElementById('modal-sizes').innerHTML =
    p.sizes.map(s => `<div class="modal-size" onclick="selectSize(this,'${s}')">${s}</div>`).join('');

  // Colores
  document.getElementById('modal-colors').innerHTML =
    p.colors.map(c =>
      `<div class="modal-color" onclick="selectColor(this,'${c.name}')">
        <span class="modal-color-dot" style="background:${c.hex}; ${c.hex==='#fff'?'border:1px solid #ccc;':''}"></span>
        ${c.name}
      </div>`
    ).join('');

  updateWABtn();
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectSize(el, size) {
  document.querySelectorAll('.modal-size').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  selectedSize = size;
  updateWABtn();
}

function selectColor(el, color) {
  document.querySelectorAll('.modal-color').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  selectedColor = color;
  updateWABtn();
}

function updateWABtn() {
  const p = products[currentProduct];
  let msg = `Hola! Quiero pedir el ${p.title}`;
  if (selectedSize) msg += ` - Talla: ${selectedSize}`;
  if (selectedColor) msg += ` - Color: ${selectedColor}`;
  msg += `. ¿Pueden ayudarme?`;
  document.getElementById('modal-wa-btn').href =
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
  if (!isOpen) {
    item.classList.add('open');
    el.querySelector('.faq-icon').textContent = '−';
  }
}

// ── Nav hamburguesa ──────────────────────────────────────────────────────────
function toggleNav() {
  const links = document.getElementById('nav-links');
  const toggle = document.querySelector('.nav-toggle');
  links.classList.toggle('open');
  toggle.classList.toggle('active');
}
function closeNav() {
  document.getElementById('nav-links').classList.remove('open');
  document.querySelector('.nav-toggle').classList.remove('active');
}

// Cerrar nav al hacer click fuera
document.addEventListener('click', function(e) {
  if (!e.target.closest('nav')) closeNav();
});

// ── Scroll animations ────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Keyboard ─────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function openLightbox(el) {
  document.getElementById('lightbox-img').src = el.src;
  document.getElementById('lightbox-img').alt = el.alt;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
// ESC para cerrar
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});