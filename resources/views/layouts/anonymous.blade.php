<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->

    <!-- <title>EZY - Responsive Multi-Purpose HTML5 Template 1.1.0</title> -->
    <title>{{ config('app.name', 'SportsBook of American Sports Games') }}</title>

    <meta name="keywords" content="sportsbook, american, sports, golf, basketball, soccer" />
    <meta name="description" content="Sportsbook Service for All American Sports type">
    <meta name="author" content="Alyosha Ruslanovich, Joseph Clements">

    <!-- Mobile Metas -->
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Web Fonts  -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,600,700,900%7COpen+Sans:300,400,600,700,800" rel="stylesheet" type="text/css">
    <!-- <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> -->

    <!-- Vendor CSS -->
    <link rel="stylesheet" href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/font-awesome/css/fontawesome-all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/animate/animate.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/linear-icons/css/linear-icons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/owl.carousel/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/owl.carousel/assets/owl.theme.default.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/magnific-popup/magnific-popup.min.css') }}">

    <!-- Theme CSS -->
    <link rel="stylesheet" href="{{ asset('css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('css/theme-elements.css') }}">

    @yield('each-page-resource-style')

    <!-- Skin CSS -->
    <link rel="stylesheet" href="{{ asset('css/skins/default.css') }}">

    <!-- Theme Custom CSS -->
	<link rel="stylesheet" href="{{ asset('css/custom.css') }}">

    <!-- Custom Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- *************************************************************************************************** -->

    <!-- Head Libs -->
    <script src="{{ asset('vendor/modernizr/modernizr.min.js') }}"></script>

    <!-- Custom Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Vendor -->
    <script src="{{ asset('vendor/jquery/jquery.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery.appear/jquery.appear.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery.easing/jquery.easing.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery-cookie/jquery-cookie.min.js') }}" defer></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}" defer></script>
    <script src="{{ asset('vendor/common/common.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery.validation/jquery.validation.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery.easy-pie-chart/jquery.easy-pie-chart.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery.gmap/jquery.gmap.min.js') }}" defer></script>
    <script src="{{ asset('vendor/jquery.lazyload/jquery.lazyload.min.js') }}" defer></script>
    <script src="{{ asset('vendor/isotope/jquery.isotope.min.js') }}" defer></script>
    <script src="{{ asset('vendor/owl.carousel/owl.carousel.min.js') }}" defer></script>
    <script src="{{ asset('vendor/magnific-popup/jquery.magnific-popup.min.js') }}" defer></script>
    <script src="{{ asset('vendor/vide/vide.min.js') }}" defer></script>
    <script src="{{ asset('vendor/vivus/vivus.min.js') }}" defer></script>

    <!-- Theme Base, Components and Settings -->
    <script src="{{ asset('js/theme.js') }}" defer></script>

    @yield('each-page-resource-script')

    <!-- Theme Custom -->
    <script src="{{ asset('js/custom.js') }}" defer></script>

    <!-- Theme Initialization Files -->
    <script src="{{ asset('js/theme.init.js') }}" defer></script>

    <!-- Google Analytics: Change UA-XXXXX-X to be your site's ID. Go to http://www.google.com/analytics/ for more information.
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-12345678-1', 'auto');
        ga('send', 'pageview');
    </script> -->
