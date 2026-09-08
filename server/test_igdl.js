import { instagramGetUrl } from 'instagram-url-direct';

async function test() {
  try {
    const result = await instagramGetUrl('https://www.instagram.com/reel/DbS89y1zTP5/');
    console.log('API Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('API Error:', error);
  }
}
test();
