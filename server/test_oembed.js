async function test() {
  try {
    const url = 'https://api.instagram.com/oembed/?url=https://www.instagram.com/reel/DbS89y1zTP5/';
    const response = await fetch(url);
    const body = await response.json();
    console.log('Oembed response:', JSON.stringify(body, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
