import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GroLow
          </div>
        </Link>

        {/* Copyright */}
        <p className="mt-4 text-gray-500">&copy; {new Date().getFullYear()} GroLow. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
