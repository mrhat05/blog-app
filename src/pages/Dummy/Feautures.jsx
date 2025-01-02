import React from "react";

const Features = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Features</h1>
            <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                <li>Rich Text Editor</li>
                <li>SEO Optimization</li>
                <li>Customizable Themes</li>
                <li>Analytics Dashboard</li>
            </ul>
        </div>
    );
};
export default Features