$(function(){
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message-list__name">
         <div class="message-list__name__upper-message">
           <div class="message-list__name__upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="message-list__name__upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message-list__name__lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message-list__name">
         <div class="message-list__name__upper-message">
           <div class="message-list__name__upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="message-list__name__upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message-list__name__lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
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
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.message-form__new-message__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});