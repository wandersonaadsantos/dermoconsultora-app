import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { READING_PROGRESS_STORAGE_KEY, useReadingProgress } from "./useReadingProgress";

function Probe() {
  const progress = useReadingProgress();

  return (
    <div>
      <div data-testid="read">{String(progress.isRead("m1"))}</div>
      <div data-testid="count">{String(progress.readModuleIds.length)}</div>
      <button type="button" onClick={() => progress.markAsRead("m1")}>
        Marcar
      </button>
      <button type="button" onClick={() => progress.unmarkAsRead("m1")}>
        Desmarcar
      </button>
    </div>
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("useReadingProgress", () => {
  test("persiste com a chave exata e restaura do localStorage", async () => {
    render(<Probe />);

    expect(screen.getByTestId("read")).toHaveTextContent("false");
    expect(screen.getByTestId("count")).toHaveTextContent("0");

    fireEvent.click(screen.getByRole("button", { name: "Marcar" }));

    await waitFor(() => {
      expect(localStorage.getItem(READING_PROGRESS_STORAGE_KEY)).toBe(JSON.stringify(["m1"]));
    });

    expect(localStorage.getItem(`dc:v1:${READING_PROGRESS_STORAGE_KEY}`)).toBeNull();

    cleanup();
    render(<Probe />);
    expect(screen.getByTestId("read")).toHaveTextContent("true");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});

