const D = window.DATA;
const PAGES = [["index.html","Home"],["systems.html","My Systems"],["forms.html","Forms"],["people.html","People"],
  ["policies.html","Policies"],["work.html","How We Work"],["training.html","Training"]];
const $ = (s,r=document)=>r.querySelector(s);
const el = (h)=>{const t=document.createElement("template");t.innerHTML=h.trim();return t.content.firstChild;};

function shell(){
  const cur = location.pathname.split("/").pop() || "index.html";
  document.body.prepend(el(`<header class="top"><a class="brand" href="index.html">${D.company}<span>.</span></a>
    <nav>${PAGES.map(([h,n])=>`<a href="${h}" class="${h===cur?"on":""}">${n}</a>`).join("")}</nav></header>`));
  document.body.append(el(`<footer>Internal only · Embed, never retype · Seven pages, never more.</footer>`));
}
function tabs(names, render){
  const bar = el(`<div class="tabs">${names.map((n,i)=>`<button data-i="${i}">${n}</button>`).join("")}</div>`);
  const body = el(`<div class="tabbody"></div>`);
  const show = i=>{[...bar.children].forEach((b,j)=>b.classList.toggle("on",i===j)); body.innerHTML=render(names[i]);};
  bar.onclick = e=>{const b=e.target.closest("button"); if(b){show(+b.dataset.i); history.replaceState(null,"","#"+names[+b.dataset.i].toLowerCase().split(" ")[0]);}};
  const start = Math.max(0,names.findIndex(n=>"#"+n.toLowerCase().split(" ")[0]===location.hash.toLowerCase()));
  show(start); return [bar,body];
}
const table = (head,rows)=>`<div class="scroll"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const chip = (t,c="")=>`<span class="chip ${c}">${t}</span>`;
const formLink = n=>`<a class="btn" href="#" title="Link to Google Form: ${n}">${n}</a>`;
document.addEventListener("DOMContentLoaded",()=>{shell(); (window.page||(()=>{}))();});
