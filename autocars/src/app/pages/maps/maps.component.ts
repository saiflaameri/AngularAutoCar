import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit{

  ngOnInit(): void {

    const map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add the routing control
  const control = L.Routing.control({
    waypoints: [
      L.latLng(35.7211, 9.47104), // Starting point
      L.latLng(35.7324, 9.4774), // Destination point
    ],
    routeWhileDragging: true,
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1'
    })
  }).addTo(map);

  // Add a marker to select a position
  let marker;
  marker = L.marker([0, 0], {
    icon: L.divIcon({
      className: 'bg-primary',
      html: '<i class="bi bi-geo-alt-fill"></i>',
      iconSize: [40, 40]
    })
  }).addTo(map);

  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
  });

  }
}