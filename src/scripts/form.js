const form = document.getElementById('contact-form');
const requestStatus = document.querySelector('.request-status');

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const postData = async (formData) => {
  try {
    const response = await fetch('https://creation-api.onrender.com/messages', {
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

    const status = await response.json();

    if (response.ok) {
      requestStatus.innerHTML = status;
      form.reset();
    } else {
      throw new Error(JSON.stringify(status));
    }
  } catch (error) {
    console.log(error);
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

  if (isFormValid) postData(formData);
};

form.addEventListener('submit', (event) => handleSubmit(event));
