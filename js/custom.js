//loading xml data
function OpenSpecialDS(sourceXML)
{
        var xmlDoc=undefined;
        try
        {
            if (document.all) //IE
            {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            }
            else //firefox
            {
                xmlDoc = document.implementation.createDocument("","",null);
            }
            xmlDoc.async=false;
            xmlDoc.load(sourceXML);
             
             
        }
        catch(e)
        {
            try { //otros safari, chrome
                    var xmlhttp = new window.XMLHttpRequest();
                    xmlhttp.open("GET",sourceXML,false);
                    xmlhttp.send(null);
                    xmlDoc = xmlhttp.responseXML.documentElement;
                    return xmlDoc;
            } 
            catch (e) 
            {
                return undefined;
            }
         
        }
        return xmlDoc;
}
function LogItem(re,er,id,no,nu,ids,me) {
	this.re = re;
	this.er = er;
	this.id = id;
	this.no = no;
	this.nu = nu;
	this.ids = ids;
	this.me = me;
}
function Item(im,en,ti,pr,ra)
{
    this.im = im;
    this.en = en;
    this.ti = ti;
    this.pr = pr;
    this.ra = ra;
}
function fItem(im,en,ti,an,pr,ra)
{
    this.im = im;
    this.en = en;
    this.ti = ti;
    this.an = an;
    this.pr = pr;
    this.ra = ra;
}
function NUItem(re,er,id,me)
{
    this.re = re;
    this.er = er;
    this.id = id;
    this.me = me;
}
function doLogIn(duurl) {
    try
    {
        xmlDoc=OpenSpecialDS(duurl);

        itemsXML=xmlDoc.getElementsByTagName('response');
 
        if (itemsXML.length>0)
        {
            items=new Array(); //clase con los datos cargados
         }
        for(var i=0; i< itemsXML.length; i++) 
        {
            xmlItem=itemsXML[i];
 
            re=xmlItem.getElementsByTagName("res")[0].firstChild.nodeValue;
            er=xmlItem.getElementsByTagName("err")[0].firstChild.nodeValue;
            id=xmlItem.getElementsByTagName("id")[0].firstChild.nodeValue;
            no=xmlItem.getElementsByTagName("nom")[0].firstChild.nodeValue;
            nu=no;
            ids=xmlItem.getElementsByTagName("ses")[0].firstChild.nodeValue;
            me=xmlItem.getElementsByTagName("men")[0].firstChild.nodeValue;
            item = new LogItem(re,er,id,no,nu,ids,me);       
            items.push(item);
 
        }
        return items;
    }
    catch(e)
    {
        alert("Se produjo un error en la carga de los datos");
    }
}
function loadNewUser(duurl)
{
    try
    {
        xmlDoc=OpenSpecialDS(duurl);
        itemsXML=xmlDoc.getElementsByTagName('response');
 
        if (itemsXML.length>0)
        {
            items=new Array(); //clase con los datos cargados
         }
        for(var i=0; i< itemsXML.length; i++) 
        {
            xmlItem=itemsXML[i];
 
            re=xmlItem.getElementsByTagName("res")[0].firstChild.nodeValue;
            er=xmlItem.getElementsByTagName("err")[0].firstChild.nodeValue;
            id=xmlItem.getElementsByTagName("id")[0].firstChild.nodeValue;
            me=xmlItem.getElementsByTagName("men")[0].firstChild.nodeValue;
            item = new NUItem(re,er,id,me);       
            items.push(item);
 
        }
        return items;
    }
    catch(e)
    {
        alert("Se produjo un error en la carga de los datos");
    }	
}
function CargarXMLFItems()
{
    try
    {
        xmlDoc=OpenSpecialDS("features.xml");
        itemsXML=xmlDoc.getElementsByTagName('item');
 
        if (itemsXML.length>0)
        {
            items=new Array(); //clase con los datos cargados
         }
        for(var i=0; i< itemsXML.length; i++) 
        {
            xmlItem=itemsXML[i];
 
            im=xmlItem.getElementsByTagName("image")[0].firstChild.nodeValue;
            en=xmlItem.getElementsByTagName("enlace")[0].firstChild.nodeValue;
            ti=xmlItem.getElementsByTagName("titulo")[0].firstChild.nodeValue;
            an=xmlItem.getElementsByTagName("antes")[0].firstChild.nodeValue;
            pr=xmlItem.getElementsByTagName("precio")[0].firstChild.nodeValue;
            ra=xmlItem.getElementsByTagName("rating")[0].firstChild.nodeValue;
            item = new Item(im,en,ti,pr,ra);       
            items.push(item);
 
        }
        return items;
    }
    catch(e)
    {
        alert("Se produjo un error en la carga de los datos");
    }    
 
}
function CargarXMLItems()
{
    try
    {
        xmlDoc=OpenSpecialDS("special.xml");
        itemsXML=xmlDoc.getElementsByTagName('item');
 
        if (itemsXML.length>0)
        {
            items=new Array(); //clase con los datos cargados
         }
        for(var i=0; i< itemsXML.length; i++) 
        {
            xmlItem=itemsXML[i];
 
            im=xmlItem.getElementsByTagName("image")[0].firstChild.nodeValue;
            en=xmlItem.getElementsByTagName("enlace")[0].firstChild.nodeValue;
            ti=xmlItem.getElementsByTagName("titulo")[0].firstChild.nodeValue;
            pr=xmlItem.getElementsByTagName("precio")[0].firstChild.nodeValue;
            ra=xmlItem.getElementsByTagName("rating")[0].firstChild.nodeValue;
            item = new Item(im,en,ti,pr,ra);       
            items.push(item);
 
        }
        return items;
    }
    catch(e)
    {
        alert("Se produjo un error en la carga de los datos");
    }    
 
}
//end loading xml data

