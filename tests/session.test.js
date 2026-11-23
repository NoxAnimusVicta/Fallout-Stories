import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateCharacter,skillPool,fireWeapon,reloadWeapon} from '../docs/rules.js';
import {talentColumns} from '../docs/class-reference.js';
const load=async()=>JSON.parse(await readFile(new URL('../docs/character.json',import.meta.url),'utf8'));
test('Ling opens with a valid 110 XP human Gunslinger build and no inherited progress',async()=>{
 const {character:c}=await load();validateCharacter(c);
 assert.equal(c.name,'Ling');assert.equal(c.career,'Smuggler');assert.equal(c.specialization,'Gunslinger');
 assert.equal(c.session.status,'not-started');assert.equal(c.session.earnedXp,0);assert.equal(c.xp,0);
 assert.equal(c.creationLedger.reduce((n,e)=>n+e.cost,0),110);
 assert.equal(c.totalXp-c.session.spentXp,c.xp);assert.equal(c.xpLedger.length,0);
 assert.equal(Object.values(c.skills).reduce((n,s)=>n+s.rank,0),9);
 assert.deepEqual(skillPool(c,'Ranged Light'),{ability:1,proficiency:2});
 assert.deepEqual(skillPool(c,'Melee'),{ability:2,proficiency:0});
 for(const name of ['Mechanics','Survival']){assert.equal(c.skills[name].career,false);assert.equal(c.skills[name].rank,1);}
 const nodes=new Set(c.acquiredTalentNodes);let xp=0;
 for(const node of nodes){const col='ABCD'.indexOf(node[0]),row=Number(node[1])-1;if(row)assert.ok(nodes.has(node[0]+row));xp+=(row+1)*5;assert.ok(c.talents.some(t=>t.name===talentColumns[col][row].name));}
 assert.equal(xp,10);assert.deepEqual([...nodes].sort(),['B1','D1']);
 assert.equal(talentColumns[3][1].name,'Improved Quick Draw');assert.equal(talentColumns[2][3].name,'Guns Blazing');
 assert.equal(c.woundThreshold,12);assert.equal(c.strainThreshold,12);assert.equal(c.strain,0);assert.equal(c.recoveryLog.length,0);
 assert.equal(c.destinyRemaining,1);assert.equal(c.criticalInjuries,'');assert.equal(c.power.owned,false);
 assert.ok(c.portrait.startsWith('data:image/jpeg;base64,'));
});
test('two pistols consume separate magazines and share exactly twelve reserve rounds',async()=>{
 const {character:c}=await load();assert.equal(c.caps,20);assert.equal(c.weapons.length,2);
 const total=()=>c.weapons.reduce((n,w)=>n+w.loaded,0)+c.ammo['.38 Round'];assert.equal(total(),36);
 for(const w of c.weapons){assert.equal(w.loaded,12);assert.equal(w.capacity,12);assert.equal(w.damage,4);assert.equal(w.crit,5);fireWeapon(c,w.id);}
 assert.equal(total(),34);for(const w of c.weapons)reloadWeapon(c,w.id);assert.equal(total(),34);assert.equal(c.ammo['.38 Round'],10);
});
test('public projection is read-only and excludes prior campaign and private payloads',async()=>{
 const app=await readFile(new URL('../docs/app.js',import.meta.url),'utf8');const record=await load();
 for(const term of ['editCharacter','editSkills','editTalent','localStorage','setItem(','Ronin','Wandering Blade'])assert.equal(app.includes(term),false,term);
 assert.deepEqual(Object.keys(record).sort(),['character','release','version']);assert.equal(record.release,'ling-3.0.0');
 const publicText=JSON.stringify({...record.character,portrait:''});
 for(const term of ['Ronin','Hamilton','Elena','narrator','private/','human rules'])assert.equal(publicText.includes(term),false,term);
});
