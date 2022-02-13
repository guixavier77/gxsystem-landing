
function initAnimacaoScroll() {
  const sections = document.querySelectorAll('[data-anime="scroll"]');
  if(sections.length) {
    const windowMetade = window.innerHeight * 0.6;

    function animaScroll() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const isSectionVisible = (sectionTop - windowMetade) < 0;
        if(isSectionVisible){
          section.classList.add('ativo');
        } 
        else if(section.classList.contains('ativo')){
          section.classList.remove('ativo');
        }
      })
    }
    animaScroll();
    window.addEventListener('scroll', animaScroll);
  }
}
function initMenuMobile(){
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const eventos = ['click', 'touchstart'];
  if(menuButton){
    function openMenu(event){
      menuList.classList.add('active');
      menuButton.classList.add('active');
      outsideClick(menuList,eventos,()=>{
        menuList.classList.remove('active');
        menuButton.classList.remove('active');
      });
    }
    eventos.forEach((evento)=>{
      menuButton.addEventListener(evento,openMenu);
    });
  }  
}

function outsideClick(element,events,callback){
  const html = document.documentElement;
  const outside = 'data-outside';

  if(!element.hasAttribute(outside)){
    events.forEach(userEvent =>{
      setTimeout(() =>{
        html.addEventListener(userEvent, handleOutsideClick);
      });
    })
    
    element.setAttribute(outside, '');
  }
  function handleOutsideClick(event){
    if(!element.contains(event.target)){
      element.removeAttribute(outside);
      events.forEach(userEvent =>{
        html.removeEventListener(userEvent, handleOutsideClick);
      })
      callback();
    }
  }
}


initAnimacaoScroll();
initMenuMobile();