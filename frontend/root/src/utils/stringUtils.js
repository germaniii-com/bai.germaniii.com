export const isValidEmail = (text) =>
  text.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

export const isValidAccessCode = (text) => text.length == 8;
