const form = document.getElementById('contact-form');
const requestStatus = document.querySelector('.request-status');
const submissionURL = 'https://formsubmit.co/ajax/fafebbb8dceebeb2305b952ebf7b6897';
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const sendMessage = async (formData) => {
  try {
    const response = await fetch(submissionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      requestStatus.innerHTML = 'Message sent successfully.';
      form.reset();
    } else {
      requestStatus.innerHTML = '<span style="color: var(--color-red); font-weight: var(--font-bold)">Something went wrong.. Please send an email to contact@creation-agency.com</span>';
      throw new Error(JSON.stringify(data));
    }
  } catch (error) {
    requestStatus.innerHTML = '<span style="color: var(--color-red); font-weight: var(--font-bold)">Something went wrong.. Please send an email to contact@creation-agency.com</span>';
    throw new Error(error);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  let isFormValid = true;

  const formData = new FormData(event.target);

  [...formData.entries()]
    .forEach(([key, value]) => {
      const currentField = document.getElementById(key).parentElement;
      const errorMessage = document.querySelector(`.${key}-error`);

      if (value === '') {
        currentField.classList.add('validation-error');
        errorMessage.innerHTML = 'Please fill out this field.';
        isFormValid = false;
      } else if (key === 'email' && !value.match(emailRegex)) {
        currentField.classList.add('validation-error');
        errorMessage.innerHTML = 'Please enter a valid email address.';
        isFormValid = false;
      } else if (currentField.classList.contains('validation-error')) {
        currentField.classList.remove('validation-error');
        errorMessage.innerHTML = '';
      }
    });

  if (isFormValid) sendMessage(formData);
};

form.addEventListener('submit', (event) => handleSubmit(event));
