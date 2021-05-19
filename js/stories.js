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



  let star = '';
  let trash = '';
  if(currentUser){
    trash = `
      <span class="trash">
        <i class="fas fa-trash-alt"></i>
      </span>
    `;

    if( currentUser.favorites.some(e => e.storyId === story.storyId) ){ 
      star = `<span class="star">
                <i class="fa-star fas"></i>
              </span>`
    }
    else{
      star = `<span class="star">
                <i class="fa-star far"></i>
              </span>`
    }
  }
  


  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      ${star}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        ${trash}
      </li>
    `);//fa-star class is a star icon, far is empty, fas is filled
    //put in a delete button
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

function putFavsOnPage() {
  console.debug("putFavsOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
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
  if(!currentUser) return //don't star if not logged in
  
  console.log('star', evt.target.classList.contains('fas'));
  
  const $star = $(evt.target); //gota use jquery object to use its methods later
  const star = evt.target;
  console.log(star)
  const hasFavClass = $star.hasClass('fas'); //if favorited return 1, if not return 0

  const $storyid = $star.closest('li').attr('id')
  const story = storyList.stories.find(ele => ele.storyId === $storyid);

  if(hasFavClass){
    $star.toggleClass('fas');
    $star.toggleClass('far');
    //call removeFav from models.js
    await currentUser.removeFav(story);
  }else{
    $star.toggleClass('far');
    $star.toggleClass('fas');
    //call addFav from model.js
    await currentUser.addFav(story);
  }

  
});

$allStoriesList.on('click', '.trash', async function(evt){
  if(!currentUser) return //don't star if not logged in
  
  
  const $del = $(evt.target); //gota use jquery object to use its methods later
  const del = evt.target;
  console.log(del)
  
  const $storyid = $del.closest('li').attr('id')
  const story = storyList.stories.find(ele => ele.storyId === $storyid);


  await storyList.delPost(story, currentUser);
  console.log('poop')

  // if(hasFavClass){
  //   $star.toggleClass('fas');
  //   $star.toggleClass('far');
  //   //call removeFav from models.js
  //   await currentUser.removeFav(story);
  // }else{
  //   $star.toggleClass('far');
  //   $star.toggleClass('fas');
  //   //call addFav from model.js
  //   await currentUser.addFav(story);
  // }

  
});