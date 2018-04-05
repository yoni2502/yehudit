<?php
include("Calc.php");

$calc = new Calc();
$calc->getValues();
$calc->calculate();
$calc->responseJSON();
?>