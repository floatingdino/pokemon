import Link from "next/link";
import ContentEditable from "react-contenteditable";

import "./card.scss";

const defaultImage = "/img/placeholder-ball.png";

export default function Card({
  id,
  name,
  types,
  active,
  inParty,
  onClick,
  image,
  onChange
}) {
  return (
    <article className={`cell large-4 small-6 text-center card-holder`}>
      {onClick &&
        !inParty && (
          <button
            type="button"
            onClick={onClick}
            className="card-tap-area"
            title={
              (active && `Remove ${name} from Party`) || `Add ${name} to Party`
            }
          />
        )}
      <div
        className={`card pkmn-card h-100 grid-y ${(active && "card-active") ||
          null} ${(name === undefined && "card-empty") || "card-not-empty"}`}>
        <div className="cell shrink">
          <img
            className="card-img"
            src={image || defaultImage}
            alt={name}
            width="150"
            height="150"
          />
          {!inParty &&
            active && (
              <img
                className="pokemon-capture"
                src={`/img/pokeball-capture.gif?${Date.now()}`}
                aria-hidden="true"
                alt=""
              />
            )}
        </div>
        {name !== undefined && (
          <>
            <div className="card-img-shadow" />
            <div className="cell shrink">
              <div className="card-id" title={`Pokemon ID Number: ${id}`}>
                {id}
              </div>
            </div>
            <div className="cell card-title-cell">
              <ContentEditable
                html={name}
                value={name}
                onChange={onChange}
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
            {onClick &&
              inParty && (
                <button
                  type="button"
                  onClick={onClick}
                  className="party-remove-button">
                  <span className="show-for-sr">Remove From Party</span>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L7 7M7 1L1 7"
                      stroke="#333333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
          </>
        )}
        {name === undefined && (
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
