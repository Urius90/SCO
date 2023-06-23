jQuery(window).scroll(function() {
  if (jQuery(this).scrollTop() > 300) {
      jQuery('a.scroll-top').fadeIn();
  } else {
      jQuery('a.scroll-top').fadeOut();
  }
});
jQuery('a.scroll-top').click(function(event) {
  event.preventDefault();
  jQuery('html, body').animate({scrollTop: 0}, 600);
});


//https://getbootstrap.com/docs/5.0/forms/validation/
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
         if (form.checkValidity()===false) {
          event.preventDefault();
          event.stopPropagation();	 
        }else
		{
			event.preventDefault();
			enviarform(form);		
		}

        form.classList.add('was-validated')
      }, false)
    })
})()

//CONDICIONES CUSTOM CATALANA OCCIDENTE
//CONDICIONES CUSTOM CATALANA OCCIDENTE
//CONDICIONES CUSTOM CATALANA OCCIDENTE
	$("span.spinner-grow").hide();

const urlParams = new URLSearchParams(window.location.search);

const utm_medium = urlParams.get('utm_medium');
const utm_source = urlParams.get('utm_source');
const utm_campaign = urlParams.get('utm_campaign');
const tieneGclid = urlParams.get('gclid');

var Canal= "Organic Search"; //utm_medium;
var Fuente= "Google"; //utm_source;
var Campaign= "AlwaysOn"; //utm_campaign;
var uuidGenerado = "DGP-"; //UUID Custom C.O.

if(utm_campaign)
{
	Campaign= utm_campaign;
}
if(utm_medium && utm_medium.trim() !== "" )
{
    switch(utm_medium.trim().toLowerCase()) 
    {
        case "":
            Canal= "Organic Search"; 
            Fuente= "Google"; break;
        case "email":
            Canal= "Email"; break;
        case "social":
            Canal= "Social"; break;
        case "cpm":
            Canal= "Cpm"; break;
        case "cpl":
            Canal= "Cpl"; break;
        case "video":
            Canal= "Video"; break;   
        case "canal":
        case "referral":
        case "blog":
            Canal= "Referral"; break; 
        case "tarificadorhogar":
            Canal= "TarificadorHogar"; break;
		default:    
			//si no llega el valor especificado, se pasa tal cual
			Canal= utm_medium; break;  
    }

//console.log(canal);

}

if(utm_source && utm_source.trim() !== "" )
{
     switch(utm_source.trim().toLowerCase()) 
    {
        case "web":
            Fuente= "Web Corporativa"; break;
		case "facebook":
				Fuente= "Facebook"; break;
        case "blog":
            Fuente= "Blog"; break;
        case "twitter":
            Fuente= "Twitter"; break;
        case "native_ads":
        case "native":
            Fuente= "Native Ads"; break;
        case "rtb":
            Fuente= "rtb"; break;
        case "email":
            Fuente= "email"; break;   
        case "instagram":
            Fuente= "Instagram"; break;   
        case "afiliacion":
            Fuente= "Afiliación"; break;   
        case "ytb":
            Fuente= "Youtube"; break;
        case "amazon":
            Fuente= "Amazon DSP"; break; 
        case "prensa ibérica":
            Fuente= "PrensaIberica"; break;  
		default:    
			//si no llega el valor especificado, se pasa tal cual
			Fuente= utm_source; break; 
    }
    //console.log("Fuente/utm_source recibido: " + utm_source);
    //console.log("Fuente/utm_source devuelto: " + Fuente);
    
    console.log(canal);
}

if(Canal == "TarificadorHogar" && Fuente == "Web Corporativa")
{
	//el valor web, cuando viene de TarificadorHogar, será "web", no "web corporativa"
	Fuente == "Web";
}

if(tieneGclid)
{
    //console.log("tiene Glicd!!");
    Canal= "Cpc";
    Fuente= "Google";
}

/* UUID generator */
function crearUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 
    {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

    function sendAJAX($config,form,pagthanks) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open($config.method, $config.action, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            xhr.send($config.form);
            xhr.onload = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    //console.log("ha ido bien");
					$("span.spinner-grow").hide();

                    window.dataLayer = window.dataLayer || [];
                    dataLayer.push({                    
                      'event' : 'generate_lead',                    
                      'horario' : $("#horario :selected").text()                   
                    });
					form.action=pagthanks;
					form.submit();
                }
                if (xhr.status === 404 || xhr.status === 415 || xhr.status >= 500 || xhr.status === 400) {
				//console.log("ha ido mal");                   

                }

            };
            xhr.onerror = function () {
				//console.log("ha ido mal");
                
            };
		}
	 catch (excep) {
            isDebug && console.log(excep.message);
        }
	}
      
	  
	  

function enviarform(form){
	
	$("span.spinner-grow").show();
	
	uuidGenerado = uuidGenerado + crearUUID();
	//console.log("Custom UUID: " + uuidGenerado);
	
	  // Get all field data from the form
      let data = new FormData(form);
      // Convert to an object

	 var jsonData = null;
	  var horario=document.getElementById('horario').value;
	  var companyia=document.getElementById('companyia').value;
	  var campanya=Campaign;
	  var pagthanks=document.getElementById('pagthanks').value;
	  

      jsonData = {
          "Entrada": {
          "Companyia": companyia, 
          "Nombre": document.getElementById('nombre').value,
          "Apellidos": document.getElementById('apellidos').value,
          "Sexpersona" : "1",
          "Telefono": document.getElementById('phone').value,
          "Email": "",
          "HorarioDeCita": horario,
          "Producto": document.getElementById('Producto').value,
          "Fuente": Fuente,
          "Canal": Canal,
          "IdAgencia": uuidGenerado,
          "EsCliente": false ,
          "Campanya": campanya,
		  "PerfilLead": "",
          "ConsentimientoRGPD": true,
		  "accion": "A",
		  "CPoPers": null
			}
           };
		  
		  
    
      let url =  SCSRenderAPI.getCustomSiteProperty('url_servicio') ;
	  pagthanks= SCSRenderAPI.getPageLinkData(pagthanks);
											

      // return false;
	  
	          var conf = {
                    form: JSON.stringify(jsonData),
                    method: 'POST',
                    action: url,
                    data: form
                };
			
                sendAJAX(conf,form,pagthanks.href);

				
        
}
