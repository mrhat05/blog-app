import React from "react";

const Help = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-gray-700">Find answers to frequently asked questions or contact us for support.</p>
        </div>
    );
};

export default Help;