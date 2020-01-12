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
});