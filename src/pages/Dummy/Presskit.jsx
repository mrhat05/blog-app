import React from "react";

const PressKit = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Press Kit</h1>
            <p className="text-lg text-gray-700">Download our press kit and access media assets and branding guidelines.</p>
        </div>
    );
};

export default PressKit;