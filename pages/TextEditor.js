import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styles from './styles/texteditor.css';

const MyTextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 500; // Maximum width for resizing
        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const resizedDataURL = canvas.toDataURL(file.type);
        const resizedImg = `<img src="${resizedDataURL}" alt="Uploaded Image" />`;
        const updatedText = text + resizedImg;
        setText(updatedText);
      };
    };

    reader.readAsDataURL(file);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'script',
    'link',
    'image',
    'video',
    'formula',
    'list',
  ];

  return (
    <div className="text-editor-area">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br></br>
      <br></br>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
  
};



export default MyTextEditor;
