const PUBLIC_KEY = "8JRweOQ15PyBTPrkg";
const SERVICE_ID = "service_ec44fld";
const TEMPLATE_ID = "template_crmtfrb";
const form = document.querySelector("#contact-form");

emailjs.init(PUBLIC_KEY);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = validateForm();

  if (formData) {
    updateSubmitBtn("send");
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
      .then(() => {
        showToastMessage("success");
        updateSubmitBtn("reset");
        form.reset();
      })
      .catch(() => {
        showToastMessage("error")
        updateSubmitBtn("reset");
      });
  }
})

function validateForm() {
  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");
  const subjectField = document.querySelector("#subject");
  const messageField = document.querySelector("#message");

  validateName(nameField);
  validateEmail(emailField);
  validateSubject(subjectField);
  validateMessage(messageField);

  const name = nameField.value;
  const email = emailField.value;
  const subject = subjectField.value;
  const message = safeText(messageField.value);

  if (validateName(nameField) && validateEmail(emailField) && validateSubject(subjectField) && validateMessage(messageField)) {
    return { name, email, subject, message };
  }

  return false;
}

function validateName(name) {
  const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);
  trimAndUpdateValue(name);

  if (!name.value) {
    setError(name, "O campo não pode estar vázio, deve possuir no minímo 3 caracteres!");
    name.value = "";
    return false;
  } else if (name.value.length < 3) {
    setError(name, "O campo deve possuir no minímo 3 caracteres!");
    return false;
  } else if (!isValidName(name.value)) {
    setError(name, "O campo deve possuir apenas letras e espaços!");
    return false;
  }

  return true;
}

function validateEmail(email) {
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  trimAndUpdateValue(email);

  if (email.value.length <= 0) {
    setError(email, "O campo não pode ser enviado vázio, insira um email válido!");
    return false;
  } else if (!isValidEmail(email.value)) {
    setError(email, "Utilize um email válido!");
    return false;
  }

  return true;
}

function validateSubject(subject) {
  const isValidSubject = (subject) => /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,!?()'"\-_:;@%]+$/.test(subject);
  trimAndUpdateValue(subject);

  if (!subject.value) {
    setError(subject, "O campo não pode ser enviado vázio!");
    return false;
  } else if (subject.value.length < 3 || subject.value.length > 100) {
    setError(subject, "O campo deve possuir no minímo 3 caracteres e no máximo 100 caracteres!");
    return false;
  } else if (!isValidSubject(subject.value)) {
    setError(subject, "O campo possui caracteres inválidos!");
    return false;
  }

  return true;
}

function validateMessage(message) {
  trimAndUpdateValue(message);

  if (!message.value) {
    setError(message, "O campo não pode ser enviado vázio!");
    return false;

  } else if (message.value.length < 10 || message.value.length > 2000) {
    setError(message, "O campo deve possuir no minímo 10 caracteres e no máximo 2000 caracteres!");
    return false;
  }

  return true;
}

function trimAndUpdateValue(element) {
  element.value = element.value.trim();
}

function safeText(text) {
  const temp = document.createElement("div");
  temp.textContent = text;
  return temp.innerHTML;
}

function setError(el, message) {
  const parentOfElement = el.parentNode;
  const hasChild = parentOfElement.querySelector(".error");

  if (!hasChild) {
    const errorMessage = `<span class="error">${message}</span>`;
    parentOfElement.insertAdjacentHTML('beforeend', errorMessage);
    el.classList.toggle("incorrect");
  }

  const errorElement = parentOfElement.querySelector(".error");

  setTimeout(() => {
    el.classList.remove("incorrect");
    errorElement.remove();
  }, 3000);
}

function updateSubmitBtn(status) {
  const submitBtn = document.querySelector("#contact-form button");

  if (status === "send") {
    submitBtn.innerHTML = `
    <div class="loading-icon">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
    </div>
    Enviando...
    `;
    submitBtn.disabled = true;
  } else {
    submitBtn.innerHTML = `
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5127 5.77444C22.1665 3.97839 20.4248 2.23663 18.6287 2.89049L4.63167 7.98618C2.69138 8.69256 2.64771 11.4209 4.56441 12.189L9.72779 14.2582C9.91801 14.3344 10.0687 14.4851 10.145 14.6754L12.2142 19.8387C12.9823 21.7554 15.7106 21.7118 16.417 19.7715L21.5127 5.77444Z"
        fill="currentColor" />
    </svg>
    Enviar
    `;
    submitBtn.disabled = false;
  }
}

