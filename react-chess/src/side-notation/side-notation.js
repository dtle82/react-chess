import React from "react";
import "./side-notation.css";

function SideNotation() {
  const side_container = [];
  for (var i = 8; i >= 1; i--) {
    side_container.push(
      <div key={i} className="side-notation">
        {i}
      </div>
    );
  }

  return <div className="side-notation">{side_container}</div>;
}

export default SideNotation;
