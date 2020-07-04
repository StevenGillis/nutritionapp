class GoogleLabelService{
   
    async getLabels(photoName) {
        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');
    
        // Creates a client
        const client = new vision.ImageAnnotatorClient();
        
        // Performs label detection on the image file
        const [result] = await client.labelDetection('./public/img/' + photoName);
        const labels = result.labelAnnotations;
        return labels
    }
}
module.exports.GoogleLabelService = GoogleLabelService;