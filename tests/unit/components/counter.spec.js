import Counter from "@/components/Counter";
import { mount, shallowMount } from "@vue/test-utils";

describe("Counter componenet", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // test("Debe hacer match con el snapshot", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test('h2 debe tener un valor por defecto "Counter1"', () => {
    const h2 = wrapper.find("h2");
    expect(h2.text()).toBe("Counter");
  });

  test("El valor por defecto debe ser 100 en el p", () => {
    const p = wrapper.find('[data-test-id="counter"]').text();
    expect(p).toBe("100");
  });

  test("debe decrementar en 1 el valor del contador", async () => {
    const decrementBtn = wrapper.find("button");
    await decrementBtn.trigger("click");
    const value = wrapper.find('[data-test-id="counter"]').text();
    expect(value).toBe("99");
  });

  test("Debe establecer el valor por defecto", () => {
    const start = wrapper.props("start");
    const value = wrapper.find('[data-test-id="counter"]').text();
    expect(Number(value)).toBe(start);
  });

  test("debe mostrar prop title", () => {
    const title = "hola mundo";
    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });
    const h2 = wrapper.find("h2");
    expect(h2.text()).toBe(title);
  });
});
