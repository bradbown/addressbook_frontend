import React, { Component } from "react";
import Address from "./Address";

export default class Addresses extends Component {

  render() {
    return (
      <> 
        {this.props.addresses.map((address) => (
          <Address key={address} publicAddress={address} addressBook={this.props.addressBook} account={this.props.account} />
        ))}
      </>
    );
  }
}
