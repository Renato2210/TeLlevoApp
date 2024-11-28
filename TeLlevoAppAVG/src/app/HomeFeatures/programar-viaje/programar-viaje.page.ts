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
  horario: string = '';
  map: mapboxgl.Map | undefined;
  marker: mapboxgl.Marker | undefined;
  userLocation: [number, number] | undefined;
  destination: [number, number] | undefined;

  constructor(
    private router: Router, 
    private http: HttpClient
  ) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4dmFyZ2FzcCIsImEiOiJjbTMzZW94MWcwNGQ3Mmxwd29oYnk3YWR2In0.s3_-2Y8bW0S8JKfffDT_8A';
  }

  ngOnInit() {
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
  
    
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(center)
      .addTo(this.map);
  
    
    this.map.on('click', (event) => {
      const lngLat = event.lngLat;
      this.destino = `${lngLat.lat}, ${lngLat.lng}`;
      this.addDestinationMarker(lngLat);
  
      
      if (this.userLocation) {
        this.calculateRoute(this.userLocation, [lngLat.lng, lngLat.lat]);
      } else {
        console.error('Ubicación del usuario no definida');
      }
    });
  }

  addDestinationMarker(lngLat: { lng: number, lat: number }) {
    if (this.map) {
      
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker.destination');
      existingMarkers.forEach(marker => marker.remove());
  
      
      const destinationLngLat = new mapboxgl.LngLat(lngLat.lng, lngLat.lat);
  
      
      new mapboxgl.Marker({ 
        color: 'red', 
        className: 'destination' 
      })
        .setLngLat(destinationLngLat) 
        .addTo(this.map);
    }
  }

  
  searchAddress() {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.destino)}.json?access_token=${mapboxgl.accessToken}`;
  
    this.http.get<any>(geocodeUrl).subscribe(response => {
      if (response.features.length > 0) {
        const coordinates = response.features[0].center; 
        this.destination = [coordinates[0], coordinates[1]];
        this.addDestinationMarker({ lng: coordinates[0], lat: coordinates[1] }); 
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

  drawRoute(route: any) {
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
    }
  }

  mostrarUbicacion() {
    console.log('Dirección de destino seleccionada:', this.destino);
  }

  fijarPrecio() {
    if (this.precio === null || this.precio <= 0) {
        console.error('El precio debe ser un valor positivo.');
        alert('El precio debe ser un valor positivo.');
        return;
    }

    if (this.precio > 50000) {
        console.error('El precio no puede exceder los 50.000.');
        alert('El precio no puede exceder los 50.000.');
        return;
    }

    console.log('Destino:', this.destino);
    console.log('Precio:', this.precio);
    console.log('Capacidad:', this.capacidad);
    console.log('Horario:', this.horario);

    const data = {
        destino: this.destino,
        precio: this.precio,
        capacidad: this.capacidad,
        horario: this.horario,
    };

    this.http.post('http://localhost:3000/viajes', data).subscribe(
        response => {
            console.log('Viaje programado con éxito', response);
            alert('Viaje programado con éxito.');
            this.router.navigate(['/home']);
        }, 
        error => {
            console.error('Error al guardar el viaje', error);
            alert('Error al guardar el viaje.');
        }
    );

    this.router.navigate(['/comenzar-viaje']);
}

  cancelar() {
    this.router.navigate(['/home']);
  }
}
