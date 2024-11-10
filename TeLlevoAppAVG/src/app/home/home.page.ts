import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';
import mapboxgl from 'mapbox-gl';
import { Platform } from '@ionic/angular';
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
    private auth: AuthenticatorService,
    private platform: Platform
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

  async requestLocationPermission() {
    try {
      if (this.platform.is('hybrid')) {
        const permission = await Geolocation.requestPermissions();

        if (permission.location === 'granted') {
          console.log('Permiso de ubicación concedido en dispositivo móvil');
          this.userLocation = await this.getCurrentLocation();
          this.loadMap();
        } else {
          console.log('Permiso de ubicación denegado en dispositivo móvil');
        }
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = [position.coords.longitude, position.coords.latitude];
            console.log('Permiso de ubicación concedido en la web');
            this.loadMap();
          },
          (error) => {
            console.error('Permiso de ubicación denegado en la web:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error solicitando permiso de ubicación:', error);
    }
  }

  async ngAfterViewInit() {
    await this.requestLocationPermission();
  }

  async getCurrentLocation(): Promise<[number, number]> {
    if (this.platform.is('hybrid')) {
      const position = await Geolocation.getCurrentPosition();
      return [position.coords.longitude, position.coords.latitude];
    } else {
      return [0, 0];
    }
  }

  loadMap() {
    if (this.userLocation) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.userLocation,
        zoom: 14
      });

      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(this.userLocation)
        .addTo(this.map);

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
      const routeData: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [this.userLocation, this.destination]
            },
            properties: {}
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
