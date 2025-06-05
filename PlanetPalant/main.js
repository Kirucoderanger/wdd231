document.getElementById('menuToggle').addEventListener('click', () => { 
    document.getElementById('navLinks').classList.toggle('active'); 
    document.getElementById('menuToggle').classList.toggle('active');

    document.body.classList.toggle('menu-open');

    const menuIcon = document.getElementById('menuToggle').querySelector('i');
    if (document.getElementById('navLinks').classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}
);
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');
    
    // Update year and last modified date
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;
});

