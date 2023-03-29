import { render } from "@test";

import { InfoCard } from "@components/card/infoCard";
import { CardTray } from "./index";

describe("InfoCard component testing with testing-library", () => {
  const component = render(<InfoCard />);

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});