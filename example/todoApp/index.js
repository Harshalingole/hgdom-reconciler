import { createRoot } from "../../src/hgdom/render.js"
import App from "./app.js"

const root = document.getElementById("root")
createRoot(root,App)