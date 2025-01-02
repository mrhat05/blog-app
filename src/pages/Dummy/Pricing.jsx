import React from "react";

const Pricing = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
            <table className="table-auto w-full text-left text-lg text-gray-700">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Plan</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Features</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="px-4 py-2">Free</td>
                        <td className="px-4 py-2">$0/month</td>
                        <td className="px-4 py-2">Basic blogging tools</td>
                    </tr>
                    <tr className="border-b">
                        <td className="px-4 py-2">Pro</td>
                        <td className="px-4 py-2">$9.99/month</td>
                        <td className="px-4 py-2">Advanced tools and analytics</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Pricing;