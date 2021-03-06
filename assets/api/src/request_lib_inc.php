<?php
class Request {
	
	static public $url = '';
	static public $operation = '';
	static public $type = 'POST';
	static public $need_auth = false;
	static public $login;
	static public $password;
	static public $request_fields = '{}';
	static public $response;
	static public $cRes;
	static public $error = array();
	static public $custom_headers = array();
	static public $custom_options = array();
	static public $info = '';
	static public $error_string;
	static protected $header_size;
	static public $header;
	
	
	
	static public function send($arFields = array()){
		self::$request_fields = count($arFields) == 0 ? '' : json_encode($arFields);
		
		//echo self::$type.'   '.self::$request_fields.'    '.self::$login.' : '.self::$password.'     '.self::$url.self::$operation; exit;
		
		
		self::init();
		
		self::$response = curl_exec(self::$cRes);
		self::$info = curl_getinfo(self::$cRes);
		self::$error_string = curl_error(self::$cRes);
		self::$header_size = curl_getinfo(self::$cRes, CURLINFO_HEADER_SIZE);
		self::$header = substr(self::$response, 0, self::$header_size);

	}
	
	static public function init(){
		 self::$cRes = curl_init(self::$url.self::$operation);
	     if (self::$need_auth)
	     {
	          curl_setopt(self::$cRes, CURLOPT_USERPWD, self::$login.':'.sha1(self::$password));
	     }
	     
	     curl_setopt(self::$cRes, CURLOPT_POST, self::$type == 'POST');
	     if (!in_array(self::$type, array('POST', 'GET')))
	     {
	          curl_setopt(self::$cRes, CURLOPT_CUSTOMREQUEST, self::$type);
	     }
	     curl_setopt(self::$cRes, CURLOPT_RETURNTRANSFER, true);
	     curl_setopt(self::$cRes, CURLOPT_FAILONERROR, true);
	     $headers = array('Content-Type: application/json', 
	     								'Accept-Charset: UTF-8', 
										 'Accept: application/json');
		 if(count(self::$custom_headers) > 0){
	     	foreach(self::$custom_headers as $header){
	     		 array_push($headers, $header);
	     	}
	     }
	     $opts = array(
			CURLOPT_URL => self::$url.self::$operation,
	     	CURLOPT_RETURNTRANSFER => 1,
	     	CURLOPT_SSL_VERIFYPEER => 0,
	     	CURLOPT_SSL_VERIFYHOST => 0,
	     	CURLINFO_HEADER_OUT=> 1,
	     	CURLOPT_FAILONERROR => 1,
	     	CURLOPT_HTTPHEADER => $headers
		 );
		 if(count(self::$custom_options) > 0){
	     	foreach(self::$custom_options as $ind=>$option){
	     		  $opts[$ind] = $option;
	     	}
	     }
		 curl_setopt_array(self::$cRes, $opts);
	     if (!empty(self::$request_fields))
	     {
	          curl_setopt(self::$cRes, CURLOPT_POSTFIELDS, self::$request_fields);
	     }
	     else
	     {
	          if (self::$type == 'POST')
	          {
	               curl_setopt(self::$cRes, CURLOPT_POSTFIELDS, '{}');
	          }
	     }
	}
	
	
	static public function comment_filter($data){
     	$filter = array( '<', '>', '&', '#', '=', '"');
     	$replace = array('', '', '', '', '', '`');
     	return str_replace($filter, $replace, trim(stripslashes(strip_tags($data))));
     }
}
?>