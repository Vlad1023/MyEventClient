import jwt_decode from "jwt-decode";
import api from '@api';
import {parseErrorObj} from '@sharedFunctions';
export default {
    namespaced: true,
    state: function(){
        return {
            latitude: 0,
            longitude: 0,
            locationAdress: "",
            locationAdressShort: "",

            status: '',

            errors: []
        }
    },
    getters: {
        getFormattedLocation(state) {
            return {lat: state.latitude, lng: state.longitude}
          },
        getLocation(state) {
            return {Latitude: state.latitude, Longitude: state.longitude}
          },
    },
    mutations: {
        setLocationCoordinates (state, coordinates) {
            state.latitude = coordinates.latitude;
            state.longitude = coordinates.longitude;
        },
        setLocationAdress (state, locationAdress){
            state.locationAdress = locationAdress
        },
        setLocationAdressShort (state, locationAdressShort){
            state.locationAdressShort = locationAdressShort
        }
    },
    actions: {

    }
  };