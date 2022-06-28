const swipe = document.getElementById('swipe')
const timeContainer = document.getElementById('time-container')
const loginContainer = document.getElementById('login-container')

dragElement(swipe);

function dragElement(element) {
  var pos2 = 0, pos4 = 0;
  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;
  } else {
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos4 = e.clientY;
    document.onmouseup = () => {
      closeDragElement()
    };
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    loginContainer.style.top = (element.offsetTop - pos2 + 420) + 'px';
    if (!(pos4 > window.outerHeight/2)) {
      closeDragElement()
      element.style.display = 'none';
      timeContainer.style.animation = 'fadeOut 0.5s ease forwards'
      loginContainer.style.animation = 'dragFullDown 0.5s ease forwards'
    }
  }

  function closeDragElement() {
    if (pos4 > window.outerHeight/2) {
      loginContainer.style.top = null
      loginContainer.style.bottom = '-860px';
    }
    element.style.top = null;
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.getElementById('login-btn').addEventListener('click', function(){
  console.log('a')
  authenticationStart(
    document.getElementById('email-input').value,
    document.getElementById('password-input').value,
    document.getElementById('api-input').value
  )
})

async function authenticationStart(email, password, apikey) {
  if (email.length == 0 && password.length == 0 && apikey.length == 0) return

  try {
    const request = await fetch('https://enigmapr0ject.tech/api/avdan/login.php', {
      method: 'POST',
      body: `Email=${email}&Password=${password}&apikey=${apikey}`
    })

    if (request.status !== 200) console.log(request.status)
    const data = await request.text();
    const status = document.createElement('div')

    switch (data) {
      case '401':     
        status.setAttribute('class', 'login-status failed')
        status.innerHTML = 'No, login failed!'
        document.getElementById('login-account-container').appendChild(status)
      case '403':
        status.setAttribute('class', 'login-status failed')
        status.innerHTML = 'No, login failed!'
        document.getElementById('login-account-container').appendChild(status)
      case '200': 
        status.setAttribute('class', 'login-status success')
        status.innerHTML = 'Yes, account logged in!'
        document.getElementById('login-account-container').appendChild(status)
    }

  } catch (e) {
    console.log(e)
  }
}

// async function startAuthentication() {
//   try {
//     this._tooltipPassword.classList.remove('tooltip-error');
//     this._passwordBox.classList.remove('authentication-failed');
//     this._apikeyBox.classList.remove('authentication-failed');
//   }
//   catch (e) {
//     console.log(e);
//   }
//   const userData = {
//     email: this._emailInput.value,
//     password: this._passwordInput.value,
//     apiKey: this._apikeyInput.value
//   }
//   const email = userData.email;
//   const pass = userData.password;
//   const key = userData.apiKey;
//   try {
//     if(email.length>0 && pass.length>0 && key.length>0){
      
//       console.log("Sending request");
//       const request = await fetch('https://enigmapr0ject.tech/api/avdan/login.php', {
//       method: 'POST',
//       body: `Email=${userData.email}&Password=${userData.password}&apikey=${userData.apiKey}`,
//     })
//     if (request.status !== 200) return this._authenticationFailed(true);

//     console.log(request);

//     const data = await request.text();

//     console.log("data :",data);

//     switch (data) {
//       case '401':
//         this._authenticationFailed(false, true);
//         break;
//       case '403':
//         this._authenticationFailed();
//         break;
//       case '200':
//         lightdm.respond("avdan");
//         this._authenticationComplete();
//         break;
//       default:
//         this._authenticationFailed(true);
//         break;
//     }
//   } else {
//     console.log("Empty fields text sent");
//     this._tooltipPassword.innerText = 'Empty fields.';
//     this._apikeyBox.classList.add('authentication-failed');
//     this._tooltipPassword.classList.add('tooltip-error');
//     this._apikeyInputContainer.classList.add('shake');
//     setTimeout(
//       () => {
//         // Stop shaking
//         this._apikeyInputContainer.classList.remove('shake');
//       },
//       500
//       );
//     }
//   }
// catch (e) {
//   console.log(e);
//   }
// } 