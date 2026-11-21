(()=>{
'use strict';
// A transparent, fictional decision model; controls simulate independent gates rather than scoring an actual pull request.
const branches={
 automatic:{authority:'AI decides',base:'The AI assessment is treated as authorization. Speed improves, but favorable classification alone is not independent approval.',question:'Who granted this AI identity authority to approve production-bound changes?'},
 human:{authority:'Human decides',base:'A qualified human decides on the merge. Automation can still prepare context, route review, and enforce objective checks.',question:'What evidence and routing could make the human decision faster without replacing it?'},
 conditional:{authority:'Policy-bound',base:'Automation can be eligible only when every declared independent safeguard and scope condition is satisfied.',question:'Who owns the eligibility policy and how is enforcement separated from the AI assessment?'}
};
const scenarios={
 standard:{label:'Standard low-risk change',failure:null},
 excluded:{label:'Sensitive file changed',failure:'scope'},
 revision:{label:'Approval bound to old commit',failure:'binding'},
 telemetry:{label:'Monitoring signal unavailable',failure:'monitor'}
};
const buttons=[...document.querySelectorAll('.decision-option')],nodes=[...document.querySelectorAll('.flow-node')];
const toggles=[...document.querySelectorAll('[data-gate]')];
const $=id=>document.getElementById(id);
let selected='conditional';
const put=(id,v)=>$(id).textContent=v;
function updateLab(){
 const branch=branches[selected];const scenario=scenarios[$('lab-scenario').value];const enabled=Object.fromEntries(toggles.map(e=>[e.dataset.gate,e.checked]));
 const missing=Object.keys(enabled).filter(k=>!enabled[k]);const failure=scenario.failure;
 let state='conditional',label='CONDITIONALLY ELIGIBLE',outcome='May proceed',next='Validate gate evidence',title='Conditional authorization requires independent enforcement.',detail=branch.base;
 if(selected==='human'){
  state='human';label='HUMAN AUTHORIZATION REQUIRED';outcome='Await human review';next='Route to approver';title='Accountability stays with the human reviewer.';
  detail=branch.base+(failure?' The scenario contains a signal requiring human investigation.':'' );
  if(failure==='scope'||failure==='binding'){outcome='Hold / investigate';next='Resolve change condition'}
 } else if(selected==='automatic'){
  state='automatic';label='UNBOUNDED AUTHORITY — NOT JUSTIFIED';outcome='Not authorized';next='Redesign authority';title='The model verdict is not approval authority.';
  detail=branch.base+' Required gates cannot make an unlimited delegation acceptable by themselves.';
 } else if(missing.length||failure){
  state='blocked';label='BLOCKED / FAIL CLOSED';outcome='Merge blocked';next='Restore or escalate';title='The automated path must stop.';
  const problem=failure?({scope:'This change touches excluded sensitive scope.',binding:'The approval is not bound to the current revision.',monitor:'The monitoring signal is unavailable.'})[failure]:'';
  detail=(problem?problem+' ':'')+(missing.length?'Safeguards disabled: '+missing.join(', ')+'. ':'')+'Do not infer eligibility from the AI risk score; stop the automated merge and escalate for resolution.';
 }
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.choice===selected)));
 $('lab-verdict').dataset.state=state;put('lab-verdict-text',label);put('response-title',title);put('response-description',detail);put('response-question',branch.question);put('lab-authority',branch.authority);put('lab-outcome',outcome);put('lab-next',next);
 const active=selected==='automatic'?[0]:selected==='human'?[0,1]:(state==='blocked'?[0,1]:[0,1,2]);nodes.forEach((node,i)=>node.classList.toggle('active',active.includes(i)));
}
buttons.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.choice;updateLab()}));
$('lab-scenario').addEventListener('change',updateLab);toggles.forEach(t=>t.addEventListener('change',updateLab));
$('reset-decision').addEventListener('click',()=>{selected='conditional';$('lab-scenario').value='standard';toggles.forEach(t=>t.checked=true);updateLab()});updateLab();
})();