// The only modifications done to the HTML body are done via this script.

(function addAlert() {
  const alertDiv = document.createElement("div");
  alertDiv.className = "info-alert";

  alertDiv.insertAdjacentHTML(
    "beforeend",
    `
    <span>
      The body HTML of this page was not modified, but new styles were added!
    </span>
    <button class="revert">Revert to original</button>
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

(function fixWebsiteLinks() {
  const BASE_URL = "https://stylestage.dev";

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (href.startsWith("/")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("href", BASE_URL + link.getAttribute("href"));
    }
  });
})();

(function addAuthorInfo() {
  const profile = document.querySelector(".profile");
  profile.querySelector(".profile-title span:nth-of-type(2)").textContent =
    "Style Stage";
  profile.querySelector(".profile-author span:nth-of-type(2)").textContent =
    "Alex Dombroski";
  profile.querySelector(".profile-twitter span:nth-of-type(1)").textContent =
    "LinkedIn:";
  const social = profile.querySelector(".profile-twitter a");
  social.textContent = "Alex Dombroski";
  social.href = "https://www.linkedin.com/in/alexander-dombroski/";
  social.target = "_blank";
  const website = profile.querySelector(".profile-website a");
  website.textContent = "alexdombroski.com";
  website.href = "https://alexdombroski.com";
  website.target = "_blank";
  profile.querySelector(".profile-title span:nth-of-type(2)").textContent =
    "Style Stage";
  const stylesLink = profile.querySelector(".container > a");
  stylesLink.href = "./styles/main.css";
  stylesLink.target = "_blank";
})();
