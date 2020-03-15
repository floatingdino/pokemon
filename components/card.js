import "./card.scss";

// TODO: Image

export default function Card({ id, name, types, active, inParty, onClick }) {
  return (
    <article className="cell large-4 text-center card-holder">
      {onClick && (
        <button type="button" onClick={onClick} className="card-tap-area">
          <span className="show-for-sr">
            {(active && "Remove from Party") || "Add to Party"}
          </span>
        </button>
      )}
      <div
        className={`card pkmn-card h-100 grid-y ${(active && "card-active") ||
          null}`}>
        <div className="cell shrink">
          <img
            className="card-img"
            src=""
            alt={name}
            width="150"
            height="150"
          />
        </div>
        <div className="card-img-shadow" />
        <div className="cell shrink">
          <div className="card-id" title={`Pokemon ID Number: ${id}`}>
            {id}
          </div>
        </div>
        <div className="cell grow">
          <h2>{name}</h2>
        </div>
        <div className="cell shrink">
          <ul className="card-types mt-0 mb-0">
            {types.map(type => (
              <li
                className={`card-type card-type-${type.toLowerCase()}`}
                key={type}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
