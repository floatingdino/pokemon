export default class Party {
  maxMembers = 6;

  party = [];

  realLength = 0;

  storageKey = "party";

  constructor() {
    this.fillParty();
  }

  fillParty() {
    if (!localStorage || !localStorage.getItem(this.storageKey)) {
      for (let i = 1; i <= this.maxMembers; i++) {
        this.party.push({ id: `empty-${i}` });
      }
      return;
    }
    this.party = JSON.parse(localStorage.getItem(this.storageKey));
    this.realLength = this.party.reduce(
      (acc, mon) => (mon.name && acc++) || acc,
      0
    );
  }

  add(mon) {
    if (this.realLength >= this.maxMembers) {
      return;
    }
    this.party.splice(this.realLength, 1, mon);
    this.realLength++;
    this.updateStorage();
    console.log(this);
  }

  remove(id) {
    const newParty = this.party.filter(mon => mon.id !== id);
    this.party = [...newParty, { id: `empty-${this.realLength}` }];
    this.realLength--;
    this.updateStorage();
  }

  updateName(index, name) {
    this.party[index].name = name;
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.party));
  }
}
