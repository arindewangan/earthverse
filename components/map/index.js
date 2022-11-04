import dynamic from "next/dynamic";

const Map = dynamic(() => import('./map.jsx'),{
    ssr:false
});

export default Map;