# simplebks
<h3>API Documentation</h3>
<h4>Login API</h4><br>
URL  : <code>https://simplebks-api.herokuapp.com/login</code> <br>
METHOD : <code>POST</code> <br>
DATA : <br>
  <code>
    {
      "seller_id" : "seller_id_here",
      "seller_zip_code" : "seller_zip_code"
    }
  </code>
  
  <br>
  
<h4>Logout current seller</h4><br>
URL  : <code>https://simplebks-api.herokuapp.com/logout</code> <br>
METHOD : <code>GET</code> <br>

<br>

<h4>Get seller order items </h4> <br>
URL : <code>https://simplebks-api.herokuapp.com/order_items/:price/:order_date/:limit/:page</code>
METHOD : <code>GET</code> <br>
URL Variables: <code>[price,order_date,limit,page]</code> <br>
DESCRIPTION:
     <p>
      <strong>price</strong> is order by passing 1 or -1, 1 for accending while -1 decending  <br>
      <strong>order_date</strong> is order by passing 1 or -1, 1 for accending while -1 decending  <br>
      <strong>limit</strong> is limit of the documents returned e.g 20  <br>
      <strong>page</strong> is page number for quick data retreive e.g 1  <br>
     </p>
 
<br>

<h4>Delete order items </h4> <br>
URL : <code>https://simplebks-api.herokuapp.com/order_items/:id</code> <br>
METHOD : <code>DELETE</code> <br>
URL Variables: <code>[id]</code>

<br>

<h4>Update seller city and state</h4> <br>
URL : <code>https://simplebks-api.herokuapp.com/account</code> <br>
METHOD : <code>PATCH</code> <br>
DATA: <br>
     <code>
        { <br>
          "seller_city" : "seller_city_data",
          "seller_state" : "seller_state_data"
        }
     </code>

<br>





  
  
