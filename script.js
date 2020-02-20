
//alert('hola');
//var etiqueta;
//function onloadFcn(){
//	etiqueta=document.getElementById("led");
//	etiqueta.innerHTML="led 1";
//}


 // Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("tailor.cloudmqtt.com",30149, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName:"rtzdcgqq",
    password:"mNE635qjUTda",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
  topic_rx="test";
  topic_tx="led"
  // called when the client connects

// called when the client connects
function onConnect() {
// Once a connection has been made, make a subscription and send a message.
console.log("onConnect");
	
client.subscribe(topic_rx); // raspebrry
message = new Paho.MQTT.Message("ll:Hello: CloudMQTT");
message.destinationName = topic_tx; // recibe
}

function doFail(e){
console.log(e);
}

// called when the client loses its connection
var etiqueta;
function onloadFcn(){
etiqueta=document.getElementById("led");
etiqueta.innerHTML = "LUZ";

}
function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) {
console.log("onConnectionLost:"+responseObject.errorMessage);
}
}
// called when a message arrives
function onMessageArrived(message) {
console.log("Mensaje entregado:"+message.payloadString);
	estado= message.payloadString;
	if(estado == 'apagado'){
	document.getElementById("led_state").innerHTML ='Sensor Apagado';
	}
	else if (estado=='encendido'){
	document.getElementById("led_state").innerHTML ='Sensor Encendido';
	}
action(message.payloadString);
//sensor=document.getElementById("sensor_val");
//sensor.innerHTML=message.payloadString;
}
// called when a message arrives
function sendMessage(msg) {
message = new Paho.MQTT.Message(msg);
message.destinationName = topic_tx;
client.send(message);

}
// called when a message arrives
function led() {
sendMessage('led')
console.log("Mensaje entregado:"+message.payloadString);
}
function led_on(){
sendMessage('led=1')
}
function led_off(){
sendMessage('led=0')
}
function action(msg) {
mensaje=msg.split('=');
if(mensaje[0]=='i')
	document.getElementById('sensor_i').innerHTML=mensaje[1];
if(mensaje[0]=='p')
	document.getElementById('sensor_p').innerHTML=mensaje[1];
if(mensaje[0]=='l')
	document.getElementById('sensor_l').innerHTML=mensaje[1];
}

y=0;
	function led1() {
		if (y == 0){
			sendMessage('led1')
			document.getElementById("led_state").innerHTML ="Sensor ACTIVO";
			y=1;}
		else {
			y=0;
			sendMessage('led0')
			document.getElementById('led_state').innerHTML ="Sensor APAGADO";
			}  
	
	console.log("Te enviaron:"+message.payloadString);	
  }
