<?php
// Routes
$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    $base_path = $request->getUri()->getBasePath();
    $file_name = $request->getAttribute('name');
    echo $file_name;
    if(strpos($base_path, 'static') !== false){
        return $this->renderer->render($response, '/src.js', $args);
    }else{
        return $this->renderer->render($response, 'index.phtml', $args);
    }
    // Render index view
    
});
