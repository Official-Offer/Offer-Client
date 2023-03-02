import { render } from "@test";

import { InfoCardTray } from "./index";

describe("InfoCard component testing with testing-library", () => {
  const component = render(<InfoCard />);

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});