import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-center py-4">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} NewsSite. All rights reserved.
      </p>
    </footer>
  );
}
