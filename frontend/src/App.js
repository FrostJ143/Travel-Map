import Map, { GeolocateControl, Marker } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room"
// React-Map-Gl needs stylesheet to work properly, if does not have => marker, popup, ... will not shown up properly
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 17,
          latitude: 46,
          zoom: 3.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width: "100vw", height: "100vh"}}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker longitude={2.294694} latitude={48.858093}>
          <RoomIcon />
        </Marker>
      </Map>
    </div>
  );
}


export default App;
