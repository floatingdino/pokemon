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
            <div className="grid-x grid-margin-x align-middle">
              <div className="cell auto">
                <ul className="main-nav grid-x grid-margin-x">
                  {navItems.map(({ link, label }) => (
                    <li key={link} className="cell shrink">
                      <Link href={link}>
                        <a
                          className={
                            (router.pathname === link && "active") || null
                          }>
                          {label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cell shrink user-profile-cell">
                <div className="user-profile">
                  <img
                    src="/img/placeholder-user.png"
                    alt="Profile Picture"
                    width="56"
                    height="56"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
