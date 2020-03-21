import { useState } from "react";

import Link from "next/link";
import { withRouter } from "next/router";

import "./header.scss";

const navItems = [
  {
    label: "Pokedex",
    link: "/"
  },
  {
    label: "Party",
    link: "/party"
  }
];

function Header({ router }) {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="grid-container h-100">
        <div className="grid-x h-100 align-middle">
          <div className="cell auto">
            <Link href="/">
              <a>
                <img
                  src="/img/josephmark-pokemon.png"
                  alt="Josephmark"
                  width="114"
                  height="32"
                  className="header-logo"
                />
              </a>
            </Link>
          </div>
          <div className="cell shrink">
            <div className="hide-for-medium">
              <button
                onClick={() => setOpen(!open)}
                className="mobile-menu-opener"
                aria-controls="main-nav"
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}>
                <span className="show-for-sr">Open Mobile Menu</span>
              </button>
            </div>
            <div
              className={`main-nav ${(!open && "hidden") || ""}`}
              id="main-nav">
              <nav className={`grid-x grid-margin-x align-middle`}>
                <div className="cell medium-auto">
                  <ul className="main-nav-list grid-x grid-margin-x">
                    {navItems.map(({ link, label }) => (
                      <li key={link} className="cell medium-shrink">
                        <Link href={link}>
                          <a
                            className={
                              (router.pathname === link && "active") || ""
                            }>
                            {label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="cell medium-shrink user-profile-cell">
                  <div className="user-profile">
                    <img
                      src="/img/placeholder-user.png"
                      alt="Profile Picture"
                      width="100"
                      height="100"
                    />
                  </div>
                </div>
              </nav>
              <div className="mobile-menu-logo hide-for-medium">
                <Link href="/">
                  <a>
                    <img
                      src="/img/josephmark-pokemon.png"
                      alt="Josephmark"
                      width="114"
                      height="32"
                      className="header-logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
