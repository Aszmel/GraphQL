import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Nav from "../components/Nav";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser, fakeCartItem } from "../lib/testUtils";

const notSignedMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: {
      data: {
        me: null
      }
    }
  }
];

const signedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: {
      data: {
        me: fakeUser()
      }
    }
  }
];

const signedInMocksWithCartItems = [
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()]
        }
      }
    }
  }
];

describe("<Nav />", () => {
  it("renders mini nav when signed out", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find(`[data-test="nav"]`);
    // console.log(nav.debug());
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it("renders full nav when signed in", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find(`ul[data-test="nav"]`);
    expect(nav.children().length).toBe(5);
  });

  it("renders the amount of items in the cart", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find(`ul[data-test="nav"]`);
    const count = nav.find("div.count");
    expect(toJSON(count)).toMatchSnapshot();
  });
});
