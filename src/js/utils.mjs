// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// get a parameter value from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// generic function to build and insert a list of HTML using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// fetches the raw HTML content of a file at the given path
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// inserts a single template string into parentElement, optionally running a callback afterward
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// loads the shared header and footer partials into their placeholder elements
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  const headerElement = qs('#main-header');
  const footerElement = qs('#main-footer');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}