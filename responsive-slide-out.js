/*
author: alvin sanchez, atechapart.com
origin: ransom carroll, for the goodvibes theme by cart designers @ cartdesigners.com
ver: 1.6
*/

//ready
$(document).ready(function(){
    "use strict";
    renderCoreResponsiveSlideOutInterfaceHtml.init(); 
    styleCoreResponsiveSlideOutInterfaceCss.init();
    responsiveSlideout.init();
});

//build responsive slideout
var responsiveSlideout = {
    init: function(){        
        this.toggleSlideout();
        this.toggleSearchField();
    },
    toggleSlideout: function() {
        //when the hamburger button is clicked
        $('.slideout__button--hamburger').on('click',function(){
            //slide over top nav bar
            this.toggleTopNavBarSlideRight();
            //slide out the panel
            this.toggleLeftSlideOutPanel();       
        }.bind(this));
    }, 
    toggleTopNavBarSlideRight: function(){
        //toggle slide top nav bar over to the right
        $("#nav__responsive").toggleClass('nav__responsive--toggle');
        $(".searchbar__container").toggleClass('nav__responsive--toggle');
    }, 
    toggleLeftSlideOutPanel: function(){
        var html = $('html');
        html.toggleClass('left-slide-out-panel-open');

        if($('html').hasClass('left-slide-out-panel-open')){
            this.lockPageScroll();
            this.hideSearchFieldContainer();
            this.renderDarkPageOverlay();     
        } else {            
            this.unlockPageScroll();
            this.removeDarkPageOverlay();
        }
    }, 
    lockPageScroll: function() {
        //http://stackoverflow.com/questions/3656592/how-to-programmatically-disable-page-scrolling-with-jquery
        //configure overflow: hidden; to toggle dynamically on <html> element: 
        //bug fix for {https://teamtreehouse.com/forum/position-fixed-css-bug-in-chrome-and-firefox-for-android}
        var top = $(window).scrollTop();
        var left = $(window).scrollLeft();

        $(window).scroll(function(){
            $(this).scrollTop(top).scrollLeft(left);
        });   

        $('body').css('overflow', 'hidden');
    }, 
    unlockPageScroll: function() {
        //http://stackoverflow.com/questions/3656592/how-to-programmatically-disable-page-scrolling-with-jquery
        $('body').css('overflow', 'auto');
    }, 
    renderDarkPageOverlay: function() {        
        //render the darken-page element onto the page
        var renderDarkPageOverlay = '<div class="darken-page"></div>';
        $('body').prepend(renderDarkPageOverlay);
        //cover and darken the page
        $('.darken-page').css({
            background : 'rgba(0, 0, 0, .5)', 
            width :'100%', 
            height : '100%', 
            "z-index" : '10', 
            top : '0', 
            left : '0', 
            position : 'fixed',
            visibility: 'visible', 
            WebkitTransition : 'background .25s ease-in 0s',
            MozTransition    : 'background .25s ease-in 0s',
            MsTransition     : 'background .25s ease-in 0s',
            OTransition      : 'background .25s ease-in 0s',
            transition       : 'background .25s ease-in 0s', 
        });
        // when user clicks on the darken-page element
        $('.darken-page').on('click', function(){
            //hide top nav bar
            this.toggleTopNavBarSlideRight();
            //hide the slide out panel
            this.toggleLeftSlideOutPanel();    
            //unlock the scrollbar
            $(window).unbind('scroll');
        }.bind(this));
    }, 
    removeDarkPageOverlay: function() {        
        //undarken the page
        $('.darken-page').css({
            visibility: 'hidden', 
            background : 'rgba(0, 0, 0, 0)', 
            WebkitTransition : 'background .25s ease-in 0s, visibility .25s ease-in',
            MozTransition    : 'background .25s ease-in 0s, visibility .25s ease-in',
            MsTransition     : 'background .25s ease-in 0s, visibility .25s ease-in',
            OTransition      : 'background .25s ease-in 0s, visibility .25s ease-in',
            transition       : 'background .25s ease-in 0s, visibility .25s ease-in', 
        });
        //disable the click event on the darken-page
        $('.darken-page').off();
        //remove the darken-page element
        $('.darken-page').remove();
    }, 
    toggleSearchField: function(){        
        $('.search__button--magnifyingglass').on('click', function(e){
            e.preventDefault();
            if($(".searchbar__container").hasClass('searchbar-container-open')) {
                this.hideSearchFieldContainer();
            } else {
                this.showSearchFieldContainer();
            }
        }.bind(this));
    }, 
    showSearchFieldContainer: function(){
        $(".searchbar__container").css({display: "block"});
        $(".searchbar__container").addClass('searchbar-container-open');
        $(".search__button--magnifyingglass").css({"background":"#fff"});
        $(".search__button--magnifyingglass > a").css({"color":"#a91e23"});
    },
    hideSearchFieldContainer: function(){
        $(".searchbar__container").css({display: "none"});
        $(".searchbar__container").removeClass('searchbar-container-open');
        $(".search__button--magnifyingglass").css({"background":"#2B2B2B"});
        $(".search__button--magnifyingglass > a").css({"color":"#fff"});
    }, 
}
//end build responsive slideout

