import {AfterContentInit, Component, Input, ViewChild} from '@angular/core';
import {IMarker} from "../../dto/map/i-marker";
import {IPosition} from "../../dto/map/i-position";
import Marker = google.maps.Marker;
import {} from '@types/googlemaps';

@Component({
	selector: 'h21-map',
	templateUrl: './h21-map.component.html',
	styleUrls: ['./h21-map.component.css']
})
export class H21MapComponent implements AfterContentInit {

	@ViewChild('gmap') gmapElement: any;

	private mapPromise: Promise<google.maps.Map>;
	private _mapResolver: (value?: google.maps.Map) => void;

	// google map
	map: google.maps.Map;

	//map center
	@Input() center: IPosition = {lat: 55.7, lng: 37.6};
	//zoom
	@Input() zoom: number = 5;

	// google map markers
	googleMarkers: Marker[];
	// h21 markers
	private _markers: IMarker[];

	get markers(): IMarker[] {
		return this._markers;
	}

	@Input()
	set markers(value: IMarker[]) {
		this._markers = value;
		this.clearMarkers();
		this.setMarkers();
	}

	constructor() {
		this.mapPromise = new Promise<google.maps.Map>((resolve: () => void) => {
			this._mapResolver = resolve;
		});
	}

	ngAfterContentInit() {
		this.createMap();
	}

	createMap(){
		const CENTER: google.maps.LatLng = new google.maps.LatLng(27.215556209029693, 18.45703125);
		const MAP_STYLE: google.maps.MapTypeStyle[] = [
			{
				elementType: "geometry",
				stylers: [
					{
						"color": "#F4F4F2"
					}
				]
			},
			{
				elementType: "labels.icon",
				stylers: [
					{
						"visibility": "off"
					}
				]
			},
			{
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#646363"
					}
				]
			},
			{
				elementType: "labels.text.stroke",
				stylers: [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				featureType: "administrative.land_parcel",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#ededed"
					}
				]
			},
			{
				featureType: "poi",
				elementType: "geometry",
				stylers: [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				featureType: "poi",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#757575"
					}
				]
			},
			{
				featureType: "poi.park",
				elementType: "geometry",
				stylers: [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				featureType: "road",
				elementType: "geometry",
				stylers: [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				featureType: "road.arterial",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#757575"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [
					{
						"color": "#dadada"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#616161"
					}
				]
			},
			{
				featureType: "road.local",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				featureType: "transit.line",
				elementType: "geometry",
				stylers: [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				featureType: "transit.station",
				elementType: "geometry",
				stylers: [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [
					{
						"color": "#CAD2D3"
					}
				]
			},
			{
				featureType: "water",
				elementType: "labels.text.fill",
				stylers: [
					{
						"color": "#9e9e9e"
					}
				]
			}
		];

		let mapProp = {
			center: CENTER,
			zoom: 3,
			disableDefaultUI: true,
			minZoom: 3,
			scaleControl: true,
			draggableCursor: 'default',
			disableDoubleClickZoom: true,
			styles: MAP_STYLE
		};

		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

		this._mapResolver(this.map);
	}

	clearMarkers(): void {
		if (this.googleMarkers) {
			this.googleMarkers.forEach(e => e.setMap(null));
		}
		this.googleMarkers = [];
	}

	addMarker(marker: IMarker): void {
		this.mapPromise.then(e => {
			let value = new google.maps.Marker({
				position: marker.position,
				title: marker.title,
				map: e
			});
			this.googleMarkers.push(value);
		});
	}

	setMarkers(): void {
		if (this.markers && this.markers.length > 0) {
			this.markers.forEach(e => this.addMarker(e));
		}
	}
}
