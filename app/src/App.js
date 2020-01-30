import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import './App.css';


var units = [
  { id: 1, name: 'Magdalenagården', latitude: 59.3150, longitude: 18.094620},
  { id: 2, name: 'Katarinagården', latitude: 59.3120, longitude: 18.09930},
  { id: 3, name: 'Nytorggården', latitude: 59.3140, longitude: 18.096920},
  { id: 4, name: 'Attendo Lignagatan', latitude: 59.3130, longitude:18.094620}
];

const options = {
  zoomControlOptions: {
    // position: google.maps.ControlPosition.RIGHT_CENTER // ,
    // ...otherOptions
  },
}

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

const divStyle = {
  background: `white`,
  border: `0px solid #ccc`,
  padding: 15
}

const onLoad = marker => {
  //console.log('marker: ', marker)
}

function MyComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    language: "sv",
  })
  const [showUnit, setShowUnit] = useState()

  function Markers() {
    return units.map(unit => {
      return (
      <Marker
        onLoad={onLoad}
        onClick={() => setShowUnit(unit.id)}
        key={unit.id}
        position={{lat: unit.latitude, lng: unit.longitude}}
        visible={true}
        title={unit.name}
        >
        {showUnit === unit.id ? 
        <InfoWindow
        position={{lat: unit.latitude, lng: unit.longitude}}
        onCloseClick={() => setShowUnit(null)}>
        <div style={divStyle}>
          <h1>
          {unit.name}
          </h1>
        </div>
        </InfoWindow> : null}
        </Marker>
      )
    })
  }

  const renderMap = () => {
    return <GoogleMap
      options={options}
      id="marker-example"
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
    >
    <Markers />
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
        Hallå
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
