import React from "react";
import { render, waitFor } from "@testing-library/react";
import Home from "../../../pages/index";

describe("App", () => {
  it("Should render without error", async () => {
    const { getByTestId } = render(<Home />);
    const component = getByTestId("component-app");
    await waitFor(() => expect(component).toBeInTheDocument());
  });
});
