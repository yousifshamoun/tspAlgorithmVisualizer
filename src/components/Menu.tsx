import React, { useState } from "react";
import { add_to_render_primary } from "../store/action";
import { useDispatch } from "react-redux";
import nearestNeighbor from "../algorithms/nearestNeighbor";
import arbitraryInsertion from "../algorithms/arbitraryInsertion";
import { getData, getRoutes } from "../utils/getData";
export default function Menu() {
    const dispatch = useDispatch();
    const [selectedAlgorithm, setSelectedAlgorithm] =
        useState("nearest neighbor");
    const handleStart = () => {
        switch (selectedAlgorithm) {
            case "nearest neighbor":
                // dispatch(
                //     add_to_render_primary(getRoutes(nearestNeighbor(getData())))
                // );
                nearestNeighbor(getData());
                break;
            case "arbitrary insertion":
                arbitraryInsertion(getData());
                break;
            case "nearest insertion":
                arbitraryInsertion(getData());
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
            <div
                className="flex justify-center items-center 
      rounded w-full border-2 h-[45px] border-[#00819E]"
            >
                {/* ${
                    !running && "cursor-pointer"
                } */}
                <button
                    onClick={() => handleStart()}
                    // onClick={() => {
                    //     setAni();
                    // }}
                    // disabled={running}
                    className={`text-2xl  font-semibold
          text-[#00819E] 
           w-[33%] h-full items-center flex 
            justify-center border-r-2 border-[#00819E]`}
                >
                    Start
                </button>

                <button
                    // onClick={() => dispatch(decrement())}
                    // onClick={setRandom}
                    // disabled={running}
                    className={`text-2xl  font-semibold
          text-[#00819E] w-[33%] h-full items-center flex border-r-2 
          border-[#00819E] justify-center`}
                >
                    Shuffle
                </button>
                <button
                    // onClick={() => {
                    //     reset();
                    // }}
                    // disabled={running}
                    className={`text-2xl  font-semibold
          text-[#00819E] w-[33%] h-full items-center flex 
            justify-center`}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
