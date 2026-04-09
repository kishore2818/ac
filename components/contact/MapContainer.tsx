'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Fix for default marker icon in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function Map() {
  const position: [number, number] = [15.8850, 74.5134] // Azam Nagar Circle, Belgaum

  useEffect(() => {
    // This is to satisfy Leaflet's internal resize logic in some browsers
    window.dispatchEvent(new Event('resize'))
  }, [])

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="font-inter">
              <strong className="text-[var(--primary)] font-rajdhani uppercase">Adler Contracts HQ</strong>
              <p className="text-xs mt-1">Plot No 1/A RS No. 43/2A, Saraf Enclave, Azam Nagar Circle, Belagavi 590010</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
