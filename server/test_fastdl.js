async function test() {
  try {
    const url = 'https://fastdl.app/api/ajax';
    const postUrl = 'https://www.instagram.com/reel/DbS89y1zTP5/';
    
    console.log(`Sending query to ${url}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://fastdl.app',
        'Referer': 'https://fastdl.app/',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: new URLSearchParams({
        q: postUrl,
        t: 'media',
        lang: 'en'
      })
    });

    const body = await response.json();
    console.log('Response keys:', Object.keys(body));
    console.log('Response body:', JSON.stringify(body, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
