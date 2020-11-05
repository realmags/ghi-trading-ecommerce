@extends('layouts.layout')

@section('content')
    <div id="app" data-assetPath="{{ asset ('/') }}"></div>

    <script src="{{ asset('js/app.js') }}"></script>
@endsection