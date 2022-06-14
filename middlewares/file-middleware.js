const multer = require("multer");

module.exports = fileUploader = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../public`);
        },
        filename: (req, file, cb) => {
            let today = Date.now();
            const fileName = today + file.originalname;
            let mimeType;
            switch (
                file.mimetype
                ) {
                case "image/jpeg":
                    mimeType = "jpg";
                    break;
                case "image/png":
                    mimeType = "png";
                    break;
                case "image/gif":
                    mimeType = "gif";
                    break;
                case "image/bmp":
                    mimeType = "bmp";
                    break;
                default:
                    mimeType = "jpg";
                    break;
            }
            cb(null, fileName + "." + mimeType);
        },
    }),
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
})