import * as React from 'react';
import store from '../store';
import { set_delay } from '../store/action';
export default function SpeedMenu() {
    const onInputChange = (e: any) => {
        store.dispatch(set_delay(e.target.value));
    };
    return (
        <div className="relative">
            <select
                className="text-sm first-letter:block font-semibold appearance-none w-full text-[#00819E] py-1 px-2 pr-4 rounded leading-snug focus:outline-none focus:bg-white"
                id="grid-state"
                name="job_type"
                // value={job_type}
                onChange={(e) => onInputChange(e)}
            >
                <option value="" disabled selected>
                    Set Speed
                </option>
                <option value={250}>Slow</option>
                <option value={100}>Medium</option>
                <option value={25}>Fast</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    );
}
