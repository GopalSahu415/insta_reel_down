async function test() {
  try {
    const url = 'https://snapinsta.app/action.php';
    const postUrl = 'https://www.instagram.com/reel/DbS89y1zTP5/';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://snapinsta.app',
        'Referer': 'https://snapinsta.app/',
      },
      body: new URLSearchParams({
        url: postUrl,
        action: 'post',
        lang: 'en'
      })
    });

    const text = await response.text();
    console.log('Response status:', response.status);
    console.log('Response content sample (first 1000 chars):', text.substring(0, 1000));
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
