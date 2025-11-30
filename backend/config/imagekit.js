const ImageKit = require('imagekit');

if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
  console.warn('⚠️ ImageKit env vars not fully set. Images will fail to upload.');
}

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_lVPoiQpudJGiciBzmzjUdsGYmIM=',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_Igqkra2pRi8WqwyiZiNPsKYrsH4=',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/fiar'
});

module.exports = imagekit;
