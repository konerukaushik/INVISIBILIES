<html>
<head>
<link rel="stylesheet" href="css/switch.css">
<link rel="stylesheet" href="css/style.css">
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="scripts/invi_functions.js" type="text/javascript"></script>
<script>
var user_info=null;
var uid=null;
window.fbAsyncInit = function() {
    FB.init({
      appId      : '460774547389669', //FB_APP_ID
//      channelUrl : "//connect.facebook.net/en_US/all.js", // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
      version    : 'v2.3'
    });
	
	FB.getLoginStatus(function(response) {
		if(response.authResponse) {
			access_token = response.authResponse.accessToken;
			APP_STREAM();
		} else {
			FB.login(function(response) {
				if(response.authResponse) {
					APP_STREAM();
				} else {
					alert('Please authorize this application to use it!');
					console.log('User cancelled login or did not fully authorize.');
				}
			},{scope: 'friends_online_presence,friends_status,email'});
		}
	});  	
 };

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
   
</script>
<body>
<div id="fb-root"></div>
  <div class="container">
    <label class="switch switch-green">
      <input type="checkbox" class="switch-input" checked id="presence" onchange="ShowList()">
      <span class="switch-label" data-on="Online" data-off="Offline" ></span>
      <span class="switch-handle"></span>
    </label>
  </div>
<div id="message">
</div>
<div class="plans">
</div>
 </body>
</html>
