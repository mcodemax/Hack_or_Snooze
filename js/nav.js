"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  

  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();

  //now that user is logged in show favorites/submit bar
  $navFavs.show();
  $navSubmit.show();
}

$navPoster.on("click", navMakePost);

$navSubmit.on("click", function(evt){
  $addStory.toggleClass('hidden')


})


//shows the user's favorites
$navFavs.on("click", function(evt){
  hidePageComponents();
  $favStoriesList.removeClass('hidden');

  putFavsOnPage();
  //now loop through favorites and show favorite
});


/** Show a new post on the UI */
function navMakePost(evt){
  console.debug("navMakePost", evt);
  //hidePageComponents();

  postNewStory(evt);
  $navPoster.show();//nav-post, shows submit btn w/id nav-post
}