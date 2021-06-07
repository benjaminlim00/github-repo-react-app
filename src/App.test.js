import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const server = setupServer(
  rest.get(
    "https://api.github.com/users/benjaminlim00/repos",
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            {
              description: "about-me",
              name: "about-me",
              link: "about-me.com",
              language: "java",
              stars: 0,
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("searching for benjaminlim00's repo returns results", async () => {
  server.use(
    rest.get(
      "https://api.github.com/users/benjaminlim00/repos",
      (req, res, ctx) => {
        return res(ctx.status(200));
      }
    )
  );
  render(<App />);

  const input = screen.getByLabelText("username");
  fireEvent.change(input, { target: { value: "benjaminlim00" } });
  const button = screen.getByText("View");
  fireEvent.click(button);

  const result = await screen.findByDisplayValue("about-me");
  expect(result).toBeInTheDocument();

  // expect(screen.getByText("about-me")).toHaveTextContent("about-me");
});
