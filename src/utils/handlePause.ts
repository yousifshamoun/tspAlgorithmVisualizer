import store from '../store';

const handlePause = (resolve: any, reject: any) => {
    // if Visualization is paused global.froze will be true  or else false
    if (store.getState().paused === false) {
        //resolve promise immidiately if global.froze is false
        resolve();
        return;
    }
    const timer = setInterval(() => {
        //check every 100 ms whether global.froze is false if false then resolve
        if (store.getState().paused === false) {
            clearInterval(timer);
            resolve();
        }
    }, 100);
};

export default handlePause;
