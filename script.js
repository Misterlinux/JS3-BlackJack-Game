
let deck = {
    spade: [ 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
    fiori: [ 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
    cuori: [ 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
    quadri: [ 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],

}

let mazzi = [ "spade", "fiori", "cuori", "quadri"]

let banconum = document.getElementById("banconum")
let bancostat = document.getElementById("bancostat")
let banco = []

let playgio = document.getElementById("playgio")
let playnum = document.getElementById("playnum")
let playstat = document.getElementById("playstat")
let playstand = document.getElementById("playstand")
let players = []

let playgio1 = document.getElementById("playgio1")
let playnum1 = document.getElementById("playnum1")
let playstat1 = document.getElementById("playstat1")
let playstand1 = document.getElementById("playstand1")
let players1 = []

let playfinal = document.getElementById("playfinal")
let playfinal1 = document.getElementById("playfinal1")
let bancofinal = document.getElementById("bancofinal")
//this is the ID for the change of class and double players CSS
let giocatore2 = document.getElementById("giocatore2")
let ritentando= document.getElementById("ritentando")

let over = document.getElementById("over")

//so, we prepare a function to disable the button from being clicked
function disableButton() {
    document.getElementById("playstand").disabled = true;
    document.getElementById("playgio").disabled = true;
}

function disableButton1() {
    document.getElementById("playstand1").disabled = true;
    document.getElementById("playgio1").disabled = true;
}

function ableButton() {
    document.getElementById("playstand").disabled = false;
    document.getElementById("playgio").disabled = false;
    document.getElementById("playgio1").disabled = false;
    document.getElementById("playstand1").disabled = false;
}

let contaplay = document.getElementById("contaplay")

let bankowin = document.getElementById("bankowin")
let playawin = document.getElementById("playawin")

/*counter for 1/2 players*/
let gioca;
let giokato = 0;
/*while this is for the 3 attemps for players */
let attento = 0;
let attento1 = 0;

contaplay.addEventListener("submit", (event)=>{
    event.preventDefault()
    
    if(numplayer.value=="uno"){
        ableButton()

        pescare()
        bancare()

        gioca = 1;
        document.getElementById("cont").disabled = true;

    }else if(numplayer.value=="due"){
        ableButton()

        pescare1()
        pescare()
        bancare()

        disableButton1()

        gioca = 2

        //we display the second player from display:none in .players div:nth-child(2)
        giocatore2.setAttribute("class", "giocatore2")
        giocatore2.style.display = "block"

        document.getElementById("cont").disabled = true;

    }else{
        console.log("this shouldn't work ")
    }

})

disableButton()

playgio.addEventListener("click", (event)=>{
    event.preventDefault()
    pescare()
})

playgio1.addEventListener("click", (event)=>{
    event.preventDefault()
    pescare1()
})

function bancare(){

    if( mazzi.length== 0 ){
        over.innerText = "Deck is no more"

        setTimeout(function () {
            location.reload()
        }, 2000);
    }else{
        
    }

    for (let x in deck) {
        if(deck[x].length == 0){
            let vuoto = mazzi.indexOf( x ) 
            mazzi.splice( vuoto, 1 )
        }
    }

    let semi = Math.floor( Math.random()* mazzi.length )
    let more = mazzi[semi]
    let pesca = Math.floor( Math.random()* deck[ more ].length )

    console.log(pesca + " /and " + deck[ more ][ pesca ] )

    let corretto = document.getElementById( "banconum" )
    let para = document.createElement("span");

    para.innerText = deck[ more ][ pesca ] ;

    banco.push( deck[ more ][ pesca ] )

    deck[more].splice( pesca, 1 )
    //this for the data to be put in HTML
    
    //so, we used the before to style just one layer behind the number
    //#banconum span::before 
    if( more == "quadri"){
        para.setAttribute("class", "fa-solid fa-diamond");
        corretto.appendChild(para);
    }else if(more == "cuori"){
        para.setAttribute("class", "fa-solid fa-heart");
        corretto.appendChild(para);
    }else if(more == "spade"){
        para.setAttribute("class", "fa-solid fa-heart spada");
        corretto.appendChild(para);
    }else{
        para.setAttribute("class", "fa-solid fa-clover");
        corretto.appendChild(para);
    }

    let ginn = banco.reduce(funk)

    function funk(total, num){
        return total + num
    }

    shoot(ginn, bancostat)


}

function pescare(){
    
    if( mazzi.length== 0 ){
        over.innerText = "No more DECK to draw"

        setTimeout(function () {
            location.reload()
        }, 1000);
    }

    let seme = Math.floor( Math.random()* mazzi.length )

    let carte = mazzi[seme]

    let pescato = Math.floor( Math.random()* deck[ carte ].length )

    //its best to cue the number AFTER we take it and show it there 

    playdraw( deck[ carte ][pescato] , players, playnum, playstat, carte )
    deck[carte].splice( pescato, 1 )

    //for dynamically selectproperty of objects we use the []
    if( deck[carte].length == 0 ){
        let vuoto = mazzi.indexOf( carte ) 
        mazzi.splice( vuoto, 1 )
    }
    //ok so, the idea is to have the memory mode, we just need to get the seme ad then remove it from mazzi

}

function pescare1(){

    if( mazzi.length== 0 ){
        over.innerText = "è FINITO IL MAZZO"

        setTimeout(function () {
            location.reload()
        }, 1000);
    }

    let seme = Math.floor( Math.random()* mazzi.length )
    let carte = mazzi[seme]
    let pescato = Math.floor( Math.random()* deck[ carte ].length )

    playdraw( deck[ carte ][pescato] , players1, playnum1, playstat1, carte )
    deck[carte].splice( pescato, 1 )

    //for dynamically selectproperty of objects 
    if( deck[carte].length == 0 ){
        let vuoto = mazzi.indexOf( carte ) 
        mazzi.splice( vuoto, 1 )
    }

}

function playdraw(it, lista, numer, stat, seme ){

    lista.push(it)

    let corretto = document.getElementById( numer.id )
    let para = document.createElement("span");
    //so, we used the before to style just one layer behind the number
    //#banconum span::before  
    para.innerText = it;

    if( seme == "quadri"){
        para.setAttribute("class", "fa-solid fa-diamond");
        corretto.appendChild(para);
    }else if(seme == "cuori"){
        para.setAttribute("class", "fa-solid fa-heart");
        corretto.appendChild(para);
    }else if(seme == "spade"){
        para.setAttribute("class", "fa-solid fa-heart spada");
        corretto.appendChild(para);
    }else{
        para.setAttribute("class", "fa-solid fa-clover");
        corretto.appendChild(para);
    }

    //so, we are gonna use reduce to sum the elements inside the array
    let sum = lista.reduce(summing)
    //we have 2 included parameters, one for the total counter + the forEach() elements in array
    function summing(total, num){
        return total + num
    }

    //it seems her ealso we need to put teh actua array name 
    //THIS IS THE SECOND TIME i HAVE TO TELL YOU TO USE ==
    if( stat.id== "playstat" ){
        shoot(sum, playstat, playnum, players)
    }else{
        shoot(sum, playstat1, playnum1, players1)
    }
    
}

function dinuovo(){
    disableButton()

    let restart = document.createElement("button")
    let resta = document.createTextNode( "ritenta" )
    restart.appendChild(resta)
    //after we disable() we create the button and text 

    document.getElementById("ritentando").appendChild( restart )
    //we append the created button 

    //so, in theory we need to disable the conta button before the restart
    document.getElementById("cont").disabled = true;
    
    restart.onclick = () =>{

        resetto()
        //we resetto() most of the innerHTML

        let ricomincia = document.createElement("button")
        let ricomi = document.createTextNode( "rigioca" )
        ricomincia.appendChild( ricomi )
        //WE NEED ANOTHER button after they click and understood the lose state

        document.getElementById("ricominciando").appendChild( ricomincia )

        contaplay.addEventListener("submit", (event)=>{
            event.preventDefault()
            //we can have multiple addEventListener for submit

            giokato = 0;
            ricominciando.innerHTML= ""

            attento = 0;
            attento1 = 0;

            if(numplayer.value=="uno"){
                giocatore2.setAttribute("class", "giocatore2")
                giocatore2.style.display = "none"

            }
            //we reset the counters for the players, ALSO we add the player one option
            //to pass from player 2 to 1 while keeping the new counters after the reset with the submit

        })

        if(gioca == 1){

            ricomincia.onclick = () =>{

                giokato = 0;
                bancare()
                pescare()
                ricominciando.innerHTML= ""
    
                ableButton()
    
                attento = 0;
                attento1 = 0;
            }

        }else{
            ricomincia.onclick = () =>{

                bancare()
                pescare()
                pescare1()
                ricominciando.innerHTML= ""
    
                giokato = 0
    
                ableButton()
                disableButton1()
            
                attento = 0;
                attento1 = 0;
            }

        }
        //and in case we don't use the player menu, we reset the play-state based on the number of players

    }

}

function shoot(sball, dove, numeri ){

    if(sball< 21){
        dove.innerHTML = "Hit?"
        //as long as it doesnt overshoot 21 it can still play

    }else if( sball== 21 && dove.id!== "bancostat"){
        //if blackjack AND its still a player playing, not the house
        dove.innerHTML = "Stand"

        playfinal.innerHTML = sball

        disableButton()
        giokato = giokato + 1

        if( giokato == gioca){
            if(giokato==1){
                bancobot(sball)

            }else{
                bancobot()
                disableButton1()
            }
        }
        else{
            document.getElementById("playstand1").disabled = false;
            document.getElementById("playgio1").disabled = false;
            //this happens after player 1 blackjacks so we let player 2 start 
        }
        
    }else if( dove.id== "bancostat"){
        dove.innerHTML= "House over"
        //this will work even if ball = 21 for bancato 
    }else{
        //if not ==21 and not <21
        let perso = document.createElement("button")
        let retry = document.createTextNode( "re-try" )
        perso.appendChild(retry)
        perso.setAttribute("id", "retry");
        //we create a button, a TextNode for the button text with appendChild
        //also (the attribute, the name of the attribute)

        document.getElementById( dove.id ).appendChild( perso )
        //the dove.id is also whre the result is, we append a button to restart after lose condition

        perso.onclick = () =>{

            if(dove.id == "playstat"){
                attento+= 1;
                
            }else{
                attento1+= 1;
            }
            //attento is the number of attempts, increasesfor each loss

            if( attento> 2 || attento1> 2 ){
                
                banko.style.backgroundColor = "yellowgreen";
                playa.style.backgroundColor = "indianred";

                bankowin.innerText = "Banco Wins"
                playawin.innerText = "Too many attempts"

                dinuovo()
                //if at the 3th attempt we put the losing condition on the HTML

            }else if( attento == 1 && attento1== 0 ){
                playstand.style.backgroundColor = "salmon";
            }else if( attento == 2 && attento1== 0 ){
                playstand.style.backgroundColor = "crimson";
            }else if( attento1 == 1 ){
                playstand1.style.backgroundColor = "salmon";
            }else if( attento1 == 2 ){
                playstand1.style.backgroundColor = "crimson";
            }else{
                console.log("something happened with " + attento + " " + attento1 )
            }
            //a bit complex on the counter, but we need to keep the button colors separated 

            dove.innerHTML= ""
            numeri.innerHTML= ""            
            sball= 0

            if( numeri.id == "playnum" ){
                players= []
            }else{
                players1= []
            }
            //when re-starting but not yet losing, we reset score arrays and empty arrays

        }

    }
}

playstand.addEventListener("click", ()=>{

    let final = players.reduce(finaling)
    //we have 2 included parameters, one for the total counter + the forEach() elements in array
    function finaling(total, num){
        return total + num
    }

    playfinal.innerHTML = final

    disableButton()

    giokato= +1;

    if( giokato == gioca ){
        bancobot(final)
    }else{

        document.getElementById("playstand1").disabled = false;
        document.getElementById("playgio1").disabled = false;
        document.getElementById("playstand").disabled = true;
        document.getElementById("playgio").disabled = true;
    }

})

playstand1.addEventListener("click", ()=>{
    let final = players1.reduce(finaling)
    //we have 2 included parameters, one for the total counter + the forEach() elements in array
    function finaling(total, num){
        return total + num
    }

    playfinal1.innerHTML = final

    disableButton()
    disableButton1()

    giokato= giokato +1

    if(giokato == gioca){
        bancobot()
    }else{
        console.log("lets see if we get something WORKING? " + giokato)
    }
})

function resetto(){
    playstat.innerHTML= ""
    playnum.innerHTML= ""
    playfinal.innerHTML= ""
    players= []
    
    players1= []
    playstat1.innerHTML= ""
    playnum1.innerHTML= ""
    playfinal1.innerHTML= ""
    
    banco= []
    banconum.innerHTML= ""
    bancostat.innerHTML= ""
    bancofinal.innerHTML= ""

    ritentando.innerHTML= ""

    banko.style.backgroundColor = "MistyRose";
    playa.style.backgroundColor = "MistyRose";

    playstand.style.backgroundColor = "DarkSeaGreen";
    playstand1.style.backgroundColor = "DarkSeaGreen";

    bankowin.innerText = ""
    playawin.innerText = ""

    //WE can have 2 contaplays working at the same time....
    //if the contaplay is pressed we get the 0 of the counters 
    //PUS THE NORMAL EFFECTS FOR PLAYERS 1/2
    document.getElementById("cont").disabled = false;

}

//you have to remember that bancobot already has the thing
let banko = document.getElementById("banko")
let playa = document.getElementById("playa")

let intervallato; 

function mybanc(ginn, sfida){

    if( ginn==sfida && sfida < 43 ){
        banko.style.backgroundColor = "yellowgreen";
        playa.style.backgroundColor = "indianred";

        bankowin.innerText = "Banco Wins"
        playawin.innerText = "Player Lost"
        //this works for both 21/42 player score, if == then house win
    }else if( ginn > sfida && ginn< 22 && sfida< 22 || ginn > sfida && ginn< 43 && sfida> 22 ){
        banko.style.backgroundColor = "yellowgreen";
        playa.style.backgroundColor = "indianred";

        bankowin.innerText = "Banco Wins"
        playawin.innerText = "Player Lost"
        //if house > player BUT both are less then 22, 1 player more
        //if house > player, house is less than 43 AND the players are bigger than 22 , 2 players mode
    }else{
        banko.style.backgroundColor = "indianred";
        playa.style.backgroundColor = "yellowgreen";

        bankowin.innerText = "Banco Lost"
        playawin.innerText = "Player Wins"
        //if not then the player won
    }

    bancofinal.innerHTML = ginn

}

let timer_on = 0;

function bancobot(sfida){
    //argument present only with player 1 mode
    if(sfida){
        let ginn = banco.reduce(funk)

        function funk(total, num){
            return total + num
        }
    
        if( sfida > ginn ){
            //if the player has the bigger bid then the house starts drawing with bancare()
            bancare()
            let timeout;

            //with the timer_on true at !0 we starts the timedCount() 
            //with the timer_on at 1 we get !1 false
            if (!timer_on) {
                timer_on = 1;
                timeout = setTimeout(timedCount, 1000);
                mybanc(ginn, sfida)
            }

            //we use the setTimeout, that is supposed to happen once, BUT
            //we set the timedCount() inside, using the ginn as the counter after summing each time
            //we clear the timer after it gets to or surpasses the players bid
            function timedCount() {
                timeout = setTimeout(timedCount, 1000);

                if(ginn >= sfida ){
                    clearTimeout(timeout);
                    timer_on = 0;
                    mybanc(ginn, sfida)
                }else{
                    bancare()
                    ginn = banco.reduce(funk)
                    mybanc(ginn, sfida)
                }
            }

            dinuovo()

            ginn = banco.reduce(funk)
            bancofinal.innerHTML = ginn
            //we stop the game with dinuovo and show the result
    
        }
        else{
            //auto win if the players bid is lower than the house
  
            banko.style.backgroundColor = "yellowgreen";
            playa.style.backgroundColor = "indianred";

            bankowin.innerText = "Banco Wins"
            playawin.innerText = "Player Lost"

            bancofinal.innerHTML = ginn
            disableButton()

            dinuovo()

        }

    }
    else{
    //THIS IS FOR THE 2 PLAYERS MODE, we get the 2 arrays, first we SUM the 2 arrays from players
        function twoplayers(arr1, arr2) {
            return [...arr2, ...arr1];
        }
    
        let versus = twoplayers(players, players1)
    
        let versato = versus.reduce(finaling)

        function finaling(total, num){
            return total + num
        }
        //after summing the arrays we sum all values inside

        let playfinal1 = document.getElementById("playfinal1")
        playfinal1.innerHTML = ""
        playfinal.innerHTML = versato

        //for the 2 player mode we will double the house score for 42
        let ginn = banco.reduce(funk) * 2
    
        function funk(total, num){
            return total + num
        }
    
        if(versato > ginn ){
    
            bancare()
            let timeout;

            if (!timer_on) {
                timer_on = 1;
                timeout = setTimeout(timedCount, 1000);
                mybanc(ginn, versato)
            }

            function timedCount() {
                timeout = setTimeout(timedCount, 1000);

                if(ginn >= versato ){
                    clearTimeout(timeout);
                    timer_on = 0;
                    mybanc(ginn, versato)
                }else{
                    bancare()
                    ginn = banco.reduce(funk) * 2
                    mybanc(ginn, versato)
                }
            }

            dinuovo()

            ginn = banco.reduce(funk) *2
            bancofinal.innerHTML = ginn

        }
        else{

            bancofinal.innerHTML = ginn
    
            banko.style.backgroundColor = "yellowgreen";
            playa.style.backgroundColor = "indianred";
            
            bankowin.innerText = "Banco Wins"
            playawin.innerText = "Player Lost"

            dinuovo()

        }

    }
}