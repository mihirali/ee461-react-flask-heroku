import { areArraysEqual } from '@mui/base';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

async function joinProjectBackend(param) {
  const url = '/joinProject/' + param;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  alert(data);
}

async function leaveProjectBackend(param) {
  const url = '/leaveProject/' + param;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  alert(data);
}

async function checkInBackend(id, qty) {
  const url = '/checkIn/' + id + '/' + qty;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  alert(data);
}

async function checkOutBackend(id, qty) {
  const url = '/checkOut/' + id + '/' + qty;
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
  alert(data);
}


const options = [
    {
        label: "Select product...",
        value: "Select product..."
    },
    {
        label: "[HW] CPU",
        value: "[HW] CPU"
    },
    {
        label: "[HW] GPU",
        value: "[HW] GPU"
    },
    {
        label: "[HW] Power Supply",
        value: "[HW] Power Supply"
    },
    {
        label: "[PER] Gaming Mouse",
        value: "[PER] Gaming Mouse"
    },
    {
        label: "[PER] Gaming Headset",
        value: "[PER] Gaming Headset"
    },
    {
        label: "[PER] Gaming Keyboard",
        value: "[PER] Gaming Keyboard"
    },
    {
        label: "[DEC] RGB Lights",
        value: "[DEC] RGB Lights"
    },
    {
        label: "[DEC] Monitor Stand",
        value: "[DEC] Monitor Stand"
    },
    {
        label: "[DEC] Keyboard Mat",
        value: "[DEC] Keyboard Mat"
    }
]

// ===================================================================================================================================================

class SingleProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: props.projectName,
            qty: 0,
            numCheckouts: 0,

            // joinButton: "Join",
            // isJoined: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    handleInput(event) {
        console.log("Quantity chosen.");
        this.setState({qty: event.target.value});
    }
    
    handleCheckOut() {
        console.log("Item(s) checked out.");
        this.setState({numCheckouts: this.state.numCheckouts + this.state.qty});
        checkOutBackend(this.state.projectName, this.state.qty);
    }

    handleCheckIn() {
      console.log("Item(s) checked in.");
      this.setState({numCheckouts: this.state.numCheckouts - this.state.qty});
      checkInBackend(this.state.projectName, this.state.qty);
    }

    handleJoin() {
        console.log("Joining project.");
        // let button = this.state.joinButton;
        // button = this.state.isJoined ? "Join" : "Leave";
        // this.setState({
        //     joinButton: button,
        //     isJoined: !this.state.isJoined
        // });
        joinProjectBackend(this.state.projectName);
    }

    handleLeave() {
      console.log("Leaving project.");
      leaveProjectBackend(this.state.projectName);
  }
    
    render() {
        return (
            <div>
                <h2>{this.state.projectName}</h2>
                <table> 
                    <tr>

                        <td>
                          <button
                          onClick = {this.handleJoin} 
                          className="input"
                          >
                              <b>Join</b>
                          </button>
                        </td>

                        <td>
                          <button
                          onClick = {this.handleLeave} 
                          className="input"
                          >
                              <b>Leave</b>
                          </button>
                        </td>

                        <td>
                              <p>
                                HWSet: {this.state.numCheckouts} / 100
                              </p>
                        </td>

                        <td>
                            <form>

                                <input
                                // value = {this.state.quantity}
                                onChange={this.handleInput}
                                className="input" type="text" placeholder="Enter quantity"
                                />

                                <button
                                onClick={this.handleCheckIn}
                                className="input"
                                >
                                  Checkin
                                </button>

                                <button
                                onClick={this.handleCheckOut}
                                className="input"
                                >
                                  Checkout
                                </button>
                            </form>
                        </td>

                    </tr> 
                </table>
            </div>
        );
    }
}

class Projects extends React.Component {

    renderProject(projectName) {
        return (
            <SingleProject
                projectName = {projectName}
            />
        )
    }

    render() {
        return (
            <div>
                <h1 className="page-title">My Projects</h1>
                <div className="single-project">
                    {this.renderProject("MyProject1")}
                </div>
                <div className="single-project">
                    {this.renderProject("MyProject2")}
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="project-panel">
                    <Projects />
                </div>
            </div>
        );
    }
}

// ===================================================================================================================================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
