import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
// import LocalizationWrapper ,{App}from './App';
import { BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { IntlProvider } from "react-intl";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import { Layout } from "./components/Layout";
import msw from 'msw'
import { http, HttpResponse } from 'msw'
import { setupServer } from "msw/node";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as messages from "./lang/en.json";


describe("renders Navbar with correct elements", () => {
  console.log(messages.default);
  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages.default}>
        <ResponsiveAppBar />
      </IntlProvider>,
      { wrapper: BrowserRouter }
    );
  });
  it("navbar", () => {
    const productsElement = screen.getByText(/Logo/);
    expect(productsElement).toBeInTheDocument();
    const productsElement1 = screen.getAllByText(/products/)[0];
    expect(productsElement1).toBeInTheDocument();
    const pricingElement = screen.getAllByText(/pricing/)[0];
    expect(pricingElement).toBeInTheDocument();
    const pricingElement1 = screen.getByText(/Register/);
    expect(pricingElement1).toBeInTheDocument();
    const blogElement1 = screen.getAllByText(/blog/)[0];
    expect(blogElement1).toBeInTheDocument();
    const signInElement = screen.getByText(/Sign In/);
    expect(signInElement).toBeInTheDocument();
    const addLocationButton = screen.getByLabelText("add location");
    fireEvent.click(addLocationButton);
    const popoverElement = screen.getByText("Add your Location");
    expect(popoverElement).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders Footer with correct elements", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const footerElement = screen.getByText(/About Us/);
    expect(footerElement).toBeInTheDocument();

    const copyrightText = screen.getByText(/Contact Us/);
    expect(copyrightText).toBeInTheDocument();

    const FollowusText = screen.getByText(/Follow Us/);
    expect(FollowusText).toBeInTheDocument();
  });msw
});
test("renders Instagram icon", () => {
  const { getByTestId } = render(<Footer />);
  const instagramIcon = getByTestId("instagram-icon");
  expect(instagramIcon).toBeInTheDocument();
});
test("renders Twitter icon", () => {
  const { getByTestId } = render(<Footer />);
  const twitterIcon = getByTestId("twitter-icon");
  expect(twitterIcon).toBeInTheDocument();
});

test("renders Facebook icon", () => {
  const { getByTestId } = render(<Footer />);
  const facebookIcon = getByTestId("facebook-icon");
  expect(facebookIcon).toBeInTheDocument();
});

describe("Hero", () => {
  it("renders the Hero component with an image", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument();

    expect(heroImage.tagName).toBe("IMG");
    expect(heroImage.src).toContain("/assets/bg.png");
  });
});

describe("About", () => {
  test("renders Page content", () => {
    const { getByTestId } = render(<About />);
    const AboutHeading = getByTestId("Bangalore-heading");
    expect(AboutHeading).toBeInTheDocument();
  });
});
describe("About", () => {
  test("renders Page content", () => {
    const { getByTestId } = render(<About />);
    const AboutParagraph = getByTestId("Bangalore-paragraph");
    expect(AboutParagraph).toBeInTheDocument();
  });
});

describe("About", () => {
  test("renders Page content", () => {
    const { getByTestId } = render(<About />);
    const AboutLink = getByTestId("Home-id");
    expect(AboutLink).toBeInTheDocument();
  });
});

describe("About", () => {
  test("renders Page content", () => {
    const { getByTestId } = render(<About />);
    const BangaloreLink = getByTestId("Bangalore-id");
    expect(BangaloreLink).toBeInTheDocument();
  });
});


export const handlers = [
  http.get("http://localhost:3000/api/v1/test", async (e) => {
   console.log("test api")
    let data = [];
    return HttpResponse.json( {
      "data": [
          {
              "id": 8,
              "categoryName": "Groceries and Essenials",
              "isActive": true,
              "imagePath": "http://localhost:3001/assets/groceries.png",
              "title": "Groceries and Essenials",
              "content": "Sample Content",
              "createdAt": "2023-10-13T05:53:07.608Z",
              "updatedAt": "2023-10-13T05:53:07.608Z"
          },
          {
              "id": 9,
              "categoryName": "Pickup and drop",
              "isActive": true,
              "imagePath": "http://localhost:3001/assets/pickimg.png",
              "title": "Pickup and drop",
              "content": "Sample Content",
              "createdAt": "2023-10-13T05:53:39.046Z",
              "updatedAt": "2023-10-13T05:53:39.046Z"
          },
          {
              "id": 10,
              "categoryName": "Meat and Fish",
              "isActive": true,
              "imagePath": "http://localhost:3001/assets/meatimg.png",
              "title": "Meat and Fish",
              "content": "Sample Content",
              "createdAt": "2023-10-13T05:54:12.914Z",
              "updatedAt": "2023-10-13T05:54:12.914Z"
          },
          {
              "id": 11,
              "categoryName": "Fruits and Vegetables",
              "isActive": true,
              "imagePath": "http://localhost:3001/assets/fruitsimg.png",
              "title": "Fruits and Vegetables",
              "content": "Sample Content",
              "createdAt": "2023-10-13T05:54:47.833Z",
              "updatedAt": "2023-10-13T05:54:47.833Z"
          }
      ]
  } )}),
  
];
const server = setupServer(...handlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Layout component with mocked data', async () => {
   render(<Layout />);
  
  await screen.findByAltText(/groceries.png/) 
  expect(screen.getByAltText(/groceries.png/)).toBeInTheDocument();
  expect(screen.getByAltText(/meatimg.png/)).toBeInTheDocument();
  expect(screen.getByAltText(/fruitsimg.png/)).toBeInTheDocument();
  expect(screen.getByAltText(/pickimg.png/)).toBeInTheDocument();
 
});
