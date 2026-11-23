import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {SPECIAL,specialScore,specialName,specialDescriptor} from '../docs/special.js';
import {attribute,skillPool} from '../docs/rules.js';

test('SPECIAL converts the approved build without changing dice or Destiny; Ling uses the Gunslinger build',async()=>{
 const {character:c}=JSON.parse(await readFile(new URL('../docs/character.json',import.meta.url),'utf8'));
 assert.deepEqual(SPECIAL.map(s=>specialScore(c.attributes[s.key])),[4,6,4,4,6,6,2]);
 assert.deepEqual(SPECIAL.map(s=>s.name),['Strength','Perception','Endurance','Charisma','Intelligence','Agility','Luck']);
 assert.deepEqual(skillPool(c,'Ranged Light'),{ability:1,proficiency:2});
 for (const skill of ['Piloting Air','Piloting Surface']) {
  assert.deepEqual(skillPool(c,skill),{ability:3,proficiency:0});
  const trained=structuredClone(c);trained.skills[skill].rank=1;
  assert.deepEqual(skillPool(trained,skill),{ability:2,proficiency:1});
 }
 assert.equal(attribute(c,'Brawn'),2);assert.equal(c.weapons[0].damage,4);
 assert.equal(c.destinyRemaining,1);assert.equal(c.caps,20);
 assert.equal(specialName('Willpower'),'Endurance');
 assert.equal(specialDescriptor('Agility',4),'Butterfingers');
 assert.equal(specialDescriptor('Agility',5),'Under Control');
 assert.equal(specialDescriptor('Agility',6),'Catlike');
});
