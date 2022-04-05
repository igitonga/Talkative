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
    <div class="container">
        <div class="header">
            <h1>Tuongee!</h1>

            <input type="text" class="username" id="username" placeholder="Your username...">
        </div>

        <div class="message-box" id="message-box"></div>

       <div class="bottom">
            <form id="message-form">
                <input type="text" id="message-input" class="message-input" placeholder="Write something...">
                <button class="button" type="submit">Send message</button>
            </form>
       </div>
    </div>
    <script src="./js/app.js"></script>
</body>
</html>