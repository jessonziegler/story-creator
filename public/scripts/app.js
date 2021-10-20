// Client facing scripts here

const loadStories = function () {
  $.get("/api/stories").then((data) => {
    console.log(data.stories);
    renderStories(data.stories);
  });
};

const renderStories = function (stories) {

  $("#posted-stories-container").empty();
  for (const story of stories) {
    // calls createStoryElement for each story
    const $newStory = createStoryElement(story);

    // takes return value and appends it to the stories container
    $("#posted-stories-container").prepend($newStory); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

function createStoryElement(storyData) {
  const $storyElement = $(`
   <article class="story-data">
     <div class="story-header">
       <div>
         <h3 class="story-title">Story ${storyData.id}. ${storyData.title} </h3>
     <p class="story-content">${storyData.content}</p>
     <button type="button" class="btn btn-danger">Delete</button>
     <hr class="solid">
     <footer class="story-footer">
       <div class ="story-icons">
         <i class="fas fa-heart"></i>
         <hr class="solid">
       </div> <br/>
     </footer>
   </article>
     `);



    const $editForm = $(`

    <form class="edit">
    <textarea class ="editTitle" name="editTitle" rows="1" cols="80" value="${storyData.title}"></textarea><br/>
    <textarea class ="editContent" name="editContent" rows="4" cols="100" value="${storyData.content}"></textarea>
    <div class="error"> <h5><p id="error"></p></h5></div>
    <br/>
    <input id="editSubmit" class="btn btn-primary" type="submit" value="Edit">
    </form>
    `);

    $storyElement.append($editForm);

    $editForm.submit(function (event) {
      event.preventDefault(); //cancel the submit action by calling .preventDefault()
      const data = $editForm.serialize();
      console.log("edit data: " + data);

      $.post(`api/stories/${storyData.id}`, data)
        .then(() => {
          loadStories();
        });
    });

    const $contributeForm = $(`
    <div class = "contribution-content"> </div>
    <button type="button" id="contribution" class="btn btn-info">Contributions</button>

    <form class="contribute-form">
      <textarea class="contribution-content" name="submit" placeholder= "Share your imagination with us!"></textarea><br/>
      <input id="submit" class="btn btn-primary" type="submit" value="Submit">
      </form>
    `);

    $storyElement.append($contributeForm);

  return $storyElement;
}

$(document).ready(function () {
  console.log("Dom is ready");
  loadStories();


  const $newStories = $("#new-story-form");
  $newStories.submit(function (event) {
    console.log(
      "Submit Story Button clicked and handler for submit story button is called"
    );
    event.preventDefault(); //cancel the submit action by calling .preventDefault()
    const data = $newStories.serialize();
    console.log(data);

    if (!$.trim($(".content").val()) || !$.trim($(".title").val())) {
      return $("#error").text("❗️Error: Please enter text");
    }
    $("#error").text("");

    $.ajax({
      type: "POST",
      url: "/api/stories",
      data,
    }).then(() => {
      console.log("so far, so good");
      $(".title").val("");
      $(".content").val("");
      loadStories();
    });
  });



  const $contribution = $("#contribution");


  $("body").on("submit", ".contribute-form", function (event) {
    console.log("User wants to add to a story!");
    event.preventDefault();
    const data = $(this).serialize().slice(7);
    console.log($(this));
    $(this).parent().find(".contribution-content").append(`<p>${data}</p><br>`);
  });



});
