import { Component } from "react";
import Link from "next/link";

import Party from "../services/party";
import Layout from "../components/layout";
import Card from "../components/card";

import { userName } from "../constants";

export default class PartyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      party: [
        { id: "empty-1" },
        { id: "empty-2" },
        { id: "empty-3" },
        { id: "empty-4" },
        { id: "empty-5" },
        { id: "empty-6" }
      ]
    };
  }

  componentDidMount() {
    // This update is in componentDidMount so that React doesn't complain on hydration
    if (typeof window !== "undefined") {
      this.party = new Party();
      this.setState({
        party: this.party.party
      });
    }
  }

  updateName(index, name) {
    this.party.updateName(index, name);
    this.setState({
      party: this.party.party
    });
  }

  removeFromParty(id) {
    this.party.remove(id);
    this.setState({
      party: this.party.party
    });
  }
  render() {
    const { party } = this.state;
    return (
      <Layout>
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell large-1" />
            <div className="cell large-2">
              <div className="archive-column grid-y align-center">
                <div className="grid-x align-middle">
                  <div className="cell auto">
                    <h1>
                      {userName}'s<br />Party
                    </h1>
                  </div>
                  <div className="cell shrink hide-for-large">
                    {this.party && (
                      <p className="h3 mb-0">
                        <span className="show-for-sr">Party Size:</span>
                        {this.party.realLength} / {this.party.maxMembers}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="cell large-6">
              <div className="grid-x grid-margin-x grid-margin-y">
                {party.map((mon, index) => (
                  <Card
                    key={mon.id}
                    {...mon}
                    inParty={true}
                    onChange={e => this.updateName(index, e.target.value)}
                    onClick={() => this.removeFromParty(mon.id)}
                  />
                ))}
              </div>
            </div>
            <div className="cell large-1" />
            <div className="cell large-1">
              <div className="archive-column grid-y">
                <div className="cell large-auto show-for-large text-center grid-y align-center">
                  {this.party && (
                    <p className="h3">
                      <span className="show-for-sr">Party Size:</span>
                      {this.party.realLength} / {this.party.maxMembers}
                    </p>
                  )}
                </div>
                <div className="cell shrink">
                  <Link href="/">
                    <a className="btn btn-floating">Dex</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
