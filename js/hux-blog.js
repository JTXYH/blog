/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

 /*!
 * Hux Blog v1.6.0 (http://startbootstrap.com)
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0 
 */

// Tooltip Init
// Unuse by Hux since V1.6: Titles now display by default so there is no need for tooltip
// $(function() {
//     $("[data-toggle='tooltip']").tooltip();
// });


// make all images responsive
/* 
 * Unuse by Hux
 * actually only Portfolio-Pages can't use it and only post-img need it.
 * so I modify the _layout/post and CSS to make post-img responsive!
 */
// $(function() {
//  $("img").addClass("img-responsive");
// });

// responsive tables
$(document).ready(function() {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function() {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height(),
            bannerHeight  = $('.intro-header .container').height();     
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop(),
                    $catalog = $('.side-catalog');

                //check if user is scrolling up by mouse or keyborad
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;


                //adjust the appearance of side-catalog
                $catalog.show()
                if (currentTop > (bannerHeight + 41)) {
                    $catalog.addClass('fixed')
                } else {
                    $catalog.removeClass('fixed')
                }
            });
    }
});

// 自定义的搜索框
$(function () {
    var url = window.location.href;
    if (url === "https://jtxyh.github.io/about/"){
        $("html").off('click');
    }else{
        // 让用户无论点击页面哪个地方都可以直接进入搜索框
        $("html").click(function () {
            $("#searchInput").focus();
        });
    }
    // 用来存储所有的h2标题标签
    var allTitleName = [];
    var allTiltle = $(".post-title");
    $.each(allTiltle, function (i, e) {
        allTitleName.push(e);
    })

    // 给input绑定两个事件，当内容改变自动查询
    $("#searchInput").bind('input propertychange', function () {
        // 获取到输入的查询内容并转为小写
        var searchValue = $("#searchInput").val().toLowerCase();
        // 遍历所有的title
        $.each(allTitleName, function (i, e) {
            // 如果title里面的字包含输入的字符
            if ($(e).html().replace(/\s/ig, '').toLowerCase().indexOf(searchValue) != -1) {
                // 将当前的标题的div和分割线打开
                $(e).parent().parent().css('display', 'block');
                $(e).parent().parent().next().css('display', 'block');
            } else {
                // 没有匹配上隐藏
                $(e).parent().parent().css('display', 'none');
                $(e).parent().parent().next().css('display', 'none');
            }
        })
    })
})