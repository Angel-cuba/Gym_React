import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders the gym experience", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(
    await screen.findByText(/entrena con intención/i, undefined, {
      timeout: 5000,
    })
  ).toBeInTheDocument();
});