function performLogin() {
	var c = 0;
	var usu = "";
	var ses = "";
	var p0 = $('#nlk_lice').val();
	var p1 = $("input[type=password]").val();

	$('body').find('#nlk_gplice').removeClass();
	if(p0 == ""){
		$('body').find('#nlk_splice').html('<i class="icon-remove"></i> Escribe tu Correo para continuar');
		$('body').find('#nlk_gplice').addClass('control-group error');
		c = c + 1;
	} else {
		if(IsEmail(p0)){
			$('body').find('#nlk_splice').html('<i class="icon-ok"></i> Valido');
			$('body').find('#nlk_gplice').addClass('control-group success');
		} else {
			$('body').find('#nlk_splice').html('<i class="icon-remove"></i> Correo Electronico No Valido');
			$('body').find('#nlk_gplice').addClass('control-group error');
			c = c + 1;
		}
	}

	$('body').find('#nlk_gplic').removeClass();
	if(p1 == ""){
		$('body').find('#nlk_splic').html('<i class="icon-remove"></i> Escribe tu Clave');
		$('body').find('#nlk_gplic').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_splic').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gplic').addClass('control-group success');
	}

	var surl = "DU.aspx?requested=aaaab&p0=" + p0 + "&p1=" + p1;


	ev= doLogIn(surl);
	auxUnEven=ev.pop();
	while (auxUnEven != undefined)
	{
		if(auxUnEven.er == "4"){
			$('body').find('#nlk_gplice').removeClass();
			$('body').find('#nlk_splice').html('<i class="icon-remove"></i> Correo no Registrado');
			$('body').find('#nlk_gplice').addClass('control-group error');
			c = c + 1;
		} else {
			if(auxUnEven.er == "5"){
				$('body').find('#nlk_gplic').removeClass();
				$('body').find('#nlk_splic').html('<i class="icon-remove"></i> Clave Incorrecta');
				$('body').find('#nlk_gplic').addClass('control-group error');
				c = c + 1;
			} else {
				if(auxUnEven.er == "6"){
					$('body').find('#nlk_gplice').removeClass();
					$('body').find('#nlk_splice').html('<i class="icon-remove"></i> Cuenta de Baja');
					$('body').find('#nlk_gplice').addClass('control-group error');
					c = c + 1;
			}
			}
		}
		
		$.cookie("mycses", auxUnEven.ids);
	    	$.cookie("myusna", auxUnEven.nu);

		auxUnEven=ev.pop();
	}

	if(c == 0){
		alert(ses);
		window.location.href = "index2.html";
	}
}

