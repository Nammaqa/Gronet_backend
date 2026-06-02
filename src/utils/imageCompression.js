import sharp from 'sharp';

export const compressImage = async (
  buffer
) => {
  return await sharp(buffer)
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 80,
      mozjpeg: true,
    })
    .toBuffer();
};