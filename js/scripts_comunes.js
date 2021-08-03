// BOTON DE IR ARRIBA
window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        document.querySelector('.go-top-container').classList.add('showed');
    } else { document.querySelector('.go-top-container').classList.remove('showed');}
}
document.querySelector('.go-top-container').addEventListener('click', () =>{
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    })
});