function addNewUser() {
	var c = 0;
	var p0 = $("#inputFirstName").val();
	var p1 = $("#inputLastName").val();
	var p2 = $("#nlk_user").val();
	var p3 = $("#nlk_cla1").val();
	var p3b = $("#nlk_cla2").val();
	var p4 = $("#inputTele").val();
	var p5 = $("#inputFAX").val();
	var p6 = $("#inputEMAdd").val();
	var p7 = $('#inputFirstAdd').val();
	var p8 = $('#inputSecondAdd').val();
	var p9 = $('#nlk_stdep').val();
	var p10 = $('#nlk_stmun').val();
	var myRadio = $('input[name=sub]');
	var p11 = myRadio.filter(':checked').val();
	var acepto = $('#nlk_cktc:checked').val();

	$('body').find('#nlk_gpnu').removeClass();
	if(p2 == ""){
		$('body').find('#nlk_spnu').html('<i class="icon-remove"></i> Elija Nombre de Usuario');
		$('body').find('#nlk_gpnu').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spnu').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpnu').addClass('control-group success');
	}

	$('body').find('#nlk_gpcl1').removeClass();
	if(p3 == ""){
		$('body').find('#nlk_spcl1').html('<i class="icon-remove"></i> Elija una Clave');
		$('body').find('#nlk_gpcl1').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spcl1').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpcl1').addClass('control-group success');
	}

	$('body').find('#nlk_gpcl2').removeClass();
	if(p3b == ""){
		$('body').find('#nlk_spcl2').html('<i class="icon-remove"></i> Repita la Clave Elejida');
		$('body').find('#nlk_gpcl2').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spcl2').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpcl2').addClass('control-group success');
	}

	if((p3 != "") && (p3b != "")){
		$('body').find('#nlk_gpcl2').removeClass();
		if(p3 != p3b){
			$('body').find('#nlk_spcl2').html('<i class="icon-remove"></i> Las Claves no Coinciden');
			$('body').find('#nlk_gpcl2').addClass('control-group error');
			c = c + 1;
		} else {
			$('body').find('#nlk_spcl2').html('<i class="icon-ok"></i> Valido');
			$('body').find('#nlk_gpcl2').addClass('control-group success');	
		}
	}

	$('body').find('#nlk_gpno').removeClass();
	if(p0 == ""){
		$('body').find('#nlk_spno').html('<i class="icon-remove"></i> Ingrese solo sus nombres, igual que en su DUI');
		$('body').find('#nlk_gpno').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spno').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpno').addClass('control-group success');
	}

	$('body').find('#nlk_gpap').removeClass();
	if(p1 == ""){
		$('body').find('#nlk_spap').html('<i class="icon-remove"></i> Ingrese solo sus apellidos, igual que en su DUI');
		$('body').find('#nlk_gpap').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spap').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpap').addClass('control-group success');
	}

	$('body').find('#nlk_gpem').removeClass();
	if(p6 == ""){
		$('body').find('#nlk_spem').html('<i class="icon-remove"></i> Ingrese su Correo Electronico');
		$('body').find('#nlk_gpem').addClass('control-group error');
		c = c + 1;
	} else {
		if(IsEmail(p6)){
			$('body').find('#nlk_spem').html('<i class="icon-ok"></i> Valido');
			$('body').find('#nlk_gpem').addClass('control-group success');
		} else {
			$('body').find('#nlk_spem').html('<i class="icon-remove"></i> Correo Electronico No Valido');
			$('body').find('#nlk_gpem').addClass('control-group error');
			c = c + 1;
		}
		
	}

	$('body').find('#nlk_gpnt').removeClass();
	if(p4 == ""){
		$('body').find('#nlk_spnt').html('<i class="icon-remove"></i> Ingrese su Numero TIGO');
		$('body').find('#nlk_gpnt').addClass('control-group error');
		c = c + 1;
	} else {
		if(EsTelefonoMovil(p4)){
			$('body').find('#nlk_spnt').html('<i class="icon-ok"></i> Valido');
			$('body').find('#nlk_gpnt').addClass('control-group success');
		} else {
			$('body').find('#nlk_spnt').html('<i class="icon-remove"></i> Numero Telefonico no Valido');
			$('body').find('#nlk_gpnt').addClass('control-group error');
			c = c + 1;
		}
		
	}

	$('body').find('#nlk_gpd1').removeClass();
	if(p7 == ""){
		$('body').find('#nlk_spd1').html('<i class="icon-remove"></i> Ingrese una Direccion de Envio');
		$('body').find('#nlk_gpd1').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spd1').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpd1').addClass('control-group success');
		
	}

	$('body').find('#nlk_gpdep').removeClass();
	if(p9== "0"){
		$('body').find('#nlk_spdep').html('<i class="icon-remove"></i> Seleccione Departamento de Envio');
		$('body').find('#nlk_gpdep').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spdep').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpdep').addClass('control-group success');
	}

	$('body').find('#nlk_gpmun').removeClass();
	if(p9== "0"){
		$('body').find('#nlk_spmun').html('<i class="icon-remove"></i> Seleccione Municipio de Envio');
		$('body').find('#nlk_gpmun').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spmun').html('<i class="icon-ok"></i> Valido');
		$('body').find('#nlk_gpmun').addClass('control-group success');
	}

	//$('body').find('#nlk_gpacep').removeClass();
	if(acepto != "on"){
		$('body').find('#nlk_spacep').html('<i class="icon-remove"></i> Lea y Acepte lo Terminos y Condiciones');
		//$('body').find('#nlk_gpacep').addClass('control-group error');
		c = c + 1;
	} else {
		$('body').find('#nlk_spacep').html('<i class="icon-ok"></i> Aceptado');
		//$('body').find('#nlk_gpacep').addClass('control-group success');
	}

	if(c > 0)
		return;


	var surl = "DU.aspx?requested=aaaaa&p0=" + p0 + "&p1=" + p1 + "&p2=" + p2 + "&p3=" + p3 + "&p4=" + p4 + "&p5=" + p5 + "&p6=" + p6 + "&p7=" + p7 + "&p8=" + p8 + "&p9=" + p9 + "&p10=" + p10 + "&p11=" + p11;

	ev= loadNewUser(surl);
	auxUnEven=ev.pop();
	while (auxUnEven != undefined)
	{
		alert(auxUnEven.er);
		if(auxUnEven.er == "1"){
			$('body').find('#nlk_gpnu').removeClass();
			$('body').find('#nlk_spnu').html('<i class="icon-remove"></i> Usuario existente');
			$('body').find('#nlk_gpnu').addClass('control-group error');
			c = c + 1;
		} else {
			if(auxUnEven.er == "2"){
				$('body').find('#nlk_gpnt').removeClass();
				$('body').find('#nlk_spnt').html('<i class="icon-remove"></i> Numero TIGO ya registrado');
				$('body').find('#nlk_gpnt').addClass('control-group error');
				c = c + 1;
			} else {
				if(auxUnEven.er == "3"){
					$('body').find('#nlk_gpem').removeClass();
					$('body').find('#nlk_spem').html('<i class="icon-remove"></i> Correo Electronico ya registrado');
					$('body').find('#nlk_gpem').addClass('control-group error');
					c = c + 1;
			}
			}
		}
		auxUnEven=ev.pop();
	}

	if(c == 0){
		alert("Cuenta creada con exito! Revise su correo y confirme su cuenta");
		window.location.href = "index2.html";
	}

}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function EsTelefonoMovil(tel) {
	var test = /^[0-9]{8}$/;
	var telReg = new RegExp(test);
	return telReg.test(tel);
}

