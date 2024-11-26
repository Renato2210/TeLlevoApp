import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  destino: string = '';
  precio: number = 0;
  capacidad: number = 0;
  map: mapboxgl.Map | undefined;
  marker: mapboxgl.Marker | undefined;
  userLocation: [number, number] | undefined;
  destination: [number, number] | undefined;

  constructor(
    private router: Router, 
    private http: HttpClient
  ) {
    // Configurar token de Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4dmFyZ2FzcCIsImEiOiJjbTMzZW94MWcwNGQ3Mmxwd29oYnk3YWR2In0.s3_-2Y8bW0S8JKfffDT_8A';
  }

  ngOnInit() {
    // Método de inicialización vacío
  }

  ngAfterViewInit() {
    // Inicializar mapa después de que la vista esté completamente cargada
    this.initializeMap();
  }

  initializeMap() {
    // Coordenadas predeterminadas
    const defaultLocation: [number, number] = [-74.5, 40];

    // Intentar obtener ubicación actual
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Éxito en la geolocalización
        this.userLocation = [
          position.coords.longitude, 
          position.coords.latitude
        ];
        this.createMap(this.userLocation);
      },
      (error) => {
        // Error en la geolocalización, usar ubicación predeterminada
        console.warn('Error de geolocalización:', error);
        this.createMap(defaultLocation);
      }
    );
  }

  createMap(center: [number, number]) {
    // Verificar si el contenedor del mapa existe
    if (!this.mapContainer?.nativeElement) {
      console.error('Contenedor del mapa no encontrado');
      return;
    }
  
    // Crear instancia del mapa
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 14
    });
  
    // Añadir control de navegación
    this.map.addControl(new mapboxgl.NavigationControl());
  
    // Añadir marcador de ubicación inicial
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(center)
      .addTo(this.map);
  
    // Manejar clics en el mapa
    this.map.on('click', (event) => {
      const lngLat = event.lngLat;
      this.destino = `${lngLat.lat}, ${lngLat.lng}`;
      this.addDestinationMarker(lngLat);
  
      // Verificar si this.userLocation está definido antes de usarlo
      if (this.userLocation) {
        this.calculateRoute(this.userLocation, [lngLat.lng, lngLat.lat]);
      } else {
        console.error('Ubicación del usuario no definida');
      }
    });
  }

  addDestinationMarker(lngLat: { lng: number, lat: number }) {
    if (this.map) {
      // Eliminar marcadores de destino anteriores
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker.destination');
      existingMarkers.forEach(marker => marker.remove());
  
      // Crear un objeto LngLat con las coordenadas recibidas
      const destinationLngLat = new mapboxgl.LngLat(lngLat.lng, lngLat.lat);
  
      // Añadir el marcador de destino
      new mapboxgl.Marker({ 
        color: 'red', 
        className: 'destination' 
      })
        .setLngLat(destinationLngLat) // Utilizar el objeto LngLat aquí
        .addTo(this.map);
    }
  }

  // Función para buscar la dirección
  searchAddress() {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.destino)}.json?access_token=${mapboxgl.accessToken}`;
  
    this.http.get<any>(geocodeUrl).subscribe(response => {
      if (response.features.length > 0) {
        const coordinates = response.features[0].center; // [longitud, latitud]
        this.destination = [coordinates[0], coordinates[1]];
        this.addDestinationMarker({ lng: coordinates[0], lat: coordinates[1] });
  
        // Verificar si this.userLocation está definido antes de usarlo
        if (this.userLocation) {
          this.calculateRoute(this.userLocation, this.destination);
        } else {
          console.error('Ubicación del usuario no definida');
        }
      } else {
        console.error('Dirección no encontrada');
      }
    }, error => {
      console.error('Error al obtener la dirección', error);
    });
  }

  // Función para calcular la ruta
  calculateRoute(start: [number, number], end: [number, number]) {
    if (!start || !end) return;

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    this.http.get<any>(directionsUrl).subscribe(response => {
      if (response.routes.length > 0) {
        const route = response.routes[0].geometry.coordinates;
        this.drawRoute(route);
      } else {
        console.error('No se pudo calcular la ruta');
      }
    }, error => {
      console.error('Error al obtener la ruta', error);
    });
  }

  // Función para dibujar la ruta en el mapa
  drawRoute(route: any) {
    if (this.map) {
      // Limpiar rutas anteriores
      const existingRoutes = this.map.getSource('route');
      if (existingRoutes) {
        this.map.removeSource('route');
        this.map.removeLayer('route');
      }
  
      // Dibujar la nueva ruta
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: route
          },
          properties: {}  // Agregar una propiedad vacía
        }
      });
  
      // Agregar la capa para la ruta
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#FF0000', // Color de la línea (puedes cambiarlo)
          'line-width': 4         // Grosor de la línea
        }
      });
    }
  }

  mostrarUbicacion() {
    console.log('Dirección de destino seleccionada:', this.destino);
  }

  fijarPrecio() {
    console.log('Destino:', this.destino);
    console.log('Precio:', this.precio);
    console.log('Capacidad:', this.capacidad);

    // Preparar datos para enviar al servidor
    const data = {
      destino: this.destino,
      precio: this.precio,
      capacidad: this.capacidad,
    };

    // Enviar datos al servidor
    this.http.post('http://localhost:3000/viajes', data).subscribe(
      response => {
        console.log('Viaje programado con éxito', response);
        this.router.navigate(['/home']);
      }, 
      error => {
        console.error('Error al guardar el viaje', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
