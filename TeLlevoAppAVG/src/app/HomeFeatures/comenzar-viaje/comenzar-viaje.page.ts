import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-comenzar-viaje',
  templateUrl: './comenzar-viaje.page.html',
  styleUrls: ['./comenzar-viaje.page.scss'],
})
export class ComenzarViajePage implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  destino: string = '';
  precio: number = 0;
  capacidad: number = 0;
  horario: string = '';
  map: mapboxgl.Map | undefined;
  routeCoordinates: [number, number][] = [];
  userLocation: [number, number] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4dmFyZ2FzcCIsImEiOiJjbTMzZW94MWcwNGQ3Mmxwd29oYnk3YWR2In0.s3_-2Y8bW0S8JKfffDT_8A';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.destino = params['destino'] || '';
      this.precio = params['precio'] || 0;
      this.capacidad = params['capacidad'] || 0;
      this.horario = params['horario'] || '';
      this.routeCoordinates = JSON.parse(params['ruta'] || '[]');
    });
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const defaultLocation: [number, number] = [-74.5, 40];

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = [
          position.coords.longitude,
          position.coords.latitude
        ];
        this.createMap(this.userLocation);
      },
      (error) => {
        console.warn('Error de geolocalización:', error);
        this.createMap(defaultLocation);
      }
    );
  }

  createMap(center: [number, number]) {
    if (!this.mapContainer?.nativeElement) {
      console.error('Contenedor del mapa no encontrado');
      return;
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 14
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    if (this.userLocation) {
      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(this.userLocation)
        .addTo(this.map);
    }

    if (this.routeCoordinates.length > 0) {
      this.drawRoute(this.routeCoordinates);
    } else if (this.userLocation && this.destino) {
      this.fetchDestinationCoordinates(this.destino, (coordinates) => {
        if (coordinates) {
          this.calculateRoute(this.userLocation!, coordinates);
        }
      });
    }
  }

  fetchDestinationCoordinates(address: string, callback: (coordinates: [number, number] | null) => void) {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`;

    this.http.get<any>(geocodeUrl).subscribe(response => {
      if (response.features.length > 0) {
        const coordinates: [number, number] = [
          response.features[0].center[0],
          response.features[0].center[1]
        ];
        callback(coordinates);
      } else {
        console.error('Dirección no encontrada');
        callback(null);
      }
    }, error => {
      console.error('Error al obtener la dirección', error);
      callback(null);
    });
  }

  calculateRoute(start: [number, number], end: [number, number]) {
    if (!start || !end) return;

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    this.http.get<any>(directionsUrl).subscribe(response => {
      if (response.routes.length > 0) {
        const route = response.routes[0].geometry.coordinates;
        this.routeCoordinates = route;
        this.drawRoute(route);
      } else {
        console.error('No se pudo calcular la ruta');
      }
    }, error => {
      console.error('Error al obtener la ruta', error);
    });
  }

  drawRoute(route: [number, number][]) {
    if (this.map) {
      const existingRoutes = this.map.getSource('route');
      if (existingRoutes) {
        this.map.removeSource('route');
        this.map.removeLayer('route');
      }

      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: route
          },
          properties: {}
        }
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#FF0000',
          'line-width': 4
        }
      });

      const destination = route[route.length - 1];
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(destination)
        .addTo(this.map);
    }
  }

  cancelarViaje() {
    this.router.navigate(['/home']);
  }
}
