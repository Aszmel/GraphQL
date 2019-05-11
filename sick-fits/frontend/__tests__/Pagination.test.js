import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Pagination, { PAGINATION_QUERY } from "../components/Pagination";
import { MockedProvider } from "react-apollo/test-utils";

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              count: length,
              __typename: "count"
            }
          }
        }
      }
    }
  ];
}

describe("<Pagination />", () => {
  it("display a loading message", () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    console.log(wrapper.debug());
  });
});