//filling special items

function setSpecialItems() {
	var shtml = '';
	var nitem = '';
	var crat = 0;

	shtml = shtml + '<div id="homeSpecial">';
	shtml = shtml + '<div class="titleHeader clearfix">';
	shtml = shtml + '<h3>Ofertas</h3>';
	shtml = shtml + '<div class="pagers">';
	shtml = shtml + '<div class="btn-toolbar">';

	shtml = shtml + '<a class="btn btn-mini" href="#">Ver Todo</a>';
	shtml = shtml + '</div>';
	shtml = shtml + '</div>';
	shtml = shtml + '</div><!--end titleHeader-->';
	shtml = shtml + '<ul class="vProductItems cycle-slideshow vertical clearfix" ';
	shtml = shtml + 'data-cycle-fx="carousel" ';
	shtml = shtml + 'data-cycle-timeout=0 ';
	shtml = shtml + 'data-cycle-slides="> li" ';
	shtml = shtml + 'data-cycle-next=".vPrev" ';
	shtml = shtml + 'data-cycle-prev=".vNext" ';
	shtml = shtml + 'data-cycle-carousel-visible="2" ';
	shtml = shtml + 'data-cycle-carousel-vertical="true">';

	ev= CargarXMLItems();
	auxUnEven=ev.pop();
	while (auxUnEven != undefined)
	{
		nitem = '';
		nitem = nitem + '<li class="span4 clearfix">';
		nitem = nitem + '<div class="thumbImage">';
		nitem = nitem + '<a href=""><img src="img/' + auxUnEven.im + '.jpg" alt=""></a>';
		nitem = nitem + '</div>';
		nitem = nitem + '<div class="thumbSetting">';
		nitem = nitem + '<div class="thumbTitle">';
		nitem = nitem + '<a href="' + auxUnEven.en + '" class="invarseColor">';
		nitem = nitem + auxUnEven.ti;
		nitem = nitem + '</a>';
		nitem = nitem + '</div>';
		nitem = nitem + '<div class="thumbPrice">';
		nitem = nitem + '<span>' + auxUnEven.pr + '</span>';
		nitem = nitem + '</div>';
		nitem = nitem + '<ul class="rating">';
		crat = parseInt(auxUnEven.ra);
		if(crat > 0)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';
		
		if(crat > 1)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		if(crat > 2)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		if(crat > 3)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		if(crat > 4)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		nitem = nitem + '</ul>';
		nitem = nitem + '</div>';
		nitem = nitem + '</li>';

		shtml = shtml + nitem;

		auxUnEven=ev.pop();
	}

	shtml = shtml + '</ul>';
	shtml = shtml + '</div><!--end special-->';

	$('body').find('#nlk_spli').html(shtml);

}

function setCategoryList(){
	var ohtml = '<option value="0">TODAS LAS CATEGORIAS</option><option value="1">ACCESORIOS</option>';
	ohtml = ohtml + '<option value="2">HOGAR</option><option value="3">CELULARES</option>';
	ohtml = ohtml + '<option value="4">FARMACIA</option><option value="5">ELECTRONICOS</option>';
	ohtml = ohtml + '<option value="6">EXTERIORES</option><option value="7">DIDACTICOS</option>';

	$('body').find('#nlk_stsea').html(ohtml);
}

function setMunicipiosFromDepto(depto){
	var d = parseInt(depto);
	var opt;

	switch(d){
	case 0:
		opt = '<option value="0"> --Seleccione Depto--</option>';
		break;
	case 1:
		opt = '<option value="1">METAPAN</option><option value="2">SANTA ANA</option>';
		break;
	case 2:
		opt = '<option value="4">IZALCO</option><option value="5">NAHUZALCO</option>';
		break;
	default:
		opt = '<option value="0"> --Seleccione Depto--</option>';
		break;
	}

	$('body').find('#nlk_stmun').html(opt);
}

