

import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLeafletContext } from '@react-leaflet/core'
import { Icon } from 'leaflet'
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
import { useMapEvents } from "react-leaflet";
import * as GeoSearch from 'leaflet-geosearch';

export default function MapCont(props: any) {
  const [loadSearch, setLoadSearch] = useState<number>(0)


  let DefaultIcon = L.icon({
    iconUrl: '/assets/svg/location.svg',
    iconSize: new L.Point(40, 50),
  });
  L.Marker.prototype.options.icon = DefaultIcon;



  return (
    <MapContainer
      id="map"
      center={props.position != null ? props.position : [24.0937676, 53.4281644]}
      zoom={13}
      // scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.position != null ? props.position : [24.0937676, 53.4281644]} />
      {props.enableChangeMarker &&
        <DrogMap setPosition={props.setPosition} />
      }
      <Search loadSearch={loadSearch} setLoadSearch={setLoadSearch} />
    </MapContainer>
  )
}



export function DrogMap(props: any) {
  useMapEvents({
    move: (e) => {
      props.setPosition([e.target.getCenter().lat, e.target.getCenter().lng])
    }
  });
  return null
}


export function Search(props: any) {
  props.setLoadSearch(1)
  const map = useMap()
  useEffect(() => {
    if (props && props.loadSearch == 0) {
      //@ts-ignore
      const search = new GeoSearch.GeoSearchControl({
        style: 'bar',
        provider: new GeoSearch.OpenStreetMapProvider({

        }),
        showMarker: false,
      });
      map.addControl(search);

    }
  }, [props.loadSearch]) 

  return null

}
