<?php
header('Access-Control-Allow-Origin : *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application-json; charset=UTF-8");
// header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, x-Requested-With");

$data = json_decode(file_get_contents("php://input"));
//todo
// if($data->AuthToken != "$2a$10$xNEHOtExcNrhazYJqJAwlOcAykp.SglBfMItjSsk4HNVXlK3344Jq"){
//     return json_encode(['status'=>'error','response'=>'Not authorised']);
// }

$parts = explode ("/", $_SERVER["REQUEST_URI"]);
// print_r($parts);
if ($parts [1] != "api") {
    http_response_code (404);
    exit;
}

require('ConnectDb.php');
$con = new ConnectDb();
$db = $con->connect();
$total_order = isset($data->customer_total_order) ? htmlspecialchars($data->customer_total_order) : 249;
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case 'POST':      
        $data = $con->getInventoryForProduct();
        echo json_encode(getOrderData($data[0], $total_order));
        break;
    case 'GET':      
        $data = $con->getInventoryForProduct();
        echo json_encode(getOrderData($data[0], $total_order));
        break;

    default: 
        echo json_encode(['status'=>'error','response'=>'none matching']);
}

/**
 * Summary of getOrderData
 * @param mixed $data
 * @param mixed $customer_total_order
 * @return array
 */
function getOrderData($data, $customer_total_order) :array {
    $order_remaining = $order = $customer_total_order;

    $bundle_sizes = explode(',', $data['inventory']);
    
    sort($bundle_sizes);//Ascending Order
    $asc_bundle_sizes = $bundle_sizes;
    rsort($bundle_sizes);//Descending Order
    $desc_bundle_sizes = $bundle_sizes;
    
    $bundle_counts = [];
    // print_r($bundle_sizes);
    // var_dump($order);
    // var_dump(in_array($order, $bundle_sizes));
    // die;
    if ($order <= 0) {
        return ["status"=>"error","response"=>"Order has to be more than ZERO!"];
    } elseif (in_array($order,$bundle_sizes)) {
        $result = [];
        $result[$order] = 1;
        return ["status"=>"success","response"=>($result)];
    } else {
        while($order_remaining>0) { 
            
            $bundle_size = 0;
            foreach ($desc_bundle_sizes as $size) {
                if ($size <= $order_remaining && $size > $bundle_size) {
                    $bundle_size = $size;
                }
            }
            if ($bundle_size == 0){
                foreach ($asc_bundle_sizes as $size) {
                    if ($size >= $order_remaining) {
                        $bundle_size = $size;
                        break;
                    }
                }
            }
            $count = floor($order_remaining / $bundle_size);
            $count = empty($count) ? 1 : $count;
            $order_remaining = $order_remaining - ($count * $bundle_size);  
            if(!isset($bundle_counts[$bundle_size])){
                $bundle_counts[$bundle_size] = $count;
            } else{
                $order_remaining +=  (2 * $bundle_size);
                unset($bundle_counts[$bundle_size]);
                $asc_bundle_sizes = array_diff( $asc_bundle_sizes, [$bundle_size] );
                $desc_bundle_sizes = array_diff( $desc_bundle_sizes, [$bundle_size] );
            }
        }
        $total = 0;
        foreach ($bundle_counts as $bundle_size => $count) {
            $total += $bundle_size * $count;
        }
        return ["status"=>"success","response"=>$bundle_counts];
    }
}