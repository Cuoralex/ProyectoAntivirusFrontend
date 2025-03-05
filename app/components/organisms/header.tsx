
const Header = () => {
  return (
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-2">
      {/* Logo */}
      <h1 className="w-3/12">
        <a href="/">
          <svg viewBox="0 0 248 31" className="h-6 w-auto hover:text-green-500 duration-200">
            <path
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0z"
              fill="#22C55E"
            />
          </svg>
        </a>
      </h1>

      {/* Navigation */}
      <nav className="nav font-semibold text-lg">
        <ul className="flex items-center">
          {["Accueil", "Produits", "Collections", "Contact"].map((item, index) => (
            <li
              key={index}
              className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer"
            >
              <a href="/">{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Buttons */}
      <div className="w-3/12 flex justify-end">
        {[
          {
            href: "/search",
            icon: "M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z",
            alt: "Search",
          },
          {
            href: "/cart",
            icon: "M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64z",
            alt: "Cart",
          },
        ].map(({ href, icon }, index) => (
          <a key={index} href={href}>
            <svg
              className="h-8 p-1 hover:text-green-500 duration-200"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <path fill="currentColor" d={icon} />
            </svg>
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
