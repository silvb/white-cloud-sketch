const selectItem = selectors => document.querySelector(selectors);

const arrayFromItems = selectors => Array.from(document.querySelectorAll(selectors));

export { selectItem, arrayFromItems };
