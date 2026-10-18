'use strict';
const shareButton = document.querySelector('.share');
const toast = document.getElementById('toast');
let toastTimer;
function notify(message) { toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000); }
shareButton.addEventListener('click', async () => {
 const url = document.querySelector('link[rel="canonical"]').href;
 const data = { title: 'Fruty Açaí · Menú en Banfield', text: 'Elegí tu Fruty: vasos de açaí de 500 ml a $16.900.', url };
 try {
  if (navigator.share) { await navigator.share(data); return; }
  if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(url); notify('¡Link copiado! Pegalo en tu grupo.'); return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(data.text + ' ' + url), '_blank', 'noopener');
 } catch (error) {
  if (error.name !== 'AbortError') notify('Podés compartir el link desde la barra del navegador.');
 }
});
