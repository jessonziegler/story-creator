// Client facing scripts here


const loadStories = function () {
    $.get('/api/stories')
      .then((data) => {
        console.log(data.stories);
        renderStories(data.stories);
      });
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
     <button type="button" class="btn btn-primary">Edit</button>
     <button type="button" id="contribution" class="btn btn-info">Contributions</button>

     <form class="contribute-form">
       <textarea name="submit" placeholder= "Share your imagination with us!"></textarea><br/>
       <input id="submit" class="btn btn-primary" type="submit" value="Submit">
       </form>
     <button type="button" class="btn btn-danger">Delete</button>
     <hr class="solid">
     <footer class="story-footer">
       <div class ="story-icons">
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
   // to check if textarea is empty and no white space

   const $newStories = $('#new-product-form');
   $newStories.submit( function (event) {
    console.log("Submit Story Button clicked and handler for submit story button is called");
    event.preventDefault(); //cancel the submit action by calling .preventDefault()
    const data = $newStories.serialize();
    console.log(data);

    if (!$.trim($(".content").val())) {
      return $('#error').text('❗️Error: Please enter text');
    }
     $('#error').text('');
    /** jQuery .serialize() function turns a set of form data into a query string.
     * This serialized data should be sent to the server
     * in the data field of the AJAX POST request
     */
   /* let storyText = $(this).serialize(); */

    $.ajax({
      type: "POST",
      url: "/api/stories",
      data
    })
    .then(() => {
      console.log('so far, so good')
      $('.content').val('');
      loadStories();
    })
  });

  const $contribution = $('#contribution');
  const $contributeForm = $('.contribute-form');

  $('body').on('submit', '.contribute-form', function (event) {
    console.log("User wants to add to a story!")
    event.preventDefault();
    const data = $(this).serialize();
    console.log($(this));
    $(this).parent().find('.story-content').append(data);
  })
});
