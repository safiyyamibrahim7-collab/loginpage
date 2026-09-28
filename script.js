const modeButtons = document.querySelectorAll('.mode-button');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const footerPrompt = document.getElementById('footerPrompt');
const footerLink = document.getElementById('footerLink');
const submitButton = document.getElementById('submitButton');
const authForm = document.getElementById('authForm');
const formMessage = document.getElementById('formMessage');
const nameField = document.getElementById('nameField');
const confirmField = document.getElementById('confirmField');
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.querySelector('.toggle-password');

let currentMode = 'login';

const setMode = (mode) => {
  currentMode = mode;
  const isLogin = mode === 'login';

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  nameField.classList.toggle('hidden', isLogin);
  confirmField.classList.toggle('hidden', isLogin);

  if (isLogin) {
    formTitle.textContent = 'Welcome back';
    formSubtitle.textContent = 'Access your pizza profile and order history.';
    footerPrompt.textContent = 'New to PizzaFlow?';
    footerLink.textContent = 'Create account';
    submitButton.textContent = 'Sign in';
  } else {
    formTitle.textContent = 'Create your account';
    formSubtitle.textContent = 'Start saving favorites and tracking orders faster.';
    footerPrompt.textContent = 'Already a member?';
    footerLink.textContent = 'Sign in';
    submitButton.textContent = 'Create account';
  }

  formMessage.textContent = '';
  formMessage.className = 'form-message';
};

modeButtons.forEach((button) => {
  button.addEventListener('click', () => setMode(button.dataset.mode));
});

const showMessage = (message, type) => {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validatePassword = (value) => value.length >= 8;

const handleSubmit = (event) => {
  event.preventDefault();

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  if (currentMode === 'signup' && !fullName.value.trim()) {
    showMessage('Please enter your full name.', 'error');
    fullName.focus();
    return;
  }

  if (!validateEmail(email.value.trim())) {
    showMessage('Please enter a valid email address.', 'error');
    email.focus();
    return;
  }

  if (!validatePassword(password.value)) {
    showMessage('Password should be at least 8 characters long.', 'error');
    password.focus();
    return;
  }

  if (currentMode === 'signup') {
    if (!confirmPassword.value) {
      showMessage('Please confirm your password.', 'error');
      confirmPassword.focus();
      return;
    }

    if (password.value !== confirmPassword.value) {
      showMessage('Passwords do not match. Please try again.', 'error');
      confirmPassword.focus();
      return;
    }
  }

  showMessage(
    currentMode === 'login' ? 'Signed in successfully. Welcome back!' : 'Account created successfully. Welcome to PizzaFlow!',
    'success'
  );

  authForm.reset();
};

authForm.addEventListener('submit', handleSubmit);

footerLink.addEventListener('click', (event) => {
  event.preventDefault();
  const mode = currentMode === 'login' ? 'signup' : 'login';
  setMode(mode);
});

togglePasswordButton.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePasswordButton.textContent = isPassword ? 'Hide' : 'Show';
  togglePasswordButton.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

setMode('login');
