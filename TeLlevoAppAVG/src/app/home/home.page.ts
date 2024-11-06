import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  username: string = 'Usuario';
  map: mapboxgl.Map | undefined;
  userLocation: [number, number] | undefined;
  destination: [number, number] | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private auth: AuthenticatorService
  ) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4dmFyZ2FzcCIsImEiOiJjbTMzZW94MWcwNGQ3Mmxwd29oYnk3YWR2In0.s3_-2Y8bW0S8JKfffDT_8A';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  async ngAfterViewInit() {
    this.userLocation = await this.getCurrentLocation();
    this.loadMap();
  }

  async getCurrentLocation(): Promise<[number, number]> {
    const position = await Geolocation.getCurrentPosition();
    return [position.coords.longitude, position.coords.latitude];
  }

  loadMap() {
    if (this.userLocation) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.userLocation,
        zoom: 14
      });

      // Añadir marcador en la ubicación del usuario
      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(this.userLocation)
        .addTo(this.map);

      // Espera a que el usuario seleccione un destino en el mapa
      this.map.on('click', (event) => {
        this.destination = [event.lngLat.lng, event.lngLat.lat];
        this.addDestinationMarker();
        this.drawRoute();
      });
    }
  }

  addDestinationMarker() {
    if (this.destination) {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(this.destination)
        .addTo(this.map!);
    }
  }

  drawRoute() {
    if (this.userLocation && this.destination && this.map) {
      // Definir los datos de la ruta con el tipo explícito 'FeatureCollection'
      const routeData: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [this.userLocation, this.destination]
            },
            properties: {}  // Agregar 'properties' como un objeto vacío
          }
        ]
      };
  
      if (this.map.getSource('route')) {
        (this.map.getSource('route') as mapboxgl.GeoJSONSource).setData(routeData);
      } else {
        this.map.addSource('route', {
          type: 'geojson',
          data: routeData
        });
  
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#3880ff', 'line-width': 4 }
        });
      }
    }
  }

  programarViaje() {
    this.router.navigate(['/programar-viaje']);
  }

  buscarViaje() {
    this.router.navigate(['/buscar-viaje']);
  }

  comenzarViaje() {
    this.router.navigate(['/comenzar-viaje']);
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
