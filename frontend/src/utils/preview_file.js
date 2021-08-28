import React from 'react'
import 'rsuite/dist/styles/rsuite-default.css';

function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

export default previewFile;