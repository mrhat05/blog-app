import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';

function Footer() {
  const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
  return (
    <footer className={`${isDarkMode?"bg-radial-dark":"bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600"}  text-white py-10`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Blogify</h2>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Blogify. All rights reserved.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul>
                <li className="mb-2">
                  <Link to="/features" className="hover:text-gray-200">
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/pricing" className="hover:text-gray-200">
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/affiliate" className="hover:text-gray-200">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="hover:text-gray-200">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul>
                <li className="mb-2">
                  <Link to="/profile" className="hover:text-gray-200">
                    Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/help" className="hover:text-gray-200">
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="hover:text-gray-200">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-gray-200">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="space-x-4">
                <Link to="#" className="hover:text-gray-200">
                    <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link to="#" className="hover:text-gray-200">
                    <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="#" className="hover:text-gray-200">
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="#" className="hover:text-gray-200">
                    <FontAwesomeIcon icon={faLinkedin} />
                </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
