function openModal(id) {
      document.getElementById(id).style.display = 'flex';
    }
    function closeModal(e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    }
    // Auto fill timestamp on load
    document.getElementById("timestamp").value = new Date().toISOString();