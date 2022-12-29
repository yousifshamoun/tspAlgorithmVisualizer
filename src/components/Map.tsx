import React from "react";
import Map, { Point } from "react-map-gl";
import { ScatterplotLayer, LineLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react/typed";
import { getData, getRoutes } from "../utils/getData";
import nearestNeighbor from "../algorithms/nearestNeighbor";
import { useSelector } from "react-redux";
import { globalState } from "../store/reducer";
export default function MapPlot() {
    const points = getData();
    const ROUTE = useSelector((state: globalState) => state.render_primary);
    const viewport = {
        latitude: 40,
        longitude: -89,
        zoom: 3,
    };
    const PointPlot = [
        new ScatterplotLayer<number[]>({
            id: "scatter-plot",
            data: points,
            radiusMinPixels: 5,
            getRadius: (d) => 5,
            filled: true,
            stroked: false,
            getPosition: (d: number[]) => [d[0], d[1]],
            getFillColor: (d) => [234, 67, 53],
        }),
        ,
        new LineLayer({
            data: ROUTE,
            opacity: 0.8,
            getSourcePosition: (d) => d.start,
            getTargetPosition: (d) => d.end,
            getColor: (d: any) => [23, 108, 213],
            getWidth: (d) => 3,
        }),
    ];

    return (
        <div className="w-full h-full absolute">
            <DeckGL
                initialViewState={viewport}
                controller={true}
                layers={PointPlot}
                width={1000}
                height={1000}
            >
                <Map
                    mapStyle="mapbox://styles/mapbox/light-v8"
                    mapboxAccessToken={
                        "pk.eyJ1IjoiZm94dHJvdDM3MjEiLCJhIjoiY2w1ejBsMzNuMTkyZjNjcGdmMGthanh0ZyJ9._IkSbktADaTeWWzs249ELw"
                    }
                />
            </DeckGL>
        </div>
    );
}
