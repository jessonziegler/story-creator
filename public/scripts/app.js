// Client facing scripts here

$(document).ready(function () {
  console.log("Dom is ready");

const loadStories = function () {
  $.get("/api/stories").then((data) => {
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

loadStories();


const $newStories = $("#new-story-form");
$newStories.submit(function (event) {

  // "Submit Story Button clicked and handler for submit story button is called"
  event.preventDefault(); //cancel the submit action by calling .preventDefault()
  const data = $newStories.serialize();
  if (!$.trim($(".content").val()) || !$.trim($(".title").val())) {
    return $("#error").text("❗️Error: Please enter text");
  }
  $("#error").text("");

  $.ajax({
    type: "POST",
    url: "/api/stories",
    data,
  }).then(() => {
    $(".title").val("");
    $(".content").val("");
    loadStories();
  });
});

function createStoryElement(storyData) {
  const $storyElement = $(`
   <article class="story-data">
     <div class="story-header">
       <div>
         <h3 class="story-title">${storyData.title} </h3>
     <p class="story-content">${storyData.content}</p>
     <hr class="solid">
     <footer class="story-footer">
       <div class ="story-icons">

       </div> <br/>
     </footer>
   </article>
     `);

    const $editForm = $(`
    <form class="edit">
    <textarea class ="editTitle" name="editTitle" rows="1" cols="80">${storyData.title}</textarea><br/>
    <textarea class ="editContent" name="editContent" rows="4" cols="100">${storyData.content}</textarea>
    <h5><p id="errorEdit"></p></h5>
    <br/>
    <input id="editSubmit" class="btn btn-primary" type="submit" value="Edit">
    </form>
    `);

    $storyElement.append($editForm);

    $editForm.submit(function (event) {
      event.preventDefault(); //cancel the submit action by calling .preventDefault()
      const data = $editForm.serialize();

      if (!$.trim($(".editContent").val()) || !$.trim($(".editTitle").val())) {
        return $("#errorEdit").text("❗️Error: Please enter text");
      }
      $("#errorEdit").text("");
      $.ajax({
        type: "POST",
        url: `/api/stories/${storyData.id}`,
        data,
      }).then(() => {
        $(".title").val("");
        $(".content").val("");
        loadStories();
      });
    });


    const $deleteButton = $(`
      <button type="button" class="btn btn-danger">Delete</button>`
    );

    $storyElement.append($deleteButton);

    $deleteButton.click(function (event) {
      // const data = $deleteButton.serialize();
      $.ajax({
        type: "DELETE",
        url: `/api/stories/${storyData.id}`,
      }).then(() => {
        loadStories();
      });
    });

    // function contribute(contributions) {

      const $contributeForm = $(`
      <div class = "contribution-content"> </div>

      <button type="button" id="contribution" class="btn btn-info">Contributions</button>
      <form class="contribute-form">
        <textarea class="contributionContent" name="submit" placeholder= "Share your imagination with us!"></textarea><br/>
        <input id="submit" class="btn btn-primary" type="submit" value="Contribute">
      </form><br/>
        <hr class="solid">
        </br>
        <hr class="solid"> <br/>
      `);
      // return $contributeForm;
    // }


    $storyElement.append($contributeForm);


    // const loadContributions = function () {
    //   $.get("/api/contributions").then((data) => {
    //     console.log(data);
    //     renderStories(data.contributions);
    //   });
    // };

    // const renderStories = function (contributions) {
    //   $("#posted-stories-container").empty();
    //   for (const contribution of contributions) {
    //     // calls createStoryElement for each story
    //     const $newContribution = contribute(contribution);
    //     // takes return value and appends it to the stories container
    //     $("#posted-stories-container").prepend($newContribution); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    //   }
    // };



      $contributeForm.submit(function (event) {
      event.preventDefault();
      const data = $contributeForm.serialize();
      $.ajax({
        type: "POST",
        url: `/api/contributions/${storyData.id}`,
        data,
      }).then(() => {
        $(".contributionContent").val("");
        // loadContributions();
      });
    });


  return $storyElement;
}



  // const $contribution = $("#contribution");


  // $("body").on("submit", ".contribute-form", function (event) {
  //   console.log("User wants to add to a story!");
  //   event.preventDefault();
  //   const data = $(this).serialize().slice(7);
  //   console.log($(this));
  //   $(this).parent().find(".contribution-content").append(`<p>${data}</p><br>`);
  // });



});
