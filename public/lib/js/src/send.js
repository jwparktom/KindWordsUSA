'use strict';

let isSending = false, sendURL = process.env.API_SEND;
document.getElementById('send-btn').addEventListener('click', function(){
  isSending = true;
  document.getElementById('send-missing').classList.remove('show');
  document.getElementById('send-sent').classList.remove('show');

  let isEmpty = false;

  const vals = {
    name: document.getElementById('send-name').value.trim(),
    hometown: document.getElementById('send-hometown').value.trim(),
    message: document.getElementById('send-message').value.trim(),
  };

  const anom = document.getElementById('send-opt-anonymous').checked;

  const vals_ = Object.values(vals);
  for (let i = 0; i < vals_.length; i++){
    if (vals_[i] === ''){
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) return document.getElementById('send-missing').classList.add('show');

  const body = {
    msg: `Anonymous: ${anom}\n\nName: ${vals.name}\n\nHometown: ${vals.hometown}\n\nMessage: ${vals.message}`,
  };

  let sendURLwithBody = `${sendURL}?msg=${body.msg}`;

  fetch(sendURLwithBody)
    .then(res => {
      console.log(res);
      document.getElementById('send-sent').classList.add('show');
    })
    .catch(err => {
      console.log(err);
    });
  // const xhr = new XMLHttpRequest();
  // xhr.onload = () => {
  //   if (xhr.status >= 200 && xhr.status < 300){
  //     // success
  //     // console.log('success!', xhr);
  //     document.getElementById('send-sent').classList.add('show');
  //   } else {
  //     // failed
  //     console.log('The request failed!');
  //   }
  // };
  // xhr.open('GET', sendURL);
  // xhr.send(body);
});
