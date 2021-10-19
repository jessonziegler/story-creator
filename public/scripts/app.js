// Client facing scripts here
// A $( document ).ready() block.


const loadStories = function () {
  $.ajax({
    method: 'GET',
    url: "/api/stories",
    dataType: 'JSON'
  })
  .done(function(data) {

    renderStories(data.stories);

  })
  .fail(err => console.log(`Error: #{err.message}`))
  }
  loadStories();



const renderStories = function(stories) {
// loops through tweets

  $('#posted-stories-container').empty();
  for(const story of stories){
    // calls createStoryElement for each story
    const $newStory = createStoryElement(story);
    // takes return value and appends it to the tweets container
    $('#posted-stories-container').prepend($newStory); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}

function createStoryElement(storyData) {

  const markup = `
   <article class="story-data">

     <div class="story-header">
       <div>

         <h3 class="story-title">${storyData.title}</h3>
         <p class="story-content">${storyData.content}</p>

     <button type="button" class="btn btn-primary">Edit</button>
     <button type="button" class="btn btn-info">Contributions</button>
     <button type="button" class="btn btn-danger">Delete</button>

     <hr class="solid">

     <footer class="story-footer">
       <div class ="story-icons">
         <i class="fas fa-flag"></i>
         <i class="fas fa-retweet"></i>
         <i class="fas fa-heart"></i>
         <hr class="solid">
       </div> <br/>
     </footer>

   </article>
   `;
 return markup;

 }

  $( document ).ready(function() {
    console.log("Dom is ready")
    loadStories();


   $('#new-product-form').submit( function (event) {

    event.preventDefault(); //cancel the submit action by calling .preventDefault()

    /** jQuery .serialize() function turns a set of form data into a query string.
     * This serialized data should be sent to the server
     * in the data field of the  AJAX POST request
     */
    let storyTitle = $('.title').val()
    let storyContent = $('.content').val();

    console.log("console from app.js dom: " + storyTitle, storyContent);

    $.ajax({
      type: "POST",
      url: '/api/stories',
      data: {title: storyTitle, content: storyContent}
    })
    .then(() => {
      $('.title').val('');
      $('.content').val('');
      loadStories();
    })

  });



});

