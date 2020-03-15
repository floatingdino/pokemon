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
              <div className="archive-left-column grid-y">
                <div className="cell auto grid-x align-middle">
                  <h1>
                    Choose<br />your team
                  </h1>
                </div>
                <div className="cell shrink">
                  <div className="scroll-more text-center show-for-large-">
                    Scroll for more
                    <svg
                      width="19"
                      height="29"
                      viewBox="0 0 19 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.79863 0C4.9115 0 0.949707 3.96179 0.949707 8.84891V19.5904C0.949707 24.4775 4.9115 28.4393 9.79863 28.4393C14.6858 28.4393 18.6476 24.4775 18.6476 19.5904V8.84892C18.6476 3.9618 14.6858 0 9.79863 0ZM9.79856 1.5346C5.81541 1.5346 2.58643 4.76359 2.58643 8.74674V19.6928C2.58643 23.6759 5.81541 26.9049 9.79856 26.9049C13.7817 26.9049 17.0107 23.6759 17.0107 19.6928V8.74673C17.0107 4.76358 13.7817 1.5346 9.79856 1.5346Z"
                      />
                      <rect
                        x="8.12524"
                        y="6.57764"
                        width="2.98979"
                        height="2.98979"
                        rx="1.4949"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.91901 22.0006L11.2025 20.7171L11.6253 21.14L9.83144 22.9338C9.71468 23.0506 9.52538 23.0506 9.40862 22.9338L7.61475 21.14L8.03757 20.7171L9.32105 22.0006L9.32105 12.5571L9.91901 12.5571L9.91901 22.0006Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
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
