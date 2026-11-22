import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import Navbar from "./Navbar";

it("opens the section menu and closes it after a selection", () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  const menu = screen.getByRole("button", { name: "Open menu" });
  expect(menu).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(menu);
  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(screen.getByRole("link", { name: "Experience" }));
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
});

it("switches between light and dark themes", async () => {
  render(
    <MemoryRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>,
  );
  fireEvent.click(await screen.findByRole("button", { name: "Switch to dark mode" }));
  await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  await waitFor(() => expect(document.documentElement).not.toHaveClass("dark"));
});

it("compacts the header after scrolling", () => {
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  const header = screen.getByRole("banner");
  expect(header).not.toHaveClass("is-compact");

  Object.defineProperty(window, "scrollY", { configurable: true, value: 160 });
  fireEvent.scroll(window);
  expect(header).toHaveClass("is-compact");

  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  fireEvent.scroll(window);
  expect(header).not.toHaveClass("is-compact");
});
