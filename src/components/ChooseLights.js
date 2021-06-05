import React, { useState } from 'react'

const ChooseLights = (props) => {
    const [checkedLights, setCheckedLights] = useState([]);

    const onChange = (e) => {
        let checked = checkedLights
        
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            checked.push(e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            let index = checked.indexOf(e.target.value)
            checked.splice(index, 1)
        }
        // update the state with the new array of options
        setCheckedLights(checked)
    }

    const mockData = {
        "1": {
            "state": {
                "on": true,
                "bri": 254,
                "hue": 7676,
                "sat": 199,
                "effect": "none",
                "xy": [
                    0.5016,
                    0.4151
                ],
                "ct": 443,
                "alert": "select",
                "colormode": "xy",
                "mode": "homeautomation",
                "reachable": true
            },
            "swupdate": {
                "state": "noupdates",
                "lastinstall": "2021-01-26T20:00:34"
            },
            "type": "Extended color light",
            "name": "Overhead 1",
            "modelid": "LCA002",
            "manufacturername": "Signify Netherlands B.V.",
            "productname": "Hue color lamp",
            "capabilities": {
                "certified": true,
                "control": {
                    "mindimlevel": 200,
                    "maxlumen": 800,
                    "colorgamuttype": "C",
                    "colorgamut": [
                        [
                            0.6915,
                            0.3083
                        ],
                        [
                            0.1700,
                            0.7000
                        ],
                        [
                            0.1532,
                            0.0475
                        ]
                    ],
                    "ct": {
                        "min": 153,
                        "max": 500
                    }
                },
                "streaming": {
                    "renderer": true,
                    "proxy": true
                }
            },
            "config": {
                "archetype": "classicbulb",
                "function": "mixed",
                "direction": "omnidirectional",
                "startup": {
                    "mode": "safety",
                    "configured": true
                }
            },
            "uniqueid": "00:17:88:01:06:ab:ca:84-0b",
            "swversion": "1.76.10",
            "swconfigid": "618854CB",
            "productid": "Philips-LCA002-4-A19ECLv6"
        },
        "2": {
            "state": {
                "on": true,
                "bri": 254,
                "hue": 7676,
                "sat": 199,
                "effect": "none",
                "xy": [
                    0.5016,
                    0.4151
                ],
                "ct": 443,
                "alert": "select",
                "colormode": "xy",
                "mode": "homeautomation",
                "reachable": true
            },
            "swupdate": {
                "state": "noupdates",
                "lastinstall": "2021-01-26T20:00:31"
            },
            "type": "Extended color light",
            "name": "Overhead 2",
            "modelid": "LCA002",
            "manufacturername": "Signify Netherlands B.V.",
            "productname": "Hue color lamp",
            "capabilities": {
                "certified": true,
                "control": {
                    "mindimlevel": 200,
                    "maxlumen": 800,
                    "colorgamuttype": "C",
                    "colorgamut": [
                        [
                            0.6915,
                            0.3083
                        ],
                        [
                            0.1700,
                            0.7000
                        ],
                        [
                            0.1532,
                            0.0475
                        ]
                    ],
                    "ct": {
                        "min": 153,
                        "max": 500
                    }
                },
                "streaming": {
                    "renderer": true,
                    "proxy": true
                }
            },
            "config": {
                "archetype": "classicbulb",
                "function": "mixed",
                "direction": "omnidirectional",
                "startup": {
                    "mode": "safety",
                    "configured": true
                }
            },
            "uniqueid": "00:17:88:01:06:ab:cd:5a-0b",
            "swversion": "1.76.10",
            "swconfigid": "618854CB",
            "productid": "Philips-LCA002-4-A19ECLv6"
        },
        "3": {
            "state": {
                "on": true,
                "bri": 254,
                "hue": 7676,
                "sat": 199,
                "effect": "none",
                "xy": [
                    0.5016,
                    0.4151
                ],
                "ct": 443,
                "alert": "select",
                "colormode": "xy",
                "mode": "homeautomation",
                "reachable": true
            },
            "swupdate": {
                "state": "noupdates",
                "lastinstall": "2021-01-26T20:00:29"
            },
            "type": "Extended color light",
            "name": "Bedside",
            "modelid": "LCA002",
            "manufacturername": "Signify Netherlands B.V.",
            "productname": "Hue color lamp",
            "capabilities": {
                "certified": true,
                "control": {
                    "mindimlevel": 200,
                    "maxlumen": 800,
                    "colorgamuttype": "C",
                    "colorgamut": [
                        [
                            0.6915,
                            0.3083
                        ],
                        [
                            0.1700,
                            0.7000
                        ],
                        [
                            0.1532,
                            0.0475
                        ]
                    ],
                    "ct": {
                        "min": 153,
                        "max": 500
                    }
                },
                "streaming": {
                    "renderer": true,
                    "proxy": true
                }
            },
            "config": {
                "archetype": "classicbulb",
                "function": "mixed",
                "direction": "omnidirectional",
                "startup": {
                    "mode": "safety",
                    "configured": true
                }
            },
            "uniqueid": "00:17:88:01:06:ab:cd:55-0b",
            "swversion": "1.76.10",
            "swconfigid": "618854CB",
            "productid": "Philips-LCA002-4-A19ECLv6"
        },
        "5": {
            "state": {
                "on": true,
                "bri": 150,
                "ct": 447,
                "alert": "select",
                "colormode": "ct",
                "mode": "homeautomation",
                "reachable": false
            },
            "swupdate": {
                "state": "noupdates",
                "lastinstall": "2020-12-21T19:34:55"
            },
            "type": "Color temperature light",
            "name": "Living Room",
            "modelid": "LTW015",
            "manufacturername": "Signify Netherlands B.V.",
            "productname": "Hue ambiance lamp",
            "capabilities": {
                "certified": true,
                "control": {
                    "mindimlevel": 1000,
                    "maxlumen": 800,
                    "ct": {
                        "min": 153,
                        "max": 454
                    }
                },
                "streaming": {
                    "renderer": false,
                    "proxy": false
                }
            },
            "config": {
                "archetype": "tableshade",
                "function": "functional",
                "direction": "omnidirectional",
                "startup": {
                    "mode": "safety",
                    "configured": true
                }
            },
            "uniqueid": "00:17:88:01:04:62:ed:f3-0b",
            "swversion": "1.50.2_r30933",
            "swconfigid": "72630961",
            "productid": "Philips-LTW015-1-A19CTv2"
        },
        "6": {
            "state": {
                "on": false,
                "bri": 1,
                "alert": "select",
                "mode": "homeautomation",
                "reachable": true
            },
            "swupdate": {
                "state": "noupdates",
                "lastinstall": "2021-01-27T19:13:24"
            },
            "type": "Dimmable light",
            "name": "Vestibule",
            "modelid": "LWA003",
            "manufacturername": "Signify Netherlands B.V.",
            "productname": "Hue white lamp",
            "capabilities": {
                "certified": true,
                "control": {
                    "mindimlevel": 5000,
                    "maxlumen": 800
                },
                "streaming": {
                    "renderer": false,
                    "proxy": false
                }
            },
            "config": {
                "archetype": "pendantround",
                "function": "functional",
                "direction": "omnidirectional",
                "startup": {
                    "mode": "safety",
                    "configured": true
                }
            },
            "uniqueid": "00:17:88:01:09:5a:a2:3f-0b",
            "swversion": "1.76.6",
            "swconfigid": "8CD2B174",
            "productid": "Philips-LWA003-1-A19DLv5"
        },
        "7": {
            "state": {
                "on": true,
                "bri": 150,
                "hue": 6291,
                "sat": 251,
                "effect": "none",
                "xy": [
                    0.5612,
                    0.4042
                ],
                "ct": 500,
                "alert": "select",
                "colormode": "xy",
                "mode": "homeautomation",
                "reachable": true
            },
            "swupdate": {
                "state": "noupdates",
                "lastinstall": "2021-05-29T03:08:27"
            },
            "type": "Extended color light",
            "name": "annas",
            "modelid": "LCA003",
            "manufacturername": "Signify Netherlands B.V.",
            "productname": "Hue color lamp",
            "capabilities": {
                "certified": true,
                "control": {
                    "mindimlevel": 200,
                    "maxlumen": 800,
                    "colorgamuttype": "C",
                    "colorgamut": [
                        [
                            0.6915,
                            0.3083
                        ],
                        [
                            0.1700,
                            0.7000
                        ],
                        [
                            0.1532,
                            0.0475
                        ]
                    ],
                    "ct": {
                        "min": 153,
                        "max": 500
                    }
                },
                "streaming": {
                    "renderer": true,
                    "proxy": true
                }
            },
            "config": {
                "archetype": "sultanbulb",
                "function": "mixed",
                "direction": "omnidirectional",
                "startup": {
                    "mode": "safety",
                    "configured": true
                }
            },
            "uniqueid": "00:17:88:01:08:7b:c9:fb-0b",
            "swversion": "1.76.6",
            "swconfigid": "598716A0",
            "productid": "Philips-LCA003-1-A19ECLv6"
        }
    }

    return (
        Object.entries(mockData).map(([key, value]) =>
            <li key={key}><input type="checkbox" value={key} onChange={onChange} /> {value.name}</li>
        )
    )
}

export default ChooseLights