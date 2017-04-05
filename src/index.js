import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sampler from './lib/sampler'
import reducer from "./reducer"
import './index.css';

const files = {
  Q: "A1_1", W: "A1_2", E: "B1_1",
  A: "B2_1", S: "D1_1", D: "D1_2",
  Z: "V1_1", X: "V2_1", C: "V2_2"
}

const sampler = new Sampler(files)
const reduce = reducer({ sampler })

ReactDOM.render(
  <App reduce={reduce} />,
  document.getElementById('root')
);
