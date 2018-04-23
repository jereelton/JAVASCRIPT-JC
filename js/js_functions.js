
var mensagem                = "";
var tempo                   = 7000;
var control_error;
var control_sucess;

var div_success                = "div_mensagens_sucesso";
var div_error                  = "div_mensagens_erro";
var div_success_content        = "div_content_sucess";
var div_error_content          = "div_content_erro";

function mostra_mensagem( _id, _message, _time ) {
	
	var acao_s = "<a onclick=\"return fechar_elemento_timeout( 'div_mensagens_sucesso' );\">";
	var acao_e = "<a onclick=\"return fechar_elemento_timeout( 'div_mensagens_erro' );\">";
	
	$(document).ready(function() {
		
		$("#" + _id).hide();
		$("#" + _id).show();
		
	});
	
	switch( _id ) {
		
		case div_error:
			clearTimeout( control_error );
			document.getElementById( div_error_content ).innerHTML = acao_e + _message + "</a>";
			control_error = setTimeout( function() { fechar_elemento_timeout( _id ); }, _time );
		break;
		
		case div_success:
			clearTimeout( control_sucess );
			document.getElementById( div_success_content ).innerHTML = acao_s + _message + "</a>";
			control_sucess = setTimeout( function() { fechar_elemento_timeout( _id ); }, _time );
		break;
	
	}
	
	return false;
	
}

function fechar_elemento_timeout( _id ) {
	
	switch( _id ) {
		
		case div_error:
			clearTimeout( control_error );
		break;
		
		case div_success:
			clearTimeout( control_sucess );
		break;
	
	}
	
	$(document).ready( function() {
		
		$("#" + _id).hide( 'slow' );
		
	});
	
	if( verificar_tag_criada( "div", "tela_preta" ) == true ) {
		
		document.getElementById( "tela_preta" ).style.display = 'none';
		
	}
	
}

function antecipar_fechar_elemento( id ) {
	
	$(document).ready(function() {
		
		$("#" + id).hide( 1000 );
		
	});
	
	if( CheckIfTagExists( "div", "tela_preta" ) == true ) {
		
		document.getElementById( "tela_preta" ).style.display = 'none';
		
	}
	
	return false;

}

function fechar_elemento( id_elemento ) {
					
	// Jquery para mostrar elementos com efeitos
	$(document).ready(function(){
	
		$("#"+id_elemento).fadeOut();
		
	});
	
	if( verificar_tag_criada( "div", "div_tela_preta" ) == true ) {
		
		document.getElementById( "div_tela_preta" ).style.display = "none";
	
	}
	
}

function abrir_elemento( id_elemento ) {
					
	// Jquery para mostrar elementos com efeitos
	$(document).ready(function(){
	
		$("#"+id_elemento).fadeIn( 1000 );
		
	});
	
	if( verificar_tag_criada( "div", "div_tela_preta" ) == true ) {
		
		document.getElementById( "div_tela_preta" ).style.display = "block";
	
	}
	
}

function abrir_elemento_relativamente( id_elemento ) {
					
	// Jquery para mostrar elementos com efeitos
	$(document).ready(function(){
	
		$("#"+id_elemento).fadeIn( 1000 );
		
	});
	
}

function verificar_tag_criada( nome_tag, id_tag ) {
	
	var vetor = document.getElementsByTagName( nome_tag );
	
	for( var i = 0; i < vetor.length; i++ ) {
		
		if( vetor[i].id == id_tag ) {
			
			return true;
			
		}
		
	}
	
	return false;
	
}

function exec_focus( id ) {
	
	document.getElementById( id ).focus();
	
}

function resolucao_tela() {
	
	var x = screen.width;
	var y = screen.height;
	
	alert( x +"x"+ y );
	
}

function fechar_elemento_simples( elemento ) {
	
	document.getElementById( elemento ).style.display         = "none";
	document.getElementById( "div_tela_preta" ).style.display = "none";
}

String.PAD_LEFT  = 0;
String.PAD_RIGHT = 1;
String.PAD_BOTH  = 2;

String.prototype.pad = function(size, pad, side) {
	
	var str = this, append = "", size = (size - str.length);
	
	var pad = ((pad != null) ? pad : " ");
	
	if ((typeof size != "number") || ((typeof pad != "string") || (pad == ""))) {
		throw new Error("Wrong parameters for String.pad() method.");
	}
	
	if (side == String.PAD_BOTH) {
		str = str.pad((Math.floor(size / 2) + str.length), pad, String.PAD_LEFT);
		return str.pad((Math.ceil(size / 2) + str.length), pad, String.PAD_RIGHT);
	}
	
	while ((size -= pad.length) > 0) {
		append += pad;
	}
	
	append += pad.substr(0, (size + pad.length));
	return ((side == String.PAD_LEFT) ? append.concat(str) : str.concat(append));
	
}

