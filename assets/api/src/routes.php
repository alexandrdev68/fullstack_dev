<?php
// Routes
include_once 'request_lib_inc.php';

$app->any('/confirm[/{params:.*}]', function($request, $response, $args){
    //var_dump($args);
    //var_dump($request);
    //var_dump($_GET);
    /*$client = new \GuzzleHttp\Client([
        'base_uri' => 'https://github.com', 
        'headers'=>[
            'Accept' => 'application/json'
            ]
        ]);

    $arRequest = [
            'client_id' => $this->get('settings')['OAuth']['client_id'],
            'client_secret' => $this->get('settings')['OAuth']['client_secret'],
            'code' => $_GET['code']
    ];

    try{
        $res = $client->request('POST', '/login/oauth/access_token', $arRequest);
    }catch(Exception $error){
        echo $error->getMessage();
        exit;
    }

    try{
        $status = $res->getStatusCode();
        $content_type = $res->getHeaderLine('content-type');
        // 'application/json; charset=utf8'
        $body = $res->getBody();
    }catch(Exception $e){
        echo $e->getMessage();
    }*/


    Request::$url = 'https://github.com';
    Request::$operation = '/login/oauth/access_token';
    Request::$type = 'POST';
    Request::send([
        'client_id' => $this->get('settings')['OAuth']['client_id'],
        'client_secret' => $this->get('settings')['OAuth']['client_secret'],
        'code' => $_GET['code']
    ]);

    $response_body = json_decode(Request::$response, true);
    if(isset($response_body['access_token'])){

        $_SESSION['access_token'] = $response_body['access_token'];

    }
    
    
});
$app->any('/proxy[/{params:.*}]', function($request, $response, $args){
    var_dump($args);
    //var_dump($request);
    var_dump($_GET);
});
$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
