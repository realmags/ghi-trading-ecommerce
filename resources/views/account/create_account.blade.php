@extends('layout.header')

@section('manageAcc')
    <div>
        <form method="POST" action="/account/manage">
        @csrf
            <div class="create-account">
                <p>Please input the necessary details<span style="color:#d10d0d"> *</span></p>
                <select name="code" id="userCode" class="input-design">
                    <option selected disabled>Select Status Code</option>
                    <option value="sales">Sales Clerk</option>
                    <option value="admin">Admin</option>
                </select><br>

                <input class="input-design" type="text" name="firstName" placeholder="First Name *" required><br>
                <input class="input-design" type="text" name="lastName" placeholder="Last Name *" required><br>
                <input class="input-design" type="text" name="username" placeholder="Username *"required><br>
                <input class="input-design" type="password" name="password" placeholder="Password *" required><br>
                <input class="input-design" type="password" name="rePassword" placeholder="Re-enter Password *" required><br>
                <button class="button-design">Register</button>
            </div>  
        </form>
    </div>
@endsection