Number.prototype.format = function(d_len, d_pt, t_pt) {
	
	var d_len = d_len || 0;
	var d_pt = d_pt || ".";
	var t_pt = t_pt || ",";
	
	if ((typeof d_len != "number") || (typeof d_pt != "string") || (typeof t_pt != "string")) {
		throw new Error("wrong parameters for method 'String.pad()'.");
	}
	
	var integer = "", decimal = "";
	var n = new String(this).split(/\./), i_len = n[0].length, i = 0;
	
	if (d_len > 0) {
		n[1] = (typeof n[1] != "undefined") ? n[1].substr(0, d_len) : "";
		decimal = d_pt.concat(n[1].pad(d_len, "0", String.PAD_RIGHT));
	}
	
	while (i_len > 0) {
		
		if ((++i % 3 == 1) && (i_len != n[0].length)) {
			integer = t_pt.concat(integer);
		}
		
		integer = n[0].substr(--i_len, 1).concat(integer);
	}
	
	return (integer + decimal);
	
}

function number_format( numero, decimal, decimal_separador, milhar_separador ){
	
	numero = (numero + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+numero) ? 0 : +numero,
		prec = !isFinite(+decimal) ? 0 : Math.abs(decimal),
		sep = (typeof milhar_separador === 'undefined') ? ',' : milhar_separador,
		dec = (typeof decimal_separador === 'undefined') ? '.' : decimal_separador,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
		
	// Fix para IE: parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	
	return s.join(dec);
	
}

function formata_moeda( objTextBox, SeparadorMilesimo, SeparadorDecimal, e ) {
	
	var sep      = 0;
	var key      = '';
	var i        = 0 
	var j        = 0;
	var len      = 0;
	var len2     = 0;
	var strCheck = '0123456789';
	var aux      = '';
	var aux2     = '';
	
	var whichCode = ( window.Event ) ? e.which : e.keyCode;
	
	if( whichCode == 13 || e.keyCode == 13 ) return false; // Retorna falso para [Enter]
	
	key = String.fromCharCode( whichCode ); // Valor para o codigo da Chave
	
	if( strCheck.indexOf( key ) == -1 ) return false; // Chave invalida
	
	len = objTextBox.value.length;
	
	for( i = 0; i < len; i++ ) {
		
		if( ( objTextBox.value.charAt( i ) != '0' ) && ( objTextBox.value.charAt( i ) != SeparadorDecimal ) ) break;
		
	}
	
	aux = '';
	
	for( ; i < len; i++ ) {
		
		if ( strCheck.indexOf( objTextBox.value.charAt( i ) ) != -1 ) aux += objTextBox.value.charAt( i );
		
	}
	
	aux += key;
	
	len = aux.length;
	
	if( len == 0 ) objTextBox.value = '';
	
	if( len == 1 ) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
	
	if( len == 2 ) objTextBox.value = '0'+ SeparadorDecimal + aux;
	
	if( len > 2 ) {
		
		aux2 = '';
		
		for ( j = 0, i = len - 3; i >= 0; i-- ) {
			
			if( j == 3 ) {
				
				aux2 += SeparadorMilesimo;
				j = 0;
				
			}
			
			aux2 += aux.charAt( i );
			j++;
			
		}
		
		objTextBox.value = '';
		len2             = aux2.length;
		
		for( i = len2 - 1; i >= 0; i-- ) {
			
			objTextBox.value += aux2.charAt( i );
			
		}
		
		objTextBox.value += SeparadorDecimal + aux.substr( len - 2, len );
		
	}
	
	return false;
	
}

function formata_decimal( elemento ) {
	
	var alvo          = document.getElementById( elemento );
	var entrada       = alvo.value.length;
	var digito        = alvo.value.substr( entrada - 1, entrada );
	var valida_digito = new RegExp(/^[0-9]$/);
	
	if ( ! valida_digito.test( digito ) ) {
		
		alvo.value = alvo.value.substr( 0, entrada - 1 );
		
	}
	
}

