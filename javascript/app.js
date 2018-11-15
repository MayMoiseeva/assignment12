$(document).ready(function(){
	var wthr;
	var units = "metric";
	var context = document.getElementById("canv").getContext('2d');
	getWeather("metric",getInfo);
	$("#celsius").click(function(){
		getWeather("metric", function(){
			units="metric";
			getInfo();
		});
	});
	$("#frht").click(function(){
		getWeather("imperial", function(){
			units="imperial";
			getInfo();
		});
	});
	function getWeather(unit, callback){
		$.ajax({
			url: "https://api.openweathermap.org/data/2.5/weather?",
			type: "GET",
			dataType: "JSON",
			data:{
				zip:"10023,us",
				units: unit,
				appid: "fc70c8c645aad0e7d0393448d0d77077"
			},
			success: function(data){
				console.log(data);
				wthr = data;
				if (typeof callback == "function"){
					callback();
				}
			},
			error: function(data, textStatus, errorThrown){
				console.log("this is not working");
				console.log(errorThrown);
			}
		})
	}
	function getInfo(){
		var sky = wthr.weather[0].main;
		if (sky=="Clear"){
			$(".bg").addClass(" sunny");
		}else if(sky=="Snow"){
			$(".bg").addClass(" snow");
		}else if(sky=="Thunderstorm"||sky=="Rain"||sky=="Drizzle"){
			$(".bg").addClass(" rain");
		}else if(sky=="Atmosphere"||sky=="Clouds"){
			$(".bg").addClass(" clouds");
		}
		var degrees;
		if (units=="metric"){
			degrees = "°C";
		}else{
			degrees="°F";
		}
		$(".temp").text(wthr.main.temp+degrees);
		var clouds=wthr.clouds.all;
		clouds=Math.floor(clouds/2);
		var x = 10;
		var y = 10;
		var up=true;
		var left=true;
	//	$("#cloud_img").onload(function(){
			var cloudImg=document.getElementById("cloud_img");
			for(var i=0;i<clouds;i++){
				context.drawImage(cloudImg, x, y, 25, 10);
				up=!up;
				if(x<250){
					x+=40;
				}else{
					left=!left;
					if(left==false){
						x=30;
						y+=20;
					}else{
						x=10;
						y+=20;
					}
				};
				if(up==true){
					y+=5;
				}else{
					y-=5;
				}
			}
	//	})
	}
})