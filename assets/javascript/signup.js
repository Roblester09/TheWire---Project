$(document).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWjD9kZIz9VNzDOyOT5d9dG0d6cbRDozU",
    authDomain: "be-selekt.firebaseapp.com",
    databaseURL: "https://be-selekt.firebaseio.com",
    storageBucket: "be-selekt.appspot.com",
    messagingSenderId: "274079531363"
  };

  firebase.initializeApp(config);

  var database = firebase.database();


var global_username = '';



/*** After successful authentication, show user interface ***/

var showUI = function() {
	$('div#chat').show();
	$('form#userForm').css('display', 'none');
	$('div#userInfo').css('display', 'inline');
	$('span#username').text(global_username);

	$('form#newRecipient').show();
	$('input#recipients').focus();
}

sinchClient = new SinchClient({
	applicationKey: '6cbbe8d6-e73e-4135-b53a-7fc8c79907e4',
	capabilities: {messaging: true},
	startActiveConnection: true,
	//Note: For additional loging, please uncomment the three rows below
	onLogMessage: function(message) {
		console.log(message);
	}
});

/*** Name of session, can be anything. ***/

var sessionName = 'sinchSession-' + sinchClient.applicationKey;


/*** Check for valid session. NOTE: Deactivated by default to allow multiple browser-tabs with different users. Remove "false &&" to activate session loading! ***/var sessionObj = JSON.parse(localStorage[sessionName] || '{}');

if(sessionObj.userId) { //Remove "false &&"" to actually check start from a previous session!
	sinchClient.start(sessionObj)
		.then(function() {
			global_username = sessionObj.userId;
			//On success, show the UI
			showUI();
			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());

	event.preventDefault();
	clearError();
		})
		.fail(function() {
			//No valid session, take suitable action, such as prompting for username/password, then start sinchClient again with login object
		});
}
else {
}



  var database = firebase.database();


  

$('#createAccount').on('click', function(){
	var email = $('#userEmail').val().trim();
	var password = $('#userPassword').val();

	console.log(email);
	console.log(password);

	 // Need to implement if statement (if successful then redirect on click)
	 setTimeout(function(){
	 window.location.replace('profile.html'); }, 3200);

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  console.log(errorMessage);
	  console.log(errorCode);

	

	  // ...
	});


	var signUpObj = {};
	signUpObj.username = $('#userEmail').val();
	signUpObj.password = $('#userPassword').val();


	//Use Sinch SDK to create a new user
	sinchClient.newUser(signUpObj, function(ticket) {
		//On success, start the client
		sinchClient.start(ticket, function() {
			global_username = signUpObj.username;
			//On success, show the UI
			showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		});
	});


});



firebase.auth().onAuthStateChanged(function(user) {
	        if (user) {
	        	$('.signed-in').hide();
           		$('.chat-btn').show();
           		$('#dashboard').show()
	        	console.log("Login Successful!")
	        	var signInObj = {};
				signInObj.username = $('#loginEmail').val();
				signInObj.password = $('#loginPassword').val();
				
var userId = user.uid;
	//Use Sinch SDK to authenticate a user
			sinchClient.start(signInObj, function() {
				global_username = signInObj.username;
				//On success, show the UI
				showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
			});
	         
	        } else {
	            return false;
	        }
 });


$('#account-login').on('click', function(){
	var email = $("#loginEmail").val().trim();
	var password = $('#loginPassword').val();

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.

	  var errorCode = error.code;
	  var errorMessage = error.message;

	  console.log(errorCode);
	  console.log(errorMessage);

	});

	setTimeout(function(){
	 window.location.replace('profile.html'); }, 3200);
});



var messageClient = sinchClient.getMessageClient();

$('form#newMessage').on('submit', function(event) {
	event.preventDefault();
	clearError();

	var recipients = $('input#recipients').val().split(' ');
	var text = $('input#message').val();
	$('input#message').val('');

	//Create new sinch-message, using messageClient
	var sinchMessage = messageClient.newMessage(recipients, text);
	//Send the sinchMessage
	messageClient.send(sinchMessage).fail(handleError);

	var audio = new Audio('assets/sounds/beep.mp3' ) ;
	audio.play();
	

});



$('form#newRecipient').on('submit', function(event) {
	event.preventDefault();

	$('form#newMessage').show();
	$('input#message').focus();
});

/*** Handle incoming messages ***/

var eventListener = {
	onIncomingMessage: function(message) {
		$('div#chatArea').prepend('<div class="msgRow" id="'+message.messageId+'"></div><div class="clearfix"></div>');
		var audio = new Audio('assets/sounds/tick.mp3' ) ;
		audio.play();
		$('div.msgRow#'+message.messageId)
			.attr('class', global_username == message.senderId ? 'me' : 'other')
			.append([
				'<div id="from">'+message.senderId+' <span>'+message.timestamp.toLocaleTimeString()+(global_username == message.senderId ? ',' : '')+'</span></div>', 
				'<div id="pointer"></div>',
				'<div id="textBody">'+message.textBody+'</div>',
				'<div class="recipients"></div>'
			]);
	}
}

messageClient.addEventListener(eventListener);



/*** Handle delivery receipts ***/ 

var eventListenerDelivery = {
	onMessageDelivered: function(messageDeliveryInfo) {
		$('div#'+messageDeliveryInfo.messageId+' div.recipients').append(messageDeliveryInfo.recipientId + ' ');
		$('div#'+messageDeliveryInfo.messageId+' div.recipients').append('<img src="assets/images/check.png" title="'+messageDeliveryInfo.recipientId+'">');
	}
}

messageClient.addEventListener(eventListenerDelivery);


/*** Log out user ***/



/*** Handle errors, report them and re-enable UI ***/

var handleError = function(error) {
	//Enable buttons
	$('button#createUser').prop('disabled', false);
	$('button#loginUser').prop('disabled', false);

	//Show error
	$('div.error').text(error.message);
	$('div.error').show();
}

/** Always clear errors **/
var clearError = function() {
	$('div.error').hide();
}




}) // document ready


