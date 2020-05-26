window.addEventListener("load", () => {
  const time = document.querySelector("#timer");
  let count = 0;
  time.textContent = "1";
  const interval = setInterval(() => {
    time.textContent = ++count;
    if (count === 20) {
      this.clearInterval(interval);
      return;
    }
    if (count % 5 === 0) {
      setTimeout(() => {
        time.textContent = count + 0.5;
      }, 500);
    }
  }, 1000);
});
