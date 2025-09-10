// Animate body gradient for theme switch
function animateBodyGradient(toDark) {
  const body = document.body;
  if (toDark) {
    body.style.background = 'linear-gradient(to bottom, #f8fafc 0%, #1a2332 100%)';
    setTimeout(() => {
      document.documentElement.classList.add('dark');
      body.style.background = '';
    }, 1000);
  } else {
    body.style.background = 'linear-gradient(to bottom, #1a2332 0%, #f8fafc 100%)';
    setTimeout(() => {
      document.documentElement.classList.remove('dark');
      body.style.background = '';
    }, 1000);
  }
}

// Replace GSAP theme toggle logic with gradient animation
$("#day").off('click').on('click', function(){
  animateBodyGradient(true);
  gsap.to("#sun", 1, {x: -157, opacity: 0, ease: "power1.inOut"});
  gsap.to("#cloud", .5, {opacity: 0, ease: "power1.inOut"});
  gsap.to("#moon", 1, {x: -157, rotate: -360, transformOrigin: "center", opacity: 1, ease: "power1.inOut"});
  gsap.to(".star", .5, {opacity: 1, ease: "power1.inOut"});
  gsap.to("#night", 1, {background: "#224f6d", borderColor: "#cad4d8", ease: "power1.inOut"});
  gsap.to("#background", 1, {background: "#0d1f2b", ease: "power1.inOut"});
  $(this).css({"pointer-events": "none"});
  setTimeout(function(){
    $("#night").css({"pointer-events": "all"})
  }, 1000);
});
$("#night").off('click').on('click', function(){
  animateBodyGradient(false);
  gsap.to("#sun", 1, {x: 15, opacity: 1, ease: "power1.inOut"});
  gsap.to("#cloud", 1, {opacity: 1, ease: "power1.inOut"});
  gsap.to("#moon", 1, {opacity: 0, x: 35, rotate: 360, transformOrigin: "center", ease: "power1.inOut"});
  gsap.to(".star", 1, {opacity: 0, ease: "power1.inOut"});
  gsap.to("#night", 1, {background: "#9cd6ef", borderColor: "#65c0e7", ease: "power1.inOut"});
  gsap.to("#background", 1, {background: "#d3edf8", ease: "power1.inOut"});
  $(this).css({"pointer-events": "none"});
  setTimeout(function(){
    $("#day").css({"pointer-events": "all"})
  }, 1000);
});
