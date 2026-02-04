// TypeScript declarations for Google Maps 3D API
// These extend the google.maps namespace with 3D-specific types

declare namespace google.maps {
  // Map3DElement - The main 3D map component
  interface Map3DElement extends HTMLElement {
    center: LatLngAltitude | LatLngAltitudeLiteral;
    heading: number;
    tilt: number;
    range: number;
    defaultLabelsDisabled: boolean;
    
    // Camera animation methods
    flyCameraTo(options: FlyToOptions): void;
    flyCameraAround(options: FlyAroundOptions): void;
  }

  interface LatLngAltitude {
    lat: number;
    lng: number;
    altitude: number;
  }

  interface LatLngAltitudeLiteral {
    lat: number;
    lng: number;
    altitude: number;
  }

  interface CameraOptions {
    center: LatLngAltitudeLiteral;
    tilt?: number;
    heading?: number;
    range?: number;
  }

  interface FlyToOptions {
    endCamera: CameraOptions;
    durationMillis?: number;
  }

  interface FlyAroundOptions {
    camera: CameraOptions;
    durationMillis?: number;
    rounds?: number;
  }

  // Marker3DElement - 3D markers
  interface Marker3DElement extends HTMLElement {
    position: LatLngAltitude | LatLngAltitudeLiteral | string;
    altitudeMode: 'absolute' | 'clamp-to-ground' | 'relative-to-ground' | 'relative-to-mesh';
    extruded: boolean;
    label: string;
    sizePreserved: boolean;
    zIndex: number;
  }

  // Marker3DInteractiveElement - Interactive 3D markers with click events
  interface Marker3DInteractiveElement extends Marker3DElement {
    // Inherits all Marker3DElement properties
  }

  // Polygon3DElement - 3D polygons for mine boundaries
  interface Polygon3DElement extends HTMLElement {
    altitudeMode: 'absolute' | 'clamp-to-ground' | 'relative-to-ground' | 'relative-to-mesh';
    drawsOccludedSegments: boolean;
    extruded: boolean;
    fillColor: string;
    fillOpacity: number;
    geodesic: boolean;
    innerCoordinates: LatLngAltitudeLiteral[][] | string;
    outerCoordinates: LatLngAltitudeLiteral[] | string;
    strokeColor: string;
    strokeOpacity: number;
    strokeWidth: number;
    zIndex: number;
  }

  // Polyline3DElement - 3D polylines
  interface Polyline3DElement extends HTMLElement {
    altitudeMode: 'absolute' | 'clamp-to-ground' | 'relative-to-ground' | 'relative-to-mesh';
    coordinates: LatLngAltitudeLiteral[] | string;
    drawsOccludedSegments: boolean;
    extruded: boolean;
    geodesic: boolean;
    strokeColor: string;
    strokeOpacity: number;
    strokeWidth: number;
    zIndex: number;
  }
}

// Extend HTMLElementTagNameMap for JSX support
declare global {
  interface HTMLElementTagNameMap {
    'gmp-map-3d': google.maps.Map3DElement;
    'gmp-marker-3d': google.maps.Marker3DElement;
    'gmp-marker-3d-interactive': google.maps.Marker3DInteractiveElement;
    'gmp-polygon-3d': google.maps.Polygon3DElement;
    'gmp-polyline-3d': google.maps.Polyline3DElement;
  }
}

// For React JSX support
declare namespace JSX {
  interface IntrinsicElements {
    'gmp-map-3d': React.DetailedHTMLProps<React.HTMLAttributes<google.maps.Map3DElement> & {
      center?: string;
      heading?: string | number;
      tilt?: string | number;
      range?: string | number;
      'default-labels-disabled'?: boolean;
    }, google.maps.Map3DElement>;
    'gmp-marker-3d': React.DetailedHTMLProps<React.HTMLAttributes<google.maps.Marker3DElement> & {
      position?: string;
      'altitude-mode'?: 'absolute' | 'clamp-to-ground' | 'relative-to-ground' | 'relative-to-mesh';
      extruded?: boolean;
      label?: string;
    }, google.maps.Marker3DElement>;
    'gmp-marker-3d-interactive': React.DetailedHTMLProps<React.HTMLAttributes<google.maps.Marker3DInteractiveElement> & {
      position?: string;
      'altitude-mode'?: 'absolute' | 'clamp-to-ground' | 'relative-to-ground' | 'relative-to-mesh';
      extruded?: boolean;
      label?: string;
    }, google.maps.Marker3DInteractiveElement>;
    'gmp-polygon-3d': React.DetailedHTMLProps<React.HTMLAttributes<google.maps.Polygon3DElement> & {
      'altitude-mode'?: 'absolute' | 'clamp-to-ground' | 'relative-to-ground' | 'relative-to-mesh';
      'draws-occluded-segments'?: boolean;
      extruded?: boolean;
      'fill-color'?: string;
      'fill-opacity'?: string | number;
      geodesic?: boolean;
      'outer-coordinates'?: string;
      'stroke-color'?: string;
      'stroke-opacity'?: string | number;
      'stroke-width'?: string | number;
    }, google.maps.Polygon3DElement>;
  }
}

export {};
