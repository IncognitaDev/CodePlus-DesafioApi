const api = (config, callback) => {
  const req = new XMLHttpRequest();

  req.addEventListener('readystatechange', function(){
    if (this.readyState === 4){
      const response = JSON.parse(this.response);

      callback(response);  
    }
  })

  req.open(config.method, config.url);
  req.send(config.data)
}

export default api