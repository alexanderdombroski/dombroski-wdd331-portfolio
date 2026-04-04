// Add Alert
(function () {
  const alertDiv = document.createElement("div");
  alertDiv.className = "info-alert";

  alertDiv.insertAdjacentHTML(
    "beforeend",
    `
    <span>
      The body HTML of this page was not modified, but new styles were added!
      <button class="revert">Revert CSS to original</button>
    </span>
    <button class="dismiss">x</button>
  `,
  );

  // Insert at top of body
  document.body.prepend(alertDiv);

  const hide = () => {
    alertDiv.classList.add("hidden");
  };

  alertDiv.querySelector(".revert").addEventListener("click", () => {
    const styleSheet = document.querySelector('head link[rel="stylesheet"]');
    styleSheet.href =
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
      "/styles/original.css";
    alertDiv.remove(); // Can't animate with their styles
  });
  alertDiv.querySelector(".dismiss").addEventListener("click", () => {
    hide();
  });
})();
