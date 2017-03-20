$(document).ready(function() {

  

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


/*** If no valid session could be started, show the login interface ***/

//*** Set up sinchClient ***/


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


/*** Check for valid session. NOTE: Deactivated by default to allow multiple browser-tabs with different users. Remove "false &&" to activate session loading! ***/

var sessionObj = JSON.parse(localStorage[sessionName] || '{}');

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


/*** Create user and start sinch for that user and save session in localStorage ***/

$('#createAccount').on('click', function(event) {
	
	clearError();

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
		}).fail(handleError);
	}).fail(handleError);
});


/*** Login user and save session in localStorage ***/

$('#account-login').on('click', function(event) {
	event.preventDefault();
	clearError();

	var signInObj = {};
	signInObj.username = $('#loginEmail').val();
	signInObj.password = $('#loginPassword').val();

	//Use Sinch SDK to authenticate a user
	sinchClient.start(signInObj, function() {
		global_username = signInObj.username;
		//On success, show the UI
		showUI();

		//Store session & manage in some way (optional)
		localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
	}).fail(handleError);
});


/*** Send a new message ***/

vvar messageClient = sinchClient.getMessageClient();

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
		//$('div#'+messageDeliveryInfo.messageId+' div.recipients').append(messageDeliveryInfo.recipientId + ' ');
		$('div#'+messageDeliveryInfo.messageId+' div.recipients').append('<img src="style/delivered_green.png" title="'+messageDeliveryInfo.recipientId+'">');
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





})