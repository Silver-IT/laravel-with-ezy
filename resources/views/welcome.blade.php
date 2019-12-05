@extends('layouts.anonymous')

@section('each-page-resource-style')
    <link rel="stylesheet" href="{{ asset('vendor/rs-plugin/css/settings.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/rs-plugin/css/layers.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/rs-plugin/css/navigation.css') }}">
@endsection

@section('each-page-resource-script')
    <!-- Current Page Vendor and Views -->
    <script src="{{ asset('vendor/rs-plugin/js/jquery.themepunch.tools.min.js') }}" defer></script>
	<script src="{{ asset('vendor/rs-plugin/js/jquery.themepunch.revolution.min.js') }}" defer></script>
    <script src="{{ asset('js/views/view.contact.js') }}" defer></script>
@endsection


@section('content')
    <div class="slider-container rev_slider_wrapper slider-container-height-600 bg-light-5">
        <div id="revolutionSlider" class="slider rev_slider" data-version="5.4.7" data-plugin-revolution-slider data-plugin-options="{'delay': 9000, 'gridwidth': [1140,960,720,540], 'gridheight': [600,600,600,600], 'disableProgressBar': 'on', 'responsiveLevels': [4096,1200,992,576], 'parallax': { 'type': 'mouse', 'origo': 'slidecenter', 'speed': 3000, 'levels': [1,2,3,4,5,6,7,12,16,10,50], 'disable_onmobile': 'on' }, 'navigation' : {'arrows': { 'enable': true, 'hide_under': 767, 'style': 'slider-arrows-style-1 slider-arrows-dark' }, 'bullets': {'enable': true, 'hide_under': 767, 'style': 'bullets-style-1', 'hide_onleave': false, 'h_align': 'right', 'v_align': 'bottom', 'space': 7, 'v_offset': 75, 'h_offset': 35}}}">
            <ul>
                <li data-transition="fade">
                    <img src="{{ asset('img/slides/multi-purpose/slide-3-1.jpg') }}"
                        alt=""
                        data-bgposition="center center"
                        data-bgfit="cover"
                        data-bgrepeat="no-repeat"
                        class="rev-slidebg">

                    <div class="tp-caption bg-dark-3"
                        data-x="['625','435','185','100']"
                        data-y="400"
                        data-start="1000"
                        data-width="1500"
                        data-height="['155','155','155','155']"
                        data-transform_in="x:[100%];opacity:0;s:500;"
                        data-transform_idle="skX:-19deg;opacity:0.9;"
                        data-transform_out="y:[50%];opacity:0;s:500;"></div>

                    <h1 class="tp-caption text-color-light font-primary font-weight-thin"
                        data-x="right" data-hoffset="['0','20','20','20']"
                        data-y="bottom" data-voffset="['137','137','137','137']"
                        data-start="1300"
                        data-fontsize="['32','32','32','30']"
                        data-lineheight="['32','32','32','30']"
                        data-transform_in="y:[100%];opacity:0;s:500;"
                        data-transform_out="y:[-100%];opacity:0;s:500;">World-Class Technology</h1>

                    <div class="tp-caption bg-light"
                        data-x="['660','460','220','110']"
                        data-y="bottom" data-voffset="['78','78','78','83']"
                        data-start="1600"
                        data-width="7"
                        data-height="['45','45','45','36']"
                        data-transform_in="x:[-100%];opacity:0;s:500;"
                        data-transform_idle="skX:-19deg"
                        data-transform_out="x:[-100%];opacity:0;s:500;"></div>

                    <div class="tp-caption text-color-light font-primary font-weight-bold"
                        data-x="right" data-hoffset="['0','20','20','20']"
                        data-y="bottom" data-voffset="['88','88','88','88']"
                        data-start="1600"
                        data-fontsize="['42','42','42','36']"
                        data-transform_in="opacity:0;s:300;"
                        data-transform_out="opacity:0;s:300;">CREATIVE COMPANY</div>

                </li>
                <li data-transition="fade">
                    <img src="{{ asset('img/slides/transparent.png') }}"
                        alt=""
                        class="rev-slidebg bg-light-5">

                    <div class="tp-caption rs-parallaxlevel-3"
                        data-x="['-60','-60','-60','-170']"
                        data-y="bottom" data-voffset="['-30','-30','-90','-60']"
                        data-start="2000"
                        data-type="image"
                        data-basealign="slide"
                        data-transform_in="y:[10%];opacity:0;s:500;"
                        data-transform_out="y:[10%];opacity:0;s:500;"><img src="{{ asset('img/slides/misc/plant.png') }}" alt="" /></div>

                    <div class="tp-caption rs-parallaxlevel-2"
                        data-x="right" data-hoffset="['-140','-140','-200','-240']"
                        data-y="center" data-voffset="0"
                        data-start="1600"
                        data-type="image"
                        data-basealign="slide"
                        data-transform_in="x:[10%];opacity:0;s:500;"
                        data-transform_out="x:[10%];opacity:0;s:500;"><img src="{{ asset('img/slides/misc/notebook-right.png') }}" alt="" /></div>

                    <div class="tp-caption text-color-dark font-primary font-weight-thin rs-parallaxlevel-1"
                        data-x="center" data-hoffset="['-222','-222','-222','-118']"
                        data-y="center" data-voffset="['-70','-70','-70','-70']"
                        data-start="1400"
                        data-fontsize="['28','28','28','28']"
                        data-basealign="slide"
                        data-transform_in="y:[100%];opacity:0;s:500;"
                        data-transform_out="y:[100%];opacity:0;s:500;">Start right now</div>

                    <div class="tp-caption text-color-dark font-primary font-weight-bold letter-spacing-10 rs-parallaxlevel-2"
                        data-x="center"
                        data-y="center" data-voffset="-20"
                        data-start="1000"
                        data-fontsize="['52','52','52','32']"
                        data-transform_in="y:[50%];opacity:0;s:500;"
                        data-transform_out="y:[50%];opacity:0;s:500;">CREATIVE DIGITAL</div>

                    <a class="tp-caption btn btn-rounded btn-primary font-weight-semibold rs-parallaxlevel-1"
                        href="#"
                        data-hash
                        data-hash-offset="90"
                        data-x="center" data-hoffset="['205','205','205','80']"
                        data-y="center" data-voffset="['55','55','55','45']"
                        data-start="1600"
                        data-whitespace="nowrap"
                        data-fontsize="['13','13','13','20']"
                        data-paddingtop="['13','13','13','13']"
                        data-paddingbottom="['13','13','13','13']"
                        data-paddingleft="['65','65','65','65']"
                        data-paddingright="['65','65','65','65']"
                        data-transform_in="y:[-50%];opacity:0;s:500;"
                        data-transform_out="y:[50%];opacity:0;s:500;">GET STARTED</a>

                    <a class="tp-caption btn btn-link font-weight-semibold text-color-dark text-decoration-none d-flex align-items-center rs-parallaxlevel-3"
                        href="#"
                        data-x="center" data-hoffset="['242','242','242','115']"
                        data-y="center" data-voffset="['115','115','115','110']"
                        data-start="1900"
                        data-whitespace="nowrap"
                        data-fontsize="['13','13','13','20']"
                        data-transform_in="y:[-50%];opacity:0;s:500;"
                        data-transform_out="y:[50%];opacity:0;s:500;">OUR PORTFOLIO <i class="fas fa-angle-right text-color-primary text-4 ml-2"></i></a>

                </li>
            </ul>
        </div>
    </div>
    <section class="section call-to-action call-to-action-text-light call-to-action-height-2 bg-primary">
        <div class="container">
            <div class="row">
                <div class="col-md-9 col-lg-9">
                    <div class="call-to-action-content text-center text-md-left appear-animation" data-appear-animation="fadeInLeftShorter">
                        <h2 class="font-weight-semibold">Discover EZY. It's easier than you think.</h2>
                        <p class="font-weight-light mb-0">Start right now to create an amazing website.</p>
                    </div>
                </div>
                <div class="col-md-3 col-lg-3">
                    <div class="call-to-action-btn appear-animation" data-appear-animation="fadeInRightShorter">
                        <a href="https://themeforest.net/item/ezy-responsive-multipurpose-html5-template/21814871" target="_blank" class="btn btn-light btn-rounded btn-icon-effect-1 btn-h-4 btn-v-3 font-weight-bold">
                            <span class="wrap">
                                <span>BUY EZY NOW</span>
                                <strong class="font-weight-semibold">$16</strong>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="start" class="section bg-light pt-4 pb-5">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="steps steps-primary steps-style-2">
                        <div class="dots appear-animation" data-appear-animation="fadeIn" data-appear-animation-delay="1200">
                            <img class="dots-mask" src="{{ asset('img/svg/steps-dots-bg-light.svg') }}" alt="" />
                            <div class="dots-color"></div>
                            <div class="dots-color-dark"></div>
                        </div>
                        <div class="item appear-animation" data-appear-animation="stepsFadeInUp" data-plugin-options="{'accY': -200}">
                            <h2 class="item-title"><span>1.</span>STRATEGY</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitasellus blandit massa enim.</p>
                            <a class="learn-more" href="#">Learn More <i class="fas fa-angle-right"></i></a>
                        </div>
                        <div class="item appear-animation" data-appear-animation="stepsFadeInUp" data-appear-animation-delay="300" data-plugin-options="{'accY': -200}">
                            <h2 class="item-title"><span>2.</span>PLANNING</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitasellus blandit massa enim.</p>
                            <a class="learn-more" href="#">Learn More <i class="fas fa-angle-right"></i></a>
                        </div>
                        <div class="item appear-animation" data-appear-animation="stepsFadeInUp" data-appear-animation-delay="600" data-plugin-options="{'accY': -200}">
                            <h2 class="item-title"><span>3.</span>BUILD</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitasellus blandit massa enim.</p>
                            <a class="learn-more" href="#">Learn More <i class="fas fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 p-0">
                <div class="parallax h-100" data-plugin-parallax data-plugin-options="{'speed': 1.5, 'minHeight': 371}" data-image-src="{{ asset('img/parallax/parallax-3.jpg') }}"></div>
            </div>
            <div class="col-md-6 p-0">
                <section class="section bg-light-5 h-100">
                    <div class="row m-0">
                        <div class="col-half-section pl-md-5">
                            <div class="mask overflow-hidden">
                                <span class="top-sub-title text-color-primary d-block appear-animation" data-appear-animation="maskUp">LOREM IPSUM DOLOR SIT</span>
                            </div>
                            <div class="mask overflow-hidden mb-3">
                                <h2 class="font-weight-bold mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="200">Brand Solutions</h2>
                            </div>
                            <div class="mask overflow-hidden mb-4">
                                <p class="mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <a href="#" class="btn btn-primary btn-outline btn-rounded btn-4 btn-h-4 text-0 font-weight-bold appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="600">LEARN MORE</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 p-0 order-2 order-md-1">
                <section class="section bg-light-5 h-100">
                    <div class="row justify-content-end m-0">
                        <div class="col-half-section pr-md-5">
                            <div class="mask overflow-hidden">
                                <span class="top-sub-title text-color-primary d-block appear-animation" data-appear-animation="maskUp">LOREM IPSUM DOLOR SIT</span>
                            </div>
                            <div class="mask overflow-hidden mb-3">
                                <h2 class="font-weight-bold mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="200">Eclusive Websites</h2>
                            </div>
                            <div class="mask overflow-hidden mb-4">
                                <p class="mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <a href="#" class="btn btn-primary btn-outline btn-rounded btn-4 btn-h-4 text-0 font-weight-bold appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="600">LEARN MORE</a>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-md-6 p-0 order-1 order-md-2">
                <div class="parallax h-100" data-plugin-parallax data-plugin-options="{'speed': 1.5, 'minHeight': 371}" data-image-src="img/parallax/parallax-4.jpg"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 p-0">
                <div class="parallax h-100" data-plugin-parallax data-plugin-options="{'speed': 1.5, 'minHeight': 371}" data-image-src="img/parallax/parallax-1.jpg"></div>
            </div>
            <div class="col-md-6 p-0">
                <section class="section bg-light-5 h-100">
                    <div class="row m-0">
                        <div class="col-half-section pl-md-5">
                            <div class="mask overflow-hidden">
                                <span class="top-sub-title text-color-primary d-block appear-animation" data-appear-animation="maskUp">LOREM IPSUM DOLOR SIT</span>
                            </div>
                            <div class="mask overflow-hidden mb-3">
                                <h2 class="font-weight-bold mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="200">SEO Optimization</h2>
                            </div>
                            <div class="mask overflow-hidden mb-4">
                                <p class="mb-0 appear-animation" data-appear-animation="maskUp" data-appear-animation-delay="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <a href="#" class="btn btn-primary btn-outline btn-rounded btn-4 btn-h-4 text-0 font-weight-bold appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="600">LEARN MORE</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <section class="section">
        <div class="container">
            <div class="row text-center mb-4">
                <div class="col">
                    <span class="top-sub-title text-color-primary">LOREM IPSUM DOLOR SIT</span>
                    <h2 class="font-weight-bold">Why Choose Us?</h2>
                    <p class="lead">Lorem ipsum dolor sit a met, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div class="row">
                <div class="col highlight-boxes highlight-boxes-rounded">
                    <svg class="particles" viewBox="0 0 1351 456" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width="1351px" height="456px">
                        <g class="g-particles g-particles-group-1" data-appear-animation="expandParticles" data-appear-animation-delay="500">
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 71.3474 409 C 69.7543 412.6979 74.1068 412.9063 74.9886 411.5 C 75.8705 410.0938 78.4593 413.0886 75.899 414 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 501.3474 56 C 499.7543 59.6979 504.1068 59.9063 504.9886 58.5 C 505.8705 57.0938 508.4593 60.0886 505.899 61 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 302 437.5 C 302 437.2239 302.2239 437 302.5 437 C 302.7761 437 303 437.2239 303 437.5 C 303 437.7761 302.7761 438 302.5 438 C 302.2239 438 302 437.7761 302 437.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 66 262 L 65 268 L 71 266 L 66 262 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1281 112 L 1280 118 L 1286 116 L 1281 112 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 949 438 L 948 444 L 954 442 L 949 438 Z"/>
                        </g>
                        <g class="g-particles g-particles-group-2" data-appear-animation="expandParticles" data-appear-animation-delay="800">
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1290 190.5 C 1290 190.2238 1290.2239 190 1290.5 190 C 1290.7761 190 1291 190.2238 1291 190.5 C 1291 190.7762 1290.7761 191 1290.5 191 C 1290.2239 191 1290 190.7762 1290 190.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 424 39 L 429 38 L 427 43 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1093 58 L 1098 57 L 1096 62 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 204.5 433.1666 L 209 437 L 210.3333 431 L 204.5 433.1666 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 67 341 L 77 335 "/>
                        </g>
                        <g class="g-particles g-particles-group-3" data-appear-animation="expandParticles" data-appear-animation-delay="1100">
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 59 186.5 C 59 186.2238 59.2239 186 59.5 186 C 59.7761 186 60 186.2238 60 186.5 C 60 186.7762 59.7761 187 59.5 187 C 59.2239 187 59 186.7762 59 186.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 923 45 L 922.4713 40.8965 L 927.5314 42.3751 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 359 36.5 C 359 36.2238 359.2239 36 359.5 36 C 359.7761 36 360 36.2238 360 36.5 C 360 36.7762 359.7761 37 359.5 37 C 359.2239 37 359 36.7762 359 36.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 254 57 L 253.4713 52.8965 L 258.5313 54.3751 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 671 77 L 681 71 "/>
                        </g>
                        <g class="g-particles g-particles-group-4" data-appear-animation="expandParticles" data-appear-animation-delay="1400">
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1148 70.5 C 1148 70.2238 1148.2239 70 1148.5 70 C 1148.7761 70 1149 70.2238 1149 70.5 C 1149 70.7762 1148.7761 71 1148.5 71 C 1148.2239 71 1148 70.7762 1148 70.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 849 60.3474 C 845.3021 58.7543 845.0938 63.1068 846.5 63.9886 C 847.9063 64.8705 844.9114 67.4593 844 64.899 "/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1144.5 434.8334 L 1139 437 L 1143.6666 441 L 1144.5 434.8334 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 991 40.5 C 991 40.2238 991.2239 40 991.5 40 C 991.7761 40 992 40.2238 992 40.5 C 992 40.7762 991.7761 41 991.5 41 C 991.2239 41 991 40.7762 991 40.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1274 339 L 1284 347 "/>
                        </g>
                        <g class="g-particles g-particles-group-5" data-appear-animation="expandParticles" data-appear-animation-delay="1700">
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 202 67.5 C 202 67.2238 202.2239 67 202.5 67 C 202.7761 67 203 67.2238 203 67.5 C 203 67.7762 202.7761 68 202.5 68 C 202.2239 68 202 67.7762 202 67.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 398 435 L 397 441 L 403 439 L 398 435 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1281 265 L 1280 271 L 1286 269 L 1281 265 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 1048 441.5 C 1048 441.2239 1048.2239 441 1048.5 441 C 1048.7761 441 1049 441.2239 1049 441.5 C 1049 441.7761 1048.7761 442 1048.5 442 C 1048.2239 442 1048 441.7761 1048 441.5 Z"/>
                            <path stroke="#989d9f" fill="#989d9f" stroke-width="1" d="M 64.8333 108.5 L 67 114 L 71 109.3333 L 64.8333 108.5 Z"/>
                        </g>
                    </svg>
                    <div class="wrap-boxes">
                        <div class="col-md-4 text-center bg-light-5 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay="200">
                            <i class="lnr lnr-tablet background-icon background-icon-right"></i>
                            <h3 class="font-weight-bold text-3 mb-4 pb-2">RESPONSIVE DESIGN</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc.</p>
                        </div>
                        <div class="col-md-4 text-center bg-dark-5 appear-animation" data-appear-animation="fadeInUpShorter">
                            <i class="lnr lnr-select background-icon background-icon-bottom text-color-dark"></i>
                            <h3 class="text-color-light font-weight-bold text-3 mb-4 pb-2">AMAZING FEATURES</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc.</p>
                        </div>
                        <div class="col-md-4 text-center bg-light-5 appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="200">
                            <i class="lnr lnr-briefcase background-icon background-icon-left"></i>
                            <h3 class="font-weight-bold text-3 mb-4 pb-2">PORTFOLIO LAYOUTS</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="section">
        <div class="container">
            <div class="row justify-content-center align-items-center appear-animation" data-appear-animation="fadeInUpShorter">
                <div class="col-4 col-md-1-5 text-center text-md-left">
                    <img src="{{ asset('img/logos/logo-7.png') }}" width="170" alt="" class="img-fluid">
                </div>
                <div class="col-4 col-md-1-5 text-center">
                    <img src="{{ asset('img/logos/logo-8.png') }}" width="80" alt="" class="img-fluid">
                </div>
                <div class="col-4 col-md-1-5 text-center">
                    <img src="{{ asset('img/logos/logo-24.png') }}" width="100" alt="" class="img-fluid">
                </div>
                <div class="col-4 col-md-1-5 text-center text-md-right mt-5 mt-md-0">
                    <img src="{{ asset('img/logos/logo-10.png') }}" width="140" alt="" class="img-fluid">
                </div>
                <div class="col-4 col-md-1-5 text-center text-md-right mt-5 mt-md-0">
                    <img src="{{ asset('img/logos/logo-11.png') }}" width="100" alt="" class="img-fluid">
                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="container">
            <div class="row appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200">
                <div class="col">
                    <div class="owl-carousel owl-theme nav-style-3 nav-color-dark" data-plugin-options="{'items': 1, 'dots': false, 'nav': true, 'navtext': []}">
                        <div>
                            <div class="row align-items-center">
                                <div class="col-8 col-md-2 mx-auto mb-4 mb-md-0 ml-md-auto">
                                    <img src="{{ asset('img/authors/author-1.jpg') }}" class="img-fluid rounded-circle" alt="" />
                                </div>
                                <div class="col-md-9 mr-auto pl-4">
                                    <div class="testimonial testimonial-style-1">
                                        <blockquote>
                                            <p>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma - which is living with the results of other people’s thinking. Don’t let the noise of others’ opinions drown out your own inner voice.”</p>
                                        </blockquote>
                                        <div class="testimonial-author">
                                            <span>
                                                <strong>- John Doe</strong>
                                                <span>Okler Inc</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row align-items-center">
                                <div class="col-8 col-md-2 mx-auto mb-4 mb-md-0 ml-md-auto">
                                    <img src="{{ asset('img/authors/author-2.jpg') }}" class="img-fluid rounded-circle" alt="" />
                                </div>
                                <div class="col-md-9 mr-auto pl-4">
                                    <div class="testimonial testimonial-style-1">
                                        <blockquote>
                                            <p>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma - which is living with the results of other people’s thinking. Don’t let the noise of others’ opinions drown out your own inner voice.”</p>
                                        </blockquote>
                                        <div class="testimonial-author">
                                            <span>
                                                <strong>- John Doe</strong>
                                                <span>Okler Inc</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row align-items-center">
                                <div class="col-8 col-md-2 mx-auto mb-4 mb-md-0 ml-md-auto">
                                    <img src="{{ asset('img/authors/author-3.jpg') }}" class="img-fluid rounded-circle" alt="" />
                                </div>
                                <div class="col-md-9 mr-auto pl-4">
                                    <div class="testimonial testimonial-style-1">
                                        <blockquote>
                                            <p>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma - which is living with the results of other people’s thinking. Don’t let the noise of others’ opinions drown out your own inner voice.”</p>
                                        </blockquote>
                                        <div class="testimonial-author">
                                            <span>
                                                <strong>- John Doe</strong>
                                                <span>Okler Inc</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="parallax section section-height-3 call-to-action" data-plugin-parallax data-plugin-options="{'speed': 1.5}" data-image-src="{{ asset('img/parallax/parallax-5.jpg') }}">
        <div class="container">
            <div class="row">
                <div class="col-12 justify-content-center mb-4">
                    <div class="call-to-action-content text-center appear-animation" data-appear-animation="fadeInLeftShorter">
                        <h2 class="font-weight-semibold text-color-light">Discover EZY. It's easier than you think.</h2>
                        <p class="font-weight-light text-color-light mb-0">Start right now to create an amazing website.</p>
                    </div>
                </div>
                <div class="col-12 justify-content-center">
                    <div class="call-to-action-btn text-center appear-animation" data-appear-animation="fadeInRightShorter">
                        <a href="https://themeforest.net/item/ezy-responsive-multipurpose-html5-template/21814871" target="_blank" class="btn btn-light btn-rounded btn-3 btn-icon-effect-1 font-weight-bold btn-h-4 btn-v-3">
                            <span class="wrap">
                                <span>BUY EZY NOW</span>
                                <strong class="font-weight-semibold">$16</strong>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
