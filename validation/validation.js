// Dynamically set error on span, when it is shown and made active
const validateMissingField = (input, errorDisplay, errorMessage) => {
  if (input.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    errorDisplay.textContent = errorMessage;
  } else {
    hideError(errorDisplay);
    return;
  }

  showError(errorDisplay);
};

const validateTypeMismatch = (input, errorDisplay, errorMessage) => {
  if (input.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    errorDisplay.textContent = errorMessage;
  } else {
    hideError(errorDisplay);
    return;
  }

  showError(errorDisplay);
};

const showError = (errorDisplay) => {
  errorDisplay.className = "error active";
};

const hideError = (errorDisplay) => {
    errorDisplay.textContent = ""; // Reset the content of the message
    errorDisplay.className = "error"; // Reset the visual state of the message to have one class without the additional other
};

const validateAll = () => {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pageNumInput = document.getElementById("pageNum");
  const urlInput = document.getElementById("url");

  const titleErrorDisplay = document.querySelector("#title + span.error");
  const authorErrorDisplay = document.querySelector("#author + span.error");
  const pageNumErrorDisplay = document.querySelector("#pageNum + span.error");
  const urlErrorDisplay = document.querySelector("#url + span.error");

  validateMissingField(titleInput, titleErrorDisplay, "Please enter a title");
  validateMissingField(
    authorInput,
    authorErrorDisplay,
    "Please enter an author name"
  );
  validateMissingField(
    pageNumInput,
    pageNumErrorDisplay,
    "Please enter a page number"
  );
  validateTypeMismatch(urlInput, urlErrorDisplay, "Please enter a valid url");
};

export { validateAll };
