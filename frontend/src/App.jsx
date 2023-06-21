import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
// React-Map-Gl needs stylesheet to work properly, if does not have => marker, popup, ... will not shown up properly
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import { useState, useEffect } from "react";
import { format } from "timeago.js";

function App() {
    const [pins, setPins] = useState([]);
    const [currentPlaceID, setCurrentPlaceID] = useState(1);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const res = await axios.get("/pins");
                setPins([...res.data]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPins();
    }, []);

    const handleClick = (id) => {
        setCurrentPlaceID(id);
    };

    return (
        <div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                initialViewState={{
                    longitude: 17,
                    latitude: 46,
                    zoom: 4,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{ width: "100vw", height: "100vh" }}
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
                {pins.map((pin) => {
                    return (
                        <div key={pin._id}>
                            <Marker longitude={pin.long} latitude={pin.lat}>
                                <RoomIcon onClick={() => handleClick(pin._id)} style={{ fontSize: 4 * 10, color: "slateblue" }} />
                            </Marker>
                            {pin._id === currentPlaceID && (
                                <Popup longitude={pin.long} latitude={pin.lat} anchor="left" closeOnClick={false}>
                                    <div className="card">
                                        <label htmlFor="">Place</label>
                                        <h4 className="place">{pin.title}</h4>
                                        <label htmlFor="">Review</label>
                                        <p className="desc">{pin.desc}</p>
                                        <label htmlFor="">Rating</label>
                                        <div className="stars"></div>
                                        <label htmlFor="">Information</label>
                                        <span className="username">
                                            Created by <b>{pin.username}</b>
                                        </span>
                                        <span className="date">{format(pin.createdAt)}</span>
                                    </div>
                                </Popup>
                            )}
                        </div>
                    );
                })}
            </Map>
        </div>
    );
}

export default App;
