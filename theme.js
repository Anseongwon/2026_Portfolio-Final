document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Set theme from local storage or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (toggleBtn) toggleBtn.textContent = '[ DARK ]';
  } else {
    document.body.classList.remove('light-mode');
    if (toggleBtn) toggleBtn.textContent = '[ LIGHT ]';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      let theme = 'dark';
      if (document.body.classList.contains('light-mode')) {
        theme = 'light';
        toggleBtn.textContent = '[ DARK ]';
      } else {
        toggleBtn.textContent = '[ LIGHT ]';
      }
      localStorage.setItem('theme', theme);
    });
  }
});