function calcularJurosCompostos() {
	
	var capital         = document.getElementById('capital'        ).value;
	var deposito_mensal = document.getElementById('deposito_mensal').value;
	var taxa_anual      = document.getElementById('taxa_anual'     ).value;
	var qtde_meses      = document.getElementById('qtde_meses'     ).value;
	
	if(!capital || !deposito_mensal || !taxa_anual || !qtde_meses) {
		mensagem = "<h2>Preencha todos os campos!</h2>";
		mostra_mensagem( "div_mensagens_erro", mensagem, tempo );
		return false;
	}
	
	capital         = capital.replace(/\./g, "").replace(/\,/g, ".");
	deposito_mensal = deposito_mensal.replace(/\./g, "").replace(/\,/g, ".");
	taxa_anual      = taxa_anual.replace(/\./g, "").replace(/\,/g, ".");
	
	document.getElementById('div_form_juros_compostos').style.display = "none";
	document.getElementById('div_resultado_calculo').style.display = "block";
	
	document.getElementById('table_resultado_calculo').innerHTML        = "";
	document.getElementById('table_header_resultado_calculo').innerHTML = "";
	
	var header_tabela = "";
	header_tabela += "<thead>";
	header_tabela += "<th class='cel_mes'>M/Ms</th>";
// 	header_tabela += "<th>Deposito</th>";
	header_tabela += "<th class='cel_capital'>Capital</th>";
	header_tabela += "<th class='cel_juros'>Juros</th>";
	header_tabela += "<th class='cel_acumulado'>Acumulado</th>";
// 	header_tabela += "<th>Taxa a.m.</th>";
// 	header_tabela += "<th>Taxa Mensal %</th>";
// 	header_tabela += "<th>Taxa Anual %</th>";
	header_tabela += "</thead>";
	
	document.getElementById('table_header_resultado_calculo').innerHTML += header_tabela;
	
	// Simulando juros sobre juros - potencia
	for(var i = 1; i <= qtde_meses; i++) {
		
		capital = jurosCompostos(capital, deposito_mensal, taxa_anual, i, qtde_meses);

	}
	
	var capital_f = parseFloat(capital).format(2, ",", ".");
	document.getElementById('div_valor_resultado').innerHTML = capital_f;
	
}

function jurosCompostos(capital, deposito_mensal, taxa_anual, contador_mes, qtde_meses) {
	
	var taxa_composta = Math.pow( 1 + ( taxa_anual / 100 ), 1 / 12 );
	var taxa_mensal   = parseInt(100) * parseFloat( taxa_composta - 1 );
	var capital       = parseFloat(capital) + parseFloat(deposito_mensal);
	var novo_capital  = parseFloat(capital) * parseFloat(taxa_composta);
	var juros         = parseFloat(novo_capital) - parseFloat(capital);
	
	var deposito_mensal_f = parseFloat(deposito_mensal).format(2, ",", ".");
	var capital_f         = parseFloat(capital).format(2, ",", ".");
	var juros_f           = juros.format(2, ",", ".");
	var novo_capital_f    = novo_capital.format(2, ",", "."); // 101.614,50
	//var novo_capital_f    = number_format(novo_capital, 2, ",", "."); //101.614,51
	var taxa_composta_f   = taxa_composta.format(6, ",", ".");
	var taxa_mensal_f     = taxa_mensal.format(2, ",", ".");
	var taxa_anual_f      = parseFloat(taxa_anual).format(2, ",", ".");
	
	var conteudo = "";
	conteudo += "<tr>";
	conteudo += "<td class='cel_mes'>" + contador_mes      + "/" + qtde_meses +"</td>";
// 	conteudo += "<td>" + deposito_mensal_f + "</td>";
	conteudo += "<td class='cel_capital'>" + capital_f         + "</td>";
	conteudo += "<td class='cel_juros'>" + juros_f           + "</td>";
	conteudo += "<td class='cel_acumulado'>" + novo_capital_f    + "</td>";
// 	conteudo += "<td>" + taxa_composta_f   + "</td>";
// 	conteudo += "<td>" + taxa_mensal_f     + "</td>";
// 	conteudo += "<td>" + taxa_anual_f      + "</td>";
	conteudo += "</tr>";
	
	document.getElementById('table_resultado_calculo').innerHTML += conteudo;
	
	if(contador_mes == qtde_meses) {
		document.getElementById('div_deposito'               ).innerHTML = "<p>Deposito Mensal</p><h3>" + deposito_mensal_f + "</h3>";
		document.getElementById('div_taxa_anual'             ).innerHTML = "<p>Taxa Anual %</p><h3>"    + taxa_anual_f      + "</h3>";
		document.getElementById('div_taxa_mensal'            ).innerHTML = "<p>Taxa Mensal %</p><h3>"   + taxa_mensal_f     + "</h3>";
		document.getElementById('div_taxa_mensal_porcentagem').innerHTML = "<p>Taxa % a.m.</p><h3>"     + taxa_composta_f   + "</h3>";
	}
	
	return novo_capital;
}

