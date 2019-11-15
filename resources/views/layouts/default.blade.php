<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test project</title>
</head>
<body>
    <div id="app"></div>
    <script src="{{ asset('app.bundle.js')}}"></script>
    <div class="container">
        <header class="row"> </header>
        <div id="main" class="row">
            @yield('content')
        </div>

        <footer class="row"> </footer>
    </div>
</body>
</html>