//render html interface
var renderCoreResponsiveSlideOutInterfaceHtml = {
    init: function() {      
        this.callInExternalLibraries();
        this.renderCoreResponsiveSlideOutInterfaceHtml();
        this.renderCustomResponsiveSlideOutInterfaceHtml();
    }, 
    configs: {
        callInGoogleFonts: '<link id="google-fonts" href="//fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic" rel="stylesheet" type="text/css">', 
        callInAwesomeFonts: '<link id="awesome-fonts" rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">', 
        fetchLogoFromUrl: 'http://www.summa3d.com/wp/wp-content/uploads/2014/12/logo_placeholder.png'
    }, 
    callInExternalLibraries: function(){
        $(this.configs.callInAwesomeFonts).insertAfter('head > meta:nth-child(3)');
        //call in google fonts
        $(this.configs.callInGoogleFonts).insertAfter('head > #awesome-fonts');
    }, 
    renderCustomResponsiveSlideOutInterfaceHtml: function(){
        //add your custom html elements here...

        //here's a demo custom snippet to render the search input field html (FOR DEMO CAN DELETE)
        var renderToprightNavUnorderedListItemSearchInputHtml = '<input class="search__input" placeholder="demo search input..." style="width: 100%;height: 40px;padding: 10px;font-size: 16px;color: #6b6b6b;border-radius: 3px;border: 1px solid #B8B8B8;box-sizing: border-box;outline: none;-webkit-box-shadow:inset 0 0 5px #000;-moz-box-shadow:inset 0 0 5px #000;box-shadow:inset 0 0 5px #000;background: transparent;">';
        $(renderToprightNavUnorderedListItemSearchInputHtml).prependTo(".sample-search-input-container-may-delete");

        //and another demo custom snippet to render the slide out body content with the scroll
        var renderBodyContentBlockHtml = '<div class="body-content-item" style="height:100%;overflow-y:scroll;font-size:60px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit tincidunt dui sit amet finibus. Vestibulum tristique ullamcorper elit sit amet ornare. Fusce at velit in turpis porta molestie. Pellentesque quis nibh ut tellus mattis blandit vitae ac nunc. Phasellus luctus nibh vel efficitur faucibus. Aenean rutrum lorem erat, at porttitor est scelerisque at. Mauris nec dolor nec risus feugiat auctor. Maecenas pretium et nisl eu ultricies. Curabitur consectetur lorem ut dolor volutpat, ac ornare mi lobortis. Nunc nec feugiat sapien. Sed consequat, erat sed facilisis finibus, massa neque semper ante, vitae aliquam eros augue quis elit. Proin vitae facilisis dolor.</div>';
        $('.slide-out-panel').append(renderBodyContentBlockHtml);
    }, 
    renderCoreResponsiveSlideOutInterfaceHtml: function(){ 

        //render slide out nav container
        var renderSlideOutNavContainer = '<div id="slide-out-nav-container"></div>';
        $(renderSlideOutNavContainer).prependTo('body');

        //render top nav container html
        //here, latch onto the element to render the slide out components/elements into, here im rendering the slide out inside the <header>
        var renderTopNavContainerHtml = '<section id="top-nav"></section>';
        $(renderTopNavContainerHtml).prependTo('#slide-out-nav-container');

        //render top nav html
        var renderTopNavHtml = '<nav id="nav__responsive"></nav>';
        $(renderTopNavHtml).prependTo('#top-nav');

        //render top left nav html
        var renderTopLeftNavHtml = '<div class="nav__left"></div>';
        $(renderTopLeftNavHtml).prependTo('#nav__responsive');

        //render top left nav unordered list html
        var renderTopLeftNavUnorderedListHtml = '<ul class="nav__left--ul"></ul>';
        $(renderTopLeftNavUnorderedListHtml).prependTo(".nav__left");

        //render top left nav unordered list item html
        var renderTopLeftNavUnorderedListItemHtml = '<li class="slideout__button--hamburger"></li>';
        $(renderTopLeftNavUnorderedListItemHtml).prependTo('.nav__left--ul');

        //render top left nav unordered list item hamburger link html
        var renderTopLeftNavUnorderedListItemHamburgerLinkHtml = '<a class="hamburger__link" href="#"></a>';
        $(renderTopLeftNavUnorderedListItemHamburgerLinkHtml).prependTo('.slideout__button--hamburger');

        //render top left nav unordered list item hamburger link icon html
        var renderTopLeftNavUnorderedListItemHamburgerLinkIconHtml = '<i class="fa fa-bars"></i>';
        $(renderTopLeftNavUnorderedListItemHamburgerLinkIconHtml).prependTo('.hamburger__link');

        //render top left nav unordered list item logo html
        var renderTopLeftNavUnorderedListItemHtml = '<li class="slideout__logo"></li>';
        $(renderTopLeftNavUnorderedListItemHtml).appendTo('.nav__left--ul');

        //render top left nav unordered list item logo link html
        var renderTopLeftNavUnorderedListItemLogoLinkHtml = '<a class="logo__link" href="/demo.html"></a>';
        $(renderTopLeftNavUnorderedListItemLogoLinkHtml).appendTo('.slideout__logo');

        //render top left nav unordered list item logo link image html
        var renderTopLeftNavUnorderedListItemLogoLinkImageHtml = '<img class="logo__link--img" src="' + renderCoreResponsiveSlideOutInterfaceHtml.configs.fetchLogoFromUrl + '">';
        $(renderTopLeftNavUnorderedListItemLogoLinkImageHtml).appendTo('.logo__link');

        //render top right nav html
        var renderTopRightNavHtml = '<div class="nav__right"></div>';
        $(renderTopRightNavHtml).appendTo('#nav__responsive');

        //render top right nav unordered list html
        var renderToprightNavUnorderedListHtml = '<ul class="nav__right--ul"></ul>';
        $(renderToprightNavUnorderedListHtml).prependTo(".nav__right");

        //render top right nav unordered list item search html
        var renderToprightNavUnorderedListItemSearchHtml = '<li class="search__button--magnifyingglass"></li>';
        $(renderToprightNavUnorderedListItemSearchHtml).prependTo(".nav__right--ul");      

        //render top right nav unordered list item magnifying glass link html
        var renderToprightNavUnorderedListItemMagnifyingGlassLinkHtml = '<a class="magnifyingglass__link" href="#"></a>';
        $(renderToprightNavUnorderedListItemMagnifyingGlassLinkHtml).prependTo(".search__button--magnifyingglass");

        //render top right nav unordered list item magnifying glass link icon html
        var renderToprightNavUnorderedListItemMagnifyingGlassLinkIconHtml = '<i class="fa fa-search"></i>';
        $(renderToprightNavUnorderedListItemMagnifyingGlassLinkIconHtml).prependTo(".magnifyingglass__link");

        //render top right nav unordered list item account html
        var renderToprightNavUnorderedListItemAccountHtml = '<li class="account__button--user"></li>';
        $(renderToprightNavUnorderedListItemAccountHtml).appendTo(".nav__right--ul");

        //render top right nav unordered list item account link html
        var renderToprightNavUnorderedListItemAccountLinkHtml = '<a class="account__link" href="#"></a>';
        $(renderToprightNavUnorderedListItemAccountLinkHtml).prependTo(".account__button--user");

        //render top right nav unordered list item account link icon html
        var renderToprightNavUnorderedListItemAccountLinkIconHtml = '<i class="fa fa-user"></i>';
        $(renderToprightNavUnorderedListItemAccountLinkIconHtml).prependTo(".account__link");                

        //render top right nav unordered list item cart html
        var renderToprightNavUnorderedListItemCartHtml = '<li class="cart__button--shoppingcart"></li>';
        $(renderToprightNavUnorderedListItemCartHtml).appendTo(".nav__right--ul");  

        //render top right nav unordered list item cart link html
        var renderToprightNavUnorderedListItemCartLinkHtml = '<a class="cart__link" href="#"></a>';
        $(renderToprightNavUnorderedListItemCartLinkHtml).prependTo(".cart__button--shoppingcart"); 

        //render top right nav unordered list item cart link icon html
        var renderToprightNavUnorderedListItemCartLinkIconHtml = '<i class="fa fa-shopping-cart"></i>';
        $(renderToprightNavUnorderedListItemCartLinkIconHtml).prependTo(".cart__link"); 

        //render top left nav search bar container html
        var renderTopLeftNavSearchBarContainerHtml = '<div class="searchbar__container"></div>';
        $(renderTopLeftNavSearchBarContainerHtml).appendTo('#nav__responsive');

        //render top left nav search bar container sample search input container html
        var renderTopLeftNavSearchBarContainerSampleSearchInputContainerHtml = '<div class="sample-search-input-container-may-delete" style="padding: 5px 5px;"></div>';
        $(renderTopLeftNavSearchBarContainerSampleSearchInputContainerHtml).prependTo('.searchbar__container');

        //render slideout panel     
        var renderSlideOutPanelHtml = '<div class="left-slide-out-panel slide-out-panel"></div>';
        $('html').append(renderSlideOutPanelHtml);

        //render head content block at top of slideout panel
        //the dir="ltr" used in the anchor tag is used to fix bug where the phone number text with hyphens renders out of order
        var renderHeadContentBlockHtml = '<div class="call-to-action-item"><ul><li><a href="tel:+1-866-555-5555" dir="ltr"><i class="fa fa-phone"></i>866-5-NUMBER<small>(866-555-5555)</small></a></li><li>call to action/selling point</li></ul></div>';
        $('.slide-out-panel').prepend(renderHeadContentBlockHtml);
    }    
};
//end render html interface

