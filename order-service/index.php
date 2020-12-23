<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use GuzzleHttp\Client;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

function checkKelasAvalable ($id) {
    try {
        if ($id) {
            $client = new Client([
                'base_uri' => 'http://localhost:8000/',
                'timeout'  => 2.0,
            ]);
        
            $response = $client->request('GET', 'kelas/'.$id);
            return json_decode($response->getBody());
        }

        return [];
        
    } catch (\Throwable $th) {
        return [];
    }

}

$app->get('/order', function (Request $request, Response $response, $args) {
    $myFile = "order.json";
    $jsondata = file_get_contents($myFile);

    $response->getBody()->write($jsondata);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/order', function (Request $request, Response $response, $args) {

    $data = $request->getParsedBody();

    // check kelas is available or not!
    $kelas = checkKelasAvalable($data['kelas_id']);

    if (count($kelas) === 0) {
        $arrMsg = ['message' => 'kelas not found!'];
        $response->getBody()->write(json_encode($arrMsg));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // save to db
    $myFile = "order.json";
    $arr_data = [];

    $jsondata = file_get_contents($myFile);
    $arr_data = json_decode($jsondata, true);
    $buildData = [
        'id' => rand(1, 100),
        'status' => 'waiting_payment',
        'kelas' => $kelas
    ];
	array_push($arr_data, $buildData);
	$jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
	if(file_put_contents($myFile, $jsondata)) {
        $response->getBody()->write(json_encode($buildData));
        return $response->withHeader('Content-Type', 'application/json');
	} else { 
        $arrMsg = ['message' => 'order error'];
        $response->getBody()->write(json_encode($arrMsg));
        return $response->withHeader('Content-Type', 'application/json');
    }

    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();