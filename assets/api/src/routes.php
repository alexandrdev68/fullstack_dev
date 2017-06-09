<?php
// Routes
include_once 'request_lib_inc.php';

$app->any('/confirm[/{params:.*}]', function($request, $response, $args){
    
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
        $this->logger->info("aouth token was saved in session: {$response_body['access_token']}");
        setcookie('logged', 1, time() + (86400 * 30));

    }
    
   return $response->withRedirect('/');
    
});





$app->any('/proxy[/{params:.*}]', function($request, $response, $args){
    
    if(isset($_SESSION['access_token'])){
        $query = explode('?', $request->getUri())[1];
        $arg = (isset($query) ? $query : '');
        $this->logger->info("params: {$arg}");
        Request::$url = 'https://api.github.com';
        Request::$operation = '/'.$args['params'].'?'.$query;
        Request::$custom_headers = [
            'Authorization: token '.$_SESSION['access_token'],
            'Accept: application/vnd.github.v3+json',
            'User-Agent: fullstack_dev'
        ];
        Request::$type = $request->getMethod();
        Request::send($request->getParsedBody());

        if(Request::$response === false){
            Request::$response = array(
                'curl_error'=>Request::$error_string,
                'headers'=>Request::$info
            );
        }else{
            Request::$response = json_decode(Request::$response, true);
        }
        return $response->withJson(Request::$response, Request::$info['http_code']);
    }else{
        return $response->withRedirect('/logout');
    }

    
    


});
$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    if(isset($args['name']) && $args['name'] == 'logout'){
        unset($_SESSION['access_token']);
        setcookie('logged', 1, time() - 1);

        return $response->withRedirect('/');
    }

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
