import React, { Component } from "react";
import "./App.css";
import "./components/AddressBook";
import _AddressBook from "./components/AddressBook";
import Web3 from "web3";
import AddressBook from "./abis/AddressBook.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      addressBook: {},
      addresses: {}      
    };
  }

  async componentDidMount() {
    this.loadWeb3();
    this.loadBlockChainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    window.web3 = new Web3(Web3.givenProvider);
  }

   async loadBlockChainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    const addressBookData = AddressBook.networks[networkId];
    if (addressBookData) {
      const addressBook = new web3.eth.Contract(
        AddressBook.abi,
        addressBookData.address
      );
      this.setState({ addressBook });
      
      this.updateAddresses();
    } else {
      window.alert("AddressBook contract not deployed to detected network.");
    }
  }

  updateAddresses = async () => {
    const addresses = await this.state.addressBook.methods.getAddressArray(this.state.account).call();
    this.setState({ addresses: addresses });
  }



  render() {
    return (
      <div className="App">
        <_AddressBook
          account={this.state.account}
          addressBook={this.state.addressBook}
          addresses={this.state.addresses}
        />
      </div>
    );
  }
}

export default App;