function calcularJurosCompostosValorFixo() {

	var capital    = document.getElementById('capital'   ).value;
	var taxa_anual = document.getElementById('taxa_anual').value;
	var qtde_meses = document.getElementById('qtde_meses').value;
	
	if(!capital || !taxa_anual || !qtde_meses) {
		mensagem = "<h2>Preencha todos os campos!</h2>";
		mostra_mensagem( "div_mensagens_erro", mensagem, tempo );
		return false;
	}
	
	capital    = capital.replace(/\./g, "").replace(/\,/g, ".");
	taxa_anual = taxa_anual.replace(/\./g, "").replace(/\,/g, ".");
	
	document.getElementById('div_form_juros_compostos').style.display = "none";
	document.getElementById('div_resultado_calculo').style.display = "block";
	
	document.getElementById('table_resultado_calculo').innerHTML        = "";
	document.getElementById('table_header_resultado_calculo').innerHTML = "";
	
	var header_tabela = "";
	header_tabela += "<thead>";
	header_tabela += "<th class='cel_mes'>M/Ms</th>";
	header_tabela += "<th class='cel_capital'>Capital</th>";
	header_tabela += "<th class='cel_juros'>Juros</th>";
	header_tabela += "<th class='cel_acumulado'>Acumulado</th>";
// 	header_tabela += "<th>Taxa a.m.</th>";
// 	header_tabela += "<th>Taxa Mensal %</th>";
// 	header_tabela += "<th>Taxa Anual %</th>";
	header_tabela += "</thead>";
	
	document.getElementById('table_header_resultado_calculo').innerHTML += header_tabela;
	
	// Simulando juros sobre juros - potencia
	for(var i = 1; i <= qtde_meses; i++) {
		
		capital = jurosCompostosValorFixo(capital, taxa_anual, i, qtde_meses);

	}
	
	var capital_f = parseFloat(capital).format(2, ",", ".");
	document.getElementById('div_valor_resultado').innerHTML = capital_f;
	
}

function jurosCompostosValorFixo(capital, taxa_anual, contador_mes, qtde_meses) {
	
	var taxa_composta   = Math.pow( 1 + ( taxa_anual / 100 ), 1 / 12 );
	var taxa_mensal     = parseInt(100) * parseFloat( taxa_composta - 1 );
	var novo_capital    = parseFloat(capital) * parseFloat(taxa_composta);
	var juros           = parseFloat(novo_capital) - parseFloat(capital);
	
	var capital_f       = parseFloat(capital).format(2, ",", ".");
	var juros_f         = juros.format(2, ",", ".");
	var novo_capital_f  = novo_capital.format(2, ",", ".");
	var taxa_composta_f = taxa_composta.format(6, ",", ".");
	var taxa_mensal_f   = taxa_mensal.format(2, ",", ".");
	var taxa_anual_f    = parseFloat(taxa_anual).format(2, ",", ".");
	
	var conteudo = "";
	conteudo += "<tr>";
	conteudo += "<td class='cel_mes'>" + contador_mes    + "/" + qtde_meses +"</td>";
	conteudo += "<td class='cel_capital'>" + capital_f       + "</td>";
	conteudo += "<td class='cel_juros'>" + juros_f         + "</td>";
	conteudo += "<td class='cel_acumulado'>" + novo_capital_f  + "</td>";
// 	conteudo += "<td>" + taxa_composta_f + "</td>";
// 	conteudo += "<td>" + taxa_mensal_f   + "</td>";
// 	conteudo += "<td>" + taxa_anual_f    + "</td>";
	conteudo += "</tr>";

	document.getElementById('table_resultado_calculo').innerHTML += conteudo;
	
	if(contador_mes == qtde_meses) {
		document.getElementById('div_deposito'               ).innerHTML = "<p>Deposito Mensal</p><h3>N/A</h3>";
		document.getElementById('div_taxa_anual'             ).innerHTML = "<p>Taxa Anual %</p><h3>"    + taxa_anual_f      + "</h3>";
		document.getElementById('div_taxa_mensal'            ).innerHTML = "<p>Taxa Mensal %</p><h3>"   + taxa_mensal_f     + "</h3>";
		document.getElementById('div_taxa_mensal_porcentagem').innerHTML = "<p>Taxa % a.m.</p><h3>"     + taxa_composta_f   + "</h3>";
	}
	
	return novo_capital;
}
	
