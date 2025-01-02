import React from "react";

const Company = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">About Our Company</h1>
            <p className="text-lg text-gray-700">Welcome to Blogify! We are dedicated to providing the best platform for bloggers worldwide.</p>
        </div>
    );
};

export default Company;
