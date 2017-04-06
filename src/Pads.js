import React from "react";
import classNames from "classnames"

const Pad = ({ letter, state, onClick }) => (
  <a href="#!" className={classNames("Pad", state)} onClick={onClick}>
    {letter}
  </a>
)

const Pads = ({ letters, padsState, onClick }) => (
  <div className="Pads">
    {letters.map(letter => (
      <Pad key={letter} letter={letter} onClick={() => onClick(letter)}
        state={padsState[letter]} />
    ))}
  </div>
)
export default Pads
