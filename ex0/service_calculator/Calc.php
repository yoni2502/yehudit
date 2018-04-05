<?php
class Calc{
    var $num1, $num2, $num3, $func, $res;

    function __construct() {

    }
    public function getValues(){
        $method = $_SERVER["REQUEST_METHOD"];
        if($method=='GET')
            $this->GET();
        else if($method=='POST')
            $this->POST();
        else if($method=='PUT'){
            $this->PUT();
        }

    }
    private function GET(){
        $this->num1 = $_GET["num1"];
        $this->num2 = $_GET["num2"];
        $this->num3 = $_GET["num3"];
        $this->func = $_GET["func"];
    }
    private function POST(){
        $this->num1 = $_POST["num1"];
        $this->num2 = $_POST["num2"];
        $this->num3 = $_POST["num3"];
        $this->func = $_POST["func"];
    }
    private function PUT(){
        parse_str(file_get_contents("php://input"),$_PUT);
        $this->num1 = $_PUT["num1"];
        $this->num2 = $_PUT["num2"];
        $this->num3 = $_PUT["num3"];
        $this->func = $_PUT["func"];
    }

    public function calculate(){
        $func = $this->func;
        if($func=='sum')
            $this->sum();
        else if($func=='avg')
            $this->avg();
        else if($func=='mult')
            $this->mult();
        else
            $this->res=0;
    }
    private function sum(){
        $this->res = $this->num1 + $this->num2 + $this->num3;
    }
    private function avg(){
        $this->res = ($this->num1 + $this->num2 + $this->num3) / 3;
    }
    private function mult(){
        $this->res = $this->num1 * $this->num2 * $this->num3;
    }

    public function responseJSON(){
        header('Content-Type: application/json');
        $json = array('retVal' => $this->res);
        echo json_encode($json);
    }
}

?>