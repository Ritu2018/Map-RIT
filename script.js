var map;
/*Following centers he map to RIT Entance Gate at start*/
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom:18,
          center: new google.maps.LatLng(9.576013, 76.622015),
          mapTypeId: 'roadmap'
        });
/*Addition of ICONS for each dept.*/
var iconBase = "file:///D:/Akhi/web/googlemaps/images/";
        var icons = {
          parking: {
            icon: iconBase + 'Parking.png'
          },
          ec: {
            icon: iconBase+"ECE.png"
          },
          mec: {
            icon: iconBase + 'ME.png'
          },
             eee: {
            icon: iconBase + 'EEE.png'
          },
             cs: {
            icon: iconBase + 'CSE.png'
          },
             civil: {
            icon: iconBase + 'CE.png'
          }
        };
/*THE FOLLOWING IS AN INFOBAR THAT CCONSISTS OF DEPT FULL NAME AND EVENTS UNDER THERE///
HAS TO BE MODIFIED WITH PROPER VALUES IN PLACE FOR EVENTS */
var contentStringEC='<h3>ELectronics & Communication Dept</h3><ul>Events<li>Blah</li><li>Blah</li></ul>';
var contentStringCS='<h3>Computer Science Dept</h3><ul>Events<li>Blah</li><li>Blah</li></ul>';
var contentStringME='<h3>Mechanical Dept</h3><ul>Events<li>Blah</li><li>Blah</li></ul>';
var contentStringEEE='<h3>Electrical & Electronics Dept</h3><ul>Events<li>Blah</li><li>Blah</li></ul>';
var contentStringCE='<h3>Civil & B.Arch Dept</h3><ul>Events<li>Blah</li><li>Blah</li></ul>';

var features=[
{
            position: new google.maps.LatLng(9.578933, 76.624034),
            type: 'ec',
            title: 'Events',
            infowindow: new google.maps.InfoWindow({content: contentStringEC})
          },
          {
            position: new google.maps.LatLng(9.579351, 76.621922),
            type: 'cs',
            title: 'Events',
            infowindow: new google.maps.InfoWindow({content: contentStringCS})
          },
             {
            position: new google.maps.LatLng(9.579912, 76.624231),
            type: 'eee',
            title: 'Events',
            infowindow:new google.maps.InfoWindow({content: contentStringEEE})
          },
          {
            position: new google.maps.LatLng(9.579798, 76.623546),
            type: 'mec',
            title: 'Events',
            infowindow:new google.maps.InfoWindow({content: contentStringME})
          },
           {
            position: new google.maps.LatLng(9.577776, 76.623122),
            type: 'civil',
            title: 'Events',
            infowindow:new google.maps.InfoWindow({content: contentStringCE})
          },
            {
            position: new google.maps.LatLng(9.576186, 76.622050),
            type: 'parking',
            title: null,
            infowindow:null
          }
];
/*THE ICONS..INFOBAR EVERTHING IS ADDED HERE*/
features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map,
            title:feature.title

          });
           marker.addListener('click', function() {
          feature.infowindow.open(map,marker)});
        });

definePopupClass();
/*A POP UP AS A LANDMARK*/
popup = new Popup(
      new google.maps.LatLng(9.576026, 76.622036),
      document.getElementById('content1'));
  popup.setMap(map);
popup= new Popup(
      new google.maps.LatLng(9.577829, 76.623498),
      document.getElementById('content2'));
  popup.setMap(map);
popup= new Popup(
      new google.maps.LatLng(9.579430, 76.623174),
      document.getElementById('content3'));
  popup.setMap(map);
popup= new Popup(
      new google.maps.LatLng(9.580771, 76.623784),
      document.getElementById('content4'));
  popup.setMap(map);
popup= new Popup(
      new google.maps.LatLng(9.578457, 76.623590),
      document.getElementById('content5'));
  popup.setMap(map);
/*map.setOptions({styles:styles['hide']});*/

}
/*var styles = {
        hide: [
          {
            featureType: '',
            stylers: [{visibility: 'off'}]
          },
        ]
      }; */
/** Defines the Popup class. */
/*GOOGLE API CODE FOR OVERIDING THE FUNCTIONS OF MAPS API IN POPUP CLASS*/
function definePopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  Popup = function(position, content) {
    this.position = position;

    content.classList.add('popup-bubble-content');

    var pixelOffset = document.createElement('div');
    pixelOffset.classList.add('popup-bubble-anchor');
    pixelOffset.appendChild(content);

    this.anchor = document.createElement('div');
    this.anchor.classList.add('popup-tip-anchor');
    this.anchor.appendChild(pixelOffset);

    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation();
  };
  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.anchor);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  };

  /** Called when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the popup when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.anchor.style.left = divPosition.x + 'px';
      this.anchor.style.top = divPosition.y + 'px';
    }
    if (this.anchor.style.display !== display) {
      this.anchor.style.display = display;
    }
  };

  /** Stops clicks/drags from bubbling up to the map. */
  Popup.prototype.stopEventPropagation = function() {
    var anchor = this.anchor;
    anchor.style.cursor = 'auto';

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
     'pointerdown']
        .forEach(function(event) {
          anchor.addEventListener(event, function(e) {
            e.stopPropagation();
          });
        });
  };

    }