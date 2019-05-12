import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Router from "next/router";
import { MockedProvider } from "react-apollo/test-utils";
import CreateItem, { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { fakeItem } from "../lib/testUtils";

const dogImage = "https://dog.com/dog.jpg";
// mock the global API fetch
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
});

describe("<CreateItem/>", () => {
  it("renders and match snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    // console.log(wrapper.debug());
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("upload a file when changed", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const input = wrapper.find('input[type="file"]');
    input.simulate("change", { target: { files: ["fakedog.jpg"] } });
    await wait();
    const component = wrapper.find("CreateItem").instance();
    expect(global.fetch).toHaveBeenCalled();
    expect(component.state.image).toEqual(dogImage);
    expect(component.state.largeImage).toEqual(dogImage);
    global.fetch.mockReset();
  });

  it("handles the state update", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    wrapper
      .find("#title")
      .simulate("change", { target: { value: "Testing", name: "title" } });
    wrapper.find("#price").simulate("change", {
      target: { value: 50000, name: "price", type: "number" }
    });
    wrapper.find("#description").simulate("change", {
      target: { value: "Nice item", name: "description" }
    });
    expect(wrapper.find("CreateItem").instance().state).toMatchObject({
      title: "Testing",
      price: 50000,
      description: "Nice item"
    });
  });
  it("creates item when form is submitted", async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: "",
            largeImage: "",
            price: item.price
          }
        },
        result: {
          data: {
            createItem: {
              ...fakeItem(),
              id: "abc123",
              __typename: "Item"
            }
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    );
    //simulate someone fills the forms
    wrapper
      .find("#title")
      .simulate("change", { target: { value: item.title, name: "title" } });
    wrapper.find("#price").simulate("change", {
      target: { value: item.price, name: "price", type: "number" }
    });
    wrapper.find("#description").simulate("change", {
      target: { value: item.description, name: "description" }
    });
    //mock the Router
    Router.router = { push: jest.fn() };
    wrapper.find("form").simulate("submit");
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/item",
      query: { id: "abc123" }
    });
  });
});
