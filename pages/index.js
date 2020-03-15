import React, { Component } from "react";
import Link from "next/link";

import "./index.scss";

import Layout from "../components/layout";
import Card from "../components/card";
import PartySidebar from "../components/party-sidebar";

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

const getPokemonByID = id => {
  const [pkmn] = pokemon.filter(mon => mon.id === id);
  return pkmn;
};

const maxPokemon = 151;
const maxPartySize = 6;

export default class Index extends Component {
  paginationDOM = React.createRef();
  paginationInView = false;

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
    } else if (this.state.active.length < maxPartySize) {
      this.setState({
        active: [...this.state.active, id]
      });
    }
  }

  initLoader() {
    // TODO: fallback for browsers w/o intersection Observer
    if (!window.IntersectionObserver) {
      return;
    }
    this.observer = new IntersectionObserver(
      entries => this.watchPaginationCallback(entries),
      {
        rootMargin: "0px 0px 200px 0px"
      }
    );

    this.observer.observe(this.paginationDOM.current);
  }

  watchPaginationCallback([pagination]) {
    this.paginationInView = pagination.isIntersecting;
    // if in view and not already showing all pkmn, fetch next page
    // TODO: fetch next page
  }

  componentDidMount() {
    this.initLoader();
  }

  render() {
    const { active } = this.state;
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
                    active={active.indexOf(mon.id) >= 0}
                    onClick={() => this.toggleCardActive(mon.id)}
                  />
                ))}
                <div
                  className="cell pagination-indicator text-center"
                  ref={this.paginationDOM}>
                  {pokemon.length}/{maxPokemon}
                </div>
              </div>
            </div>
            <div className="cell large-1" />
            <div className="cell large-1">
              <PartySidebar
                pokemon={active.map(id => getPokemonByID(id))}
                max={maxPartySize}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
