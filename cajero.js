var entregados= document.getElementById("entregados"); 

var billetes= [];/*Los valores en este caso los 
concateno usando this.valor!*/

billetes[100]= "cien.png";
billetes[50]= "cincuenta.png";
billetes[10]= "diez.png";

class billete {
 
   constructor(v, c){
         
   this.valor= v,
   this.cantidad= c
   
  } /* Cierra el constructor! */      
       
  mostrar(){
    
    entregados.innerHTML+= "<img src='" + "img/" + billetes[this.valor] + "'><br>"; 
    /* billetes[this.valor] devuelve el source, justo lo 
    que necesito para poder completar la estructura de
    insertar una imagen: <img src= "img/cajero.png"> 
    ... en este caso "img/cajero.png" es el source! */
    
  }/*  Termina mostrar! */
             
}/* Cierra billete! */

var caja= []; 

caja.push(new billete(100, 5));//500
caja.push(new billete(50, 6));//50
caja.push(new billete(10, 3));//40
    
var disponibleCaja=0; 

/* Se debe guardar el primer valor en cero para que 
se pueda ejecutar la suma! */

for(var r of caja){
        
disponibleCaja+= r.valor*r.cantidad; 
   
} /* Para probar esto, el console.log(disponibleCaja) 
debe ir fuera del corchete para que no te lo de varias
 veces(las veces que se recorre r); */

var disponible= document.getElementById("disponible"); 
/* La variable de cuanto tiene el cajero! */

disponible.innerHTML= "Disponible en caja: " + disponibleCaja; 
/* Se coloca el valor de lo disponible en el cajero!  */  
    
var boton= document.getElementById("boton");
boton.addEventListener("click", dameDinero);

var transaccion= document.getElementById("contador");

var contador= 0;/* Guarda cuantas veces se ejecuta el Click, 
es decir la veces que pedimos dinero. Obvio empieza en cero! */

function dameDinero(){   
  
var entregadoFake= 0;
 
var available= document.getElementById("disponible"); 
/* Se vuelve a hacer la misma operacion para guardar la 
cantidad de dinero disponible!  */    
    
var papeles; 

var entregado=[];

var devolver= [];
 
contador++; /* El contador empieza a incrementar por
 cada transaccion! */   
 
entregados.innerHTML= ""; /* Cada vez que se hace click 
para solicitar un nuevo monto, la pantalla que guarda 
los billetes se resetea y coloca la nueva solicitud! */    

var cifra= document.getElementById("cifra"); /* Cuanto pido! */  
       
cifra = parseInt(cifra.value);          
 
if(cifra>disponibleCaja){

  entregados.innerHTML= "<strong>No hay dinero suficiente en el cajero</strong>";

}else if(cifra<=disponibleCaja){

  var nuevoMonto= 0;/* El mismo procedimiento, la variable 
  que guarda la sumatoria de lo disponible en caja debe 
  empezar en cero! */ 

  for(var bi of caja){       
        
    if(cifra > 0){
               
          div= Math.floor(cifra/bi.valor);
      
          if(div > bi.cantidad){
         
            papeles =  bi.cantidad; 
                 
          }//cierra if div>bi.cantidad!
        
          else if(div <= bi.cantidad){
             
            papeles= div; 
          
          } //else if!  
           
          entregado.push(new billete(bi.valor, papeles));

          devolver.push(new billete(bi.valor, bi.cantidad));/* 
          En el caso de que al final la cifra > 0 se debe garantizar 
          que la caja quede intacta ya que papeles siempre se descuenta */
          
          cifra= cifra - papeles*bi.valor;
          /* A cifra se le va restando lo extraído por 
          cada billete puesto en evaluación! */ 

          bi.cantidad= bi.cantidad - papeles;
          /* La nueva cantidad de billetes en caja! */

    
    }// Cierra el if cifra > 0 

      nuevoMonto+= bi.cantidad*bi.valor; 
      /* Se calcula lo que queda en caja una vez se haga 
      la transaccion! */ 
         
  } //cierra el for (var bi of caja)! 

  if(cifra>0){

    caja= devolver; /* En el caso de que la transacción sea fallida
    el dinero descontado debe ser devuelto */

    console.log(devolver);
  
  entregados.innerHTML= "<strong>No puedo darte esa cantidad</strong>";    
     
  }// Cierra el cifra > 0!

  else if(cifra==0){

    disponibleCaja= nuevoMonto;
 
    for(var e of entregado){
        
      if(e.cantidad > 0){
             
        transaccion.innerHTML+="Transacción # " + contador  + "= <strong>" + e.cantidad + "</strong>" + " billetes de $     <strong>" + e.valor + "</strong><br>";                
  
      }// Cierra el if e.cantidad > 0!
         
      for(var i= 0; i< e.cantidad; i++){
      
        e.mostrar();//el mostrar se ejecutará tantas veces se piden billetes! Si no se colocara dentro del for solo aparecería un billete sin importar cuantos pidas!
      
      }//cierra el for var i= 0; i< e.cantidad; i++!   
          
    }// Cierra el var e of entregado! 
    
  }//Cierra el else!
    
  available.innerHTML= "Disponible en caja: " + disponibleCaja; //Se resetea lo disponible en caja y se coloca el nuevo monto!    
  cifra= "";   //Para que se pueda volver a ejecutar el click sin necesidad de terminar!      

}

}//Cierra el dameDinero!