</head>
<body>
    <div id="app">
        <div class="body">
            <header id="header" class="header-effect-shrink" data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyStartAt': 120}">
                <div class="header-body">
                    <div class="header-container container">
                        <div class="header-row">
                            <div class="header-column justify-content-start">
                                <div class="header-logo">
                                    <a href="{{ url('/') }}">
                                        <img alt="EZ" width="127" height="20" src="{{ asset('img/logo.png') }}">
                                        <!-- {{ config('app.name', 'SportsBook of American Sports Games') }} -->
                                    </a>
                                </div>
                            </div>
                            <div class="header-column justify-content-end">
                                <div class="header-nav">
                                    <div class="header-nav-main header-nav-main-effect-1 header-nav-main-sub-effect-1">
                                        <nav class="collapse">
                                            <ul class="nav flex-column flex-lg-row" id="mainNav">
                                                @if (Route::has('login'))
                                                    @auth
                                                        <li><a href="{{ url('/home') }}">{{ __('Home') }}</a></li>
                                                    @else
                                                        <li><a href="{{ route('login') }}">{{ __('Login') }}</a></li>

                                                        @if (Route::has('register'))
                                                        <li class="dropdown-mega dropdown-mega-signin ml-lg-3"><a class="pl-lg-4" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                                                        @endif
                                                    @endauth
                                                @endif
                                            </ul>
                                        </nav>
                                    </div>
                                    <button class="header-btn-collapse-nav ml-3" data-toggle="collapse" data-target=".header-nav-main nav">
										<span class="hamburguer">
											<span></span>
											<span></span>
											<span></span>
										</span>
										<span class="close">
											<span></span>
											<span></span>
										</span>
									</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main role="main" class="main">
                @yield('content')
            </main>
            <footer id="footer" class="bg-light-5 mt-0">
				<div class="container">
					<div class="row text-center">
						<div class="col">
							<span class="top-sub-title text-color-primary appear-animation" data-appear-animation="fadeInUpShorter">LOREM IPSUM DOLOR SIT</span>
							<h2 class="font-weight-bold text-color-dark appear-animation" data-appear-animation="fadeInUpShorter">Get in Touch With Us</h2>
							<p class="lead appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200">If you have any further questions or queries please do not hesitate to get in touch.</p>
						</div>
					</div>
					<div class="row pt-5">
						<div class="col-lg-4">
							<div class="row">
								<div class="col-12 col-md-4 col-lg-12 mb-lg-4 appear-animation" data-appear-animation="fadeInLeftShorter">
									<div class="icon-box icon-box-style-1">
										<div class="icon-box-icon">
											<i class="lnr lnr-apartment text-color-primary"></i>
										</div>
										<div class="icon-box-info mt-1">
											<div class="icon-box-info-title">
												<h3 class="font-weight-bold text-color-dark text-4 mb-0">Address</h3>
											</div>
											<p>1234 Street Name, City Name, USA</p>
										</div>
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-12 mb-lg-4 appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="200">
									<div class="icon-box icon-box-style-1">
										<div class="icon-box-icon">
											<i class="lnr lnr-envelope text-color-primary line-height-07"></i>
										</div>
										<div class="icon-box-info mt-1">
											<div class="icon-box-info-title">
												<h3 class="font-weight-bold text-color-dark text-4 mb-0">Email Address</h3>
											</div>
											<p><a href="mailto:you@domain.com">you@domain.com</a></p>
										</div>
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-12 appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="400">
									<div class="icon-box icon-box-style-1">
										<div class="icon-box-icon">
											<i class="lnr lnr-phone-handset text-color-primary"></i>
										</div>
										<div class="icon-box-info mt-1">
											<div class="icon-box-info-title">
												<h3 class="font-weight-bold text-color-dark text-4 mb-0">Phone Number</h3>
											</div>
											<p><a href="tel:+1234567890">(123) 456-7890</a> - <a href="tel:+1234567890">(123) 456-7890</a></p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-8 appear-animation" data-appear-animation="fadeInRightShorter">
							<form class="contact-form" action="php/contact-form.php" method="POST">
								<div class="contact-form-success alert alert-success d-none">
									<strong>Success!</strong> Your message has been sent to us.
								</div>
								<div class="contact-form-error alert alert-danger d-none">
									<strong>Error!</strong> There was an error sending your message.
									<span class="mail-error-message d-block"></span>
								</div>
								<div class="form-row">
									<div class="form-group col-md-6">
										<input type="text" value="" data-msg-required="Please enter your name." maxlength="100" class="form-control" name="name" id="name" placeholder="Name" required>
									</div>
									<div class="form-group col-md-6">
										<input type="email" value="" data-msg-required="Please enter your email address." data-msg-email="Please enter a valid email address." maxlength="100" class="form-control" name="email" id="email" placeholder="E-mail" required>
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col">
										<input type="text" value="" data-msg-required="Please enter the subject." maxlength="100" class="form-control" name="subject" id="subject" placeholder="Subject" required>
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col">
										<textarea maxlength="5000" data-msg-required="Please enter your message." rows="5" class="form-control" name="message" id="message" placeholder="Message" required></textarea>
									</div>
								</div>
								<div class="form-row mt-2">
									<div class="col">
										<input type="submit" value="SEND MESSAGE" class="btn btn-primary btn-rounded btn-4 font-weight-semibold text-0" data-loading-text="Loading...">
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="footer-copyright footer-copyright-border-top bg-light-5 py-5">
					<div class="container">
						<div class="row align-items-center justify-content-md-center">
							<div class="col-12 col-lg-4 text-center text-lg-right order-3 order-lg-1">
								<p class="mb-0">Copyrights © 2018 All Rights Reserved by Okler</p>
							</div>
							<div class="col-12 col-lg-2 text-center order-1 order-lg-2">
								<a href="{{ url('/') }}"><img src="{{ asset('img/logo-small.png') }}" width="78" height="70" alt="EZY Theme" class="img-fluid" /></a>
							</div>
							<div class="col-12 col-lg-4 text-center text-lg-left order-2 order-lg-3 mb-2 mb-lg-0">
								<a href="#" class="link-underline-dark mr-3">Privacy Policy</a>
								<a href="#" class="link-underline-dark">Terms of Use</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
        </div>
    </div>
</body>
</html>