function showToastMessage(status) {
  const currentSection = document.querySelector("#contact");
  const hasToast = currentSection.querySelector(".toast");
  let toastMessage = null;
  let toastElement = null;

  if (status === "success") {
    toastMessage = `
    <div class="toast success">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.5455 6.4965C19.9848 6.93584 19.9848 7.64815 19.5455 8.08749L10.1286 17.5043C9.6893 17.9437 8.97699 17.9437 8.53765 17.5043L4.45451 13.4212C4.01517 12.9819 4.01516 12.2695 4.4545 11.8302C4.89384 11.3909 5.60616 11.3909 6.0455 11.8302L9.33315 15.1179L17.9545 6.4965C18.3938 6.05716 19.1062 6.05716 19.5455 6.4965Z"
          fill="currentColor" />
      </svg>
      <div class="info">
        <span class="title">Email enviado com sucesso!</span>
        <span class="message">Agradeço bastante pela mensagem. Em breve retorno!</span>
      </div>
    </div>
    `
  } else {
    toastMessage = `
      <div class="toast error">
      <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.91292 4.39408C8.79048 4.27164 8.59197 4.27164 8.46953 4.39408L4.84183 8.02177C4.71939 8.14421 4.71939 8.34273 4.84183 8.46517L8.43208 12.0554C8.55452 12.1779 8.75303 12.1779 8.87547 12.0554L9.89304 11.0378L8.9875 10.1323C8.54816 9.69296 8.54816 8.98065 8.9875 8.54131C9.42684 8.10197 10.1391 8.10197 10.5785 8.54131L11.484 9.44686L12.5032 8.42772C12.6256 8.30528 12.6256 8.10676 12.5032 7.98432L8.91292 4.39408ZM6.87854 2.80309C7.87966 1.80197 9.50279 1.80197 10.5039 2.80309L14.0942 6.39333C15.0953 7.39445 15.0953 9.01759 14.0942 10.0187L10.4665 13.6464C9.46534 14.6475 7.84221 14.6475 6.84109 13.6464L3.25084 10.0562C2.24972 9.05504 2.24972 7.4319 3.25084 6.43078L6.87854 2.80309ZM16.5723 12.0531C16.4498 11.9307 16.2513 11.9307 16.1289 12.0531L15.1096 13.0724L16.0035 13.9663C16.4429 14.4057 16.4429 15.118 16.0035 15.5573C15.5642 15.9967 14.8519 15.9967 14.4125 15.5573L13.5186 14.6634L12.5011 15.6808C12.3787 15.8033 12.3787 16.0018 12.5011 16.1242L16.0873 19.7104C16.2098 19.8329 16.4083 19.8329 16.5307 19.7104L20.1585 16.0827C20.2809 15.9603 20.2809 15.7617 20.1585 15.6393L16.5723 12.0531ZM14.5379 10.4621C15.539 9.46099 17.1621 9.46099 18.1633 10.4621L21.7495 14.0483C22.7506 15.0494 22.7506 16.6726 21.7495 17.6737L18.1217 21.3014C17.1206 22.3025 15.4975 22.3025 14.4964 21.3014L10.9102 17.7152C9.90904 16.7141 9.90904 15.091 10.9102 14.0898L14.5379 10.4621Z"
          fill="currentColor" />
        <path
          d="M17.882 2.97009C18.2821 3.07729 18.5195 3.48855 18.4123 3.88865L17.9774 5.51155C17.8702 5.91165 17.459 6.14909 17.0589 6.04188C16.6588 5.93468 16.4214 5.52342 16.5286 5.12332L16.9634 3.50042C17.0706 3.10032 17.4819 2.86288 17.882 2.97009ZM21.6347 6.72286C21.7419 7.12295 21.5045 7.53421 21.1044 7.64141L19.4815 8.07627C19.0814 8.18348 18.6702 7.94604 18.5629 7.54594C18.4557 7.14584 18.6932 6.73459 19.0933 6.62738L20.7162 6.19252C21.1163 6.08532 21.5275 6.32276 21.6347 6.72286ZM6.5521 16.5487C6.65931 16.9488 6.42187 17.36 6.02177 17.4672L4.39887 17.9021C3.99877 18.0093 3.58751 17.7719 3.48031 17.3718C3.3731 16.9717 3.61054 16.5604 4.01064 16.4532L5.63354 16.0183C6.03364 15.9111 6.4449 16.1486 6.5521 16.5487ZM8.05616 18.0527C8.45626 18.1599 8.6937 18.5712 8.58649 18.9713L8.15163 20.5942C8.04443 20.9943 7.63317 21.2317 7.23307 21.1245C6.83297 21.0173 6.59554 20.6061 6.70274 20.206L7.1376 18.5831C7.24481 18.183 7.65606 17.9455 8.05616 18.0527Z"
          fill="currentColor" />
      </svg>
      <div class="info">
        <span class="title">Falha ao enviar email</span>
        <span class="message">Algo ocorreu errado! Tente novamente mais tarde :/</span>
      </div>
    </div>
    `
  }

  if (!hasToast) {
    currentSection.insertAdjacentHTML("beforeend", toastMessage);
    toastElement = currentSection.querySelector(".toast");
    toastElement.classList.add("show");
  }

  setInterval(() => {
    toastElement.classList.remove("show");
  }, 3000);

  setInterval(() => {
    toastElement.remove();
  }, 4000);
}
