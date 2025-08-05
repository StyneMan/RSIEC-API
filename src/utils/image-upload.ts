import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: 'dpdqjycc1',
  api_key: '512182641569947',
  api_secret: '35pvMoEMl3QLhE-hmAqiq-_UNsA',
}); 

// Helper function to upload a single image using upload_stream
export const uploadImage = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        overwrite: true,
        invalidate: true,
        resource_type: 'auto',
      },
      (error, result) => {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        }
        return reject({ message: error?.message });
      },
    );

    // Create a stream from the buffer and pipe it to Cloudinary
    Readable.from(imageBuffer).pipe(uploadStream);
  });
};

// Function to upload multiple images
export const uploadMultipleImages = (imageBuffers) => {
  const uploads = imageBuffers.map((imageBuffer) => uploadImage(imageBuffer));
  return Promise.all(uploads);
};
