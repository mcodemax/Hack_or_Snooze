"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);


  //const htmlInsert = currentUser ? 

  //if(addFav)

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class="star">
        <i class="fa-star far"></i>
      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <input type="checkbox" class="favorites star" id="fav-${story.storyId}">
      </li>
    `);//fa-star class is a star icon, far is empty, fas is filled
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** called when users click submit btn to post */
async function postNewStory(evt){//called by navMakePost
  console.debug("postNewStory", evt);
  //get data from form
  const postAuthor = $('#author-post').val();
  const postUrl = $('#url-post').val()
  const postTitle = $('#title-post').val()
  console.log(postAuthor, postUrl, postTitle);

  //call addStory method
  const story = await storyList.addStory(currentUser,
    {title: postTitle, author: postAuthor, url: postUrl});

  console.log(story)

  const storyHTML = generateStoryMarkup(story);
  $allStoriesList.prepend(storyHTML);
  //put new story on UI
}

$allStoriesList.on('click', '.fa-star', async function(evt){
  console.log('star', evt.target.classList.contains('fas'));
  const $star = $(evt.target); //gota use jquery object to use its methods later
  const star = evt.target;
  const hasFavClass = $star.hasClass('fas'); //if favorited return 1, if not return 0

  if(hasFavClass){
    $star.toggleClass('fas');
    $star.toggleClass('far');
  }else{
    $star.toggleClass('far');
    $star.toggleClass('fas');
  }

  
  //find nearest li, get its id
});