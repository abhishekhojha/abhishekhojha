import React from "react";
import "@/assets/css/Loader.css"
export default function Loader(props) {
  return (
    <div className={props.loading?"loaderContainer invisible duration-300 opacity-0":"loaderContainer duration-300"}>
      <div className="loader">
        <div className="item1"></div>
        <div className="item2"></div>
        <div className="item3"></div>
      </div>
    </div>
  );
}