function fillSearchResult(){
	var shtml = '';

	shtml = shtml + '<ul class="hProductItems clearfix">';
	shtml = shtml + '<li class="span3 clearfix">';
	shtml = shtml + '<div class="thumbnail"><a href=""><img src="img/212x192.jpg" alt=""></a></div>';
	shtml = shtml + '<div class="thumbSetting">';
	shtml = shtml + '<div class="thumbTitle">';
	shtml = shtml + '<a href="#" class="invarseColor">Foliomania the designer portfolio brochure</a>';
	shtml = shtml + '</div>';
	shtml = shtml + '<div class="thumbPrice"><span>$150.00</span></div>';
	shtml = shtml + '<div class="thumbButtons">';
	shtml = shtml + '<button class="btn btn-primary btn-small" data-title="+To Cart" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-shopping-cart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To WishList" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-heart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To Compare" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-refresh"></i></button>';
	shtml = shtml + '</div>';
	shtml = shtml + '<ul class="rating">';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '</ul>';
	shtml = shtml + '</div>';
	shtml = shtml + '</li>';

	shtml = shtml + '<li class="span3 clearfix">';
	shtml = shtml + '<div class="thumbnail"><a href=""><img src="img/212x192.jpg" alt=""></a></div>';
	shtml = shtml + '<div class="thumbSetting">';
	shtml = shtml + '<div class="thumbTitle">';
	shtml = shtml + '<a href="#" class="invarseColor">Foliomania the designer portfolio brochure</a>';
	shtml = shtml + '</div>';
	shtml = shtml + '<div class="thumbPrice"><span>$150.00</span></div>';
	shtml = shtml + '<div class="thumbButtons">';
	shtml = shtml + '<button class="btn btn-primary btn-small" data-title="+To Cart" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-shopping-cart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To WishList" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-heart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To Compare" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-refresh"></i></button>';
	shtml = shtml + '</div>';
	shtml = shtml + '<ul class="rating">';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '</ul>';
	shtml = shtml + '</div>';
	shtml = shtml + '</li>';

	shtml = shtml + '<li class="span3 clearfix">';
	shtml = shtml + '<div class="thumbnail"><a href=""><img src="img/212x192.jpg" alt=""></a></div>';
	shtml = shtml + '<div class="thumbSetting">';
	shtml = shtml + '<div class="thumbTitle">';
	shtml = shtml + '<a href="#" class="invarseColor">Foliomania the designer portfolio brochure</a>';
	shtml = shtml + '</div>';
	shtml = shtml + '<div class="thumbPrice"><span>$150.00</span></div>';
	shtml = shtml + '<div class="thumbButtons">';
	shtml = shtml + '<button class="btn btn-primary btn-small" data-title="+To Cart" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-shopping-cart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To WishList" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-heart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To Compare" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-refresh"></i></button>';
	shtml = shtml + '</div>';
	shtml = shtml + '<ul class="rating">';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '</ul>';
	shtml = shtml + '</div>';
	shtml = shtml + '</li>';

	shtml = shtml + '<li class="span3 clearfix">';
	shtml = shtml + '<div class="thumbnail"><a href=""><img src="img/212x192.jpg" alt=""></a></div>';
	shtml = shtml + '<div class="thumbSetting">';
	shtml = shtml + '<div class="thumbTitle">';
	shtml = shtml + '<a href="#" class="invarseColor">Foliomania the designer portfolio brochure</a>';
	shtml = shtml + '</div>';
	shtml = shtml + '<div class="thumbPrice"><span>$150.00</span></div>';
	shtml = shtml + '<div class="thumbButtons">';
	shtml = shtml + '<button class="btn btn-primary btn-small" data-title="+To Cart" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-shopping-cart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To WishList" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-heart"></i></button>';
	shtml = shtml + '<button class="btn btn-small" data-title="+To Compare" data-placement="top" data-toggle="tooltip">';
	shtml = shtml + '<i class="icon-refresh"></i></button>';
	shtml = shtml + '</div>';
	shtml = shtml + '<ul class="rating">';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-on"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '<li><i class="star-off"></i></li>';
	shtml = shtml + '</ul>';
	shtml = shtml + '</div>';
	shtml = shtml + '</li>';
	shtml = shtml + '</ul>';

	$('body').find('#nlk_seares').html(shtml);
}

