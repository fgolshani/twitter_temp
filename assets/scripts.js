var _selectedPost;
var _editedPostDescription;
var _selectedPostDescription;
var _csrf_token;

function deleteOnClick()
{

  $.ajax({
  type: "POST",
  url: "/delete_tweet/",
  data: {'id' : _selectedPost, 'csrfmiddlewaretoken' :_csrf },
  success: function(err){
    location.reload();
  },
});

}

function editOnClick()
{

  $.ajax({
  type: "POST",
  url: "/edit_tweet/",
  data: {'id' : _selectedPost, description : _editedPostDescription, 'csrfmiddlewaretoken' :_csrf },
  success: function(err){
    location.reload();
  },
});

}



///////////////////////////////////////////////////////////////////

$(document).ready(()=>{

  $(document).on("click", ".openDeleteDialog", function () {


       _selectedPost = $(this).data('id');
       $('#deleteModal').modal('show');
       $('<input>').attr({
         type: 'hidden',
         name: 'id',
         value: _selectedPost
       }).appendTo('deleteForm');
  });

  $(document).on("click", ".openEditDialog", function () {
       _selectedPost = $(this).data('id');
       _selectedPostDescription = $($(this).parent().siblings().filter("#postDescription")).html()
       $('#editedPostDescription').val(_selectedPostDescription)
       $('#editModal').modal('show');
  });

  $(document).on("click", "#editPostDescriptionButton", function(){
    console.log("???")
    _csrf = $("#deleteForm").data('csrf');
    _editedPostDescription = $("#editedPostDescription").val()
    editOnClick();
    $('#editModal').modal('hide');

  })

  $(document).on("click", "#deletePostDescriptionButton", function(){
    _csrf = $("#deleteForm").data('csrf');
    deleteOnClick();
    $('#deleteModal').modal('hide');

  })

})
