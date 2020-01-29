import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import logo from './logo.svg';
import './App.css';

const options = {
  zoomControlOptions: {
    // position: google.maps.ControlPosition.RIGHT_CENTER // ,
    // ...otherOptions
  },
}

// const infoOptions = {
//   content: "hejhejhej"
// }

function CantLoad() {
  return <p>Can't load</p>
}

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 59.312870,
  lng: 18.091620
}

const position = {
  lat: 59.312875,
  lng: 18.091620
}

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}

const onLoad = marker => {
  console.log('marker: ', marker)
}

function MyComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDXvhN_6f1TXjc-6YlFO_Exo5hN98yh23o",
    language: "swedish",
  })
  const [showInfo, setShowInfo] = useState(false);


  const onClick = () => setShowInfo(true)

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onLoad = React.useCallback(
    //   function onLoad (mapInstance) {
    //     // do something with map Instance
    //   }
    // )
    return <GoogleMap
      options={options}
      id="marker-example"
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
    >
    <Marker
      onLoad={onLoad}
      position={position}
      onClick={onClick}
    >
    <InfoWindow
      onLoad={() => showInfo}
      position={position}>
      <div style={divStyle}>
        <h1>Hem</h1>
      </div>
      </InfoWindow>
    </Marker>

  </GoogleMap>

  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <CantLoad />
}

function Test() {
  return (
    <div className="App">
      <header className="App-header">
        <MyComponent></MyComponent>
      </header>
    </div>
  );
}

function App() {
  return (
    <>
    <Test></Test>
    </>
  );
}

export default App;
