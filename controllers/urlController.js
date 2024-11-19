import { UrlModel } from "../models/urlModel.js";
import { generateShortUrl } from "../utils/generateUrl.js";
import { urlValidation } from "../utils/validateUrl.js";

async function shortenUrl(req, res){
    try {
        const longUrl1 = req.body.longUrl;

        const isValidLongUrlMessage = await urlValidation(longUrl1);
        if(!(isValidLongUrlMessage === "URL is valid")){
            return res.status(200).json({
                shortUrl: isValidLongUrlMessage
            }) 
        }

        let existingUrl = await UrlModel.findOne({ longUrl: longUrl1 });
        if(existingUrl){
            return res.status(200).json({
                shortUrl: process.env.WEB_HOST + existingUrl.shortUrl
            })
        }

        const shortUrl1 = await generateShortUrl();
        const newUrl = await UrlModel.create({ longUrl: longUrl1 , shortUrl: shortUrl1 });

        res.status(200).json({
            shortUrl: process.env.WEB_HOST + newUrl.shortUrl
        })
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function revealUrl(req, res){
    try {
        const shortUrl1 = req.body.shortUrl;

        const url = await UrlModel.findOne({ shortUrl: shortUrl1 });
        if(!url){
            return res.status(400).send('Short url not found!');
        }

        res.status(200).json({
            longUrl: url.longUrl
        })
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
} 

async function urlRedirection(req, res) {
    try {
        const shortUrl1 = req.params.shortUrl;
        const responseJson = await UrlModel.findOne({ shortUrl: shortUrl1 });
        if(responseJson){
            res.redirect(responseJson.longUrl);
        } else {
            res.redirect(process.env.WEB_HOST);
        }
    } catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export { shortenUrl , revealUrl , urlRedirection };