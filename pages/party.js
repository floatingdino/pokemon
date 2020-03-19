import { Component } from "react";

import Party from "../services/party";
import Layout from "../components/layout";
import Card from "../components/card";

const userName = "Ash";

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
  // TODO: right sidebar
  render() {
    const { party } = this.state;
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
          </div>
        </div>
      </Layout>
    );
  }
}
