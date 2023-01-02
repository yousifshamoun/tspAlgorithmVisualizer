import { Slider, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { globalState } from "../store/reducer";
import { set_point_count } from "../store/action";
import store from "../store";
function PointsSlider() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#00819E",
            },
            secondary: {
                main: "#ffffff",
            },
        },
    });
    const running = useSelector((state: globalState) => state.running);
    const point_count = useSelector((state: globalState) => state.pointCount);
    return (
        <ThemeProvider theme={theme}>
            <div className="mt-3 px-2">
                <p className="text-gray-500 font-semibold mt-4 mb-2">
                    RANDOM POINT COUNT
                </p>
                <Slider
                    disabled={running}
                    valueLabelDisplay="auto"
                    color="primary"
                    min={15}
                    max={50}
                    value={point_count}
                    onChange={(e, val) =>
                        store.dispatch(set_point_count(val as number))
                    }
                />
            </div>
        </ThemeProvider>
    );
}
export default PointsSlider;
