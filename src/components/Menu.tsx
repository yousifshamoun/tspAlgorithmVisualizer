import React, { useState } from 'react';
import {
    add_to_render_primary,
    reset_render_primary,
    toggle_pause,
} from '../store/action';
import { useDispatch } from 'react-redux';
import nearestNeighbor from '../algorithms/nearestNeighbor';
import arbitraryInsertion from '../algorithms/arbitraryInsertion';
import furthestInsertion from '../algorithms/furthestInsertion';
import store from '../store';
import convexHull from '../algorithms/convexHull';
import { getData, getRoutes } from '../utils/getData';
export default function Menu() {
    const dispatch = useDispatch();
    const [selectedAlgorithm, setSelectedAlgorithm] =
        useState('nearest neighbor');
    const handleStart = () => {
        switch (selectedAlgorithm) {
            case 'nearest neighbor':
                nearestNeighbor(getData());
                break;
            case 'arbitrary insertion':
                arbitraryInsertion(getData());
                break;
            case 'nearest insertion':
                arbitraryInsertion(getData());
                break;
            case 'furthest insertion':
                furthestInsertion(getData());
                break;
            case 'convex hull':
                convexHull(getData());
                break;

            default:
                throw new Error('Invalid Algorithm Selected');
        }
    };
    const onInputChange = (e: any) => setSelectedAlgorithm(e.target.value);
    const topics = [
        {
            name: 'nearest neighbor',
        },
        {
            name: 'arbitrary insertion',
        },
        {
            name: 'nearest insertion',
        },
        {
            name: 'furthest insertion',
        },
        {
            name: 'convex hull',
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
                    // disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Start</p>
                </button>

                <button
                    className="w-1/3 flex justify-center items-center border-r-2"
                    onClick={() => store.dispatch(toggle_pause())}
                    // disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Pause</p>
                </button>
                <button
                    onClick={() => store.dispatch(reset_render_primary())}
                    className="w-1/3 flex justify-center items-center"
                    // disabled={running}
                >
                    <p className="font-semibold text-[#00819E]">Reset</p>
                </button>
            </div>
        </div>
    );
}
