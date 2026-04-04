// The only modifications done to the HTML body are done via this script.

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
  alertDiv.querySelector(".dismiss").addEventListener("click", hide);
})();

// Fix website links
(function () {
  const BASE_URL = "https://stylestage.dev";

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (href.startsWith("/")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("href", BASE_URL + link.getAttribute("href"));
    }
  });
})();
