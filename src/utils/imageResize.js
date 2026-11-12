/**
 * Downscales and re-encodes a user-selected image file so custom illustrations
 * stay fast and fit comfortably within local browser storage.
 */
export async function compressUploadedImageFile(file, maxDimension = 640, quality = 0.82) {
  if (!file) throw new Error('No image file selected.');

  // Preserve animated GIFs directly when small enough, falling back cleanly
  if (file.type === 'image/gif') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Could not read GIF file.'));
      reader.readAsDataURL(file);
    });
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Unsupported or corrupted image file.'));
      el.src = objectUrl;
    });

    const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
    const width = Math.max(1, Math.round((img.naturalWidth || maxDimension) * scale));
    const height = Math.max(1, Math.round((img.naturalHeight || maxDimension) * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Browser canvas is unavailable.');
    }
    ctx.drawImage(img, 0, 0, width, height);

    const webp = canvas.toDataURL('image/webp', quality);
    if (webp.startsWith('data:image/webp')) {
      return webp;
    }
    return canvas.toDataURL('image/jpeg', quality);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

