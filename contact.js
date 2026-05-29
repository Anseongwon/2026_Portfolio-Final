// ===============================================
//contact page
// ===============================================

function handleMinimalSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('min-name').value;
  const email = document.getElementById('min-email').value;
  const message = document.getElementById('min-message').value;

  if (!name || !email || !message) return;

  const formSection = document.getElementById('form-section');
  const successPrompt = document.getElementById('success-prompt');
  const userMsg = document.getElementById('success-user-msg');

  if (formSection && successPrompt && userMsg) {
    formSection.classList.add('d-none');
    successPrompt.classList.remove('d-none');

    userMsg.textContent = `Thank you, ${name.toUpperCase()}. Your Message has been transmitted.`;
  }
}

function resetMinimalForm() {
  const form = document.getElementById('minimal-contact-form');
  const formSection = document.getElementById('form-section');
  const successPrompt = document.getElementById('success-prompt');

  if (form) {
    form.reset();
  }

  if (formSection && successPrompt) {
    successPrompt.classList.add('d-none');
    formSection.classList.remove('d-none');
  }
}
