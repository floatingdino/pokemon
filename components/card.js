import Link from "next/link";
import ContentEditable from "react-contenteditable";

import "./card.scss";

const defaultImage = "/static/img/placeholder-ball.png";

// TODO: Image

export default function Card({
  id,
  name,
  types,
  active,
  inParty,
  onClick,
  image
}) {
  return (
    <article className={`cell large-4 text-center card-holder`}>
      {onClick && (
        <button type="button" onClick={onClick} className="card-tap-area">
          <span className="show-for-sr">
            {(active && "Remove from Party") || "Add to Party"}
          </span>
        </button>
      )}
      <div
        className={`card pkmn-card h-100 grid-y ${(active && "card-active") ||
          null} ${(!name && "card-empty") || "card-not-empty"}`}>
        <div className="cell shrink">
          <img
            className="card-img"
            src={image || defaultImage}
            alt={name}
            width="150"
            height="150"
          />
        </div>
        {name && (
          <>
            <div className="card-img-shadow" />
            <div className="cell shrink">
              <div className="card-id" title={`Pokemon ID Number: ${id}`}>
                {id}
              </div>
            </div>
            <div className="cell grow">
              <ContentEditable
                html={name}
                tagName="h2"
                disabled={!inParty}
                spellCheck="false"
              />
            </div>
            <div className="cell shrink">
              <ul className="card-types mt-0 mb-0">
                {types.map(type => (
                  <li
                    className={`card-type card-type-${type.name.toLowerCase()}`}
                    key={type.url}>
                    {type.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {!name && (
          <div className="cell">
            <Link href="/">
              <a
                className="card-empty-button"
                title="No Pokemon selected, add one from the Dex!">
                <span aria-hidden="true">
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 1.89282V17.1071M17.6071 9.49996H2.39286"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
