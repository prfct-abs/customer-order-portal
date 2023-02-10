<?php

/**
 * Summary of ConnectDb
 */
class ConnectDb {
    private $server = '127.0.0.1';
    private $dbname = 'my_customer_portal';
    private $user = 'root';
    private $pass = 'root';
    public function connect() {
        try{
            // $dsn = "mysql: dbname=" . DB_DATABASE . "; host=" . DB_HOST;
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // $conn->query("USE " . DB_DATABASE);
            // echo 'Connected';
            return $conn;
        }catch (\Exception $e){
            die("Error connecting to DB: " . $e->getMessage());
        }
    }


    /**
     * Summary of getInventoryForProduct
     * @param mixed $prodId
     * @return array
     */
    public function getInventoryForProduct($prodId='a00001') :array {
        $db = $this->connect();
        $sql = "SELECT * FROM my_inventory where product_code=:prod_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':prod_id', $prodId);
        $stmt->execute();
        $data = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC))   {          
                $data[] = $row;  
        }
        $response         = [];
        $response['data'] =  $data;
        return $response['data'];
    }
}

