import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import "@testing-library/jest-dom";

test("renders the navigation bar", () => {
  render(
    <BrowserRouter>
      <Header theme={""} setTheme={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </BrowserRouter>
  );

  // Check if the navigation links exist
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Projects")).toBeInTheDocument();
});
