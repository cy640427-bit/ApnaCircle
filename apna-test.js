let events=[];
try{events=JSON.parse(localStorage.getItem('apna-events')||'[]')}catch(e){}
let selected='all';
function save(){localStorage.setItem('apna-events',JSON.stringify(events))}
function render(){
let list=document.getElementById('list');
let filtered=selected==='all'?events:events.filter(e=>e.type===selected);
list.innerHTML=filtered.length?'':'<p>Abhi koi activity nahi. Pehli activity tum banao!</p>';
filtered.forEach(e=>{
let card=document.createElement('div');card.className='card';
let title=document.createElement('h3');title.textContent=e.type+' '+e.name;
let details=document.createElement('p');details.textContent='🕒 '+e.time+' · 📍 '+e.place;
let small=document.createElement('small');small.textContent=e.joined?'Tum interested ho':'Apne area mein naye logon se milo';
let btn=document.createElement('button');btn.textContent=e.joined?'✓ Interested':'Join activity';
btn.onclick=()=>{e.joined=!e.joined;save();render()};
card.append(title,details,small,btn);list.append(card);
});
}
function addActivity(){
let name=document.getElementById('name').value.trim();
let time=document.getElementById('time').value.trim();
let place=document.getElementById('place').value.trim();
if(!name||!time||!place){alert('Naam, time aur jagah bharo');return}
events.unshift({id:Date.now(),name,time,place,type:document.getElementById('type').value,joined:false});
save();render();
document.getElementById('name').value='';
document.getElementById('time').value='';
document.getElementById('place').value='';
alert('Activity create ho gayi!');
}
function filter(type){selected=type;render()}
render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
