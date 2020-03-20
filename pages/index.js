import React, { Component } from "react";

import "./index.scss";

import Layout from "../components/layout";
import Card from "../components/card";
import PartySidebar from "../components/party-sidebar";

import Party from "../services/party";
import { getPokemon, defaultPageSize } from "./api/pokemon";

const pokemonEndpoint = `/api/pokemon`;

export async function getStaticProps(context) {
  const { pokemon, allPokemon } = await getPokemon();
  const maxPokemon = allPokemon.length;
  const maxPages = Math.ceil(allPokemon.length / defaultPageSize);
  return {
    props: {
      pokemon,
      maxPokemon,
      maxPages
    }
  };
}

export default class Index extends Component {
  paginationDOM = React.createRef();
  paginationInView = false;

  constructor(props) {
    super(props);

    this.state = {
      active: [],
      party: [],
      page: 1,
      pokemon: props.pokemon,
      fetching: false
    };
  }

  componentDidMount() {
    this.initLoader();
    // Only instantiate party on the client side (since it uses localStorage)
    if (typeof window !== "undefined") {
      this.party = new Party();
      this.setState({
        active: this.party.party.map(mon => mon.id),
        party: this.party.party
      });
    }
  }

  toggleCardActive(id) {
    const idIndex = this.state.active.indexOf(id);
    if (idIndex >= 0) {
      this.party.remove(id);
    } else {
      const [mon] = this.state.pokemon.filter(mon => mon.id === id);
      this.party.add(mon);
    }

    this.setState({
      active: this.party.party.map(mon => mon.id),
      party: this.party.party
    });
  }

  initLoader() {
    // TODO: fallback for browsers w/o intersection Observer
    if (!window.IntersectionObserver) {
      return;
    }
    this.observer = new IntersectionObserver(
      entries => this.watchPaginationCallback(entries),
      {
        rootMargin: "0px 0px 400px 0px"
      }
    );

    this.observer.observe(this.paginationDOM.current);
  }

  watchPaginationCallback([pagination]) {
    this.paginationInView = pagination.isIntersecting;

    if (this.paginationInView) {
      this.fetchNextPage();
    }
  }

  async fetchNextPage() {
    if (!this.state.fetching && this.state.page <= this.props.maxPages) {
      this.setState({
        fetching: true
      });
      const res = await fetch(`${pokemonEndpoint}?page=${this.state.page + 1}`);
      const pokemon = await res.json();
      this.setState(
        {
          pokemon: [...this.state.pokemon, ...pokemon],
          page: this.state.page + 1,
          fetching: false
        },
        () => {
          // Keep filling until the pagination goes offscreen
          if (this.paginationInView) {
            this.fetchNextPage();
          }
        }
      );
    }
  }

  render() {
    const { active, pokemon, party } = this.state;
    const { maxPokemon } = this.props;
    return (
      <Layout>
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell large-1" />
            <div className="cell large-2 archive-title-holder">
              <div className="archive-column grid-y">
                <div className="cell large-auto grid-x align-middle">
                  <h1>
                    Choose<br />your team
                  </h1>
                </div>
                <div className="cell shrink">
                  <div className="scroll-more text-center show-for-large">
                    Scroll for more
                    <svg
                      width="19"
                      height="29"
                      viewBox="0 0 19 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
            <div className="cell large-1 party-sidebar-holder">
              <PartySidebar pokemon={party} max={this.party?.maxMembers || 6} />
            </div>
          </div>
        </div>
        <img
          className="capture-asset-preloader"
          src="/img/pokeball-capture.gif"
          alt=""
          style={{ display: "none" }}
        />
      </Layout>
    );
  }
}
