import { Location } from '../types';

export function formatDistance(distance: number) {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)} km`;
  }

  return `${distance.toFixed(0)} m`;
}

export function calcDistance(userLocation: Location, plantLocation: Location) {
  var R = 6371; // km
  var dLat = toRad(plantLocation.coordinates[1] - userLocation.coordinates[0]);
  var dLon = toRad(plantLocation.coordinates[0] - userLocation.coordinates[1]);
  var lat1 = toRad(userLocation.coordinates[0]);
  var lat2 = toRad(plantLocation.coordinates[1]);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000;
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}
