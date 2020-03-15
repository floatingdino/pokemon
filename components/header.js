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

export default function Header() {
  return (
    <header>
      <div className="grid-container h-100">
        <div className="grid-x h-100 align-middle">
          <div className="cell auto">
            <img src="../assets/img/josephmark-pokemon.png" alt="Josephmark" />
          </div>
          <div className="cell shrink">
            <ul className="main-nav grid-x grid-margin-x">
              {navItems.map(({ link, label }) => (
                <li key={link} className="cell shrink">
                  <a>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