function setFooterLayout() {
	var bhtml = '';

	bhtml = bhtml + '<div class="container">';
	bhtml = bhtml + '<div class="row-fluid">';
	bhtml = bhtml + '<div class="span6">';
	bhtml = bhtml + '<div class="titleHeader clearfix">';
	bhtml = bhtml + '<h3>Enlaces Utiles</h3></div>';
	bhtml = bhtml + '<div class="usefullLinks">';
	bhtml = bhtml + '<div class="row-fluid">';
	bhtml = bhtml + '<div class="span6">';
	bhtml = bhtml + '<ul class="unstyled">';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Acerde de SV Market</a></li>';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Informacion de 	Envio</a></li>';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Politica de 	Privacidad</a></li>';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Terminos &amp; 	Condiciones</a></li>';
	bhtml = bhtml + '</ul></div>';
	bhtml = bhtml + '<div class="span6">';
	bhtml = bhtml + '<ul class="unstyled">';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Buscar por Marca</a></li>';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Servicio al Cliente</a></li>';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Regales Especiales</a></li>';
	bhtml = bhtml + '<li><a class="invarseColor" href="#"><i class="icon-caret-right"></i> Mapa del Sitio</a></li>';
	bhtml = bhtml + '</ul></div></div></div></div><!--end span6-->';
	bhtml = bhtml + '<div class="span3">';
	bhtml = bhtml + '<div class="titleHeader clearfix">';
	bhtml = bhtml + '<h3>Contactanos</h3></div>';
	bhtml = bhtml + '<div class="contactInfo">';
	bhtml = bhtml + '<ul class="unstyled"><li>';
	bhtml = bhtml + '<button class="btn btn-small"><i class="icon-volume-up"></i></button>';
	bhtml = bhtml + 'Llamanos: <a class="invarseColor" href="#">+503-2519-5238</a></li>';
	bhtml = bhtml + '<li>';
	bhtml = bhtml + '<button class="btn btn-small"><i class="icon-envelope-alt"></i></button>';
	bhtml = bhtml + '<a class="invarseColor" href="#">neolink2009@gmail.com.com</a></li>';
	bhtml = bhtml + '<li>';
	bhtml = bhtml + '<button class="btn btn-small"><i class="icon-map-marker"></i></button>';
	bhtml = bhtml + 'Autop. Nte, No 154, SS</li></ul></div></div><!--end span3-->';
	bhtml = bhtml + '<div class="span3">';
	bhtml = bhtml + '<div class="titleHeader clearfix"><h3>Boletin</h3></div>';
	bhtml = bhtml + '<div class="newslatter">';
	bhtml = bhtml + '<form method="get" action="page">';
	bhtml = bhtml + '<input class="input-block-level" type="text" name="email" value="" placeholder="Tu Nombre...">';
	bhtml = bhtml + '<input class="input-block-level" type="text" name="email" value="" placeholder="Tu Correo...">';
	bhtml = bhtml + '<button class="btn btn-block" type="submit" name="">Suscribete Ya!</button>';
	bhtml = bhtml + '</form></div></div><!--end span3--></div><!--end row-fluid--></div><!--end container-->';

	$('body').find('#nlk_ftit').html(bhtml);
}

function setFeatureItems() {
	var fhtml = '';
	var nitem = '';
	var crat = 0;

	fhtml = fhtml + '<ul class="hProductItems clearfix">';

	ev= CargarXMLFItems();
	auxUnEven=ev.pop();
	while (auxUnEven != undefined)
	{
		nitem = '';
		nitem = nitem + '<li class="span3 clearfix">';
		nitem = nitem + '<div class="thumbnail">';
		nitem = nitem + '<a href=""><img src="img/' + auxUnEven.im + '.jpg" alt=""></a>';
		nitem = nitem + '</div>';
		nitem = nitem + '<div class="thumbSetting">';
		nitem = nitem + '<div class="thumbTitle">';
		nitem = nitem + '<a href="' + auxUnEven.en + '" class="invarseColor">';
		nitem = nitem + auxUnEven.ti;
		nitem = nitem + '</a>';
		nitem = nitem + '</div>';
		nitem = nitem + '<div class="thumbPrice">';
		nitem = nitem + '<span><span class="strike-through">' + auxUnEven.an + '</span> ' + auxUnEven.pr + '</span>';
		nitem = nitem + '</div>';

		nitem = nitem + '<div class="thumbButtons">';
		nitem = nitem + '<button class="btn btn-primary btn-small" data-title="+To Cart" data-placement="top" data-toggle="tooltip">';
		nitem = nitem + '<i class="icon-shopping-cart"></i>';
		nitem = nitem + '</button>';
		nitem = nitem + '<button class="btn btn-small" data-title="+To WishList" data-placement="top" data-toggle="tooltip">';
		nitem = nitem + '<i class="icon-heart"></i>';
		nitem = nitem + '</button>';
		nitem = nitem + '<button class="btn btn-small" data-title="+To Compare" data-placement="top" data-toggle="tooltip">';
		nitem = nitem + '<i class="icon-refresh"></i>';
		nitem = nitem + '</button>';
		nitem = nitem + '</div>';

		nitem = nitem + '<ul class="rating">';
		crat = parseInt(auxUnEven.ra);
		if(crat > 0)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';
		
		if(crat > 1)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		if(crat > 2)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		if(crat > 3)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		if(crat > 4)
			nitem = nitem + '<li><i class="star-on"></i></li>';
		else
			nitem = nitem + '<li><i class="star-off"></i></li>';

		nitem = nitem + '</ul>';
		nitem = nitem + '</div>';
		nitem = nitem + '</li>';

		fhtml = fhtml + nitem;

		auxUnEven=ev.pop();
	}

	fhtml = fhtml + '</ul>';

	$('body').find('#nlk_prde').html(fhtml);

}

