"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReceipt = void 0;
const vision_1 = require("@google-cloud/vision");
const client = new vision_1.ImageAnnotatorClient({
    keyFilename: './google-vision-ai-settings.json',
});
const parseReceipt = (imageUrl) => {
    return client.textDetection(imageUrl)
        .then(([result]) => {
        const detections = result.textAnnotations;
        if (!detections || detections.length === 0) {
            console.log('No text annotations found in the image.');
            return null;
        }
        const extractedText = detections[0].description;
        if (!extractedText) {
            console.log('No extracted text found.');
            return null;
        }
        const barcodes = extractedText.match(/\d{7,}/g);
        return barcodes;
    })
        .catch(error => {
        console.error('Error parsing receipt:', error);
        throw error;
    });
};
exports.parseReceipt = parseReceipt;
