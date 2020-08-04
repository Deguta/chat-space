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
      `<div class="message-list__name" data-message-id=${message.id}>
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
      $('.message-form__new-message__submit-btn').prop('disabled', false);
  });
  })

      var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message-list__name:last').data("message-id");

        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: "api/messages",
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {last_message_id: last_message_id}
        })

        .done(function(messages) {
          console.log(messages)
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.message-list').append(insertHTML);
        })
        .fail(function() {
          alert('error');
        });
      };
      setInterval(reloadMessages, 7000);
});
