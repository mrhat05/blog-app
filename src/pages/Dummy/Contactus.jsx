import React from "react";

const ContactUs = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Name:</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="text" name="name" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Email:</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="email" name="email" placeholder="Your Email" />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Message:</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg" name="message" placeholder="Your Message"></textarea>
                </div>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" type="submit">Send</button>
            </form>
        </div>
    );
};

export default ContactUs;