 document.getElementById("contactForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const params = new URLSearchParams(formData).toString();
      window.location.href = `contact-response1.html?${params}`;
    });


    document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});