export const ATTRIBUTES=['Brawn','Agility','Intellect','Cunning','Willpower','Presence'];
export const SKILLS=[['Athletics','Brawn'],['Brawl','Brawn'],['Charm','Presence'],['Coercion','Willpower'],['Computers','Intellect'],['Cool','Presence'],['Coordination','Agility'],['Deception','Cunning'],['Discipline','Willpower'],['Gunnery','Agility'],['Leadership','Presence'],['Mechanics','Intellect'],['Medicine','Intellect'],['Melee','Brawn'],['Navigation','Intellect'],['Negotiation','Presence'],['Awareness','Cunning'],['Piloting Air','Cunning'],['Piloting Surface','Cunning'],['Ranged Heavy','Agility'],['Ranged Light','Agility'],['Resilience','Brawn'],['Skulduggery','Cunning'],['Stealth','Agility'],['Streetwise','Cunning'],['Survival','Cunning'],['Vigilance','Willpower'],['Knowledge Education','Intellect'],['Knowledge Lore','Intellect'],['Knowledge Mutants','Intellect'],['Knowledge Pre-War','Intellect'],['Knowledge Underworld','Intellect'],['Knowledge Wasteland','Intellect']];
export const SUITS=[
 {id:'raider',name:'Salvaged / Raider',armour:1,hull:5,system:6,brawn:4,agility:1},
 {id:'t45',name:'T-45',armour:1,hull:7,system:8,brawn:4,agility:1},
 {id:'t51',name:'T-51',armour:2,hull:8,system:8,brawn:4,agility:2},
 {id:'t60',name:'T-60',armour:2,hull:9,system:10,brawn:4,agility:2},
 {id:'enclave',name:'Enclave advanced',armour:3,hull:10,system:12,brawn:5,agility:3}
];
export const CHEMS=[
 {name:'Stimpak',effect:'Heal 5 wounds, then 4, 3, 2, 1 on later doses that day. Track the daily count.',addictive:false},
 {name:'RadAway',effect:'Remove 3 Rads after one in-world hour.',addictive:false},
 {name:'Rad-X',effect:'Two Boost dice on radiation checks for one hour.',addictive:false},
 {name:'Addictol',effect:'Remove all chem dependence.',addictive:false},
 {name:'Med-X',effect:'+2 personal soak for the encounter / five minutes. No vehicle Armour.',addictive:true},
 {name:'Psycho',effect:'+2 personal attack damage for the encounter / five minutes. No vehicle-scale boost.',addictive:true},
 {name:'Jet',effect:'Second maneuver each turn costs no strain. Still two maneuvers maximum.',addictive:true},
 {name:'Buffout',effect:'+1 biological Brawn (maximum 6) for the encounter / five minutes. No wound-threshold change or servo boost.',addictive:true}
];
export const uid=()=>globalThis.crypto.randomUUID();
export function newCharacter(name='New wanderer') {return {
 id:uid(),name,background:'Wasteland wanderer',species:'Human',career:'',specialization:'',location:'',storyDate:'',portrait:'',
 attributes:Object.fromEntries(ATTRIBUTES.map(a=>[a,2])),skills:Object.fromEntries(SKILLS.map(([s])=>[s,{rank:0,career:false}])),
 wounds:0,woundThreshold:12,strain:0,strainThreshold:12,soak:2,defenceMelee:0,defenceRanged:0,rads:0,caps:500,xp:0,totalXp:110,
 luckPlayer:0,luckGM:0,obligation:0,obligationNotes:'',motivation:'',criticalInjuries:'',talents:[],inventory:[],weapons:[],ammo:{},
 power:{profile:'t45',owned:false,equipped:false,powered:false,trained:false,hull:0,system:0,core:'No core installed',criticals:''},
 chems:{active:[],pendingRadAway:0,stimpaks:0,doses:0,dependence:'',withdrawal:false},journal:[],notes:''
};}
export function radPenalty(rads){return rads>=6?4:rads>=3?2:0;}
export function effectiveStrain(c){return Math.max(0,c.strainThreshold-radPenalty(c.rads));}
export function suitFor(c){return SUITS.find(s=>s.id===c.power.profile)||SUITS[1];}
export function suitActive(c){const s=suitFor(c);return c.power.owned&&c.power.equipped&&c.power.powered&&c.power.hull<=s.hull&&c.power.system<=s.system;}
export function attribute(c,key,biological=false){let n=c.attributes[key];if(key==='Brawn'&&c.chems.active.includes('Buffout'))n=Math.min(6,n+1);if(!biological&&suitActive(c)){const s=suitFor(c);if(key==='Brawn')return s.brawn;if(key==='Agility')return c.power.trained?Math.max(n,s.agility):s.agility;}return n;}
export function skillCharacteristic(c,name){return name==='Melee'&&c.talents.some(t=>t.name==='Blade Technique'&&t.rank>0)?'Agility':SKILLS.find(s=>s[0]===name)?.[1]||'Intellect';}
export function skillPool(c,name){const a=skillCharacteristic(c,name);const characteristic=attribute(c,a,name==='Resilience');const rank=c.skills[name]?.rank||0;return {ability:Math.abs(characteristic-rank),proficiency:Math.min(characteristic,rank)};}
export function hullDamage(damage,armour,pierce=0,breach=0,scale='personal'){const remaining=Math.max(0,armour-breach-Math.floor(pierce/10));return Math.max(0,scale==='vehicle'?Math.floor(damage-remaining):Math.ceil((damage-10*remaining)/10));}
export function fireWeapon(c,id,auto=false){const w=c.weapons.find(w=>w.id===id);if(!w)throw Error('Weapon not found.');if(['Melee','Brawl'].includes(w.skill))throw Error('Melee attacks do not spend ammunition.');const cost=auto?10:w.cost||1;if(auto&&!w.auto)throw Error('This weapon does not have Auto-fire.');if(w.loaded<cost)throw Error(`Needs ${cost} ${w.ammo} loaded.`);w.loaded-=cost;return cost;}
export function reloadWeapon(c,id){const w=c.weapons.find(w=>w.id===id);if(!w)throw Error('Weapon not found.');const reserve=c.ammo[w.ammo]||0;const n=Math.min(w.capacity-w.loaded,reserve,w.reload==='individual'?2:Infinity);if(n<=0)throw Error('Magazine full or no matching ammunition in reserve.');w.loaded+=n;c.ammo[w.ammo]=reserve-n;return n;}
export function quote(item,quantity=1,scarcity=1,discount=0){if(item.shop==null)throw Error('No routine shop price; agree a price with the GM.');return Math.ceil(item.shop*quantity*scarcity*(1-Math.min(.2,Math.max(0,discount))));}
export function buy(c,item,quantity=1,scarcity=1,discount=0){const price=quote(item,quantity,scarcity,discount);if(c.caps<price)throw Error('Not enough caps.');c.caps-=price;if(item.category==='Ammunition')c.ammo[item.name]=(c.ammo[item.name]||0)+quantity;else{const existing=c.inventory.find(x=>x.catalogueId===item.id&&x.location==='On you');if(existing)existing.quantity+=quantity;else c.inventory.push({id:uid(),catalogueId:item.id,name:item.name,category:item.category,quantity,location:'On you',value:item.value,notes:''});}return price;}
export function sell(c,id,quantity=1){const item=c.inventory.find(i=>i.id===id);if(!item||item.quantity<quantity)throw Error('Not enough items.');const price=Math.floor(item.value*quantity/2);item.quantity-=quantity;c.caps+=price;c.inventory=c.inventory.filter(i=>i.quantity>0);return price;}
export function useChem(c,name){const chem=CHEMS.find(x=>x.name===name);if(!chem)throw Error('No campaign rule for that chem.');const item=c.inventory.find(i=>i.name.toLowerCase()===name.toLowerCase()&&i.location==='On you'&&i.quantity>0);if(!item)throw Error(`No ${name} carried. Add or buy a dose first.`);item.quantity--;c.inventory=c.inventory.filter(i=>i.quantity>0);if(name==='Stimpak'){c.wounds=Math.max(0,c.wounds-Math.max(0,5-c.chems.stimpaks));c.chems.stimpaks++;}else if(name==='RadAway')c.chems.pendingRadAway++;else if(name==='Addictol'){c.chems.dependence='';c.chems.withdrawal=false;}else if(!c.chems.active.includes(name))c.chems.active.push(name);if(chem.addictive){c.chems.doses++;if(c.chems.dependence.toLowerCase().includes(name.toLowerCase()))c.chems.withdrawal=false;}return chem.effect;}
export function validateCharacter(c){
 const num=(v,min=0,max=100000000)=>Number.isFinite(v)&&Number.isInteger(v)&&v>=min&&v<=max;
 const str=(v,max=50000)=>typeof v==='string'&&v.length<=max;
 const safeId=v=>typeof v==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(v);
 if(!safeId(c?.id))throw Error('Invalid record ID.');
 if(!c||typeof c!=='object'||!str(c.id,100)||!str(c.name,200)||!c.name.trim())throw Error('Invalid character identity.');
 for(const a of ATTRIBUTES)if(!num(c.attributes?.[a],1,6))throw Error('Characteristics must be 1–6.');
 for(const [s] of SKILLS)if(!num(c.skills?.[s]?.rank,0,5)||typeof c.skills[s].career!=='boolean')throw Error('Invalid skill ranks.');
 for(const key of ['wounds','woundThreshold','strain','strainThreshold','soak','defenceMelee','defenceRanged','rads','caps','xp','totalXp','luckPlayer','luckGM','obligation'])if(!num(c[key]))throw Error(`Invalid ${key}.`);
 for(const key of ['background','species','career','specialization','location','storyDate','obligationNotes','motivation','criticalInjuries','notes'])if(!str(c[key]))throw Error(`Invalid ${key}.`);
 if(!str(c.portrait,3000000)||c.portrait&&!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(c.portrait))throw Error('Invalid portrait.');
 if(!c.power||!SUITS.some(s=>s.id===c.power.profile)||!num(c.power.hull)||!num(c.power.system)||!str(c.power.core)||!str(c.power.criticals))throw Error('Invalid power armour.');
 for(const k of ['owned','equipped','powered','trained'])if(typeof c.power[k]!=='boolean')throw Error('Invalid power armour state.');
 if(!c.chems||!Array.isArray(c.chems.active)||c.chems.active.some(n=>!CHEMS.some(x=>x.name===n))||!num(c.chems.pendingRadAway)||!num(c.chems.stimpaks)||!num(c.chems.doses)||!str(c.chems.dependence)||typeof c.chems.withdrawal!=='boolean')throw Error('Invalid chem state.');
 if(!c.ammo||typeof c.ammo!=='object'||Array.isArray(c.ammo)||Object.entries(c.ammo).some(([k,v])=>!str(k,200)||['__proto__','constructor','prototype'].includes(k)||!num(v)))throw Error('Invalid ammunition.');
 for(const key of ['inventory','weapons','journal','talents'])if(!Array.isArray(c[key])||c[key].length>3000)throw Error(`Invalid ${key}.`);
 for(const key of ['inventory','weapons','journal','talents'])if(c[key].some(x=>!safeId(x?.id))||new Set(c[key].map(x=>x.id)).size!==c[key].length)throw Error(`Invalid or duplicate ${key} IDs.`);
 for(const i of c.inventory)if(!str(i.id,100)||!str(i.name,200)||!str(i.category,100)||!str(i.location,200)||!str(i.notes)||!num(i.quantity)||!num(i.value))throw Error('Invalid inventory item.');
 for(const w of c.weapons)if(!str(w.id,100)||!str(w.name,200)||!str(w.ammo,200)||['__proto__','constructor','prototype'].includes(w.ammo)||!num(w.capacity,['Melee','Brawl'].includes(w.skill)?0:1,10000)||!num(w.loaded,0,w.capacity)||!num(w.cost,['Melee','Brawl'].includes(w.skill)?0:1,10000)||!num(w.damage)||!num(w.crit,1,10)||!str(w.skill,100)||!str(w.range,100)||!str(w.qualities)||!['personal','vehicle'].includes(w.scale)||!['magazine','individual'].includes(w.reload)||typeof w.auto!=='boolean')throw Error('Invalid weapon card.');
 for(const j of c.journal)if(!str(j.id,100)||!str(j.title,200)||!str(j.date,200)||!str(j.body))throw Error('Invalid journal entry.');
 for(const t of c.talents)if(!str(t.id,100)||!str(t.name,200)||!str(t.notes)||!num(t.rank,1,100)||!num(t.cost))throw Error('Invalid talent.');
 return c;
}
