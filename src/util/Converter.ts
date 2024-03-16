export default function convertImageUrl(originalUrl: string): string {
    const urlParts = originalUrl.split('/');
    const imageName = urlParts.pop();
    const productId = urlParts.pop();
    const convertedUrl = `https://cdn.dummyjson.com/product-images/${productId}/${imageName}`;
    return convertedUrl;
  }
