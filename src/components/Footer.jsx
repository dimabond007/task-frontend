import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="theme-custom text-secondary-foreground py-8 bg-background">
      <div className="container mx-auto text-center">
        <p className="mb-4 ">© 2024 TaskManager. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/privacy" className="text-secondary-foreground ">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-secondary-foreground">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-secondary-foreground ">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
