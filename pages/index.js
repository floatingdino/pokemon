import Link from "next/link";

import Layout from "../components/layout";
import Card from "../components/card";

const pokemon = [
  {
    id: "001",
    name: "Bulbasaur",
    types: ["Grass", "Poison"]
  },
  {
    id: "002",
    name: "Ivysaur",
    types: ["Grass", "Poison"]
  },
  {
    id: "003",
    name: "Venusaur",
    types: ["Grass", "Poison"]
  },
  {
    id: "004",
    name: "Charmander",
    types: ["Fire"]
  },
  {
    id: "005",
    name: "Charmeleon",
    types: ["Fire"]
  },
  {
    id: "006",
    name: "Charizard",
    types: ["Fire", "Flying"]
  }
];

export default function Index() {
  return (
    <Layout>
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell large-1" />
          <div className="cell large-2">
            <h1>Choose your team</h1>

            <button type="button" className="scroll-more">
              Scroll for more
            </button>
          </div>
          <div className="cell large-6">
            <div className="grid-x grid-margin-x grid-margin-y">
              {pokemon.map(mon => <Card {...mon} />)}
            </div>
          </div>
          <div className="cell large-1" />
          <div className="cell large-1">
            <Link href="/party">Party</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
