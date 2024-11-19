import { Schema , model } from "mongoose";

const urlSchema = new Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true }
});
const nextIdSchema = new Schema({
    id: { type: Number, required: true, default: 0 },
});

const UrlModel = model('UrlModel', urlSchema);
const NextIdModel = model('NextIdModel', nextIdSchema);

export { UrlModel , NextIdModel };