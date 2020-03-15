import { Component } from "react";
import Link from "next/link";

import "./index.scss";

import Layout from "../components/layout";
import Card from "../components/card";

// TODO: load from API (paged)
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

const max_pokemon = 151;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: []
    };
  }

  // TODO: sync to localStorage or API
  toggleCardActive(id) {
    const idIndex = this.state.active.indexOf(id);
    if (idIndex >= 0) {
      const newActive = this.state.active;
      newActive.pop(idIndex);
      this.setState({
        active: newActive
      });
    } else {
      this.setState({
        active: [...this.state.active, id]
      });
    }
  }

  render() {
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
              <div className="grid-x grid-margin-x grid-margin-y align-stretch">
                {pokemon.map(mon => (
                  <Card
                    key={mon.id}
                    {...mon}
                    active={this.state.active.indexOf(mon.id) >= 0}
                    onClick={() => this.toggleCardActive(mon.id)}
                  />
                ))}
                <div className="cell pagination-indicator text-center">
                  {pokemon.length}/{max_pokemon}
                </div>
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
}
