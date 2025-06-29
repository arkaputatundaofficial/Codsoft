AOS.init({
    duration: 1000,
    once: true,
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message!');
    this.reset();
}); 
