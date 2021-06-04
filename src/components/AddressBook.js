import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import AddAddress from "./AddAddress";
import Addresses from "./Addresses";

class _AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddAddress: false,
    };
  }

  showAddAddressClick = () => {
    this.setState({ showAddAddress: !this.state.showAddAddress });
  };

  render() {
    return (
      <div className="container">
        <div>
          <h1>
            <FontAwesomeIcon
              icon={faAddressBook}
              style={{ color: "steelblue" }}
            />{" "}
            Address Book
            <div className="useraddress">{this.props.account}</div>
          </h1>
        </div>
        <div>
          <Button
            color={this.state.showAddAddress ? "Red" : "Green"}
            text={this.state.showAddAddress ? "Close" : "Add Address"}
            onClick={this.showAddAddressClick}
          />
        </div>
        {this.state.showAddAddress && (
          <AddAddress
            account={this.props.account}
            addressBook={this.props.addressBook}
            addresses={this.props.addresses}
            updateAddresses={this.props.updateAddresses}
          />
        )}
        {this.props.addresses.length > 0 ? (
          <Addresses addresses={this.props.addresses} addressBook={this.props.addressBook} account={ this.props.account } />
        ) : (
          "No addresses to show"
        )}
      </div>
    );
  }
}

export default _AddressBook;
