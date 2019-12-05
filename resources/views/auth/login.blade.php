@extends('layouts.anonymous')

@section('each-page-resource-script')
    <!-- Current Page Vendor and Views -->
    <script src="{{ asset('vendor/rs-plugin/js/jquery.themepunch.tools.min.js') }}" defer></script>
    <script src="{{ asset('vendor/rs-plugin/js/jquery.themepunch.revolution.min.js') }}" defer></script>
@endsection

@section('content')
    <section class="page-header mb-0">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="font-weight-bold">{{ __('Login') }}</h1>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 mb-5 mb-lg-0 appear-animation" data-appear-animation="fadeInRightShorter">
                    <div class="bg-primary rounded p-5">
                        <span class="top-sub-title text-color-light-2">{{ __('ALREADY A MEMBER?') }}</span>
                        <h2 class="text-color-light font-weight-bold text-4 mb-4">{{ __('Sign In') }}</h2>

                        <form method="POST" action="{{ route('login') }}" id="frmSignIn">
                            @csrf
                            <div class="form-row">
                                <div class="form-group col mb-2">
                                    <label class="text-color-light-2" for="frmSignInEmail">{{ __('EMAIL / USERNAME') }}</label>
                                    <input type="email" value="{{ old('email') }}" maxlength="100" class="form-control bg-light rounded border-0 text-1 @error('email') @enderror" name="email" id="frmSignInEmail" required autofocus>
                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col">
                                    <label class="text-color-light-2" for="frmSignInPassword">{{ __('PASSWORD') }}</label>
                                    <input type="password" value="" class="form-control bg-light rounded border-0 text-1 @error('password') @enderror" name="password" id="frmSignInPassword" required>
                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-row mb-3">
                                <div class="form-group col">
                                    <div class="form-check checkbox-custom checkbox-custom-transparent checkbox-default">
                                        <input class="form-check-input" type="checkbox" name="remember" id="frmSignInRemember" {{ old('remember') ? 'checked' : '' }}>
                                        <label class="form-check-label text-color-light-2" for="frmSignInRemember">
                                            {{ __('Remember me') }}
                                        </label>
                                    </div>
                                </div>
                                @if (Route::has('password.request'))
                                <div class="form-group col text-right">
                                    <a href="{{ route('password.request') }}" class="forgot-pw text-color-light-2 d-block">{{ __('Forgot password?') }}</a>
                                </div>
                                @endif
                            </div>
                            <div class="row align-items-center">
                                <div class="col text-right">
                                    <button type="submit" class="btn btn-dark btn-rounded btn-v-3 btn-h-3 font-weight-bold">{{ __('SIGN IN') }}</button>
                                </div>
                            </div>
                        </form>

                        @if (Route::has('register'))
                            <a class="nav-link text-center mt-5" href="{{ route('register') }}">{{ __('Do you want to create a new account?') }}</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
