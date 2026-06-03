export const getImageUrl = (folder, filename) => {

  if (!filename) return null;

  return `${process.env.APP_URL}/uploads/${folder}/${filename}`;

};