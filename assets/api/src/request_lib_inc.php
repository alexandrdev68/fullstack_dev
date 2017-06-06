<?php
class Request {
	
	//static public $url = 'https://api.globalmoney.ua';//for production
	static public $url = 'http://192.168.2.107:9000';//for development
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
	
	
	
	
	static public function write_log($arLogFields){
		
		$filename = $_SERVER['DOCUMENT_ROOT'].'/data/oper_'.date('Y-W').'.log';
		$date = date('Y-m-d H:i:s', time());
		//$res = json_decode(self::$response, true);
		$logString = $date.' params: '.json_encode($arLogFields);
		/*if($res['status'] == 0){
			$logString .= ' oper_status: good';
		}else{
			$res['message'] = self::get_error_text($res['status']);
			$logString .= ' oper_status: bad '.$res['message'];
		}*/
		$logString .= chr(10).chr(13);
		file_put_contents($filename, $logString, FILE_APPEND);
		
	}
	
	static public function send($arFields = array()){
		self::$request_fields = count($arFields) == 0 ? '' : json_encode($arFields);
		
		//echo self::$request_fields.'    '.self::$login.' : '.self::$password.'     '.self::$url.self::$operation; exit;
		
		
		self::init();
		
		self::$response = curl_exec(self::$cRes);
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
	     curl_setopt_array(self::$cRes, array(
	     	CURLOPT_URL => self::$url.self::$operation,
	     	CURLOPT_RETURNTRANSFER => 1,
	     	CURLOPT_SSL_VERIFYPEER => 0,
	     	CURLOPT_SSL_VERIFYHOST => 0,
	     	CURLINFO_HEADER_OUT=> 1,
	     	CURLOPT_FAILONERROR => 1,
	     	CURLOPT_HTTPHEADER => $headers
	     
	     ));
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
	
	static public function get_error_text($code){
		return isset(self::$error['code_'.$code]) ? self::$error['code_'.$code] : 'unknown error #'.$code;
	}
	
	static public function comment_filter($data){
     	$filter = array( '<', '>', '&', '#', '=', '"');
     	$replace = array('', '', '', '', '', '`');
     	return str_replace($filter, $replace, trim(stripslashes(strip_tags($data))));
     }
}
?>