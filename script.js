// ─── CV DOWNLOAD ────────────────────────────────────────────────────────────

const cvButton = document.getElementById('cv-download');

if (cvButton && cvButton.textContent.includes('CV')) {
  cvButton.href = encodeURI('CV Jurre Bakker.pdf');
  cvButton.setAttribute('download', 'Jurre_Bakker_CV.pdf');
}


// ─── CONTACT FORM ────────────────────────────────────────────────────────────

const FORMSPREE_ID = 'mdabvqzw';

const form = document.querySelector('.contact-form');
const nameInput = document.getElementById('name') || form?.querySelector('input[type="text"]');
const emailInput = document.getElementById('email') || form?.querySelector('input[type="email"]');
const messageInput = document.getElementById('message') || form?.querySelector('textarea');
const submitBtn = form?.querySelector('button');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
        }),
      });

      if (response.ok) {
        showMessage('Message sent! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        showMessage('Something went wrong. Please try again.', 'error');
      }
    } catch {
      showMessage('Could not send — check your internet connection.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  });
}

function showMessage(text, type) {
  // Remove any existing message
  document.querySelector('.form-message')?.remove();

  const msg = document.createElement('p');
  msg.className = 'form-message';
  msg.textContent = text;
  msg.style.cssText = `
    margin-top: 12px;
    font-size: 14px;
    font-weight: 500;
    color: ${type === 'success' ? 'var(--accent)' : '#c0392b'};
  `;

  form.appendChild(msg);

  // Auto-remove after 5 seconds
  setTimeout(() => msg.remove(), 5000);
}