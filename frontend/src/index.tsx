import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import 'react-image-crop/dist/ReactCrop.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
