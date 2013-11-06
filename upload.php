<?php


	$videoFile = $_FILES['videoBlob'];
	$audioFile = $_FILES['audioBlob'];
	

	move_uploaded_file( $videoFile['tmp_name'] , dirname(__FILE__).'/uploads/video.mp4');
	move_uploaded_file( $audioFile['tmp_name'] , dirname(__FILE__).'/uploads/audio.wav');
	$output = shell_exec("/usr/local/bin/ffmpeg -i uploads/video.mp4 -i uploads/audio.wav -acodec copy -vcodec copy -y uploads/output.mkv 2>&1");
	var_dump($output);

?>