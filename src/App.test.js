import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"; // highlight-line
import { getRepos } from "./api";
import App from "./App";

jest.mock("./api");

test("searching for benjaminlim00's repo returns results", async () => {
  const posts = [
    {
      id: 1,
      name: "about-me",
      description: "description for about me",
      link: "about me.com",
      language: "java",
      stars: 0,
    },
  ];
  getRepos.mockResolvedValueOnce(posts);
  render(<App />);

  const input = screen.getByLabelText("username");
  fireEvent.change(input, { target: { value: "benjaminlim00" } });
  const button = screen.getByText("View");
  fireEvent.click(button);

  expect(getRepos).toHaveBeenCalledTimes(1);
  expect(getRepos).toHaveBeenCalledWith("benjaminlim00");

  await waitFor(() => expect(screen.getByText("about-me")).toBeInTheDocument());
  expect(screen.getByText("about-me")).toBeInTheDocument();
});
