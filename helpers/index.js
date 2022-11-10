import L from "leaflet";

const GREEN = '#1ec716'

export function drawGrid(map, api) {
  const zoom = map.getZoom();
  const loadFeatures = zoom > 17;

  if (loadFeatures) {
    // Zoom level is high enough
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();

    // Call the what3words Grid API to obtain the grid squares within the current visble bounding box
    api
      .gridSection({
        boundingBox: {
          southwest: {
            lat: sw.lat,
            lng: sw.lng,
          },
          northeast: {
            lat: ne.lat,
            lng: ne.lng,
          },
        },
        format: "geojson",
      })
      .then(function (data) {
        // If the grid layer is already present, remove it as it will need to be replaced by the new grid section
        map.eachLayer((l) => {
          if (l.getPane()?.className?.includes("leaflet-overlay-pane")) {
            map.removeLayer(l);
          }
        });

        L.geoJSON(data, {
          style: function () {
            return {
              color: "#8d8d8d",
              stroke: true,
              weight: 0.5,
            };
          },
        }).addTo(map);
      })
      .catch(console.error);
  }
}

function addSquare( api, words, color, map, pane, setMoveEnd ) {
  api
    .convertToCoordinates({ words, format: "geojson" })
    .then(function (data) {
      const bbox = data.features[0].bbox;
      const bounds = [
        [bbox[1], bbox[2]],
        [bbox[3], bbox[0]],
      ];

      let exists = false;

      map.eachLayer((l) => {
        if (l instanceof L.Rectangle) {
          if (l.options.className?.includes(words + color.slice(1))) {
            exists = true;
          } else if (l.options.className?.includes(words)) {
            l.removeFrom(map);
          }
        }
      });

      if (!exists) {
        L.rectangle(bounds, {
          color,
          weight: 1,
          fillOpacity: 1,
          pane,
          className: words + color.slice(1),
        }).addTo(map);
        setMoveEnd(Math.random());
      }
    })
    .catch(console.error);
}

export function drawChosenSquares(
  map,
  api,
  chosenSquares,
  isClaiming,
  setMoveEnd
) {
  map.eachLayer((l) => {
    if (!l.getPane("chosen")) {
      map.createPane("chosen");
      const chosenPane = map.getPane("chosen");
      if (chosenPane) chosenPane.style.zIndex = "475";
    }
  });
  const chosenPane = map.getPane("chosen");
  if (chosenPane)
    chosenSquares.map((words) => {
      const color = isClaiming ? "#fa3737" : GREEN;
      addSquare(
        api,
        words,
        color,
        map,
        chosenPane,
        setMoveEnd
      );
    });
}




