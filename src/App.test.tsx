import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("@clerk/clerk-react", () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useUser: () => ({ user: null, isLoaded: true }),
  useSignIn: () => ({ signIn: null, isLoaded: true }),
  useSignUp: () => ({ signUp: null, isLoaded: true }),
  useClerk: () => ({ signOut: jest.fn() }),
  useAuth: () => ({ getToken: jest.fn().mockResolvedValue(null) }),
}));

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
