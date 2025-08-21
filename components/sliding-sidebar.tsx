"use client"

import type React from "react"
import Link from "next/link"

interface SlidingSidebarProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const SlidingSidebar: React.FC<SlidingSidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GroLow
            </div>
          </Link>
          <button onClick={onClose} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <nav>{children}</nav>
      </div>
    </div>
  )
}

export default SlidingSidebar
