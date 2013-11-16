<?php
	dl("php_mbstring.dll");
	require_once("mpdf/mpdf.php");
	//ob_start();
	

	$fh = fopen("d:\\impresiones\\html.html",'r');
	$r = filesize("d:\\impresiones\\html.html");
	$html = fread($fh, $r);
	fclose($fh);

	// $html = ob_get_clean();
	$mpdf=new mPDF();
	$mpdf->WriteHTML($html);

	//ob_start();

	ob_start();
	$mpdf->Output();
	echo base64_encode(ob_get_clean());
	//echo $html;
	//echo base64_encode(ob_get_clean());

?>