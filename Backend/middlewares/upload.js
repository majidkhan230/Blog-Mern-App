export const uploadFile = (req, res, next) => {
    const singleUpload = upload.single('file');
  
    if (!req.file && !req.body.file) {
      return next(); 
    }
  
    singleUpload(req, res, (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).send({ success: false, message: 'File upload failed', error: err.message });
      }
      next(); 
    });
  };