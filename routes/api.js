import express from 'express';
import { shortenUrl, revealUrl, urlRedirection } from '../controllers/urlController.js'; 

const apiRoutes = express.Router();
apiRoutes.post('/shorten', shortenUrl); 
apiRoutes.post('/reveal', revealUrl); 

const redirectRouter = express.Router();
redirectRouter.get('/:shortUrl', urlRedirection);

export { apiRoutes , redirectRouter };
