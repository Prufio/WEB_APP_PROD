import React, { Component } from "react";
import Particles from 'react-particles-js';



class ParticleBox extends Component {

    render() {//render continuously produces an up-to-date stateful document  


        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "110%",
                    height: "100%",
                }}
            >
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 110
                            },
                            "size": {
                                "value": 4
                            }
                        },
                        "interactivity": {
                            // "detect_on": "window",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "attract"
                                },
                                // "onclick": { "enable": true, "mode": "push" }
                            }
                        }
                    }} />
            </div>
        );

    }
}

export default ParticleBox;