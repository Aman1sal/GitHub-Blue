'use strict';

import { fetchData } from "./api";

/**
 * @param {NodeList} $elements NodeList
 * @param {String} eventType String
 * @param {Function} callback Function
 */

const addEventOnElements = function($elements, eventType, callback) {
  for (const $item of $elements) {
    $item.addEventListener(eventType, callback);
  }
};
/**Header Scroll */

const /**{NodeElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", function() {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});


// search toggle
const /** {NodeElement} */$searchToggler = document.querySelector("[data-search-toggler]");
const /**{NodeElement} */ $searchField = document.querySelector("[data-search-field]");
let /**{Boolean} */isExpanded = false;

$searchToggler.addEventListener("click", function(){
    $header.classList.toggle("search-active");
    isExpanded = isExpanded ? false : true;
    this.setAttribute("aria-expanded", isExpanded);
    $searchField.focus();
});

// Tab Navigation

const /**{NodeList} */ $tabBtns = document.querySelectorAll("[data-tab-btn]");
const /**{Nodelist} */ $tabPanels = document.querySelectorAll("[data-tab-panel");
let /**{NodeElement} */ [$lastActiveTabBtn] = $tabBtns;
let /**{NodeElement} */ [$lastActiveTabPanel] = $tabPanels;

addEventOnElements($tabBtns, "click", function(){
  $lastActiveTabBtn.setAttribute("aria-selected", "false");
  $lastActiveTabPanel.setAttribute("hidden", "");

  this.setAttribute("aria-selected", "true");
  const /**{NodeElement} */ $currentTabPanel = document.querySelector(`#${this.getAttribute("aria-controls")}`);
  $currentTabPanel.removeAttribute("hidden");

  $lastActiveTabBtn = this;
  $lastActiveTabPanel = $currentTabPanel;
})


// Keyborad actions for tab buttons
addEventOnElements($tabBtns, "keydown", function(e){
  const /**{NodeElement} */ $nextElement = this.nextElementSibling;
  const /**{NodeElements} */ $previousElement = this.previousElementSibling;

  if(e.key === "ArrowRight" && $nextElement){
    this.setAttribute("tabindex", "-1");
    $nextElement.setAttribute("tabindex", "0");
    $nextElement.focus();
  }
  else if(e.key === "ArrowLeft" && $previousElement){
      this.setAttribute("tabindex", "-1");
      $previousElement.setAttribute("tabindex", "0");
      $previousElement.focus();
    }
  
})

/**
 * Work with API
 */

/**
 * Search
 */
const /***{NodeElement} */ $searchSubmit = document.querySelector("[data-search-submit]");
let /**{String} */ apiUrl = "https://api.github.com/users/aman1sal";

let /**{String} */ repoUrl, followerUrl, followUrl = "";


const searchUser = function(){
  if(!$searchField.value) return;

  apiUrl = `https://api.github.com/users/${$searchField.value}`;
  updateProfile(apiUrl);
}


$searchSubmit.addEventListener("click", searchUser);
// Search when press enter key
$searchField.addEventListener("keydown", e => {
  if(e.key === "Enter")searchUser();
})

/**Profile */

const /**{NodeElement} */ $profileCard = document.querySelector("[data-profile-card]");
const /**{NodeElement} */ $repoPanel = document.querySelector("[data-repo-panel]");
const /**{NodeElement} */ $error = document.querySelector("[data-error]");

window.updateProfile = function (profileUrl){

  $error.style.display = "none";
  document.body.style.overflow = "visible";
  $profileCard.innerHTML = `
  <div class="profile-skeleton">
    <div class="skeleton avatar-skeleton"></div>
    <div class="skeleyon title-skeleton"></div>
    <div class="skeleton text-skeleton text-1"></div>
    <div class="skeleton text-skeleton text-2"></div>
    <div class="skeleton text-skeleton text-3"></div>
  </div>
  `;

  $tabBtns[0].click();
  $repoPanel.innerHTML = `
  <div class="card repo-skeleton">
    <div class="card-body">
      <div class="skeleton title-skeleton"></div>
      <div class="skeleton text-skeleton text-1"></div>
      <div class="skeleton text-skeleton text-2"></div>
    </div>

    <div class="card-footer">
      <div class="skeleton text-skeleton"></div>
      <div class="skeleton text-skeleton"></div>
      <div class="skeleton text-skeleton"></div>
    </div>
  </div>
  `.repeat(6);
}

updateProfile(apiUrl)