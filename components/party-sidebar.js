import Link from "next/link";

import PreviewCard from "./preview-card";

export default function PartySidebar({ pokemon, max }) {
  if (pokemon.length < 6) {
    for (let i = pokemon.length; i < max; i++) {
      pokemon.push({
        id: `empty-${i}`
      });
    }
  }
  return (
    <>
      <div className="grid-y grid-margin-y">
        {pokemon.map(mon => <PreviewCard {...mon} key={mon.id} />)}
      </div>
      <Link href="/party">
        <a className="btn btn-centered mt-5">Party</a>
      </Link>
    </>
  );
}
