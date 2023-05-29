window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
