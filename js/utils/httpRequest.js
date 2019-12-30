export class MyHTTP {
   
    // Make an HTTP GET Request 
    
    async get(url, jwt) {
      console.log('Tasos ' + jwt);
      //let token = JSON.parse(localStorage.getItem('jwt'));
      const h = new Headers();
      //h.append('Accept', 'application/json');
      //h.append('Authorization', `Tasos ${jwt}`)
      const response = await fetch(url, {
        method: 'GET',
        //mode: 'cors',
        //credentials: 'include',
        headers: 
         {
          //Accept: 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Tasos ${jwt}`,
          //'Access-Control-Allow-Origin':'*',
          //'Access-Control-Allow-Headers': 'Authorization'
        }
      });
      //response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-type');
      const resData = await response.json();
      return resData;
    }
  
  
    // Make an HTTP POST Request
    
    async post(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const resData = await response.json();
      return resData;
    }

    async authenticatedPost(url, data, jwt) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'    ,
          'Authorization': 'Tasos ' + jwt
        },
        body: JSON.stringify(data)
      });
  
      const resData = await response.json();
      return resData;
    }

  
     // Make an HTTP PUT Request
  
    async put(url, data, jwt) {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'    ,
          'Authorization': 'Tasos ' + jwt
        },
        body: JSON.stringify(data)
      });
      
      const resData = await response.json();
      return resData;
    }
  
    // Make an HTTP DELETE Request
  
    async delete(url, jwt) {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'    ,
          'Authorization': 'Tasos ' + jwt
        }
      });
  
      const resData = await 'Resource Deleted...';
      return resData;
    }
  
   }