(function($){function _createTemp(element){return element.clone().css({position:'absolute'});};function _splitHtmlWords(contents){var words=[];var splitContent;for(var c=0;c<contents.length;c++){if(contents[c].nodeName==='BR'){words.push('<br>');continue;}
if(contents[c].nodeType==3){splitContent=_splitWords(contents[c].textContent||contents[c].toString());}else{var tag=$(contents[c]).clone();splitContent=_splitHtmlWords(tag.contents());for(var t=0;t<splitContent.length;t++){tag.empty();splitContent[t]=tag.html(splitContent[t]).wrap('<p></p>').parent().html();}}
for(var w=0;w<splitContent.length;w++){if(splitContent[w]===''){continue;}
words.push(splitContent[w]);}}
return words;};function _splitWords(text){return text.split(/\s+/);}
function _markupContent(tag,html,index){tag='<div class="stop">'+tag;var $outer=$(tag).find('*:not(:has("*"))').html(html).closest('.stop').slice(-1);$outer.children().each(function(i,element){element.style.setProperty('--line-index',index);});return $outer.html();}
$.fn.splitLines=function(options){var settings={width:'auto',tag:'<div>',wrap:'',keepHtml:true};if(options){$.extend(settings,options);}
var newHtml=_createTemp(this);var contents=this.contents();var text=this.text();this.append(newHtml);newHtml.text('42');var maxHeight=newHtml.height()+2;newHtml.empty();var tempLine=_createTemp(newHtml);var width=settings.width;if(settings.width==='auto'){width=this[0].offsetWidth;}
tempLine.width(width);this.append(tempLine);var words=settings.keepHtml?_splitHtmlWords(contents):_splitWords(text);var prev;var lineCount=0;for(var w=0;w<words.length;w++){var html=tempLine.html();tempLine.html(html+words[w]+' ');if(tempLine.html()==prev){prev='';newHtml.append(_markupContent(settings.tag,tempLine.html(),lineCount));tempLine.html('');continue;}
if(tempLine.height()>maxHeight){prev=tempLine.html();tempLine.html(html);newHtml.append(_markupContent(settings.tag,tempLine.html(),lineCount));tempLine.html('');w--;lineCount++;}}
newHtml.append(_markupContent(settings.tag,tempLine.html(),lineCount));this.html(newHtml.html());};})(jQuery);;
(function($,_,Drupal,drupalSettings){'use strict';$(document).ready(function(){function animateTestimonialQuote($original,$duplicate){if($original.length&&$duplicate.length){const eleWidth=$original.width();if(eleWidth){splitTextAnimation($original,$duplicate);ScrollTrigger.addEventListener("refreshInit",function(){setTimeout(function(){splitTextAnimation($original,$duplicate);},1000);});}}}
const splitTextAnimation=($original,$duplicate)=>{gsap.registerPlugin(ScrollTrigger);const clone=$original.text();const eleWidth=$original.width();$duplicate.text(clone);$duplicate.splitLines({width:eleWidth,tag:'<div class="line">'});const lines=gsap.utils.toArray('.line');lines.forEach(line=>{gsap.fromTo(line,{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"},{scrollTrigger:{trigger:line,scrub:true,start:"0% center",end:"100% center",},clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});});}
$('.testimonial-quote-original').each(function(){const $original=$(this);const $duplicate=$(this).next('.testimonial-quote-duplicate');animateTestimonialQuote($original,$duplicate);});$('[data-toggle="collapse"]').once('testimonialAccordion').on('click',function(e){const thisObj=$(this);setTimeout(function(){const target=$(thisObj).data('target');const selector=target+' .testimonial-quote-original';const $original=$(selector);const $duplicate=$(selector).next('.testimonial-quote-duplicate');animateTestimonialQuote($original,$duplicate);},500);});$('[data-ride="carousel"]').on('slide.bs.carousel',function(){const target=$(this).find('.active > paragraph').attr('id');const selector='#'+target+' .testimonial-quote-original';const $original=$(selector);const $duplicate=$(selector).next('.testimonial-quote-duplicate');animateTestimonialQuote($original,$duplicate);});$('.paragraph--type--bp-tabs .nav-tabs .nav-item').once('testimonialTabs').on('click',function(e){const thisObj=$(this);setTimeout(function(){const target=$(thisObj).find('a').attr('href');const selector=target+' .testimonial-quote-original';const $original=$(selector);const $duplicate=$(selector).next('.testimonial-quote-duplicate');animateTestimonialQuote($original,$duplicate);},300);});});})(window.jQuery,window._,window.Drupal,window.drupalSettings);;
(function($){Drupal.behaviors.techmCookieChecker={attach:function(context,settings){$(()=>{$(document).on("click","#onetrust-accept-btn-handler, #onetrust-reject-all-handler",()=>{location.reload();});});$(()=>{$(document).on("click","#accept-recommended-btn-handler, .ot-pc-refuse-all-handler, .save-preference-btn-handler",()=>{location.reload();});});$(".yt-video a.cookie-preferences").on("click",function(event){event.preventDefault();$(".ot-sdk-show-settings").trigger("click");});$(".popup-cookie-close, .cookie-preferences").click(function(){$("#popupCookieModal").modal("hide");});function getCookie(name){const value=`; ${document.cookie}`;const parts=value.split(`; ${name}=`);if(parts.length===2)return parts.pop().split(';').shift();return null;}
const optanonConsent=getCookie('OptanonConsent');if(optanonConsent){const groupsMatch=optanonConsent.match(/groups=([^&]*)/);if(groupsMatch){const groups=decodeURIComponent(groupsMatch[1]);const groupsArray=groups.split(',').reduce((acc,group)=>{const[key,value]=group.split(':');acc[key]=value;return acc;},{});var optanonCookieValue=drupalSettings.techm_customizations?drupalSettings.techm_customizations.optanonCookieValue:'';if(optanonCookieValue&&Object.keys(optanonCookieValue).length>0){if(groupsArray.hasOwnProperty(optanonCookieValue)){if(groupsArray[optanonCookieValue]!=1){$(".cust-testimonial-img .video-no-play").show();$(".cust-testimonial-img .video-play-icon").hide();$(".testimonial-image .video-no-play").show();$(".testimonial-image .video-play-icon").hide();$(".popup-video-source .video-no-play").show();$(".popup-video-source .video-play-icon").hide();}
else{$(".cust-testimonial-img .video-no-play").hide();$(".cust-testimonial-img .video-play-icon").show();$(".testimonial-image .video-no-play").hide();$(".testimonial-image .video-play-icon").show();$(".popup-video-source .video-no-play").hide();$(".popup-video-source .video-play-icon").show();}}}}}}};})(jQuery);;
