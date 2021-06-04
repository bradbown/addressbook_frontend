import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      alias: ""
    };
  }

  async componentDidMount() {
    this.getAlias();
  }

  deleteAddress = async () => {
    await this.props.addressBook.methods
      .removeAddress(this.props.publicAddress)
      .send({ from: this.props.account });

    window.location.reload();
  };

  setClicked = () =>
  {
    this.setState({ clicked: !this.state.clicked })
  }
  
  async getAlias() {    
    const alias = await this.props.addressBook.methods.getAlias(this.props.account, this.props.publicAddress).call();
    this.setState({ alias: alias });
    
    //await this.setState({ alias: this.props.addressBook.methods.getAlias(this.props.account, this.props.publicAddress).call() })
    
    //this.setState({ address: await this.props.addressBook.methods.getAlias(this.props.account, this.props.account).call() });
  }

  render() {
    return (
      <div className="address" onClick={this.setClicked}>
        {this.state.clicked ? this.props.publicAddress : this.state.alias}
        {this.state.clicked && (
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: "red", cursor: "pointer", float: "right" }}
            onClick={this.deleteAddress}
          />
        )}
      </div>
    );
  }
}
