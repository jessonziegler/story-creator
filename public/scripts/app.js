// Client facing scripts here

$(document).ready(function () {
  console.log("Dom is ready");

const loadStories = function () {
  $.get("/api/stories").then((data) => {
    console.log(data);
    renderStories(data.stories, data.contributions);
  });
};

const renderStories = function (stories, contributions) {
  $("#posted-stories-container").empty();
  for (const story of stories) {
    // calls createStoryElement for each story
    const $newStory = createStoryElement(story, contributions);
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

function createStoryElement(storyData, contributions) {

  const filtered = contributions.filter((contribution)=> contribution.stories_id === storyData.id)
  console.log(filtered)
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

     const $editButton = $(`
      <button id = editButton type="editButton" class="btn btn-primary editButton">Edit</button>
     `);

     $storyElement.append($editButton);


    const $editForm = $(`
    <form id="edit-form" class="edit">
    <textarea class ="editTitle" name="editTitle" rows="1" cols="80">${storyData.title}</textarea><br/>
    <textarea class ="editContent" name="editContent" rows="4" cols="100">${storyData.content}</textarea>
    <h5><p id="errorEdit"></p></h5>
    <br/>
    <input id="editSubmit" class="btn btn-secondary" type="submit" value="Edit">
    </form>
    `);

    $editForm.hide();
    $($editButton).click(() => {
      $editForm.show()
      console.log("edit click");
    })
    $editForm.hide();


    const $newDiv = $(`<div>`)
    for (let filter of filtered){
      const content = $(`<h6>${filter.contribution}</h6>`)
    $newDiv.append(content)
    }


    $storyElement.append($editForm, $newDiv);

    $editForm.submit(function (event) {
      event.preventDefault();
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

    const $contributionButton = $(`
    <button type="button" id="contribution" class="btn btn-warning">Contributions</button>
    `);

   $storyElement.append($contributionButton);

    const $contributeForm = $(`
    <div class = "contribution-content"> </div>
    <form class="contribute-form">
      <textarea class="contribution-content" name="submit" placeholder= "Share your imagination with us!"></textarea><br/>
      <input id="submit" class="btn btn-dark" type="submit" value="Submit">s
      </form>
    `);

    $storyElement.append($contributeForm);


    $contributeForm.hide();
    $($contributionButton).click(() => {
      $contributeForm.show()
      console.log("contribute click");
    })


      $contributeForm.submit(function (event) {
      event.preventDefault();
      const data = $contributeForm.serialize();
      $.ajax({
        type: "POST",
        url: `/api/contributions/${storyData.id}`,
        data,
      }).then(() => {
        $(".contributionContent").val("");
        loadStories();
      });
    });


    const $deleteButton = $(`
    <button type="button" class="btn btn-danger">Delete</button>`
  );

  $storyElement.append($deleteButton);

  $deleteButton.click(function (event) {
    $.ajax({
      type: "DELETE",
      url: `/api/stories/${storyData.id}`,
    }).then(() => {
      loadStories();
    });
  });


  return $storyElement;
}


});
