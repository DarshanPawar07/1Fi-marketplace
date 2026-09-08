import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E5DF]/80 bg-[#F8F7F4]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="1Fi home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#24243A] text-[13px] font-extrabold tracking-[-0.04em] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            1F
          </div>

          <div className="leading-none">
            <div className="font-display text-[20px] font-extrabold tracking-[-0.045em] text-[#111318]">
              1Fi
            </div>

            <div className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8A8883] sm:block">
              Smarter ownership
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          <Link
            to="/"
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
              isHome
                ? "bg-white text-[#24243A] shadow-sm ring-1 ring-[#E8E5DF]"
                : "text-[#77746F] hover:bg-white/70 hover:text-[#24243A]"
            }`}
          >
            Smartphones
          </Link>

          <a
            href="#how-it-works"
            className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#77746F] transition hover:bg-white/70 hover:text-[#24243A]"
          >
            How it works
          </a>
        </nav>

        {/* Account */}
        <button
          type="button"
          className="group flex items-center gap-2 rounded-full border border-[#DEDAD3] bg-white/70 px-3.5 py-2 text-[13px] font-semibold text-[#24243A] transition hover:border-[#C9C5BD] hover:bg-white hover:shadow-sm"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EFEDFF] text-[10px] font-bold text-[#5144C9]">
            Y
          </span>

          <span className="hidden sm:inline">My Account</span>

          <svg
            className="h-3.5 w-3.5 text-[#8A8883] transition-transform duration-200 group-hover:translate-x-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.08 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;