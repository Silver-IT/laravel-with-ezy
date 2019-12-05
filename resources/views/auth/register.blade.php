@extends('layouts.anonymous')

@section('each-page-resource-script')
    <!-- Current Page Vendor and Views -->
    <script src="{{ asset('vendor/rs-plugin/js/jquery.themepunch.tools.min.js') }}" defer></script>
    <script src="{{ asset('vendor/rs-plugin/js/jquery.themepunch.revolution.min.js') }}" defer></script>
@endsection

@section('content')
    <div class="body">
        <div role="main" class="main">
            <section class="page-header mb-0">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="font-weight-bold">{{ __('Register') }}</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 appear-animation" data-appear-animation="fadeInRightShorter">
                        <!-- <div class="col-lg-6 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay="200"> -->
                            <div class="border rounded h-100 p-5">
                                <span class="top-sub-title text-color-primary">{{ __('DON\'T HAVE AN ACCOUNT?') }}</span>
                                <h2 class="font-weight-bold text-4 mb-4">{{ __('Register Now!') }}</h2>

                                <form method="POST" action="{{ route('register') }}" id="frmRegister" >
                                    @csrf
                                    <div class="form-row">
                                        <div class="form-group col mb-2">
                                            <label for="frmRegisterUsername">{{ __('USERNAME') }}</label>
                                            <input type="text" value="{{ old('name') }}" maxlength="100" class="form-control bg-light-5 rounded border-0 text-1 @error('name') @enderror"
                                                name="name" id="frmRegisterUsername" required autofocus autocomplete="name">
                                            @error('name')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col mb-2">
                                            <label for="frmRegisterEmail">{{ __('EMAIL ADDRESS') }}</label>
                                            <input type="email" value="{{ old('email') }}" maxlength="100" class="form-control bg-light-5 rounded border-0 text-1  @error('email') @enderror" name="email" id="frmRegisterEmail" required autocomplete="email">
                                            @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="form-row mb-5">
                                        <div class="form-group col-lg-6">
                                            <label for="frmRegisterPassword">PASSWORD</label>
                                            <input type="password" value="" class="form-control bg-light-5 rounded border-0 text-1" name="password" id="frmRegisterPassword" required>
                                        </div>
                                        <div class="form-group col-lg-6">
                                            <label for="frmRegisterPassword2">RE-ENTER PASSWORD</label>
                                            <input type="password" value="" class="form-control bg-light-5 rounded border-0 text-1" name="password2" id="frmRegisterPassword2" required>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div class="col text-right">
                                            <button type="submit" class="btn btn-primary btn-rounded btn-v-3 btn-h-3 font-weight-bold">REGISTER NOW</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection
