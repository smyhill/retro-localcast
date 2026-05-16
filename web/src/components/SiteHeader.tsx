import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/weather", label: "Weather" },
  { href: "/status", label: "Status" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-normal text-slate-950"
        >
          Retro LocalCast
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-sky-700" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
