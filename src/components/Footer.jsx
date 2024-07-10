import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="theme-custom text-white py-8 bg-background">
      <div className="container mx-auto text-center">
        <p className="mb-4">© 2024 TaskManager. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
