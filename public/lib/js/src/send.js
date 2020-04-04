'use strict';

let isSending = false, sendURL = process.env.API_SEND;
document.getElementById('send-btn').addEventListener('click', function(){
  if (isSending) return;
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

  if (isEmpty){
    isSending = false;
    return document.getElementById('send-missing').classList.add('show');
  }

  const body = {
    msg: `Anonymous: ${anom}\n\nName: ${vals.name}\n\nHometown: ${vals.hometown}\n\nMessage: ${vals.message}`,
  };

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    isSending = false;

    const res = JSON.parse(xhr.responseText) || null;

    console.log(xhr.responseText);
    console.log(xhr.status);
    if ((res && res.success) || (xhr.status >= 200 && xhr.status < 300)){
      // success
      document.getElementById('send-sent').classList.add('show');
    } else {
      // failed
      console.log('The request failed!');
    }
  };
  xhr.open('POST', sendURL);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`msg=${body.msg}`);
});
