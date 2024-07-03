<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Talkative</title>

        <link rel="icon" type="image/x-icon" href="">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

        {{-- Tailwind --}}
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        <style>
            * {
                font-family: 'Inter', sans-serif;
            }
            .Toastify__toast-icon {
                display: inline !important;
            }
        </style>
    </head>
    <body class="antialiased">
        <div id="app"></div>
        <script src='{{ mix('js/app.js') }}'></script> 
    </body>
</html>