//style css interface
var styleCoreResponsiveSlideOutInterfaceCss = {   
    init: function(){
        this.styleCoreResponsiveSlideOutInterface();
        this.styleCustomResponsiveSlideOutInterface();
    }, 
    styleCustomResponsiveSlideOutInterface: function(){
        //add your custom css styles here...
    }, 
    styleCoreResponsiveSlideOutInterface: function() {

        //css minified with: http://cssminifier.com/
        //css unminify with: http://mrcoles.com/blog/css-unminify/
        //cache the css
        var css = 
            "body:after,main{width:100%}html{height:100%;background:grey}body{position:relative;top:0;min-height:100%}body:after{content:'';display:block;height:100%;color:rgba(0,0,0,.6)}#nav__responsive,.slide-out-panel{display:none}@media screen and (max-width:640px){body{top:50px!important}#nav__responsive,.slide-out-panel{display:inline-block;position:fixed;top:0;left:0;width:100%;height:50px;background:#2B2B2B;-webkit-transition:all .3s ease;transition:all .3s ease}#nav__responsive .nav__left{float:left;height:100%;width:170px}#nav__responsive .nav__left ul{height:100%;margin:0;padding:0}#nav__responsive .nav__left ul li{float:right;height:100%;text-align:left;list-style-type:none;background:#2B2B2B;width:119px}#nav__responsive .nav__left ul li:first-child{float:left;width:50px;text-align:center;background:#2B2B2B;border-right:1px solid #515151}#nav__responsive .nav__left ul li:first-child a{display:block;height:100%;font-size:21px;color:#fff}#nav__responsive .nav__left ul li:first-child a i{position:absolute;left:15px;top:15px}#nav__responsive .nav__left ul li:last-child a{position:static;display:inline-block;height:100%}#nav__responsive .nav__left ul li:last-child a img{display:block;max-width:92%;max-height:92%;padding:4%;position:relative;top:0;}#nav__responsive .nav__right{float:right;width:calc(100% - 170px);height:50px;background:#2B2B2B;overflow:hidden}#nav__responsive .nav__right ul{float:right;width:150px;height:100%;margin:0;padding:0}#nav__responsive .nav__right ul li{display:inline-block;float:left;width:49px;height:100%;border-left:1px solid #515151}#nav__responsive .nav__right ul li a{display:block;height:100%;font-size:21px;color:#fff}#nav__responsive .nav__right ul li a i{position:relative;left:15px;top:15px}.nav__responsive--toggle{left:265px!important;-webkit-transition:all .3s ease;transition:all .3s ease}.slide-out-panel{height:100%;min-height:100%;width:265px;background:#2B2B2B;top:0;overflow:hidden;transition:all .3s ease;z-index:1001}.searchbar__container,.slide-out-panel{position:fixed;-webkit-transition:all .3s ease}.left-slide-out-panel{left:-265px;padding:15px}html.left-slide-out-panel-open .left-slide-out-panel{left:0}.searchbar__container{display:none;top:50px;left:0;z-index:9999;width:100%;height:50px;background:#fff;transition:all .3s ease}.slide-out-panel{padding:0;font-family:Lato,Arial,Sans-serif}.slide-out-panel .call-to-action-item{background:#005C18}.slide-out-panel .call-to-action-item ul{margin:0;padding:0}.slide-out-panel .call-to-action-item ul li{font-size:1rem;text-align:left}.slide-out-panel .call-to-action-item ul li a i{float:left;padding: 0 10px 0 0;font-size:1.5rem;color:#fff}.slide-out-panel .call-to-action-item ul li a{display:block;width:240px;padding:.96rem;font-weight:700;text-decoration:none;color:#fff}.slide-out-panel .call-to-action-item ul li small{float:right;padding:.3rem 0 0;font-size:.7rem;font-weight:700;color:#81AE8C}.slide-out-panel .call-to-action-item ul li:last-child{padding:.4rem;font-size:1rem;font-weight:700;font-style:italic;text-align:center;color:#a91e23;background:#fff}.slide-out-panel .page-menu-container>ul>li{display:inline-block;width:100%;text-align:left;background:#2B2B2B;border-bottom:1px solid #515151}.slide-out-panel .page-menu-container>ul>li a{font-weight:400;color:#fff}}.body-content-item{scrollbar-face-color: #367CD2;scrollbar-shadow-color: #FFFFFF;scrollbar-highlight-color: #FFFFFF;scrollbar-3dlight-color: #FFFFFF;scrollbar-darkshadow-color: #FFFFFF;scrollbar-track-color: #FFFFFF;scrollbar-arrow-color: #FFFFFF;}.body-content-item::-webkit-scrollbar {width: 9px;}.body-content-item::-webkit-scrollbar-track {-webkit-box-shadow: none;-webkit-border-radius: 10px;border-radius: 10px;}.body-content-item::-webkit-scrollbar-thumb {-webkit-border-radius: 0px;border-radius: 0;background: rgb(29, 29, 29);-webkit-box-shadow: none;}";
        //create the <style> element
        var stylesTag = '<style></style>';
        //add it to the head of the page
        $(stylesTag).appendTo('head');
        //put the css inside the new <style> element
        $('style').text(css);
    }

};
//end style css interface