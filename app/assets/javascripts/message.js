$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main__box" data-message-id=${message.id}>
         <div class="main__box__info">
           <div class="main__box__info__name">
             ${message.user_name}
           </div>
           <div class="main__box__info__time">
             ${message.created_at}
           </div>
         </div>
         <p class="main__box__message">
            ${message.content}
         </p>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main__box" data-message-id=${message.id}>
        <div class="main__box__info">
          <div class="main__box__info__name">
            ${message.user_name}
          </div>
          <div class="main__box__info__time">
            ${message.created_at}
          </div>
        </div>
        <p class="main__box__messege">
          ${message.content}
        </p>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main').append(html);
    $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
})
  var reloadMessages = function() {
      last_message_id = $('.main__box:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main').append(insertHTML);
          $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
          $("#new_message")[0].reset();
          $(".form__submit").prop("disabled", false);
        }
      })
      .fail(function() {
        console.log('error');
      });
    };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});