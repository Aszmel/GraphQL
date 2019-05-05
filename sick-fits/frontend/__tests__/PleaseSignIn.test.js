import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import PleaseSignIn from "../components/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser } from "../lib/testUtils";

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

describe("<PleaseSignIn/>", () => {
  it("renders the sign-in dialog to logged out users", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedMocks}>
        <PleaseSignIn />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain("Please sign in before continuing");
    expect(wrapper.find("Signin").exists()).toBe(true);
    console.log(wrapper.debug());
  });
});
