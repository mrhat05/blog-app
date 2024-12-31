import React, { useId, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ label, value = "", onChange }) {
  const id = useId(); 
  const editorRef = useRef(null); 

  const handleEditorChange = (content) => {
      onChange(content);
  };

  return (
    <div className="w-full">

      {label && (
        <label
          htmlFor={id}
          className="inline-block text-sm font-medium text-gray-600 mb-3 pl-1"
        >
          {label}
        </label>
      )}

      <Editor
        id={id}
        apiKey="73gjby992jnz7ovm6z4gn4kcs99zfkkw0z4mqmgqnjz21iqf" 
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          branding: false,
          directionality: "ltr",
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
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}
