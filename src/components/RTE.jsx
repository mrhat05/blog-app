import React, { useId, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import config from '../conf/config';

export default function RTE({ label, value = "", onChange }) {
  const id = useId();
  const editorRef = useRef(null);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Get dark mode state

  const handleEditorChange = (content) => {
    onChange(content);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`inline-block text-sm font-medium ${isDarkMode ? "text-darkSecondaryTextColor" : "text-gray-600"} mb-3 pl-1`}
        >
          {label}
        </label>
      )}

      {/* Force re-render by using the 'key' prop tied to 'isDarkMode' */}
      <Editor
        key={isDarkMode ? 'dark' : 'light'} 
        id={id}
        apiKey={config.tinymceAPIkey}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          // Ensure editor elements are available before applying styles
          editor.on('init', () => {
            const toolbar = editor.container.querySelector('.tox-toolbar');
            if (toolbar) {
              toolbar.style.backgroundColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
              toolbar.style.color = isDarkMode ? '#FFFFFF' : '#000000';
              toolbar.style.borderBottom = isDarkMode ? '1px solid #333' : '1px solid #DDD';
            }

            const contentBody = editor.getBody();
            if (contentBody) {
              contentBody.style.backgroundColor = isDarkMode ? '#2C2C2C' : '#FFFFFF';
              contentBody.style.color = isDarkMode ? '#FFFFFF' : '#000000';
            }
          });
        }}
        value={value}
        init={{
          branding: false,
          directionality: "ltr",
          menubar: false,
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "link",
            "lists",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
          ],
          toolbar:
            "undo redo | fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          content_style: `
            body {
              background-color: ${isDarkMode ? '#2C2C2C' : '#FFFFFF'};
              color: ${isDarkMode ? '#FFFFFF' : '#000000'};
              font-family: Arial, sans-serif;
              padding: 10px;
            }
          `,
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}