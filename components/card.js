import "./card.scss";

export default function Card({ id, name, types }) {
  return (
    <article className="cell large-4 text-center card-holder">
      <div className="card pkmn-card">
        <img className="card-img" src="" alt={name} width="150" height="150" />
        <div className="card-img-shadow" />
        <div>{id}</div>
        <h2>{name}</h2>
        <ul className="pkmn-types">
          {types.map(type => <li key={type}>{type}</li>)}
        </ul>
      </div>
    </article>
  );
}
