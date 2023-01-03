import React from 'react';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { globalState } from '../store/reducer';
import { AiFillGithub } from 'react-icons/ai';
export default function Aside() {
    const current_path: number = useSelector(
        (state: globalState) => state.current_path
    );
    const best_path: number = useSelector(
        (state: globalState) => state.best_path
    );
    return (
        <div className="flex flex-col p-[16px] w-5/16">
            <div className="w-[380px] h-[50px] gap-10">
                <div>
                    <div
                        className="flex items-center gap-2 p-3 
                justify-center xl:justify-start font-semibold
                border-b-2"
                    >
                        <p className="text-2xl ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                            </svg>
                        </p>
                        <span className="text-xl">TSP Visualizer</span>
                        <div className="pl-10  cursor-pointer">
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/yousifshamoun/tspAlgorithmVisualizer"
                            >
                                <AiFillGithub className="text-xl" />
                            </a>
                        </div>
                    </div>
                    <div
                        className="p-3 text-gray-500 font-semibold 
              text-sm border-b-2"
                    >
                        Visualize algorithms for the traveling salesman problem.
                        Use the algorithms below to find the shortest possible
                        route between all selected points.
                    </div>
                    <div
                        className="p-3 flex justify-between text-gray-500 font-semibold 
              text-sm "
                    >
                        CURRENT PATH:
                        <span className="text-gray-800">
                            {current_path ? current_path.toFixed(2) : ''} KM
                        </span>
                    </div>
                    <div
                        className="p-3 flex justify-between text-gray-500 font-semibold 
              text-sm "
                    >
                        BEST PATH:
                        <span className="text-gray-800">
                            {best_path ? best_path.toFixed(2) : ''} KM
                        </span>
                    </div>
                    <Menu />
                </div>
            </div>
        </div>
    );
}
