// src/utils/images.js

// Vite загружает ВСЕ картинки из папки assets/images
const images = import.meta.glob('../assets/images/**/*', {
  eager: true,
  as: 'url',
});

// name = "myphoto.png" или "products/eco.png"
export const getImage = (name) => {
  const key = `../assets/images/${name}`;
  return images[key] || '';
};
