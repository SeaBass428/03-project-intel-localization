// Languages that normally use a right-to-left writing direction.
const rtlLanguageCodes = ["ar", "dv", "fa", "ha", "he", "ku", "ps", "sd", "ug", "ur", "yi"];

// Read the first part of a language tag, such as "ar" from "ar-SA".
function getBaseLanguage(language) {
  return language.toLowerCase().split("-")[0].split("_")[0];
}

// Match the page direction to the language currently shown on the page.
function updatePageDirection() {
  const language = getBaseLanguage(document.documentElement.lang || "en");
  const isRightToLeft = rtlLanguageCodes.includes(language);

  document.documentElement.dir = isRightToLeft ? "rtl" : "ltr";
}

updatePageDirection();

const timelineModal = document.getElementById("timelineModal");
const timelineModalDetails = document.getElementById("timelineModalDetails");

timelineModal.addEventListener("show.bs.modal", function (event) {
  const timelineCard = event.relatedTarget.closest("#timeline > div");
  const cardTitle = timelineCard.querySelector("h3").textContent;
  const cardYear = timelineCard.querySelector("h2").textContent;
  const cardImage = timelineCard.querySelector("img");
  const cardDescription = timelineCard.querySelector("p").textContent.trim();

  document.getElementById("timelineModalLabel").textContent = `${cardYear}: ${cardTitle}`;
  document.getElementById("timelineModalImage").src = cardImage.src;
  document.getElementById("timelineModalImage").alt = cardImage.alt;
  document.getElementById("timelineModalDescription").textContent = cardDescription;
  timelineModalDetails.textContent = timelineCard.dataset.details;
});

// Google Translate can change the html lang attribute after the page loads.
const languageObserver = new MutationObserver(updatePageDirection);
languageObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});
