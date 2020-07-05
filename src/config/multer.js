const multer = require('multer');
const crypto = require('crypto');
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');

            const filename = `${hash}-${file.originalname}`;

            callback(null, filename);
        }
    }),
};