//end filling special items
function setLoggedUser(un) {
	$('body').find('#nlk_hs').html('Bienvenido a SV Market <a href="login.html">' + un + '</a>');
}
function changeLabels() {
	$('body').find('#nlk_hcc').html('Crear Cuenta');
	$('body').find('#nlk_hmd').html('Mis Deseados');
	$('body').find('#nlk_hmc').html('Mi Carrito');
	$('body').find('#nlk_hpc').html('Proceder a Comprar');
	$('body').find('#nlk_hs').html('Bienvenido a SV Market, <a href="login.html">Ingresar</a> o <a href="register.html">Create Nueva Cuenta</a>');
	$('body').find('#nlk_hps').html('<input type="text" class="span2" id="appendedInputButton" placeholder="Buscar..."><button class="btn btn-primary" type="submit" name=""><i class="icon-search"></i></button>');
}

function setCategoryBar() {
	var ihtml = '<div class="navbar"><ul class="nav"><li class="active"><a href="#"><i class="icon-home"></i></a></li>';
	ihtml = ihtml + '<li><a href="#">Accesorios &nbsp;<i class="icon-caret-down"></i></a>';
	ihtml = ihtml + '<div>';
	ihtml = ihtml + '<ul>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Automovil </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Celulares </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Computadoras <i class="icon-caret-right pull-right"></i></a>';
	ihtml = ihtml + '<div>';
	ihtml = ihtml + '<ul>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Monitores </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Perifericos &amp; Consumibles </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Inalambricos </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Hard Drives &amp; RAM </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Impresores </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Muebles </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Miscelaneos </a></li>';
	ihtml = ihtml + '</ul>';
	ihtml = ihtml + '</div>';
	ihtml = ihtml + '</li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Ropa </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Deportivos </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Electronicos </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Hogar </a></li>';
	ihtml = ihtml + '</ul>';
	ihtml = ihtml + '</div>';
	ihtml = ihtml + '</li>';
	ihtml = ihtml + '<li><a href="#">Hogar &nbsp;<i class="icon-caret-down"></i></a>';
	ihtml = ihtml + '<div>';
	ihtml = ihtml + '<ul>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Muebles </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Electrodomesticos </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Jugetes </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Linea Blanca </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Adornos </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Exteriores </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Miscelaneos </a></li>';
	ihtml = ihtml + '</ul>';
	ihtml = ihtml + '</div>';
	ihtml = ihtml + '</li>';
	ihtml = ihtml + '<li><a href="#">Celulares</a></li>';
	ihtml = ihtml + '<li><a href="#">Farmacia</a></li>';
	ihtml = ihtml + '<li><a href="#">Electronicos &nbsp;<i class="icon-caret-down"></i></a>';
	ihtml = ihtml + '<div>';
	ihtml = ihtml + '<ul>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Computadoras </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Tablets </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Impresores </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Gadgets </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Componentes </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Audio </a></li>';
	ihtml = ihtml + '<li><a href="#"> <span>-</span> Varios </a></li>';
	ihtml = ihtml + '</ul>';
	ihtml = ihtml + '</div>';
	ihtml = ihtml + '</li>';
	ihtml = ihtml + '<li><a href="#">Exteriores</a></li>';
	ihtml = ihtml + '<li><a href="#">Didacticos</a></li>';
	ihtml = ihtml + '</ul><!--end nav-->';
	ihtml = ihtml + '</div>';

	$('body').find('#nlk_ctbar').html(ihtml);
}

function topNavToSelect() {
	// building select menu
	$('<select class="upper-nav" />').appendTo('.upperHeader .container');

	// building an option for select menu
	$('<option />', {
		'selected': 'selected',
		'value' : '',
		'text': 'Choise Page...'
	}).appendTo('.upperHeader .container select');

	$('.upperHeader ul.inline li a').each(function(){
		var target = $(this);

		$('<option />', {
			'value' : target.attr('href'),
			'text': target.text()
		}).appendTo('.upperHeader .container select');
	});
	// on clicking on link
	$('.upperHeader .container select').on('change',function(){
		window.location = $(this).find('option:selected').val();
	});
}

// building select .navbar for mobile width only
function NavToSelect() {

	// building select menu
	$('<select />').appendTo('.navbar');

	// building an option for select menu
	$('<option />', {
		'selected': 'selected',
		'value' : '',
		'text': 'Choise Page...'
	}).appendTo('.navbar select');

	$('.navbar ul li a').each(function(){
		var target = $(this);

		$('<option />', {
			'value' : target.attr('href'),
			'text': target.text()
		}).appendTo('.navbar select');
	});
	// on clicking on link
	$('.navbar select').on('change',function(){
		window.location = $(this).find('option:selected').val();
	});

}


// bootstrap tooltip invocking
function showtooltip() {
	$('a[data-toggle=tooltip], button[data-toggle=tooltip], input[data-toggle=tooltip]')
	.tooltip({
		animation:false
	});
}

function cartContent() {
	var $cartContent = $('.cart-content');
	$cartContent.find('table').click(function(e){
		e.stopPropagation();
	});
}

// flexslider on home page
function flexSlideShow() {
	$('.flexslider').flexslider({
		 animation: "slide",
		 slideshowSpeed: 4000,
		 directionNav: false,
		 pauseOnHover: true,
		 directionNav: false
	});
}

// bootstrap carousel in caregories grid and list
function productSlider() {
	$('.carousel').carousel();
}


