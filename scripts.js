// Menu / header com mudança ao rolar

const header = document.querySelector(".header");


window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "#121212";

    } else {

        header.style.background = "rgba(18,18,18,0.8)";

    }

});




// Animação simples de entrada

const observer = new IntersectionObserver(
(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},
{
    threshold:.15
});



document.querySelectorAll(
".section, .card, .project"
)
.forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.numbers-grid strong');
  const section = document.querySelector('.numbers');

  // Função responsável por fazer a contagem
  const animateNumbers = () => {
    counters.forEach(counter => {
      // Pega o texto original (ex: "+20", "100%", "+09")
      const originalText = counter.innerText;
      
      // Usa Expressão Regular para separar: prefixo, número e sufixo
      const match = originalText.match(/([^0-9]*)([0-9]+)([^0-9]*)/);
      if (!match) return; // Se não achar número, ignora

      const prefix = match[1]; // Ex: "+"
      const target = parseInt(match[2], 10); // Ex: 20
      const suffix = match[3]; // Ex: "%"
      
      // Checa se o número original tinha zero à esquerda (ex: "09")
      const padding = match[2].length;
      const hasLeadingZero = match[2].startsWith('0');

      // Tempo de duração da animação em milissegundos (2 segundos)
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        // Calcula o progresso (vai de 0 a 1)
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing: Faz a animação começar rápida e terminar suave (Ease Out Quarte)
        const easeOutProgress = 1 - Math.pow(1 - progress, 4);
        
        let currentNum = Math.floor(easeOutProgress * target);
        let displayNum = currentNum.toString();

        // Mantém o zero à esquerda, se existir (ex: "01", "02" ... "09")
        if (hasLeadingZero) {
          displayNum = displayNum.padStart(padding, '0');
        }

        // Atualiza o HTML com o prefixo, número atual e sufixo
        counter.innerText = `${prefix}${displayNum}${suffix}`;

        // Se o progresso não chegou ao fim, pede o próximo frame
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Garante que o número final seja exatamente o do HTML
          counter.innerText = originalText;
        }
      };

      // Inicia a animação deste contador
      requestAnimationFrame(updateCounter);
    });
  };

  // Observador de rolagem (Intersection Observer)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      // Quando a seção entrar na tela
      if (entry.isIntersecting) {
        animateNumbers();
        // Para de observar para animar apenas uma vez
        obs.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.5 // Só ativa quando 50% da seção estiver aparecendo na tela
  });

  if (section) {
    observer.observe(section);
  }
});