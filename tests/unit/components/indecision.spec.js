import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/indecision";

describe("Indecision component", () => {
  let wrapper;
  let clgSpy;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, "log");
    jest.clearAllMocks();
  });

  // test("Debe hacer match el snapshot", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test("escribir en input no debe poner nada (console.log)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("Hola Mundo");
    expect(clgSpy).toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });
  test("escribir '?' debe disparar el getAnswer", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("Hola Mundo?");
    expect(getAnswerSpy).toHaveBeenCalled();
  });
  test("pruebas getAnswer", async () => {
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("Si!");
  });
  test("pruebas getAnswer fallo en el API", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("No se pudo cargar la API");
  });
});
