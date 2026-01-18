import { createRoot } from "react-dom/client";
import { GreetWidget } from "../widgets/index";

const el = document.getElementById("greet-island");
const value = "123";

if (el instanceof HTMLElement) {
  createRoot(el).render(<GreetWidget value={value} />);
}
