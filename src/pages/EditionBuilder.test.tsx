import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it, vi } from "vitest";
import EditionBuilder from "./EditionBuilder";

it("changes the template, included sections, and opens the PDF print flow", () => {
  const print = vi.spyOn(window, "print").mockImplementation(() => {});
  render(<MemoryRouter><EditionBuilder /></MemoryRouter>);

  expect(screen.getByLabelText("Edition preview").querySelector("[data-section=research]")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Project dossier/ }));
  expect(screen.getByLabelText("Edition preview").querySelector(".edition-dossier")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("checkbox", { name: "Research" }));
  expect(screen.getByLabelText("Edition preview").querySelector("[data-section=research]")).not.toBeInTheDocument();

  fireEvent.click(screen.getAllByRole("button", { name: /Print \/ save PDF/i })[0]);
  expect(print).toHaveBeenCalledOnce();
  print.mockRestore();
});