// link fancybox plugin on product detail
function productFancyBox() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
}

// dropdown mainnav
function dropdownMainNav() {
	var navLis = $('div.navbar > ul.nav > li');
	navLis.hover(
		function () {
			// hide the css default behavir
			$(this).children('div').css('display', 'none');
			//show its submenu
			$(this).children('div').slideDown(150);
		}, 
		function () {
			//hide its submenu
			$(this).children('div').slideUp(350);		
		}
	);

}

// display your twiter feed here
function latestTweets() {
	
    $(".tweet").tweet({
        username: "seaofclouds",
        join_text: "auto",
        avatar_size: 0,
        count: 3,
        auto_join_text_default: "we said,", 
        auto_join_text_ed: "we",
        auto_join_text_ing: "we were",
        auto_join_text_reply: "we replied to",
        auto_join_text_url: "we were checking out",
        loading_text: "loading tweets..."
    });
}

// open and hide the side panel
function openSidePanel() {
	var widgetToggleLink = $('a.Widget-toggle-link'),
		$switcher = $(".switcher");

	widgetToggleLink.on('click', function(e){
		e.preventDefault();
		var left = $switcher.css('left');
		if(left <= '-170px'){
			$switcher.animate({
				left: 0
			}, 200, function(){
				$(this).find(widgetToggleLink).text('-');
			});
		}else{
			$switcher.animate({
				left: '-170px'
			}, 200, function(){
				$(this).find(widgetToggleLink).text('+');
			});
		}
	});
}


// change background pattern
function changeBackgroundPattern() {
	/* cookie vars */
	var cookie_name1 = "site_pattern";
	var cookie_options1 = { path: '/', expires: 30 };
	var get_cookie1 = $.cookie('site_pattern');
	if(get_cookie1 == null){get_cookie1 = 'retina_wood'}
	// backgrounds
	$('head')
	.append('<link rel="stylesheet" id="active-bg" href="css/backgrounds/'+get_cookie1+'.css">');

	$(".switcher > .switcher-content > .pattern-switch").find('a').bind('click', function(e) {
		$('#active-bg').remove();
		e.preventDefault();
		var bgName = $(this).text();
		$.cookie(cookie_name1, bgName, cookie_options1);
		$('head')
		.append('<link rel="stylesheet" id="active-bg" href="css/backgrounds/'+bgName+'.css">');
	});
}


// change layoutStyle
function changeLayoutStyle() {
	/* cookie vars */
	var cookie_name2 = "site_layout";
	var cookie_options2 = { path: '/', expires: 30 };
	var get_cookie2 = $.cookie('site_layout');
	if(get_cookie2 == null){get_cookie2 = 'Wide'}
	//layout
	$('head')
	.append('<link rel="stylesheet" id="active-bg" href="css/layout/'+get_cookie2+'.css">');
	$(".switcher > .switcher-content > .layout-switch").find('a').bind('click', function(e){
		$('#active-layout').remove();
		e.preventDefault();
		var layoutName = $(this).text();
		$.cookie(cookie_name2, layoutName, cookie_options2);
		$('head')
		.append('<link rel="stylesheet" id="active-layout" href="css/layout/'+layoutName+'.css">');

	});
}


// change site color
function changeColorStyle() {
	/* cookie vars */
	var cookie_name3 = "site_color";
	var cookie_options3 = { path: '/', expires: 30 };
	var get_cookie3 = $.cookie('site_color');
	if(get_cookie3 == null){get_cookie3 = 'orange'}
	//layout
	$('head')
	.append('<link rel="stylesheet" id="active-bg" href="css/color/'+get_cookie3+'.css">');
	$(".switcher > .switcher-content > .color-switch").find('a').bind('click', function(e){
		$('#active-color').remove();
		e.preventDefault();
		var colorName = $(this).text();
		$.cookie(cookie_name3, colorName, cookie_options3);
		$('head')
		.append('<link rel="stylesheet" id="active-color" href="css/color/'+colorName+'.css">');

	});
}


// range price product
function rangePriceSlider() {
	var $slideRange = $("#slider-range"),
		amount = $( "#amount" );
	$slideRange.slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        amount.val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    amount.val( "$" + $slideRange.slider( "values", 0 ) +
      " - $" + $slideRange.slider( "values", 1 ) );
}

function checkSession() {
	var sescook = $.cookie("mycses");
	var uncook = $.cookie("myusna");

	alert(sescook);

	if((sescook != "0") && (sescook != null)){
		setLoggedUser(uncook);
	}
}


$(document).ready(function(){
	topNavToSelect();
	NavToSelect();
	showtooltip();
	cartContent();
	flexSlideShow();
	productSlider();
	productFancyBox();
	dropdownMainNav();
	latestTweets();
	openSidePanel();
	changeBackgroundPattern();
	changeLayoutStyle();
	changeColorStyle();
	rangePriceSlider();
	changeLabels();
	setCategoryBar();
	setSpecialItems();
	setFeatureItems();
	setFooterLayout();
	checkSession();
	setCategoryList();
	fillSearchResult();
});