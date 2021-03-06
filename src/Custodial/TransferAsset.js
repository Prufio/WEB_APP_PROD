import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


class ModifyDescription extends Component {
  constructor(props) {
    super(props);

    //State declaration.....................................................................................................

    this.state = {
      addr: "",
      costArray: [0],
      error: undefined,
      NRerror: undefined,
      result1: "",
      result2: "",
      assetClass: undefined,
      ipfs1: "",
      txHash: "",
      txStatus: false,
      type: "",
      manufacturer: "",
      model: "",
      serial: "",
      first: "",
      middle: "",
      surname: "",
      id: "",
      secret: "",
      newFirst: "",
      newMiddle: "",
      newSurname: "",
      newId: "",
      newSecret: "",
      isNFA: false,
    };
  }

  //component state-change events......................................................................................................

  componentDidMount() {//stuff to do when component mounts in window

  }

  componentWillUnmount() {//stuff do do when component unmounts from the window

  }

  componentDidUpdate() {//stuff to do when state updates

  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {//render continuously produces an up-to-date stateful document  
    const self = this;

    const _accessAsset = async () => {
      if (this.state.manufacturer === "" 
      || this.state.type === "" 
      || this.state.model === "" 
      || this.state.serial === "" 
      || this.state.first === "" 
      || this.state.middle === "" 
      || this.state.surname === "" 
      || this.state.id === "" 
      || this.state.secret === "") {
        return alert("Please fill out all fields before submission")
      }

      let idxHash = window.web3.utils.soliditySha3(
        String(this.state.type),
        String(this.state.manufacturer),
        String(this.state.model),
        String(this.state.serial),
      );

      let rgtRaw = window.web3.utils.soliditySha3(
        String(this.state.first),
        String(this.state.middle),
        String(this.state.surname),
        String(this.state.id),
        String(this.state.secret)
      );

      let rgtHash = window.web3.utils.soliditySha3(String(idxHash), String(rgtRaw));

      var doesExist = await window.utils.checkAssetExists(idxHash);
      var infoMatches = await window.utils.checkMatch(idxHash, rgtHash);

      if (!doesExist) {
        return alert("Asset doesnt exist! Ensure data fields are correct before submission.")
      }

      if (!infoMatches) {
        return alert("Owner data fields do not match data on record. Ensure data fields are correct before submission.")
      }

      return this.setState({ 
        idxHash: idxHash,
        rgtHash: rgtHash,
        accessPermitted: true
       })

    }



    const _transferAsset = async () => {
      this.setState({ txStatus: false });
      this.setState({ txHash: "" });
      this.setState({ error: undefined })
      this.setState({ result: "" })
      
      var idxHash = this.state.idxHash
      var rgtHash = this.state.rgtHash

      var newRgtRaw = window.web3.utils.soliditySha3(
        this.state.newFirst,
        this.state.newMiddle,
        this.state.newSurname,
        this.state.newId,
        this.state.newSecret
      );

      var newRgtHash = window.web3.utils.soliditySha3(idxHash, newRgtRaw);

      console.log("idxHash", idxHash);
      console.log("New rgtHash", rgtHash);
      console.log("addr: ", window.addr);

      window.contracts.APP.methods
        .$transferAsset(idxHash, rgtHash, newRgtHash)
        .send({ from: window.addr })
        .on("error", function (_error) {
          // self.setState({ NRerror: _error });
          self.setState({ txHash: Object.values(_error)[0].transactionHash });
          self.setState({ txStatus: false });
          console.log(Object.values(_error)[0].transactionHash);
        })
        .on("receipt", (receipt) => {
          this.setState({ txHash: receipt.transactionHash });
          this.setState({ txStatus: receipt.status });
          console.log(receipt.status);
          //Stuff to do when tx confirms
        });
      console.log(this.state.txHash);
      await this.setState({
        idxHash: "",
        rgtHash: "",
        accessPermitted: false
      })
      return document.getElementById("MainForm").reset();
    };

    return (
      <div>
        <Form className="form" id='MainForm'>
          {window.addr === undefined && (
            <div className="errorResults">
              <h2>User address unreachable</h2>
              <h3>Please connect web3 provider.</h3>
            </div>
          )}{window.assetClass === undefined && (
            <div className="errorResults">
              <h2>No asset class selected.</h2>
              <h3>Please select asset class in home page to use forms.</h3>
            </div>
          )}
          {window.addr > 0 && window.assetClass > 0 && (
            <div>

              <h2 className="headerText">Transfer Asset</h2>
              <br></br>
              {!this.state.accessPermitted && (
                <>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label className="formFont">Type:</Form.Label>



                  <Form.Control
                    placeholder="Type"
                    required
                    onChange={(e) => this.setState({ type: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridManufacturer">
                  <Form.Label className="formFont">Manufacturer:</Form.Label>

                  <Form.Control
                    placeholder="Manufacturer"
                    required
                    onChange={(e) => this.setState({ manufacturer: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridModel">
                  <Form.Label className="formFont">Model:</Form.Label>
                  <Form.Control
                    placeholder="Model"
                    required
                    onChange={(e) => this.setState({ model: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSerial">
                  <Form.Label className="formFont">Serial:</Form.Label>
                  <Form.Control
                    placeholder="Serial"
                    required
                    onChange={(e) => this.setState({ serial: e.target.value })}
                    size="lg"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label className="formFont">First Name:</Form.Label>
                  <Form.Control
                    placeholder="First Name"
                    required
                    onChange={(e) => this.setState({ first: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMiddleName">
                  <Form.Label className="formFont">Middle Name:</Form.Label>
                  <Form.Control
                    placeholder="Middle Name"
                    required
                    onChange={(e) => this.setState({ middle: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label className="formFont">Last Name:</Form.Label>
                  <Form.Control
                    placeholder="Last Name"
                    required
                    onChange={(e) => this.setState({ surname: e.target.value })}
                    size="lg"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridIdNumber">
                  <Form.Label className="formFont">ID Number:</Form.Label>
                  <Form.Control
                    placeholder="ID Number"
                    required
                    onChange={(e) => this.setState({ id: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="formFont">Password:</Form.Label>
                  <Form.Control
                    placeholder="Password"
                    type="password"
                    required
                    onChange={(e) => this.setState({ secret: e.target.value })}
                    size="lg"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group >
                    <Button className="buttonDisplay"
                    variant="primary"
                    type="button"
                    size="lg"
                    onClick={_accessAsset}
                  >
                    Access Asset
                  </Button>
                </Form.Group>
              </Form.Row>
                </>
              )}
              {this.state.accessPermitted && (
                <>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridNewFirstName">
                  <Form.Label className="formFont">New First Name:</Form.Label>
                  <Form.Control
                    placeholder="New First Name"
                    required
                    onChange={(e) =>
                      this.setState({ newFirst: e.target.value })
                    }
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridNewMiddleName">
                  <Form.Label className="formFont">New Middle Name:</Form.Label>
                  <Form.Control
                    placeholder="New Middle Name"
                    required
                    onChange={(e) =>
                      this.setState({ newMiddle: e.target.value })
                    }
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridNewLastName">
                  <Form.Label className="formFont">New Last Name:</Form.Label>
                  <Form.Control
                    placeholder="New Last Name"
                    required
                    onChange={(e) =>
                      this.setState({ newSurname: e.target.value })
                    }
                    size="lg"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridNewIdNumber">
                  <Form.Label className="formFont">New ID Number:</Form.Label>
                  <Form.Control
                    placeholder="New ID Number"
                    required
                    onChange={(e) => this.setState({ newId: e.target.value })}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridNewPassword">
                  <Form.Label className="formFont">New Password:</Form.Label>
                  <Form.Control
                    placeholder="New Password"
                    type="password"
                    required
                    onChange={(e) =>
                      this.setState({ newSecret: e.target.value })
                    }
                    size="lg"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group >
                    <Button className="buttonDisplay"
                    variant="primary"
                    type="button"
                    size="lg"
                    onClick={_transferAsset}
                  >
                    Transfer
                  </Button>
                  <div className="costText"> Cost in AC {window.assetClass}: {Number(window.costs.transferAssetCost) / 1000000000000000000} ETH</div>
                </Form.Group>
              </Form.Row>
                </>
              )}

              <br></br>
            </div>
          )}
        </Form>
        <div className="results">
        {this.state.txHash > 0 && ( //conditional rendering
          <Form.Row>
            {this.state.txStatus === false && (
              <div>
                !ERROR! :
                <a
                  href={"https://kovan.etherscan.io/tx/" + this.state.txHash}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KOVAN Etherscan:{this.state.txHash}
                </a>
              </div>
            )}
            {this.state.txStatus === true && (
              <div>
                {" "}
                No Errors Reported :
                <a
                  href={"https://kovan.etherscan.io/tx/" + this.state.txHash}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KOVAN Etherscan:{this.state.txHash}
                </a>
              </div>
            )}
          </Form.Row>
        )}
        </div>
      </div>
    );
  }
}

export default ModifyDescription;
