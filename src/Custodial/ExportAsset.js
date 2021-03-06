import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class ExportAsset extends Component {
  constructor(props) {
    super(props);

    //State declaration.....................................................................................................

    this.state = {
      addr: "",
      lookupIPFS1: "",
      lookupIPFS2: "",
      error: undefined,
      NRerror: undefined,
      result: null,
      assetClass: undefined,
      ipfs1: "",
      txHash: "",
      type: "",
      manufacturer: "",
      model: "",
      serial: "",
      importAgent: "",
      isNFA: false,
      txStatus: null,
    };
  }

  //component state-change events......................................................................................................

  componentDidMount() {//stuff to do when component mounts in window

  }

  componentWillUnmount() {//stuff do do when component unmounts from the window

  }
  componentDidUpdate() {//stuff to do on a re-render

  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {//render continuously produces an up-to-date stateful document  
    const self = this;

    const _accessAsset = async () => {
      if (this.state.manufacturer === "" || this.state.type === "" || this.state.model === "" || this.state.serial === "") {
        return alert("Please fill out all fields before submission")
      }

      let idxHash = window.web3.utils.soliditySha3(
        String(this.state.type),
        String(this.state.manufacturer),
        String(this.state.model),
        String(this.state.serial),
      );

      var doesExist = await window.utils.checkAssetExists(idxHash);

      if (!doesExist) {
        return alert("Asset doesnt exist! Ensure data fields are correct before submission.")
      }

      return this.setState({ 
        idxHash: idxHash,
        accessPermitted: true
       })

    }

    const _exportAsset = async () => {//create a new asset record
      this.setState({ txStatus: false });
      this.setState({ txHash: "" });
      this.setState({ error: undefined })
      this.setState({ result: "" })
      //reset state values before form resubmission
      var idxHash = this.state.idxHash;

      console.log("idxHash", idxHash);
      console.log("addr: ", this.state.agentAddress);

      window.contracts.NP.methods
        .exportAsset(
          idxHash, window.contracts.APP._address
        )
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
        });

        await this.setState({
          idxHash: "",
          accessPermitted: false
        })

        return document.getElementById("MainForm").reset(); //clear form inputs
    };

    return (//default render
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
              <h2 className="headerText">Export</h2>
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
                <h2 color="white"fontWeight="bold">Asset staged for export to agent: {window.contracts.APP._address} </h2>
                <Form.Row>
                <Form.Group >
                    <Button className="buttonDisplay"
                    variant="primary"
                    type="button"
                    size="lg"
                    onClick={_exportAsset}
                  >
                    Export Asset
                    </Button>
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

export default ExportAsset;
