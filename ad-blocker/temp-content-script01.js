const blockAd = async () => {

  const rafAsync = () => {
    return new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  };

  const waitForElements = async (selector) => {
    let querySelector = null;
    while (querySelector === null) {
      await rafAsync();
      querySelector = document.querySelector(selector);
    }
    return querySelector;
  };
 
  const Action = {
    click: 0,
    remove: 1,
  };



  const removeElementsByClassName = (elements) =>
    [...elements].forEach((el) => (el.style.display = "none"));

  const setTimeoutHandler = (selector, action) => async () => {
    try {
      const elements = await waitForElements(selector);

      console.info(`${selector} - ${action}`);

      switch (action) {
        case Action.click:
          elements[0].click();
        case Action.remove:
          removeElementsByClassName(elements);
        default:
          break;
      }

      setTimeoutHandler();
    } catch (err) {
      console.error(err);
    }
  };


  setTimeout(setTimeoutHandler("ytp-ad-skip-button", Action.click), 0);

  setTimeout(setTimeoutHandler("ytp-ad-text-overlay", Action.remove), 0);

  setTimeout(
    setTimeoutHandler("ytd-companion-slot-renderer", Action.remove),
    0
  );

  setTimeout(setTimeoutHandler("ytd-display-ad-renderer", Action.remove), 0);

  setTimeout(
    setTimeoutHandler("ytd-subscribe-button-renderer", Action.remove),
    0
  );
};

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: blockAd,
  });
});
