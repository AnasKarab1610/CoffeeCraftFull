// ===== script.js =====
// يحتوي على كل ما يتعلق بـ AOS, Navbar, Mobile Menu, FAQ, EmailJS, Coffee Builder

document.addEventListener('DOMContentLoaded', function () {

  // ======================================================
  // 🔧 Utility Functions
  // ======================================================

  // توست عام
  function showToast(toastElem, message) {
    toastElem.innerHTML = message;
    toastElem.classList.add("show");

    setTimeout(() => {
      toastElem.classList.remove("show");
      window.location.href = "";
    }, 4000);
  }

  // توست خاص بحفظ إعدادات القهوة
  function saveCoffeeSpecs() {
    const toast = document.getElementById("coffeeToast");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);

    setTimeout(() => {
      window.location.href = "";
    }, 4000);
  }
  window.saveCoffeeSpecs = saveCoffeeSpecs;

  // اختيار زر في بناء القهوة
  function selectOption(btn) {
    const parent = btn.parentNode; 
    const buttons = parent.querySelectorAll(".build-option-btn");
    buttons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  }
    window.selectOption = selectOption;


  // ======================================================
  // 🚀 AOS Initialization
  // ======================================================
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000 });
  }

  // ======================================================
  // 🍔 Navbar + Mobile Menu
  // ======================================================
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    if (!hamburger || !mobileMenu) return;

    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    // منع تمرير الصفحة في الخلفية أثناء فتح القائمة
    document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('active'));
  }

  // جعل الدالة متاحة عالميًا (لدعم onclick القديم)
  window.toggleMenu = toggleMenu;

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // دعم استخدام الكيبورد
    hamburger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // إغلاق القائمة عند النقر على أي رابط داخلها
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
      });
    });
  }

  // ======================================================
  // Review Cards 
  // ======================================================
  const cards = document.querySelectorAll('.carousel .card');
  let current = 0;

  if (window.innerWidth <= 768) return;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }

  function startCarousel() {
    showCard(current);
    setInterval(() => {
      current = (current + 1) % cards.length;
      showCard(current);
    }, 3000);
  }

  if (cards.length > 0) startCarousel();

  // ======================================================
  // 🔽 Navbar Shrink on Scroll
  // ======================================================
  function checkNavbarShrink() {
    if (!navbar) return;
    if (window.innerWidth > 768 && window.scrollY > 80) {
      navbar.classList.add('shrink');
    } else {
      navbar.classList.remove('shrink');
    }
  }

  window.addEventListener('scroll', checkNavbarShrink);
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 768 && navbar) navbar.classList.remove('shrink');
    checkNavbarShrink();
  });

  checkNavbarShrink();

  // ======================================================
  // ❓ FAQ Toggle
  // ======================================================
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        item.classList.add('closing');
        setTimeout(() => {
          item.classList.remove('closing');
        }, 400);
      } else {
        item.classList.add('active');
      }
    });
  });

  // ======================================================
  // 📩 EmailJS
  // ======================================================
  emailjs.init("mbYmnfOm_TAt-7Oh5");

  const form = document.getElementById('contactForm');
  const emailToast = document.getElementById('emailToast');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_alcn5c3', 'template_3xid6l6', this)
      .then(function () {
        showToast(emailToast, "✔ تم إرسال الرسالة بنجاح!");
        form.reset();
      }, function (error) {
        showToast(emailToast, "✖ حصل خطأ، حاول مرة أخرى.");
        console.error('Error:', error);
      });
  });

});
