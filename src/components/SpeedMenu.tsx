import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import store from "../store";
import { set_delay } from "../store/action";
export default function SpeedMenu() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const options = ["Set Speed", "Slow", "Medium", "Fast"];
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSlow = () => {
        handleClose();
        setSelectedIndex(1);
        store.dispatch(set_delay(250));
    };
    const handleMedium = () => {
        handleClose();
        setSelectedIndex(2);
        store.dispatch(set_delay(100));
    };
    const handleFast = () => {
        handleClose();
        setSelectedIndex(3);
        store.dispatch(set_delay(50));
    };

    return (
        <div>
            <button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {options[selectedIndex]}
            </button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleSlow}>Slow</MenuItem>
                <MenuItem onClick={handleMedium}>Medium</MenuItem>
                <MenuItem onClick={handleFast}>Fast</MenuItem>
            </Menu>
        </div>
    );
}
