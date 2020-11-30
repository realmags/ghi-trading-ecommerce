@extends('layout.header')

@section('manageAcc')

    @if(empty($users))
        <div class="no-accounts">
            <h1 class="no-accounts-h1">There's no accounts available</h1>
            <p class="no-accounts">Create new account <a href="/account/create" class="no-accounts">here.</a></p>
            <p class="mssg">{{session('mssg')}}</p>
        </div>
    @endif

    <table class="mini-nav">
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td><button class="button-design">Add New Account</button></td>
        </tr>
    </table>

    <div class="account-details">
        <table class="table-style">
            <tr>
                <td class="table-header">Code</td>
                <td class="table-header">Name</td>
                <td class="table-header">Username</td>
                <td class="table-header">Date Created</td>
            </tr>
        @foreach($users as $user)
            <tr>
                <td class="table-data"><p>{{ $user->user_code }}</p></td>
                <td class="table-data"><h3 class="account-details-text">{{ $user->first_name }} {{ $user->last_name }}</h3></td>
                <td class="table-data"><p>@ {{ $user->username }}</p></td>
                <td class="table-data"><p>{{ $user->created_at }}</p></td>
            </tr>
        @endforeach
    </div>
@endsection