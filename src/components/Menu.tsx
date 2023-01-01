import React, { useState } from "react";
import {
    add_to_render_primary,
    reset_render_primary,
    toggle_pause,
    toggle_running,
} from "../store/action";
import nearestNeighbor from "../algorithms/nearestNeighbor";
import arbitraryInsertion from "../algorithms/arbitraryInsertion";
import furthestInsertion from "../algorithms/furthestInsertion";
import store from "../store";
import convexHull from "../algorithms/convexHull";
import { useSelector } from "react-redux";
import { globalState } from "../store/reducer";
import { getRandom } from "../utils/getData";
export default function Menu() {
    const data = useSelector((state: globalState) => state.data);
    const running = useSelector((state: globalState) => state.running);
    const paused = useSelector((state: globalState) => state.paused);
    const deep_data = JSON.parse(JSON.stringify(data));
    const [selectedAlgorithm, setSelectedAlgorithm] =
        useState("nearest neighbor");
    const handleStart = async () => {
        store.dispatch(toggle_running());
        switch (selectedAlgorithm) {
            case "nearest neighbor":
                await nearestNeighbor(deep_data);
                store.dispatch(toggle_running());
                break;
            case "arbitrary insertion":
                await arbitraryInsertion(deep_data);
                store.dispatch(toggle_running());
                break;
            case "nearest insertion":
                await arbitraryInsertion(deep_data);
                store.dispatch(toggle_running());
                break;
            case "furthest insertion":
                await furthestInsertion(deep_data);
                store.dispatch(toggle_running());
                break;
            case "convex hull":
                await convexHull(deep_data);
                store.dispatch(toggle_running());
                break;

            default:
                throw new Error("Invalid Algorithm Selected");
        }
    };
    const onInputChange = (e: any) => setSelectedAlgorithm(e.target.value);
    const topics = [
        {
            name: "nearest neighbor",
        },
        {
            name: "arbitrary insertion",
        },
        {
            name: "nearest insertion",
        },
        {
            name: "furthest insertion",
        },
        {
            name: "convex hull",
        },
    ];
    return (
        <div
            className="border-2 border-[#00819E] w-[380px] h-[350px] rounded p-3
    "
        >
            <div className="text-gray-500 font-semibold mt-2">ALGORITHM</div>
            <select
                onChange={(e) => onInputChange(e)}
                value={selectedAlgorithm}
                //     onChange={(e) => {
                //         dispatch({ type: types.add, payload: e.target.value });
                //     }
                // }
                className="mt-2 w-full outline-none border-2 border-gray-200 text-md capitalize 
            p-2 rounded cursor-pointer
            hover:border-black"
            >
                {topics.map((topic) => (
                    <option key={topic.name} value={topic.name}>
                        {topic.name}
                    </option>
                ))}
            </select>
            <div className="text-gray-500 font-semibold mt-4 mb-2">
                CONTROLS
            </div>
            <div className="flex rounded border-2  border-[#00819E]">
                {/* ${
                    !running && "cursor-pointer"
                } */}
                <button
                    onClick={() => handleStart()}
                    className="w-1/3 flex justify-center items-center border-r-2"
                    disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Start</p>
                </button>

                <button
                    className="w-1/3 flex justify-center items-center border-r-2"
                    onClick={() => store.dispatch(toggle_pause())}
                >
                    {paused ? (
                        <p className="font-semibold text-[#00819E]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </p>
                    ) : (
                        <p className="font-semibold text-[#00819E]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </p>
                    )}
                </button>
                <button
                    onClick={() => store.dispatch(reset_render_primary())}
                    className="w-1/3 flex justify-center items-center"
                    disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Reset</p>
                </button>
            </div>
            <div className="flex rounded border-2  border-[#00819E] mt-5">
                <button
                    className="w-1/3 flex justify-center items-center border-r-2"
                    disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Plot</p>
                </button>
                <button
                    className="w-1/3 flex justify-center items-center border-r-2"
                    onClick={() => getRandom()}
                    disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Random</p>
                </button>
                <button className="w-1/3 flex justify-center items-center border-r-2">
                    <p className="font-semibold text-[#00819E]">Speed</p>
                </button>
            </div>
        </div>
    );
}
