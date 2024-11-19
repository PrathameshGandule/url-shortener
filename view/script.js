async function shortenURL() {
    const mylongUrl = document.getElementById('long-url').value;
    if (!isUrlValid(mylongUrl)) {
        alert('Please enter a valid URL');
        return;
    }
    const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl: mylongUrl })
    });
    const responseText = await response.json();
    const ShortUrl = responseText.shortUrl;
    if (!isUrlValid(ShortUrl)) {
        alert(ShortUrl);
        document.getElementById('shortened-url').innerHTML = "ERROR";
        document.getElementById('shortened-result').style.display = 'block';
        return;
    }
    document.getElementById('shortened-url').innerHTML = `<a href="${ShortUrl}" target="_blank">${ShortUrl}</a>`;
    document.getElementById('shortened-result').style.display = 'block';
}

async function revealLongUrl() {
    const myshortUrl = document.getElementById('short-url').value;
    console.log(myshortUrl);
    if (!myshortUrl) {
        alert('Please enter a valid URL');
        return;
    }
    let lastSlashIndex = myshortUrl.lastIndexOf('/');
    console.log(lastSlashIndex);
    let shortUrlString = myshortUrl.substring(lastSlashIndex + 1)
    console.log(shortUrlString);
    const response = await fetch('/api/reveal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shortUrl: shortUrlString })
    });
    const responseText = await response.json();
    const LongUrl = responseText.longUrl;
    document.getElementById('revealed-url').innerHTML = `<a href="${LongUrl}" target="_blank">${LongUrl}</a>`;
    document.getElementById('revealed-result').style.display = 'block';

}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const successId = elementId === 'shortened-url' ? 'shortened-copy-success' : 'revealed-copy-success';
        const successElement = document.getElementById(successId);
        successElement.style.display = 'inline';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard');
    });
}

function isUrlValid(urlToCheck){
    try {
        new URL(urlToCheck).hostname;
        return true;
    } catch (error) {
        return false;
    }
}