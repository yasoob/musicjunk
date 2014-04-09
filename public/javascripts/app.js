$(document).ready(function() {
	var player_title = $('span.player span.song');
	player_title.text($('p.result a').first().text()|| "Nothing to play");
	$('header').hover(function(){
			$('.mejs-time-rail').attr('style','width: 73%;');
			$('.mejs-time-total').attr('style','width: 70%;');
			$('div.audio-player').fadeIn({duration:200})},
		function(){
			$('.mejs-time-rail').attr('style','width: 73%;');
			$('.mejs-time-total').attr('style','width: 70%;');
			$('div.audio-player').fadeOut({duration:200})
	});
});

function change_title(tag) {
	var player_title = $('span.player span.song');
	console.log(tag.text())
	player_title.text(tag.text());
}
$(document).ready(function() {
        var player = new MediaElementPlayer('#audio-player',{
            alwaysShowControls: true,
            features: ['progress','volume','tracks'],
            audioVolume: 'horizontal',
            success: function (mediaElement, domObject) {
                    mediaElement.addEventListener('ended',loadNextTrack, false);
            		set_it(mediaElement);
					$('.mejs-time-buffering').attr('style','');
                },
        });
        var play_key = $('header i.fa-play');
        
        function loadNextTrack(mediaElement, domObject){
        	var play_key = $('header i.fa-pause');
			play_key.removeClass('fa-pause');
			play_key.addClass('fa-play');
			var player_au = $('#audio-player');
        	var current_src = player_au.attr('src');
        	var source = $('a[href="'+current_src+'"]');
        	var source = $(source).next().next().children('a.play').children();
        	if ($(source).hasClass('fa-pause')){
				source.removeClass('fa-pause');
	        	source.addClass('fa-play');
        	}
		}

        function play_pause(state,src,thi){
        	if(state === "play") {
        		thi.player.setSrc(src);
	        	thi.player.load();
	    		thi.player.play();
	        	if (play_key.hasClass('fa-play')){
	        		play_key.removeClass('fa-play')
	        		play_key.addClass('fa-pause')
	        	} 
	        	var pause_key = $('i.fa-pause');
        	} else {
        		thi.player.pause();
	        	play_key.toggleClass('fa-play fa-pause');
	        	var pause_key = $('i.fa-play');
        	}
        }
        
        play_key.click(function(){
        	if (play_key.hasClass('fa-play')){
	    		player.play();
	        	play_key.toggleClass('fa-play fa-pause');
	        	var player_au = $('#audio-player');
	        	var current_src = player_au.attr('src');
	        	var source = $('a[href="'+current_src+'"]');
	        	var source = $(source).next().next().children('a.play').children();
	        	if ($(source).hasClass('fa-play')){
					source.removeClass('fa-play');
		        	source.addClass('fa-pause');
					console.log(source);
	        	}
        	} else{
	    		player.pause();
	        	play_key.toggleClass('fa-play fa-pause');
	        	var player_au = $('#audio-player');
	        	var current_src = player_au.attr('src');
	        	var source = $('a[href="'+current_src+'"]');
	        	var source = $(source).next().next().children('a.play').children();
	        	if ($(source).hasClass('fa-pause')){
					source.removeClass('fa-pause');
		        	source.addClass('fa-play');
					console.log(source);
	        	}
		    }
        });
        
        function set_it(player){
	        	var src_l = $('p.result a').attr('href');
	        	player.setSrc(src_l);
	        	player.load();
		}
		$('p.result a.play').click(function() {
                if ($(this).children('i').hasClass('fa-play') && $(this).parent().parent().hasClass('current')){
                	var local_p_btn = this
                	$('#audio-player').each(function(){
	            		this.player.play();
	            		var play_key = $('header i.fa-play');
						if (play_key.hasClass('fa-play')){
							play_key.removeClass('fa-play')
							play_key.addClass('fa-pause')
						}
	                	$(local_p_btn).children().toggleClass('fa-play fa-pause');
	                });
                } else if ($(this).children('i').hasClass('fa-play')){
                	$(this).parent().parent().addClass('current').siblings().removeClass('current');
	                $(this).parent().parent().siblings().each(function(){
	                	$(this).find('a.play i').removeClass('fa-pause');
	                	$(this).find('a.play i').addClass('fa-play');
	                });
	                $(this).children().toggleClass('fa-play fa-pause');
	                var audio_src = $(this).parent().siblings('a').attr('href');
	                var title = $(this).parent().siblings('a')
	                $('#audio-player').each(function(){
	                    play_pause("play",audio_src,this);
	                    change_title(title)
	                });
	            } else if ($(this).children('i').hasClass('fa-pause')){
	            	$('#audio-player').each(function(){
	            		this.player.pause();
	                });
	                $(this).children().toggleClass('fa-play fa-pause');
	                var play_key = $('header i.fa-pause');
					if (play_key.hasClass('fa-pause')){
						play_key.removeClass('fa-pause')
						play_key.addClass('fa-play')
					}
	            }

        });
        
});
