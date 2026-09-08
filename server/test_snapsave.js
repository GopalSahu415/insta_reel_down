import { snapsave } from 'snapsave-media-downloader';

async function test() {
  try {
    const result = await snapsave('https://www.instagram.com/reel/DbS89y1zTP5/');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
