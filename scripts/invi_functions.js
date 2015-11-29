    
	function APP_STREAM() {
		getUserInfo();
		getFriends(1);
	}

	
	function ShowList() {
		if (document.getElementById("presence").checked) {
		getFriends(1);
		} else {
		getFriends(0);
		}
	}
	
	function getUserInfo() {
		FB.api('/me', function(response) {
			user_info = response;
		});
	}
	
	function getFriends(presence) {	
		var uid;
		$('.plans').empty();
		FB.api('/me', function(response) {
		uid = response.id;
			if (presence) {
			var fql_query = "SELECT status,uid,name,online_presence,pic_big,pic_cover FROM user WHERE (online_presence='active' OR online_presence='idle')  AND uid IN ( SELECT uid2 FROM friend WHERE uid1 = '"+uid+"') ORDER BY name";
			$(".plan-price").css("background","greenyellow");
			} else {
			var fql_query = "SELECT status,uid,name,online_presence,pic_big,pic_cover FROM user WHERE (online_presence='offline')  AND uid IN ( SELECT uid2 FROM friend WHERE uid1 = '"+uid+"') ORDER BY name";
			$(".plan-price").css("background","grey");
			}
			FB.api('fql',{'q':fql_query},  function(responseFql){
			dump(responseFql);
				if (responseFql) {
					for (var i = 0 ; i < responseFql.data.length; i++) {
					var FrInfo = responseFql.data[i];
						$('.plans').append('<div class="plan plan-tall"><h2 class="plan-title"><a href="https://www.facebook.com/'+FrInfo.uid+'">'+FrInfo.name+'<a/></h2><p class="plan-price"><img src='+FrInfo.pic_big+'></p></div>');	
							if ( FrInfo.pic_cover) {
								$('body > div.plans > div:nth-child('+(i+1)+')').css('background-image', 'url(' + FrInfo.pic_cover.source + ')');
							}
					}
				} else {
					document.getElementById("message").innerHTML+="<br>No - Value for "+uid;
				}
			});
		});
		
		FB.api('/me?fields=friends', function(response) {
			for (var i=0;i<response.friends.data.length;i++) {
				var str=response.friends.data[i].name;
				var friend_uid = response.friends.data[i].id;
			}
		});
	}   
   
   	function Logout() {
		FB.logout(function(){document.location.reload();});
	}
	
	function dump(obj) {
		console.log(obj);
	}
