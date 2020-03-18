import Link from "next/link";

import "./party-sidebar.scss";

import PreviewCard from "./preview-card";

export default function PartySidebar({ pokemon, max }) {
  return (
    <div className="party-sidebar">
      <div className="grid-x grid-margin-x grid-margin-y">
        {pokemon.map(mon => <PreviewCard {...mon} key={mon.id} />)}
      </div>
      <Link href="/party">
        <a className="btn btn-centered mt-5 btn-floating">Party</a>
      </Link>
    </div>
  );
}
