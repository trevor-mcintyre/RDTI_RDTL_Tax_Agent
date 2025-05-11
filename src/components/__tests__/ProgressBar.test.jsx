
import { render } from "@testing-library/react";
import ProgressBar from "../ProgressBar";

test("renders ProgressBar without crashing", () => {
  render(<ProgressBar progress={50} />);
});
