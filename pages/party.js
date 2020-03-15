import Layout from "../components/layout";
import Card from "../components/card";

const selectedPokemon = [
  { id: "empty-1" },
  { id: "empty-2" },
  { id: "empty-3" },
  { id: "empty-4" },
  { id: "empty-5" },
  { id: "empty-6" }
];

const userName = "Ash";

export default function Party() {
  return (
    <Layout>
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell large-1" />
          <div className="cell large-2">
            <h1>
              {userName}'s<br />Party
            </h1>
          </div>
          <div className="cell large-6">
            <div className="grid-x grid-margin-x">
              {selectedPokemon.map(mon => <Card key={mon.id} {...mon} />)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
