$(function(){
    console.log("JS is connected")

    var socket = io();
    socket.on('connect', function() {
        if(!localStorage.getItem('username')){
            // $('.usernameMsg').text("Please Enter the username")
            // $('.usernam-box').show();
            $("#myModal").modal({backdrop: 'static' , keyboard: false});
            $('.modal-title').text("Please enter your username");
            $('#modalInput').val("");
        }
        else{
            // $('.usernameMsg').text(localStorage.username)
            // $('.username-box').hide();
        }
    });

    // WITHOUT MODAL (AS WE HAD IN CLASS)
    // $('#usernameAdd').on('click', function(){
    //     var username = $('#usernameInput').val()
    //     localStorage.username = username;
    //     // socket.emit('add_username', {'username': username})
    // })


    /*************************** */
    // MANIPULAITNG MODAL, IF ENTER then click
    /************************** */

    $("#modalInput").on('keyup', function (key) {
        if ($(this).val().length > 0 ){
            $("#modalButton").attr('disabled',false);
            if (key.keyCode==13 ) {
                $('#modalButton').click();
            }
        }
        else {
            $("#modalButton").attr('disabled',true);
        }
    });

    /*************************** */
    //MODAL ON CLICK
    /************************** */
    $("#modalButton").on('click', function () {
        // action for new username
        if (!localStorage.getItem('username')) {    
            var username=$('#modalInput').val();
            socket.emit('new username',{'username':username});
        } 

    });

    socket.on('add username', data=> {
        localStorage.setItem('username',data["username"]);
        $('#username').text(localStorage.getItem('username'));
    });

    // **************************
    // SEND MESSAGES
    // **************************

    $('#sendMsg').on('click', function(){
        console.log("I send msg")
        var msg = $('#message').val()
        socket.send(msg)
    })

    $('#sendMsg').on('click', function(){
        console.log("I send msg")
    })

    //receiving data and displaying messages

    socket.on('message', data =>{
        console.log(data)
        const p = document.createElement('p')
        p.innerHTML = data;
        $('.display-message-area').append(p)
    })



}
)
