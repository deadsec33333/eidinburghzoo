// Global Javascript
var scnMid = 0;
var scnWidth = 0;
var isTouch = _isTouch();
var lastST = 0;
document.addEventListener('DOMContentLoaded', function(){
    jQuery(document).on('focus', '.access-links a', function(){
        jQuery('.access-links').addClass('show');
    });
    jQuery(document).on('blur', '.access-links a', function(){
        jQuery('.access-links').removeClass('show');
    });
    jQuery(window).resize(function(){
        jQuery('.mh').each(function () {
            _matchHeight(jQuery(this), jQuery(this).attr('mh-class'), jQuery(this).attr('mh-cutoff'));
        });
        if (jQuery(window).width() != scnWidth) {
            scnWidth = jQuery(window).width();
            _resetMenus();
        }
        scnMid = jQuery(window).width() / 2;
    });
    jQuery('.mh').each(function () {
        _matchHeight(jQuery(this), jQuery(this).attr('mh-class'), jQuery(this).attr('mh-cutoff'));
    });
    jQuery(window).scroll(function(){
        const stCheck = jQuery(window).scrollTop();
        if ((stCheck > lastST) && (stCheck > 600)) {
            jQuery('header').addClass('mini');
        } else {
            jQuery('header').removeClass('mini');
        }
        if (scnWidth >= 1400) {
            if (jQuery('.secondary.open').length) {
                jQuery('.secondary-close').click();
            }
            _resetMenus();
        }
        lastST = stCheck;
    });
    // Meganav
    jQuery(document).on('click', '.first.has-children', function(e){
        e.preventDefault();
        if (scnWidth >= 1400) {
            if (!jQuery(this).hasClass('open')) {
                _resetMenus();
            }
        }
        jQuery('body').click();
        console.log("scnMid="+scnMid);
        console.log("left="+jQuery(this).offset().left);
        if (jQuery(this).offset().left >= scnMid) {
            jQuery(this).siblings('.secondary').removeClass('from-left  from-right').addClass('from-right');
        } else {
            jQuery(this).siblings('.secondary').removeClass('from-left  from-right').addClass('from-left');
        }
        jQuery('.layout-content').toggleClass('overlay');
        jQuery(this).toggleClass('open');
        jQuery(this).siblings('.secondary').toggleClass('open');
        jQuery(this).siblings('.ico').toggleClass('open');
        if (!jQuery(this).hasClass('open')) {
            setTimeout(function(){
                jQuery('.highlight').addClass('show');
                jQuery('.tertiary').removeClass('show');
                _refreshTabi();
            }, 500);
        }
        _refreshTabi();
    });
    jQuery(document).on('click', '.second.has-children', function(e){
        e.preventDefault();
        jQuery('.highlight').removeClass('show');
        jQuery('.tertiary').removeClass('show');
        jQuery(this).closest('li').children('.tertiary').addClass('show');
        _refreshTabi();
    });
    jQuery(document).on('click', '.tertiary-return', function(e){
        e.preventDefault();
        jQuery('.highlight').addClass('show');
        jQuery('.tertiary').removeClass('show');
        _refreshTabi();
    });
    jQuery(document).on('click', '.secondary-close, .secondary-return', function(e){
        e.preventDefault();
        jQuery(this).closest('.secondary').toggleClass('open');
        jQuery(this).closest('li').children('.first.has-children').toggleClass('open');
        jQuery(this).closest('li').children('.ico').toggleClass('open');
        jQuery('.layout-content').toggleClass('overlay');
        setTimeout(function(){
            jQuery('.highlight').addClass('show');
            jQuery('.tertiary').removeClass('show');
            _refreshTabi();
        }, 500);
        _refreshTabi();
    });
    jQuery(document).on('click', '.burger', function(e){
        e.preventDefault();
        jQuery(this).toggleClass('open');
        jQuery('.hprimary').toggleClass('open');
        if (!jQuery(this).hasClass('open')) {
            jQuery('.secondary, .tertiary').removeClass('open show');
        }
        _refreshTabi();
    });
    scnMid = jQuery(window).width() / 2;
    scnWidth = jQuery(window).width();
    jQuery('.cta').each(function(){
        if (jQuery(this)[0].hasAttribute('href')) {
            const thref = jQuery(this).attr('href');
            if (thref.includes("http://") || thref.includes("https://")) {
                if (!thref.includes(window.location.hostname)) {
                    jQuery(this).attr('target', '_blank');
                }
            }
        }
    });
    // Accordion show/hide
    jQuery(document).on('click', '.js-accordion-trigger', function (e) {
        e.preventDefault();
        var paraID = jQuery(this).data('pid');
        jQuery(this).toggleClass('open');
        jQuery(this).parent('.js-accordion-heading').siblings('.js-accordion-content[data-pid='+ paraID +']').slideToggle(300);
        if(jQuery(this).hasClass('open')){
            jQuery(this).attr('aria-expanded', true);
        } else {
            jQuery(this).attr('aria-expanded', false);
        }
    });
    _refreshTabi();
}, false);
function _resetMenus() {
    jQuery('.first, .ico').removeClass('open');
    jQuery('.burger').removeClass('open');
    jQuery('.hprimary').removeClass('open');
    jQuery('.secondary').removeClass('open');
    jQuery('.highlight').addClass('show');
    jQuery('.tertiary').removeClass('show');
    jQuery('.layout-content').removeClass('overlay');
    _refreshTabi();
}
function _matchHeight($parent, $target, $cutoff) {
    //if (jQuery(window).width() <= parseInt($cutoff)) {return;}
    var targets = $target.split(',');
    for (i in targets) {
        var tallest = 0;
        $parent.find(targets[i]).attr('style', '');
        var allels = $parent.find(targets[i]);
        for (n in allels) {
            if (allels[n].offsetHeight > tallest) {
                tallest = allels[n].offsetHeight;
            }
        }
        $parent.find(targets[i]).innerHeight(tallest);
    }
}
function _isTouch() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
function _refreshTabi() {
    jQuery('.first.has-children').each(function(){
        if (jQuery(this).hasClass('open')) {
            jQuery(this).siblings('.secondary').find('.secondary-close').attr('tabindex', "0");
            jQuery(this).siblings('.secondary').find('a.second').attr('tabindex', "0");
            if (jQuery(this).siblings('.secondary').find('.tertiary.show').length > 0) {
                jQuery(this).siblings('.secondary').find('.tertiary').find('a').attr('tabindex', "-1");
                jQuery(this).siblings('.secondary').find('.tertiary.show').find('a').attr('tabindex', "0");
                jQuery(this).siblings('.secondary').find('.highlight-link').attr('tabindex', '-1');
            } else {
                jQuery(this).siblings('.secondary').find('.tertiary').find('a').attr('tabindex', "-1");
                jQuery(this).siblings('.secondary').find('.highlight-link').attr('tabindex', '0');
            }
        } else {
            jQuery(this).siblings('.secondary').find('a').attr('tabindex', "-1");
        }
    });
}