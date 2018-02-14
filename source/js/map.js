function initMap() {
  var element = document.querySelector('.map');
  var options = {
    zoom: 17,
    center: {lat:59.938554 ,lng:30.32248}
  };

  var mishkaMap = new google.maps.Map(element, options);
  var mishkaMarker = new google.maps.Marker({
    position: {lat:59.938554 ,lng:30.32248},
    map: mishkaMap,
    icon: 'img/icon-map-pin.svg'
  });
}
