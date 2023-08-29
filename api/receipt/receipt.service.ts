import { ImageAnnotatorClient } from '@google-cloud/vision'
const client = new ImageAnnotatorClient({
  keyFilename: './google-vision-ai-settings.json',
})

export const parseReceipt = (imageUrl: string) => {
  return client.textDetection(imageUrl)
      .then(([result]) => {
          const detections = result.textAnnotations;
          if (!detections || detections.length === 0) {
              console.log('No text annotations found in the image.')
              return null
          }
          const extractedText = detections[0].description
          if (!extractedText) {
              console.log('No extracted text found.')
              return null;
          }
          const barcodes = extractedText.match(/\d{7,}/g)
          return barcodes;
      })
      .catch(error => {
          console.error('Error parsing receipt:', error)
          throw error
      })
}
