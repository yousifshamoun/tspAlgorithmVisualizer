import { Map } from "react-map-gl";
import { ScatterplotLayer, LineLayer } from "@deck.gl/layers/typed";
// import LinearProgress from "@mui/material/LinearProgress";
import DeckGL from "@deck.gl/react/typed";
import { useSelector } from "react-redux";
import { globalState } from "../store/reducer";

export default function MapPlot() {
    const ROUTE = useSelector((state: globalState) => state.render_primary);
    const DATA = useSelector((state: globalState) => state.data);
    const running = useSelector((state: globalState) => state.running);
    const viewport = useSelector((state: globalState) => state.viewport);
    const PointPlot = [
        new ScatterplotLayer<number[]>({
            id: "scatter-plot",
            data: DATA,
            radiusMinPixels: 5,
            getRadius: (d) => 5,
            filled: true,
            stroked: false,
            getPosition: (d: number[]) => [d[0], d[1]],
            getFillColor: (d) => [234, 67, 53],
        }),

        new LineLayer({
            data: ROUTE,
            opacity: 0.8,
            getSourcePosition: (d) => d.start,
            getTargetPosition: (d) => d.end,
            getColor: (d: any) => (running ? [23, 108, 213] : [75, 181, 67]),
            getWidth: (d) => 3,
        }),
    ];

    return (
        <div className="w-full h-full absolute">
            <DeckGL
                initialViewState={viewport}
                controller={true}
                layers={PointPlot}
                width="100%"
                height="100%"
            >
                {/* {running && <LinearProgress />} */}
                <Map
                    mapStyle="mapbox://styles/mapbox/light-v8"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                />
            </DeckGL>
        </div>
    );
}
