/* ==========================================================================
   Project Page Script - Minimalist Project Notebook Tabs
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const sheets = document.querySelectorAll('.project-sheet');
  const tabs = document.querySelectorAll('.project-tab');
  const prevBtn = document.getElementById('prev-project-btn');
  const nextBtn = document.getElementById('next-project-btn');

  let currentSheet = 1;
  const totalSheets = sheets.length; // Exactly 3 sheets/pages

  // Initialize sheet view
  showSheet(currentSheet);

  // Tab selections (Numbers 1, 2, 3)
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const pageNum = parseInt(tab.getAttribute('data-page'), 10);
      showSheet(pageNum);
    });
  });

  // Prev / Next button clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      navigatePrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      navigateNext();
    });
  }

  function navigatePrev() {
    if (currentSheet > 1) {
      showSheet(currentSheet - 1);
    }
  }

  function navigateNext() {
    if (currentSheet < totalSheets) {
      showSheet(currentSheet + 1);
    }
  }

  // Activates target sheet and updates bottom tabs highlighting
  function showSheet(pageNum) {
    if (pageNum < 1 || pageNum > totalSheets) return;

    currentSheet = pageNum;

    // Toggle active classes on sheets (fades in)
    sheets.forEach((sheet, index) => {
      const isTarget = (index + 1) === currentSheet;
      if (isTarget) {
        sheet.classList.add('active');
      } else {
        sheet.classList.remove('active');
      }
    });

    // Update highlights on bottom pagination numbers
    tabs.forEach(tab => {
      const tabNum = parseInt(tab.getAttribute('data-page'), 10);
      if (tabNum === currentSheet) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Disable navigation arrows if at boundaries
    if (prevBtn) {
      if (currentSheet === 1) {
        prevBtn.style.opacity = '0.35';
        prevBtn.style.cursor = 'not-allowed';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
      }
    }

    if (nextBtn) {
      if (currentSheet === totalSheets) {
        nextBtn.style.opacity = '0.35';
        nextBtn.style.cursor = 'not-allowed';
      } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
      }
    }
  }

  window.goToProjectPage = showSheet;
});
