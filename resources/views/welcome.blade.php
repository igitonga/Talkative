<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <title>LiveChat</title>
</head>
<body>
    <div class="container-fluid">
        <div class="d-flex flex-column align-items-center header pt-3 pb-3">
            <h1 class="heading">Tuongee!</h1>

            <input type="text" class="username" id="username" placeholder="Your username...">
        </div>

        <div class="message-box" id="message-box"></div>

       <div class="bottom">
            <form id="message-form">
                <textarea type="text" id="message-input" class="message-input" placeholder="Write something..."></textarea>
                <button class="button" type="submit">Send message</button>
            </form>
       </div>
    </div>
    <script src="./js/app.js"></script>
</body>
</html>