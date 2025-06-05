import React from "react";
import { BiMap, BiPhoneCall, BiEnvelope, BiTime } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-800 p-4 md:p-10">
      <div className=" md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <img
              src="/20240604_150800.png"
              alt="Zasira_Store"
              className="h-36 mx-auto"
            />

            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <BiMap
                  size={20}
                  className="text-green-500 text-lg flex-shrink-0 mt-1"
                />
                <span>
                  <strong>Address:</strong> Techno Park, Shandhapur, Jatni,
                  Bhubaneswar, Odisha 752050
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BiPhoneCall
                  size={20}
                  className="text-green-500 text-lg flex-shrink-0 mt-1"
                />
                <span>
                  <strong>Call Us:</strong> (+91)1122334455
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BiEnvelope
                  size={20}
                  className="text-green-500 text-lg flex-shrink-0 mt-1"
                />
                <span>
                  <strong>Email:</strong> zasira.store@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BiTime
                  size={20}
                  className="text-green-500 text-lg flex-shrink-0 mt-1"
                />
                <span>
                  <strong>Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Footer Links */}
          {["Company", "Company", "Corporate", "Popular"].map(
            (section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3">{section}</h3>
                <ul className="space-y-2">
                  {[
                    "About Us",
                    "Delivery Information",
                    "Privacy Policy",
                    "Terms & Conditions",
                    "Contact Us",
                    "Support Center",
                    "Careers",
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a href="#" className="hover:text-green-500 transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6">
          <p className="text-center md:text-left">
            © 2024, Ecommerce Template. All rights reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                >
                  <Icon className="text-lg" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
