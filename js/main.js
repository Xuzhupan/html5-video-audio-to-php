$(function(){

    var videoBlob,
        audioBlob,
        recorder = new RecordRTC({
            enable: { video: true, audio: true },
            videoElem: document.getElementById("client-video"),
            video_width: 320,
            video_height: 240,
            canvas_width: 320,
            canvas_height: 240
        });

    recorder.getMedia(recorder.setMedia, function() {
        console.log("get user media failed!");
    });

    recorder.onVideoReady(function(blob) {
        attachLink(blob, "video");
    });

    recorder.onAudioReady(function(blob) {
        attachLink(blob, "audio");
    });

    $('#start-record').click(function(){
        recorder.start();
        
    })

    $('#stop-record').click(function(){
        recorder.stop()
    })


    function attachLink(blob, str) {

        if( str === 'video' ){
            videoBlob = blob
        }
        else{
            audioBlob = blob
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            var a = "<br /><a href='" + e.target.result +"' target='_blank'>Open " + str +" Recording</a>"
            $('#controls').append( a )
        };
        reader.readAsDataURL(blob);

        $('#upload').removeAttr('disabled');
        
    }

    $('#upload').click(function(){

        $('#loading').removeClass('hide')
            
        var fd = new FormData();
        fd.append('audioBlob', audioBlob);
        fd.append('videoBlob', videoBlob);

        $.ajax({
            type: 'POST',
            url: './upload.php',
            data: fd,
            processData: false,
            contentType: false,
            success:function( response ){
                console.log("Success!", response)
                
                $('#status').html("<strong>Your clip has been uploaded</strong>")
            },
            error: function( xhr, textStatus, error ){
                console.log("Error", xhr)
                console.log("error", error);
              
                $('#status').html("<strong>Error uploading your clip " + error + " </strong>")
            }
            
        })
        .done(function(data) {
               console.log(data);
        });  
    })
})