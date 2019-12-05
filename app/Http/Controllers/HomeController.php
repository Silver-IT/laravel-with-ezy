<?php

namespace App\Http\Controllers;
use GuzzleHttp\Client;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $client = new Client(['base_uri' => 'http://localhost:3030/']);
        $response = $client->request('GET', 'testing');

        $data = json_decode($response->getBody());

        echo $data->status;

        return view('home');
    }
}
