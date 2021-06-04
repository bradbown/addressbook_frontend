import React, { Component } from "react";

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      alias: "",
    };
  }

  setAddress = (address) => {
    this.setState({ address: address });
  };

  setAlias = (alias) => {
    this.setState({ alias: alias });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.address) {
      alert("Please add an address");
      return;
    }

    if (!this.state.alias) {
      alert("Please add an alias for the address");
    }

    await this.props.addressBook.methods
      .addAddress(this.state.address, this.state.alias)
      .send({ from: this.props.account });

    this.setState({ address: "", alias: "" });
    window.location.reload();
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.onSubmit}>
        <div className="form-control">
          <label>Address</label>
          <input
            type="text"
            placeholder="Add address"
            value={this.state.address}
            onChange={(e) => this.setAddress(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Alias</label>
          <input
            type="text"
            placeholder="Set alias"
            value={this.state.alias}
            onChange={(e) => this.setAlias(e.target.value)}
          />
        </div>

        <input type="submit" value="Save Address" className="btn btn-block" />
      </form>
    );
  }
}

export default AddAddress;
