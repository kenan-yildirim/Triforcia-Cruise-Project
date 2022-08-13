import { LightningElement } from 'lwc';
import performCallout from '@salesforce/apex/WebServiceLWC.performCallout';

export default class WeatherLWC extends LightningElement {

lat;
long;

mapMarkers = [];
zoomLevel = 10;
result;
value;

connectedCallback() {
    performCallout({location: 'Norfolk,VA'}).then(data => {
        this.mapMarkers = [{
            location: {
                Latitude: data['cityLat'],
                Longitude: data['cityLong']
            },
            title: data['cityName'] + ', ' + data['state'],
        }];
        this.result = data;
    }).catch(err => console.log(err));

}

get getCityName() {
    if (this.result) {
        return this.result.cityName + ' Information';
    } else {
        return '---'
    }
}

get getConvertedTemp() {
    if (this.result) {
        return Math.round((this.result.cityTemp * (9/5)) + 32) + ' deg';
    } else {
        return '--'
    }
}

get getCurrentWindSpeed() {
    if (this.result) {
        return this.result.cityWindSpeed + ' mph';
    } else {
        return '--'
    }
}

get getCurrentPrecip() {
    if (this.result) {
        return this.result.cityPrecip + " in"
    } else {
        return '--'
    }
}

get options() {
    return [
        { label: 'Arvada, CO', value: 'Arvada,CO' },
        { label: 'Austin, TX', value: 'Austin,TX' },
        { label: 'Sacramento, CA', value: 'Sacramento,CA' },
        { label: 'Raleigh, NC', value: 'Raleigh,NC' },
        { label: 'Chesapeake, VA', value: 'Chesapeake,VA' }
    ];
}

handleChange(event) {
    this.value = event.detail.value;
    performCallout({location: this.value}).then(data => {
        this.mapMarkers = [{
            location: {
                Latitude: data['cityLat'],
                Longitude: data['cityLong']
            },
            title: data['cityName'] + ', ' + data['state'],
        }];
        this.result = data;
    }).catch(err => console.log(err));
}


}