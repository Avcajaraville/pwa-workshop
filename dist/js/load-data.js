document.addEventListener('DOMContentLoaded', () => {
  const dataAttributeLoad = 'data-load';
  const buttons = document.querySelectorAll(`[${dataAttributeLoad}]`);

  for (let button of buttons) {
    button.addEventListener('click', clickHandler);
  }

  async function clickHandler(event) {
    const collection = await fetchCollection(
      event.target.getAttribute(`${dataAttributeLoad}`)
    );
    renderCollection(event.target, getCollectionMarkup(collection));
    removeElement(event.target);
  }

  async function fetchCollection(collectionName) {
    const response = await fetch(`/api/${collectionName}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

    return response.json();
  }

  function getCollectionMarkup(collection) {
    return `
      <h2>${collection.name}</h2>
      <ul>
        ${collection.characters
          .map((character) => `<li><p>${character}</p></li>`)
          .join('')}
      </ul>
      `;
  }

  function renderCollection(element, markup) {
    element.insertAdjacentHTML('afterend', markup);
  }

  function removeElement(element) {
    element.removeEventListener('click', clickHandler);
    element.parentElement.removeChild(element);
  }
});
