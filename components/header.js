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
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell grow">
            <img src="../assets/img/josephmark-pokemon.png" alt="Josephmark" />
          </div>
          <div className="cell shrink">
            <ul className="main-nav">
              {navItems.map(({ link, label }) => (
                <li key={link}>
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
