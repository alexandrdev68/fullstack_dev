<?php
// Routes

$app->any('/confirm[/{params:.*}]', function($request, $response, $args){
    var_dump($args);
    //var_dump($request);
    var_dump($_GET);
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
