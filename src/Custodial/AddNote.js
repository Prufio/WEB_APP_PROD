import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import bs58 from "bs58";

class AddNote extends Component {
  constructor(props) {
    super(props);

    //State declaration.....................................................................................................

    this.state = {
      addr: "",
      lookup: "",
      hashPath: "",
      ipfsID: "",
      costArray: [0],
      error: undefined,
      result: "",
      assetClass: undefined,
      ipfs1: "",
      ipfs2: "",
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
      isNFA: false,
      hashUrl: "",
      hasError: false,
    };
  }

  //component state-change events......................................................................................................

  render() {//render continuously produces an up-to-date stateful document  
    const self = this;

    const _accessAsset = async () => {
      const self = this;

      let idxHash = window.web3.utils.soliditySha3(
        this.state.type,
        this.state.manufacturer,
        this.state.model,
        this.state.serial,
      );

      let rgtRaw = window.web3.utils.soliditySha3(
        this.state.first,
        this.state.middle,
        this.state.surname,
        this.state.id,
        this.state.secret
      );

      var rgtHash = window.web3.utils.soliditySha3(idxHash, rgtRaw);
      
      var noteExists = await window.utils.checkNoteExists(idxHash);
      var doesExist = await window.utils.checkAssetExists(idxHash);
      var infoMatches = await window.utils.checkMatch(idxHash, rgtHash);

      if (!doesExist) {
        return alert("Asset doesnt exist! Ensure data fields are correct before submission.")
      }

      if (!infoMatches) {
        return alert("Owner data fields do not match data on record. Ensure data fields are correct before submission.")
      }

      if (noteExists){
        return alert("Asset note already exists! Cannot overwrite existing note.")
      }

      return this.setState({ 
        idxHash: idxHash,
        rgtHash: rgtHash,
        accessPermitted: true
       })

    }

    const getBytes32FromIpfsHash = (ipfsListing) => {
      return "0x" + bs58.decode(ipfsListing).slice(2).toString("hex");
    };

    const publishIPFS2Photo = async () => {
      if (document.getElementById("ipfs2File").files[0] !== undefined) {
        const self = this;
        const reader = new FileReader();
        reader.readAsArrayBuffer(document.getElementById("ipfs2File").files[0])
        reader.onloadend = async (event) => {
          const buffer = Buffer(event.target.result);
          console.log("Uploading file to IPFS...", buffer);
          await window.ipfs.add(buffer, (error, hash) => {
            if (error) {
              console.log("Something went wrong. Unable to upload to ipfs");
            } else {
              console.log("uploaded at hash: ", hash);
            }
            let _hashUrl = "https://ipfs.io/ipfs/";
            self.setState({ hashPath: getBytes32FromIpfsHash(hash) });
            console.log(_hashUrl + hash)
            self.setState({ hashUrl: _hashUrl + hash })
          });
        }
      }
      else { alert("No file chosen for upload!") }
    };

    const setIPFS2 = async () => {

      this.setState({ txStatus: false });
      this.setState({ txHash: "" });
      this.setState({ error: undefined })
      this.setState({ result: "" })
      var idxHash = this.state.idxHash;
      var rgtHash = this.state.rgtHash;

      console.log("idxHash", idxHash);
      console.log("rgtHash", rgtHash);
      console.log("addr: ", window.addr);
      

        await window.contracts.APP.methods
        .$addIpfs2Note(idxHash, rgtHash, this.state.hashPath)
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
        hashPath: "",
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
              <h2 className="headerText">Add Note</h2>
              <br></br>
              {!this.state.accessPermitted &&(
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
                <Form.Group as={Col} controlId="formGridIpfs2File">
                  <Form.File onChange={(e) => this.setState({ hashPath: "" })} size="lg" className="btn2" id="ipfs2File" />
                </Form.Group>
                </Form.Row>
                {this.state.hashPath !== "" && (
                <Form.Row>
                  <Form.Group >
                    <Button className="buttonDisplay"
                      variant="primary"
                      type="button"
                      size="lg"
                      onClick={setIPFS2}
                    >
                      Add Note
                    </Button>
                    <div className="costText"> Cost in AC {window.assetClass}: {Number(window.costs.createNoteCost) / 1000000000000000000} ETH</div>
                  </Form.Group>
                </Form.Row>
              )}
              {this.state.hashPath === "" && (
                <Form.Row>
                  <Form.Group >
                    <Button className="buttonDisplay"
                      variant="primary"
                      type="button"
                      size="lg"
                      onClick={publishIPFS2Photo}
                    >
                      Load to IPFS
                    </Button>

                  </Form.Group>
                </Form.Row>
              )}
              </>
              )}
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
                <a>
                  <img src={this.state.hashUrl} alt="" />
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

export default AddNote;
