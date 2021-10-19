// Client facing scripts here
// A $( document ).ready() block.


const loadStories = function () {
  $.ajax({
    method: 'GET',
    url: "/api/stories",
    dataType: 'JSON'
  })
  .done(function(data) {
    console.log("Sucess: loading stories call render");
    console.log(data.stories)
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
    // Test / driver code (temporary)
    console.log($newStory); // to see what it looks like
    // takes return value and appends it to the tweets container
    $('#posted-stories-container').prepend($newStory); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}

  //Preventng cross-site scripting with an escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

function createStoryElement(storyData) {

  const markup = `
   <article class="story-data">

     <div class="story-header">
       <div>

         <h3 class="story-title">${storyData.title}</h3>


     <p class="story-content">${escape(storyData.content)}</p>

     <hr class="solid">

     <footer class="story-footer">
       <div class ="story-icons">
         <i class="fas fa-flag"></i>
         <i class="fas fa-retweet"></i>
         <i class="fas fa-heart"></i>
       </div> <br/>
     </footer>

   </article>
   `;
 return markup;

 }

$( document ).ready(function() {
  console.log("Dom is ready")
  loadStories();


   // to check if textarea is empty and no white space


   $('.type-story').submit( function (event) {
    console.log("Submit Story Button clicked and handler for submit story button is called");
    event.preventDefault(); //cancel the submit action by calling .preventDefault()

    if (!$.trim($(".type-story").val())) {
      return $('#error').text('❗️Error: Please enter text');
    }

     $('#error').text('');


    /** jQuery .serialize() function turns a set of form data into a query string.
     * This serialized data should be sent to the server
     * in the data field of the AJAX POST request
     */
    let storyText = $(this).serialize();

    console.log(storyText);

    $.ajax({
      type: "POST",
      url: '/api/stories',
      data: storyText
    })
    .then(() => {
      $('.type-story').val('');

      loadTweets();
    })

  });



});

