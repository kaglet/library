const validateMissingField = (input, errorDisplay, errorMessage) => {
  if (input.validity.valueMissing) {
    errorDisplay.textContent = errorMessage;
  } else {
    hideError(errorDisplay);
    return;
  }

  showError(errorDisplay);
};

const validateTypeMismatch = (input, errorDisplay, errorMessage) => {
  if (input.validity.typeMismatch) {
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

const validateTitle = () => {
    const titleInput = document.getElementById("title");
    const titleErrorDisplay = document.querySelector("#title + span.error");
    validateMissingField(titleInput, titleErrorDisplay, "Please enter a title");
};

const validateAuthor = () => {
    const authorInput = document.getElementById("author");
    const authorErrorDisplay = document.querySelector("#author + span.error");
    validateMissingField(
        authorInput,
        authorErrorDisplay,
        "Please enter an author name"
      );
};

const validatePageNum = () => {
    const pageNumInput = document.getElementById("pageNum");
    const pageNumErrorDisplay = document.querySelector("#pageNum + span.error");
    validateMissingField(
        pageNumInput,
        pageNumErrorDisplay,
        "Please enter a page number"
      );
};

const validateUrl = () => {
    const urlInput = document.getElementById("url");
    const urlErrorDisplay = document.querySelector("#url + span.error");
    validateTypeMismatch(urlInput, urlErrorDisplay, "Please enter a valid url");
};

const validateAll = () => {
  validateAuthor();
  validateTitle();
  validatePageNum();
  validateUrl();
};

export { validateAll, validateAuthor, validateTitle, validatePageNum, validateUrl };
