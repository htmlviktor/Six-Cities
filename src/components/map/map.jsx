import React, {Component} from 'react';
import leaflet from 'leaflet';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  render() {
    return (
      <div
        style={{height: `100%`}}
        ref={this.container}
        id="map">

      </div>
    );
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(this.container.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
  .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
  })
  .addTo(map);

    const offerCords = [52.3709553943508, 4.89309666406198];
    leaflet
  .marker(offerCords, {icon})
  .addTo(map);
  }
}
