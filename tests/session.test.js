import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateCharacter,skillPool,fireWeapon,reloadWeapon} from '../docs/rules.js';
import {talentColumns} from '../docs/class-reference.js';
const load=async()=>JSON.parse(await readFile(new URL('../docs/character.json',import.meta.url),'utf8'));
test('Ling opens with a valid 110 XP human Gunslinger build and reconciled Session 1 progress',async()=>{
 const {character:c}=await load();validateCharacter(c);
 assert.equal(c.name,'Ling');assert.equal(c.career,'Smuggler');assert.equal(c.specialization,'Gunslinger');
 assert.equal(c.session.status,'complete');assert.equal(c.session.earnedXp,10);assert.equal(c.xp,10);
 assert.equal(c.creationLedger.reduce((n,e)=>n+e.cost,0),110);
 assert.equal(c.totalXp-c.session.spentXp,c.xp);assert.equal(c.xpLedger.length,1);
 assert.equal(Object.values(c.skills).reduce((n,s)=>n+s.rank,0),9);
 assert.deepEqual(skillPool(c,'Ranged Light'),{ability:1,proficiency:2});
 assert.deepEqual(skillPool(c,'Melee'),{ability:2,proficiency:0});
 for(const name of ['Mechanics','Survival']){assert.equal(c.skills[name].career,false);assert.equal(c.skills[name].rank,1);}
 const nodes=new Set(c.acquiredTalentNodes);let xp=0;
 for(const node of nodes){const col='ABCD'.indexOf(node[0]),row=Number(node[1])-1;if(row)assert.ok(nodes.has(node[0]+row));xp+=(row+1)*5;assert.ok(c.talents.some(t=>t.name===talentColumns[col][row].name));}
 assert.equal(xp,10);assert.deepEqual([...nodes].sort(),['B1','D1']);
 assert.equal(talentColumns[3][1].name,'Improved Quick Draw');assert.equal(talentColumns[2][3].name,'Guns Blazing');
 assert.equal(c.woundThreshold,12);assert.equal(c.strainThreshold,12);assert.equal(c.strain,3);assert.equal(c.recoveryLog.length,2);
 assert.equal(c.destinyRemaining,1);assert.equal(c.criticalInjuries,'');assert.equal(c.power.owned,false);
 assert.ok(c.portrait.startsWith('data:image/jpeg;base64,'));
});
test('two pistols consume separate magazines and share sixteen reserve rounds',async()=>{
 const {character:c}=await load();assert.equal(c.caps,170);assert.equal(c.weapons.length,2);
 const total=()=>c.weapons.reduce((n,w)=>n+w.loaded,0)+c.ammo['.38 Round'];assert.equal(total(),26);
 for(const w of c.weapons){assert.equal(w.loaded,5);assert.equal(w.capacity,5);assert.equal(w.damage,4);assert.equal(w.crit,5);fireWeapon(c,w.id);}
 assert.equal(total(),24);for(const w of c.weapons)reloadWeapon(c,w.id);assert.equal(total(),24);assert.equal(c.ammo['.38 Round'],14);
});
test('public projection is read-only and excludes prior campaign and private payloads',async()=>{
 const app=await readFile(new URL('../docs/app.js',import.meta.url),'utf8');const record=await load();
 for(const term of ['editCharacter','editSkills','editTalent','localStorage','setItem(','Ronin','Wandering Blade'])assert.equal(app.includes(term),false,term);
 assert.deepEqual(Object.keys(record).sort(),['character','release','version']);assert.equal(record.release,'ling-3.1.0');
 const publicText=JSON.stringify({...record.character,portrait:''});
 for(const term of ['Ronin','Hamilton','Elena','narrator','private/','human rules'])assert.equal(publicText.includes(term),false,term);
});

test("session award is unique and resources match the bedtime ledger",async()=>{const {character:c}=await load();assert.equal(c.wounds,3);assert.equal(c.earnedXp,10);assert.equal(c.xpLedger.reduce((n,e)=>n+e.amount,0),10);assert.equal(new Set(c.xpLedger.map(e=>e.id)).size,c.xpLedger.length);assert.equal(c.caps,20-1+23+34-36+200-70);assert.equal(c.ammo[".38 Round"]+c.weapons.reduce((n,w)=>n+w.loaded,0),36-10);assert.ok(c.healthNotes.includes("not completed"));for(const w of c.weapons){assert.equal(w.reload,"internal magazine");assert.equal(w.action,"Semiautomatic");assert.equal(w.auto,false);}});
