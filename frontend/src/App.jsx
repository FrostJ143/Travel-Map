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
    const [currentPlaceID, setCurrentPlaceID] = useState();
    const [currentUser, setCurrentUser] = useState("sang");
    const [newPlace, setNewPlace] = useState(null);
    const [viewport, setViewport] = useState({
        longitude: 17,
        latitude: 46,
        zoom: 4,
    })

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/pins");
                setPins([...res.data]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPins();
    }, []);

    const handleClick = (id, long, lat) => {
        setCurrentPlaceID(id);
        setViewport({...viewport, longitude: long, latitude: lat});
    };

    const handleAddPin = (e) => {
        const {lng, lat} = e.lngLat;
        setNewPlace({
            long: lng,
            lat
        })
    }

    return (
        <div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{ width: "80vw", height: "80vh" }}
                onDblClick={handleAddPin}
                onMove={evt => setViewport(evt.viewState)}
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
                {pins.map((pin) => {
                    return (
                        <div key={pin._id}>
                            <Marker longitude={pin.long} latitude={pin.lat}>
                                <RoomIcon onClick={() => handleClick(pin._id, pin.long, pin.lat)} style={{cursor: "pointer", fontSize: 4 * 10, color: pin.username === currentUser ? "tomato" : "slateblue"}} />
                            </Marker>
                            {console.log(pin._id === currentPlaceID)}
                            {pin._id === currentPlaceID && (
                                <Popup longitude={pin.long} latitude={pin.lat} anchor="left" onClose={() => setCurrentPlaceID(null)} closeOnClick={false}>
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
                {newPlace && (
                     <Popup longitude={newPlace.long} latitude={newPlace.lat} anchor="left" onClose={() => setNewPlace(null)}>
                     <div>
                        <form >
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder="Enter a title"/>
                            <label htmlFor="">Review</label>
                            <textarea placeholder="Say us something about this place."></textarea>
                            <label htmlFor="">Rating</label>
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button className="submitBtn" type="submit">Add Pin</button>
                        </form>
                     </div>
                 </Popup>
                )}
            </Map>
        </div>
    );
}

export default App;
