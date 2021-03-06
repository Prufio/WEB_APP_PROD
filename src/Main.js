import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Web3 from "web3";
import Home from "./Home";
import HomeMobile from "./Mobile/HomeMobile";
import buildContracts from "./Resources/Contracts";
import buildWindowUtils from "./Resources/WindowUtils";
import NonCustodialComponent from "./Resources/NonCustodialComponent";
import NonCustodialUserComponent from "./Resources/NonCustodialUserComponent";
import AdminComponent from "./Resources/AdminComponent";
import AuthorizedUserComponent from "./Resources/AuthorizedUserComponent";
import NoAddressComponent from "./Resources/NoAddressComponent";
import BasicComponent from "./Resources/BasicComponent";
import ParticleBox from "./Resources/ParticleBox";
import Router from "./Router";
import Button from 'react-bootstrap/Button';
import { Twitter, GitHub, Mail, Send, Menu, Check, Settings, X, User } from 'react-feather';
import { isMobile } from "react-device-detect";
import Jdenticon from 'react-jdenticon';
import Robohash from 'react-robohash';

class Main extends Component {
  constructor(props) {
    super(props);

    this.renderContent = () => {
      if (isMobile) {
        return (
          <div>
            <HashRouter>
              <div>
                <div className="bannerForm">
                  <ul className="headerForm">
                    {window._contracts !== undefined && (
                      <nav>
                        {this.state.noAddrMenuBool === true && (<NoAddressComponent />)}
                      </nav>
                    )}
                  </ul>
                </div>
              </div>
              <div className="pageForm">
                <div>
                  <Route exact path="/" component={HomeMobile} />
                  {Router(this.state.routeRequest)}
                </div>
              </div>
              <NavLink to="/">
              </NavLink>
            </HashRouter>
          </div >
        );
      }
      return (

        <div>
          <HashRouter>

            <div className="imageForm">
              <div>
                {this.state.noAddrMenuBool === true && (
                  <button
                    className="imageButton"
                    title="Back to Home!"
                    onClick={() => { window.location.href = '/#/' }}
                  >
                    <img
                      className="downSizeLogo"
                      src={require("./Resources/PrufReadOnly.png")}
                      alt="Pruf Logo" />
                  </button>
                )}
                {this.state.assetHolderMenuBool === true && (
                  <button
                    className="imageButton"
                    title="Back to Home!"
                    onClick={() => { window.location.href = '/#/' }}
                  >
                    <img
                      className="downSizeLogo"
                      src={require("./Resources/PrufTokenMinter.png")}
                      alt="Pruf Logo" />
                  </button>
                )}
                {this.state.assetHolderUserMenuBool === true && (
                  <button
                    className="imageButton"
                    title="Back to Home!"
                    onClick={() => { window.location.href = '/#/' }}
                  >
                    <img
                      className="downSizeLogo"
                      src={require("./Resources/PrufTokenHolder.png")}
                      alt="Pruf Logo" />
                  </button>
                )}
                {this.state.assetClassHolderMenuBool === true && (
                  <button
                    className="imageButton"
                    title="Back to Home!"
                    onClick={() => { window.location.href = '/#/' }}
                  >
                    <img
                      className="downSizeLogo"
                      src={require("./Resources/PrufACAdmin.png")}
                      alt="Pruf Logo" />
                  </button>
                )}
                {this.state.authorizedUserMenuBool === true && (
                  <button
                    className="imageButton"
                    title="Back to Home!"
                    onClick={() => { window.location.href = '/#/' }}
                  >
                    <img
                      className="downSizeLogo"
                      src={require("./Resources/PrufAssetMinter.png")}
                      alt="Pruf Logo" />
                  </button>
                )}
                {this.state.basicMenuBool === true && (
                  <button
                    className="imageButton"
                    title="Back to Home!"
                    onClick={() => { window.location.href = '/#/' }}
                  >
                    <img
                      className="downSizeLogo"
                      src={require("./Resources/PrufBasic.png")}
                      alt="Pruf Logo" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <div className="bannerForm">
                <div className="hamburgerMenu">
                  <a className="hamburgerMenuContent"><Menu size={35} onClick={() => { this.hamburgerMenu() }} /></a>
                </div>
                {this.state.hamburgerMenu !== undefined && (
                  <div className="hamburgerDropdown">
                    <div className="mediaLink">
                      <a className="mediaLinkContent"><GitHub size={20} onClick={() => { window.open("https://github.com/Prufio", "_blank") }} /></a>
                      <a className="mediaLinkContent"><Mail size={20} onClick={() => { window.open("mailto:support@pruf.io", "_blank") }} /></a>
                      <a className="mediaLinkContent"><Twitter size={20} onClick={() => { window.open("https://www.twitter.com/prufteam", "_blank") }} /></a>
                      <a className="mediaLinkContent" ><Send size={20} onClick={() => { window.open("https://t.me/pruftalk", "_blank") }} /></a>
                    </div>
                    <button
                      className="imageButtonU"
                      onClick={() => { window.open("https://www.pruf.io", "_blank") }}
                    >
                      <img
                        className="imageFormU"
                        title="Find out More!"
                        src={require("./Resources/favicon pruf no bg.png")}
                        alt="Pruf U" />
                    </button>
                    <div className="siteInfoBox">
                      <h3 className="siteInfoBoxContent">
                        Website Last Updated:
                  </h3>
                      <h3 className="siteInfoBoxContent">
                        November 9, 2020
                  </h3>
                    </div>
                    <button
                      className="imageButtonUser"
                      onClick={() => { this.userMenu() }}>
                      {window.addr !== undefined && (
                      <Robohash
                        className="imageFormUser"
                        name={window.addr}
                      />
                      )} 
                      {window.addr === undefined && (
                      <User 
                        className="imageFormUser" 
                        size={48}
                      />
                      )}
                    </button>
                    <div className="hamburgerMenuLink">
                      <a className="hamburgerMenuLinkContentSettings"><Settings size={35} onClick={() => { this.settingsMenu() }} /></a>
                    </div>
                    <div>
                      {this.state.settingsMenu !== undefined && (
                        <div>
                          <div className="hamburgerDropdownSettings">
                            {this.state.assetClassHolderBool === true && this.state.assetClassHolderMenuBool === false && (
                              <Button
                                size="lg"
                                variant="toggle"
                                onClick={() => { this.toggleMenu("ACAdmin") }}
                              >
                                AC Admin Menu
                              </Button>)}

                            {this.state.IDHolderBool === false && this.state.assetHolderBool === true && this.state.assetHolderUserMenuBool === false && (
                              <Button
                                size="lg"
                                variant="toggle"
                                onClick={() => { this.toggleMenu("NCUser") }}
                              >
                                Token Holder Menu
                              </Button>
                            )}

                            {this.state.IDHolderBool === true && this.state.assetHolderMenuBool === false && (
                              <Button
                                size="lg"
                                variant="toggle"
                                onClick={() => { this.toggleMenu("NC") }}
                              >
                                Token Minter Menu
                              </Button>
                            )}

                            {this.state.routeRequest === "noAddr" && (
                              <Button
                                size="lg"
                                variant="toggle"
                                onClick={() => {
                                  alert("That doesn't direct you anywhere. Login to Web3 provider! If you do not have a Web3 provider, we recommend Metamask.io ");
                                  this.setState({ settingsMenu: undefined })
                                  window.ethereum.enable()
                                }}
                              >
                                Please Log In

                              </Button>
                            )}

                            {this.state.basicMenuBool === false && this.state.routeRequest !== "noAddr" && (
                              <Button
                                size="lg"
                                variant="toggle"
                                onClick={() => { this.toggleMenu("basic") }}
                              >
                                Basic Menu
                              </Button>)}

                            {this.state.isAuthUser === true && this.state.authorizedUserMenuBool === false && (
                              <Button
                                size="lg"
                                variant="toggle"
                                onClick={() => { this.toggleMenu("authUser") }}
                              >
                                Cusdodian Menu
                              </Button>)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {this.state.userMenu !== undefined && (
                        <div className="hamburgerDropdownUserInfo">
                          {this.state.addr === undefined && (
                            <h4>
                              Please
                              <a onClick={() => {
                                alert("That doesn't direct you anywhere. Login to Web3 provider! If you do not have a Web3 provider, we recommend Metamask.io ",
                                  this.setState({ userMenu: undefined }),
                                  window.ethereum.enable())
                              }}
                                className="userDataLink">
                                Log In
                              </a>
                              to View Balances
                            </h4>
                          )}
                          {this.state.addr > 0 && (
                            <h4>
                              Currently serving :
                              <Button
                                variant="etherscan"
                                title="Check it out on Etherscan!"
                                onClick={() => { this.setState({ userMenu: undefined }); window.open("https://kovan.etherscan.io/address/" + this.state.addr) }}>
                                {this.state.addr.substring(0, 6) + "..." + this.state.addr.substring(37, 42)}
                              </Button>
                            </h4>
                          )}
                          <br></br>
                          {this.state.ETHBalance && (
                            <h4>
                              ETH Balance : {this.state.ETHBalance.substring(0, 6)}
                            </h4>
                          )}
                          <br></br>
                          {this.state.prufBalance && (
                            <h4>
                              PRUF Balance : {this.state.prufBalance}
                            </h4>
                          )}
                          <br></br>
                          {this.state.assetClassBalance && (
                            <h4>
                              AssetClasses : {this.state.assetClassBalance}
                            </h4>
                          )}
                          <br></br>
                          {this.state.assetBalance && (
                            <h4>
                              Assets :
                              <Button
                                variant="assetDashboard"
                                title="Asset Dashboard"
                                onClick={() => { this.setState({ userMenu: undefined }); window.location.href = '/#/asset-dashboard' }}>
                                {this.state.assetBalance}
                              </Button>
                            </h4>
                          )}
                          <br></br>
                          {this.state.IDTokenBalance && (
                            <h4>
                              Token Minter : {this.state.IDTokenBalance > 0 && (<Check className="userIDBalance1" />)} {this.state.IDTokenBalance === "0" && (<X className="userIDBalance0" />)}
                            </h4>
                          )}
                          <br></br>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <ul className="headerForm">
                  {window._contracts !== undefined && (
                    <nav>
                      {this.state.noAddrMenuBool === true && (<NoAddressComponent />)}
                      {this.state.assetHolderMenuBool === true && (<NonCustodialComponent />)}
                      {this.state.assetHolderUserMenuBool === true && (<NonCustodialUserComponent />)}
                      {this.state.assetClassHolderMenuBool === true && (<AdminComponent />)}
                      {this.state.authorizedUserMenuBool === true && (<AuthorizedUserComponent />)}
                      {this.state.basicMenuBool === true && (<BasicComponent />)}
                    </nav>
                  )}
                </ul>
              </div>
            </div>
            <div className="pageForm">
              <ParticleBox/>
                <style type="text/css">
                  {`
                      .btn-primary {
                        background-color: #00a8ff;
                        color: white;
                      }
                      .btn-primary:hover {
                        background-color: #23b6ff;
                        color: white;
                      }
                      .btn-primary:focus {
                        background: #00a8ff;
                      }
                      .btn-primary:active {
                        background: #00a8ff;
                      }

                      .btn-etherscan {
                        background-color: transparent;
                        color: white;
                        margin-top: -1.6rem;
                        font-size: 1.5rem;
                        height: 1.6rem;
                        width: fit-content;
                      }
                      .btn-etherscan:hover {
                        background-color: transparent;
                        color: #00a8ff;
                      }
                      .btn-etherscan:focus {
                        background-color: transparent;
                      }
                      .btn-etherscan:active {
                        background-color: transparent;
                        border: transparent;
                      }

                      .btn-assetDashboard {
                        background-color: transparent;
                        color: white;
                        margin-top: -0.5rem;
                        // margin-right: 37rem;
                        font-size: 1.6rem;
                        width: fit-content;
                      }
                      .btn-assetDashboard:hover {
                        background-color: transparent;
                        color: #00a8ff;
                      }
                      .btn-assetDashboard:focus {
                        background-color: transparent;
                      }
                      .btn-assetDashboard:active {
                        background-color: transparent;
                        border: transparent;
                      }

                      .btn-toggle {
                        background-color: #002a40;
                        color: white;
                        height: 3rem;
                        width: 18rem;
                        margin-top: -0rem;
                        border-radius: 0;
                        font-weight: bold;
                        font-size: 1.4rem;
                        border-radius: 0rem 0.3rem 0.3rem 0rem;
                      }
                      .btn-toggle:hover {
                        background-color: #23b6ff;
                        color: white !important;
                      }
                      .btn-toggle:focus {
                        background-color: #23b6ff;
                        color: white !important;
                      }
                      .btn-toggle:active {
                        background-color: #23b6ff;
                        color: white !important;
                      }
                   `}
                </style>
              <div>
                <Route exact path="/" component={Home} />
                {Router(this.state.routeRequest)}
              </div>
            </div>
            <NavLink to="/">
            </NavLink>
          </HashRouter>


        </div >
      );
    }

    this.updateWatchDog = setInterval(() => {
      if (this.state.isAuthUser !== window.isAuthUser) {
        this.setState({ isAuthUser: window.isAuthUser })
      }

      if (window.balances !== undefined) {
        if (
          Object.values(window.balances) !==
          Object.values({ assetClass: this.state.assetClassBalance, asset: this.state.assetBalance, ID: this.state.IDTokenBalance })) {
          this.setState({
            assetClassBalance: window.balances.assetClassBalance,
            assetBalance: window.balances.assetBalance,
            IDTokenBalance: window.balances.IDTokenBalance,
            prufBalance: window.balances.prufTokenBalance,
            assetHolderBool: window.assetHolderBool,
            assetClassHolderBool: window.assetClassHolderBool,
            IDHolderBool: window.IDHolderBool,
            custodyType: window.custodyType,
            hasFetchedBalances: window.hasFetchedBalances
          })
        }
      }


      if (window.menuChange !== undefined) {
        console.log(window.menuChange)
        this.setState({ menuChange: window.menuChange })
      }

      if (this.state.menuChange !== undefined) {
        window.menuChange = undefined
        if (this.state.IDHolderBool === true) {
          window.routeRequest = "NCAdmin"
          this.setState({ routeRequest: "NCAdmin" })
          this.setState({
            assetHolderMenuBool: true,
            assetHolderUserMenuBool: false,
            basicMenuBool: false,
            assetClassHolderMenuBool: false,
            noAddrMenuBool: false,
            authorizedUserMenuBool: false
          })
          this.setState({ menuChange: undefined });
        }

        else if (this.state.IDHolderBool === false) {
          window.routeRequest = "NCUser"
          this.setState({ routeRequest: "NCUser" })
          this.setState({
            assetHolderMenuBool: false,
            assetHolderUserMenuBool: true,
            basicMenuBool: false,
            assetClassHolderMenuBool: false,
            noAddrMenuBool: false,
            authorizedUserMenuBool: false
          })
          this.setState({ menuChange: undefined });
        }
      }

      if (this.state.isACAdmin !== window.isACAdmin) {
        this.setState({ isACAdmin: window.isACAdmin })
      }

      if (this.state.custodyType !== window.custodyType) {
        this.setState({ custodyType: window.custodyType })
      }

      if (this.state.ETHBalance !== window.ETHBalance) {
        this.setState({ ETHBalance: window.ETHBalance })
      }

      if (this.state.routeRequest !== window.routeRequest && window.menuChange === undefined && window.addr !== undefined) {
        this.setState({
          basicMenuBool: true,
          assetHolderMenuBool: false,
          assetHolderUserMenuBool: false,
          assetClassHolderMenuBool: false,
          noAddrMenuBool: false,
          authorizedUserMenuBool: false,
          routeRequest: "basic"
        })
      }

      if (window.assets !== undefined) {
        if (window.assets.ids.length > 0 && Object.values(window.assets.descriptions).length === window.aTknIDs.length &&
          window.assets.names.length === 0 && this.state.buildReady === true && window.aTknIDs.length > 0) {
          if (window.ipfsCounter >= window.aTknIDs.length && window.resetInfo === false) {
            console.log("WD: rebuilding assets (Last Step)")
            this.buildAssets()
          }
        }
      }


      if (window.resetInfo === true) {
        window.hasLoadedAssets = false;
        this.setState({ buildReady: false, runWatchDog: false })
        console.log("WD: setting up assets (Step one)")
        this.setUpAssets()
        window.resetInfo = false
      }

      if (window.aTknIDs !== undefined && this.state.buildReady === false) {
        if (window.ipfsCounter >= window.aTknIDs.length && this.state.runWatchDog === true && window.aTknIDs.length > 0) {
          //console.log("turning on buildready... Window IPFS operation count: ", window.ipfsCounter)
          this.setState({ buildReady: true })
        }
      }

      else if ((this.state.buildReady === true && window.ipfsCounter < window.aTknIDs.length) ||
        (this.state.buildReady === true && this.state.runWatchDog === false)) {
        console.log("Setting buildready to false in watchdog")
        this.setState({ buildReady: false })
      }
    }, 100)

    this.toggleMenu = async (menuChoice) => {
      if (window.menuChange === undefined) {
        window.location.href = '/#/';
      }

      console.log(menuChoice)

      if (menuChoice === 'ACAdmin') {
        window.routeRequest = "ACAdmin"
        await this.setState({ routeRequest: "ACAdmin" });
        await this.setState({
          assetClassHolderMenuBool: true,
          assetHolderMenuBool: false,
          assetHolderUserMenuBool: false,
          basicMenuBool: false,
          noAddrMenuBool: false,
          authorizedUserMenuBool: false,
          settingsMenu: undefined
        })
        window.menuChange = undefined;
      }

      else if (menuChoice === 'basic') {
        window.routeRequest = "basic"
        await this.setState({ routeRequest: "basic" });
        await this.setState({
          basicMenuBool: true,
          assetHolderMenuBool: false,
          assetHolderUserMenuBool: false,
          assetClassHolderMenuBool: false,
          noAddrMenuBool: false,
          authorizedUserMenuBool: false,
          settingsMenu: undefined
        })
        window.menuChange = undefined;
      }

      else if (menuChoice === 'NC') {
        console.log(menuChoice)
        window.routeRequest = "NCAdmin"
        await this.setState({ routeRequest: "NCAdmin" })
        await this.setState({
          assetHolderMenuBool: true,
          assetHolderUserMenuBool: false,
          basicMenuBool: false,
          assetClassHolderMenuBool: false,
          noAddrMenuBool: false,
          authorizedUserMenuBool: false,
          settingsMenu: undefined
        })
        window.menuChange = undefined;
      }

      else if (menuChoice === 'NCUser') {
        console.log(menuChoice)
        window.routeRequest = "NCUser"
        await this.setState({ routeRequest: "NCUser" })
        await this.setState({
          assetHolderMenuBool: false,
          assetHolderUserMenuBool: true,
          basicMenuBool: false,
          assetClassHolderMenuBool: false,
          noAddrMenuBool: false,
          authorizedUserMenuBool: false,
          settingsMenu: undefined
        })
        window.menuChange = undefined;
      }

      else if (menuChoice === 'authUser') {
        window.routeRequest = "authUser"
        await this.setState({ routeRequest: "authUser" });
        await this.setState({
          authorizedUserMenuBool: true,
          assetHolderMenuBool: false,
          assetHolderUserMenuBool: false,
          assetClassHolderMenuBool: false,
          noAddrMenuBool: false,
          basicMenuBool: false,
          settingsMenu: undefined
        })
        window.menuChange = undefined;
      }

    }

    this.setUpAssets = async () => {
      window.hasNoAssets = false;
      window.ipfsCounter = 0;
      window.ipfsHashArray = [];
      window.assets = { descriptions: [], ids: [], assetClassNames: [], assetClasses: [], countPairs: [], statuses: [], names: [], displayImages: [] };

      window.assetClasses = { assetClassNames: [], exData: [], discounts: [], custodyTypes: [], roots: [], ids: [] }
      window.hasLoadedAssetClasses = false;
      window.assetTokenInfo = {
        assetClass: undefined,
        idxHash: undefined,
        name: undefined,
        photos: undefined,
        text: undefined,
        status: undefined,
      }

      if (window.recount === true) {
        window.aTknIDs = [];
        window.acTknIDs = [];
        if (window.balances !== undefined) window.balances.assetBalance = undefined;
        window.recount = false
        await window.utils.getETHBalance();
        return this.setUpTokenVals(true)
      }

      if (window.balances !== undefined) {
        this.setState({
          assetClassBalance: window.balances.assetClassBalance,
          assetBalance: window.balances.assetBalance,
          IDTokenBalance: window.balances.IDTokenBalance,
          prufBalance: window.balances.prufTokenBalance,
          assetHolderBool: window.assetHolderBool,
          assetClassHolderBool: window.assetClassHolderBool,
          IDHolderBool: window.IDHolderBool,
          custodyType: window.custodyType,
          hasFetchedBalances: window.hasFetchedBalances
        })
      }

      if (window.balances === undefined) {
        console.log("balances undefined, trying to get them...");
        if (window.addr === undefined) { return this.forceUpdate }
        return this.setUpTokenVals(true);
      }
      console.log("SA: In setUpAssets")

      let tempDescObj = {}
      let tempDescriptionsArray = [];
      let tempNamesArray = [];

      await window.utils.getAssetTokenInfo()
      window.assetClasses = await window.utils.getAssetClassTokenInfo()

      if (window.aTknIDs === undefined) { return }

      for (let i = 0; i < window.aTknIDs.length; i++) {
        tempDescObj["desc" + i] = []
        await this.getIPFSJSONObject(window.ipfsHashArray[i], tempDescObj["desc" + i])
      }

      console.log("Temp description obj: ", tempDescObj)

      for (let x = 0; x < window.aTknIDs.length; x++) {
        let tempArray = tempDescObj["desc" + x]
        await tempDescriptionsArray.push(tempArray)
      }

      window.assets.descriptions = tempDescriptionsArray;
      window.assets.names = tempNamesArray;
      window.assets.ids = window.aTknIDs;

      console.log("Asset setUp Complete. Turning on watchDog.")
      this.setState({ runWatchDog: true })
      console.log("window IPFS operation count: ", window.ipfsCounter)
      console.log("window assets: ", window.assets)
      console.log("Bools...", this.state.assetHolderBool, this.state.assetClassHolderBool, this.state.IDHolderBool)
      window.hasLoadedAssetClasses = true;
      //console.log(window.assets.ids, " aTkn-> ", window.aTknIDs)

    }


    this.buildAssets = () => {
      console.log("BA: In buildAssets. Window IPFS operation count: ", window.ipfsCounter)
      let tempDescArray = [];
      let emptyDesc = { photo: {}, text: {}, name: "" }

      for (let i = 0; i < window.aTknIDs.length; i++) {
        //console.log(window.assets.descriptions[i][0])
        if (window.assets.descriptions[i][0] !== undefined) {
          tempDescArray.push(JSON.parse(window.assets.descriptions[i][0]))
        }
        else {
          tempDescArray.push(emptyDesc)
        }
      }

      let tempNameArray = [];
      for (let x = 0; x < window.aTknIDs.length; x++) {
        if (tempDescArray[x].name === "" || tempDescArray[x].name === undefined) {
          tempNameArray.push("Not Available")
        }
        else {
          tempNameArray.push(tempDescArray[x].name)
        }

      }
      let identicons = [];
      for (let e = 0; e < window.aTknIDs.length; e++) {
        identicons.push(<Jdenticon size="115" value={window.aTknIDs[e]} />)
      }

      let identiconsLG = [];
      for (let e = 0; e < window.aTknIDs.length; e++) {
        identiconsLG.push(<Jdenticon size="230" value={window.aTknIDs[e]} />)
      }

      let tempDisplayArray = [];
      for (let j = 0; j < window.aTknIDs.length; j++) {
        if (tempDescArray[j].photo.DisplayImage === undefined && Object.values(tempDescArray[j].photo).length === 0) {
          tempDisplayArray.push("")
        }

        else if (tempDescArray[j].photo.DisplayImage === undefined && Object.values(tempDescArray[j].photo).length > 0) {
          tempDisplayArray.push(Object.values(tempDescArray[j].photo)[0])
        }

        else {
          tempDisplayArray.push(tempDescArray[j].photo.DisplayImage)
        }
      }

      window.assets.identiconsLG = identiconsLG;
      window.assets.identicons = identicons;
      window.assets.descriptions = tempDescArray;
      window.assets.names = tempNameArray;
      window.assets.displayImages = tempDisplayArray;
      window.hasLoadedAssets = true;
      console.log("BA: Assets after rebuild: ", window.assets)
    }

    this.setUpTokenVals = async (willSetup) => {
      window.balances = undefined
      console.log("STV: Setting up balances")

      await window.utils.determineTokenBalance()
      await console.log(window.balances)
      if (willSetup) {
        return this.setUpAssets()
      }
    }

    this.getIPFSJSONObject = (lookup, descElement) => {
      //console.log(lookup)
      window.ipfs.cat(lookup, async (error, result) => {
        if (error) {
          console.log(lookup, "Something went wrong. Unable to find file on IPFS");
          descElement.push(undefined)
          window.ipfsCounter++
          console.log(window.ipfsCounter)
        } else {
          //console.log(lookup, "Here's what we found for asset description: ", result);
          descElement.push(result)
          window.ipfsCounter++
          //console.log(window.ipfsCounter)
        }
      });
    };

    this.acctChanger = async () => {//Handle an address change, update state accordingly
      const ethereum = window.ethereum;
      const self = this;
      var _web3 = require("web3");
      _web3 = new Web3(_web3.givenProvider);
      ethereum.on("accountsChanged", function (accounts) {
        _web3.eth.getAccounts().then((e) => {
          if (window.addr !== e[0]) {
            if (e[0] === undefined || e[0] === null) {
              window.routeRequest = "noAddr"
              self.setState({
                noAddrMenuBool: true,
                assetHolderMenuBool: false,
                assetClassHolderMenuBool: false,
                basicMenuBool: false,
                authorizedUserMenuBool: false,
                hasFetchedBalances: false,
                routeRequest: "noAddr"
              })

              window.ETHBalance = undefined
              self.setState({
                assetClassBalance: undefined,
                assetBalance: undefined,
                IDTokenBalance: undefined,
                assetHolderBool: undefined,
                assetClassHolderBool: undefined,
                IDHolderBool: undefined,
                custodyType: undefined,
                hasFetchedBalances: undefined,
                ETHBalance: undefined
              })

              window.addr = "";
              window.balances = {};

            }

            else {
              window.routeRequest = "basic"
              self.setState({ routeRequest: "basic" });
              self.setState({
                basicMenuBool: true,
                assetHolderMenuBool: false,
                assetHolderUserMenuBool: false,
                assetClassHolderMenuBool: false,
                noAddrMenuBool: false,
                authorizedUserMenuBool: false,
                settingsMenu: undefined
              })
            }


            if (window.location.href !== "/#/asset-dashboard") { window.location.href = "/#" }

            window.addr = e[0];
            window.assetClass = undefined;
            window.isAuthUser = false;
            window.isACAdmin = false;
            self.setState({ addr: e[0] });
            window.recount = true;
            window.resetInfo = true;

            //self.setUpContractEnvironment(window.web3);
            console.log("///////in acctChanger////////");
          }
          else { console.log("Something bit in the acct listener, but no changes made.") }
        });
      });
    };



    this.setUpContractEnvironment = async (_web3) => {
      if (window.isSettingUpContracts) { return (console.log("Already in the middle of setUp...")) }
      window.isSettingUpContracts = true;
      console.log("Setting up contracts")
      if (window.ethereum !== undefined) {
        if (window.addr !== undefined) {
          await this.setState({
            noAddrMenuBool: false,
            assetHolderMenuBool: false,
            assetClassHolderMenuBool: false,
            basicMenuBool: true,
            authorizedUserMenuBool: false,
            hasFetchedBalances: false,
            routeRequest: "basic"
          })
        }

        else if (window.addr === undefined) {
          await this.setState({
            noAddrMenuBool: true,
            assetHolderMenuBool: false,
            assetClassHolderMenuBool: false,
            basicMenuBool: false,
            authorizedUserMenuBool: false,
            hasFetchedBalances: false,
            routeRequest: "noAddr"
          })
        }



        window._contracts = await buildContracts(_web3)


        await this.setState({ contracts: window._contracts })
        await window.utils.getContracts()

        if (window.addr !== undefined) {
          await window.utils.getETHBalance();
          await this.setUpTokenVals()
          await this.setUpAssets()
        }


        console.log("bools...", window.assetHolderBool, window.assetClassHolderBool, window.IDHolderBool)
        //console.log("Wallet balance in ETH: ", window.ETHBalance)
        window.isSettingUpContracts = false;
        return this.setState({ runWatchDog: true })
      }

      else {
        window.isSettingUpContracts = true;
        window._contracts = await buildContracts(_web3)
        await this.setState({ contracts: window._contracts })
        await window.utils.getContracts()
        window.isSettingUpContracts = false;
        return this.setState({ runWatchDog: true })
      }

    }

    //Component state declaration

    this.state = {
      IPFS: require("ipfs-mini"),
      isSTOROwner: undefined,
      isBPPOwner: undefined,
      isBPNPOwner: undefined,
      addr: undefined,
      web3: null,
      nameArray: [],
      notAvailable: "N/A",
      STOROwner: "",
      BPPOwner: "",
      BPNPOwner: "",
      APP: "",
      NP: "",
      STOR: "",
      AC_MGR: "",
      ECR_NC: "",
      ECR_MGR: "",
      AC_TKN: "",
      A_TKN: "",
      APP_NC: "",
      NP_NC: "",
      ECR2: "",
      PIP: "",
      RCLR: "",
      assetClass: undefined,
      contractArray: [],
      isAuthUser: undefined,
      hamburgerMenu: true,
      assetHolderBool: false,
      IDHolderBool: false,
      assetClassHolderBool: false,
      assetHolderMenuBool: false,
      assetHolderUserMenuBool: false,
      assetClassHolderMenuBool: false,
      basicMenuBool: false,
      authorizedUserMenuBool: false,
      hasFetchedBalances: false,
      isACAdmin: undefined,
      runWatchDog: false,
      buildReady: false,
      hasMounted: false,
      routeRequest: "basic",
    };
  }

  //component state-change events......................................................................................................

  componentDidMount() {//stuff to do when component mounts in window
    buildWindowUtils()
    let _web3, ipfs;

    window.jdenticon_config = {
      hues: [196],
      lightness: {
        color: [0.36, 0.70],
        grayscale: [0.24, 0.82]
      },
      saturation: {
        color: 0.75,
        grayscale: 0.10
      },
      backColor: "#ffffffff"
    };

    window.sentPacket = undefined;
    window.isSettingUpContracts = false;
    window.hasLoadedAssets = false;
    window.location.href = '/#/';
    window.menuChange = undefined;


    if (window.ethereum !== undefined) {
      window.costs = {}
      window.additionalElementArrays = {
        photo: [],
        text: [],
        name: ""
      }
      window.assetTokenInfo = {
        assetClass: undefined,
        idxHash: undefined,
        name: undefined,
        photos: undefined,
        text: undefined,
        status: undefined,
      }
      window.assets = { descriptions: [], ids: [], assetClassNames: [], assetClasses: [], countPairs: [], statuses: [], names: [], displayImages: [] };
      window.resetInfo = false;
      const ethereum = window.ethereum;
      _web3 = require("web3");
      _web3 = new Web3(_web3.givenProvider);
      this.setUpContractEnvironment(_web3)
      this.setState({ web3: _web3 });
      window.web3 = _web3;

      ethereum.enable()

      var _ipfs = new this.state.IPFS({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      });

      window.ipfs = _ipfs;

      _web3.eth.getAccounts().then((e) => { this.setState({ addr: e[0] }); window.addr = e[0] });
      window.addEventListener("accountListener", this.acctChanger());
      //window.addEventListener("authLevelListener", this.updateAuthLevel());
      this.setState({ hasMounted: true })
    }
    else {

      window.ipfsCounter = 0;
      _web3 = require("web3");
      _web3 = new Web3("https://api.infura.io/v1/jsonrpc/kovan");
      this.setUpContractEnvironment(_web3)
      this.setState({ web3: _web3 });
      window.web3 = _web3;

      this.setState({
        noAddrMenuBool: true,
        assetHolderMenuBool: false,
        assetClassHolderMenuBool: false,
        basicMenuBool: false,
        authorizedUserMenuBool: false,
        hasFetchedBalances: false,
        routeRequest: "noAddr"
      })

       _ipfs = new this.state.IPFS({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      });

      window.ipfs = _ipfs;

      this.setState({ hasMounted: true })
    }

    this.hamburgerMenu = async () => {
      if (this.state.hamburgerMenu === undefined) {
        this.setState({
          hamburgerMenu: true,
          userMenu: undefined,
          settingsMenu: undefined

        })
      }
      else {
        this.setState({ hamburgerMenu: undefined })
      }
    }

    this.userMenu = async () => {
      if (this.state.userMenu === undefined) {
        this.setState({
          userMenu: true,
          settingsMenu: undefined
        })
      }
      else {
        this.setState({ userMenu: undefined })
      }
    }

    this.settingsMenu = async () => {
      if (this.state.settingsMenu === undefined) {
        this.setState({
          settingsMenu: true,
          userMenu: undefined
        })
      }
      else {
        this.setState({ settingsMenu: undefined })
      }
    }

  }

  componentDidCatch(error, info) {
    console.log(info.componentStack)
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidUpdate() {//stuff to do when state updates
    if (window.addr !== undefined && !this.state.hasFetchedBalances && window.contracts > 0) {
      this.setUpContractEnvironment(window.web3);
    }


  }

  componentWillUnmount() {//stuff do do when component unmounts from the window
    console.log("unmounting component");
    window.removeEventListener("accountListener", this.acctChanger());
    //window.removeEventListener("authLevelListener", this.updateAuthLevel());
    //window.removeEventListener("ownerGetter", this.getOwner());
  }

  render(

  ) {//render continuously produces an up-to-date stateful webpage  

    if (this.state.hasError === true) {
      return (<div><h1>)-:</h1><h2> An error occoured. Ensure you are connected to metamask and reload the page. Mobile support coming soon.</h2></div>)
    }

    return this.renderContent();
  }
}

export default Main;
