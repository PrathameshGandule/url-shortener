import { UrlModel , NextIdModel } from "../models/urlModel.js"; 

const base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function encodeBase62(id) {
    let encoded = '';
    while (id > 0) {
        encoded = base62.charAt(id % 62) + encoded;
        id = Math.floor(id / 62);
    }
    return encoded;
}

async function generateShortUrl(longUrl) {
    try {
        const nextIdRecord = await NextIdModel.findOneAndUpdate(
            {}, 
            { $inc: { id: 1 } }, 
            { new: true, upsert: true } 
        );

        const id = nextIdRecord.id;
        const shortUrl = encodeBase62(id);
        // const newUrl = await Url.create({ longUrl, shortUrl });
        return shortUrl;
    } catch (error) {
        console.error(`Error generating short URL: ${error.message}`);
        throw new Error('Internal Server Error');
    }
}

export { generateShortUrl };
