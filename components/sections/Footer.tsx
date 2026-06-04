export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-dark-400 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-white font-semibold tracking-widest text-sm uppercase">
            Vertex Grappling
          </p>
          <p className="text-[#6B7BA8] text-xs mt-1">
            Private coaching · Boca Raton, FL
          </p>
        </div>

        <div className="flex items-center gap-6 text-[#6B7BA8] text-xs">
          <a
            href="https://instagram.com/erikgrapplingcoach"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sand transition-colors"
          >
            @erikgrapplingcoach
          </a>
          <span>·</span>
          <span>© {new Date().getFullYear()} Erik Silva</span>
        </div>
      </div>
    </footer>
  )
}
