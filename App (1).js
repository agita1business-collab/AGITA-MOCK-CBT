import { useState, useEffect, useCallback } from "react";

const ADMIN_PASSWORD = "agita_admin_2026";
const TOTAL_SECS = 7200;

const CFG = {
  English:     { c:"#b45309", l:"#fef3c7", i:"📖" },
  Mathematics: { c:"#0369a1", l:"#e0f2fe", i:"📐" },
  Physics:     { c:"#1565c0", l:"#dbeafe", i:"⚡" },
  Chemistry:   { c:"#065f46", l:"#d1fae5", i:"🧪" },
  Biology:     { c:"#581c87", l:"#ede9fe", i:"🧬" },
};

const COMBOS = [
  { label:"Physics, Chemistry & Biology",     sciences:["Physics","Chemistry","Biology"] },
  { label:"Physics, Chemistry & Mathematics", sciences:["Mathematics","Physics","Chemistry"] },
  { label:"Physics, Biology & Mathematics",   sciences:["Mathematics","Physics","Biology"] },
  { label:"Chemistry, Biology & Mathematics", sciences:["Mathematics","Chemistry","Biology"] },
  { label:"Economics, Government & Literature",sciences:["Physics","Chemistry","Biology"] },
];

const PASSAGE = `The increasing rate of rural-urban migration in Nigeria has created a paradox that continues to puzzle economists and social scientists alike. On one hand, cities have expanded dramatically, with Lagos alone absorbing millions of migrants over the past three decades. On the other hand, the agricultural sector, which once formed the backbone of Nigeria's economy, has suffered a significant decline in the quality and quantity of its workforce.

The motivations behind this mass movement are not difficult to understand. Rural dwellers, faced with inadequate infrastructure, poor healthcare facilities, and limited educational opportunities, are naturally attracted to the perceived prosperity of city life. The city, with its glittering lights and apparent promise of upward mobility, becomes an irresistible magnet for the ambitious and the desperate alike.

However, the reality that confronts most migrants upon arrival is far removed from their expectations. The urban centres, already strained beyond capacity, cannot absorb the unrelenting influx of job-seekers. Unemployment soars, slums proliferate, and social vices multiply. The migrant who dreamed of a better life often finds himself trapped in a cycle of poverty that is, in many ways, more degrading than the rural hardship he sought to escape.

Successive governments have attempted to reverse this trend through various rural development programmes. These initiatives, however well-intentioned, have largely failed because they did not address the fundamental issue: the profound inequality between rural and urban areas in access to basic amenities and economic opportunities. Until this inequality is systematically dismantled, the rural exodus will continue unabated, and Nigeria's agricultural potential will remain largely unrealised.`;

const QB = {
  English: [
    // ── Q1–Q10: COMPREHENSION ────────────────────────────────────────────────
    { id:"E1",  s:"English", t:"Comprehension", isComp:true,
      q:"According to the passage, which best describes the paradox of rural-urban migration in Nigeria?",
      opts:["Cities grow while the nation prospers","Cities expand while the agricultural workforce declines","Migrants improve their lives while farmers suffer","Rural areas develop while cities struggle"],
      ans:1, sol:"The paradox: cities expand dramatically (positive) yet the agricultural sector suffers significant decline (negative). Both happening simultaneously is the contradiction." },
    { id:"E2",  s:"English", t:"Comprehension", isComp:true,
      q:"As used in the passage, the word 'paradox' (paragraph 1) most nearly means:",
      opts:["A difficult problem with no solution","A situation with two contradictory outcomes that are both true","A simple misunderstanding","An economic theory"],
      ans:1, sol:"Paradox = a seemingly contradictory situation that is nevertheless true. Cities expanding AND agriculture declining simultaneously is the paradox." },
    { id:"E3",  s:"English", t:"Comprehension", isComp:true,
      q:"According to the passage, what makes the city attractive to rural dwellers?",
      opts:["Lower cost of living","Availability of farmland near cities","Inadequate rural infrastructure, poor healthcare and limited education","Government incentive programmes"],
      ans:2, sol:"Paragraph 2: 'rural dwellers, faced with inadequate infrastructure, poor healthcare facilities, and limited educational opportunities, are naturally attracted to the perceived prosperity of city life.'" },
    { id:"E4",  s:"English", t:"Comprehension", isComp:true,
      q:"The phrase 'irresistible magnet' (paragraph 2) is a figure of speech known as:",
      opts:["Simile","Personification","Metaphor","Hyperbole"],
      ans:2, sol:"'The city becomes an irresistible magnet' — comparing the city to a magnet WITHOUT using 'like' or 'as' = metaphor. A simile would use 'like' or 'as'." },
    { id:"E5",  s:"English", t:"Comprehension", isComp:true,
      q:"What does the passage say about the reality migrants face upon arrival in cities?",
      opts:["They find good jobs and better conditions","They are welcomed by government housing","They face unemployment, slums and social vices — worse than the rural poverty they fled","They successfully send money back to their villages"],
      ans:2, sol:"Paragraph 3: 'unemployment soars, slums proliferate, social vices multiply...trapped in a cycle of poverty more degrading than the rural hardship he sought to escape.'" },
    { id:"E6",  s:"English", t:"Comprehension", isComp:true,
      q:"The word 'proliferate' (paragraph 3) most nearly means:",
      opts:["Disappear gradually","Increase rapidly in number","Become organised","Cause problems"],
      ans:1, sol:"Proliferate = to increase rapidly and spread widely. 'Slums proliferate' = slums multiply and spread at a fast rate." },
    { id:"E7",  s:"English", t:"Comprehension", isComp:true,
      q:"According to the passage, why have government rural development programmes largely failed?",
      opts:["They were poorly funded","They trained farmers who then migrated","They did not address the fundamental inequality between rural and urban areas","They only covered the south"],
      ans:2, sol:"Paragraph 4: programmes 'failed because they did not address the fundamental issue: the profound inequality between rural and urban areas in access to basic amenities and economic opportunities.'" },
    { id:"E8",  s:"English", t:"Comprehension", isComp:true,
      q:"The word 'unabated' (paragraph 4) most nearly means:",
      opts:["Slowly","Without any reduction in force or intensity","Permanently stopped","Gradually increasing"],
      ans:1, sol:"Unabated = without any reduction in intensity or force. 'The rural exodus will continue unabated' = will keep going at full force without slowing down." },
    { id:"E9",  s:"English", t:"Comprehension", isComp:true,
      q:"The writer's overall attitude towards the situation can best be described as:",
      opts:["Optimistic and encouraging","Neutral and purely factual","Critical and concerned","Dismissive and indifferent"],
      ans:2, sol:"The writer is critical (blaming governments, inequality) and concerned (about agriculture, migrants). Words like 'largely failed', 'degrading', 'unrealised' signal critical concern." },
    { id:"E10", s:"English", t:"Comprehension", isComp:true,
      q:"Which best summarises the main argument of the passage?",
      opts:["City life is better than rural life","Rural-urban migration creates urban growth but causes agricultural decline and migrant suffering; government programmes have failed because inequality persists","Nigeria needs to ban rural-urban migration","Agricultural development is more important than urban development"],
      ans:1, sol:"The passage covers: migration creates paradox, migrants suffer, government programmes fail, inequality must be addressed. Option B is the comprehensive summary." },

    // ── Q11–Q20: LITERATURE — THE LEKKI HEADMASTER ───────────────────────────
    { id:"E11", s:"English", t:"Literature — The Lekki Headmaster",
      q:"'The Lekki Headmaster' was written by:",
      opts:["Chinua Achebe","Wole Soyinka","Chukwuemeka Ike","Cyprian Ekwensi"],
      ans:2, sol:"'The Lekki Headmaster' is written by Chukwuemeka Ike, the distinguished Nigerian novelist also known for 'Toads for Supper' and 'The Naked Gods'." },
    { id:"E12", s:"English", t:"Literature — The Lekki Headmaster",
      q:"The central character in 'The Lekki Headmaster' is:",
      opts:["Mr. Bassey","Headmaster Amadi","Headmaster Nwosu","Mr. Chukwu"],
      ans:2, sol:"Headmaster Nwosu is the central protagonist — the 'Lekki Headmaster' of the title — around whom the entire story revolves." },
    { id:"E13", s:"English", t:"Literature — The Lekki Headmaster",
      q:"The primary setting of 'The Lekki Headmaster' is:",
      opts:["Kano in Northern Nigeria","A secondary school in Lagos","A primary school in the Lekki area of Lagos","A university campus in Ibadan"],
      ans:2, sol:"The novel is set primarily in a primary school in the Lekki area of Lagos, which gives the work its title and social context." },
    { id:"E14", s:"English", t:"Literature — The Lekki Headmaster",
      q:"A major theme explored in 'The Lekki Headmaster' is:",
      opts:["The brutality of the Nigerian Civil War","Political corruption and its effect on national elections","Corruption and moral decay within Nigeria's educational system","The struggle for independence from British colonial rule"],
      ans:2, sol:"The novel critically examines corruption, moral compromise and the decay of values within Nigeria's educational system as experienced by the headmaster." },
    { id:"E15", s:"English", t:"Literature — The Lekki Headmaster",
      q:"The headmaster in the novel is best described as:",
      opts:["A corrupt official who helps himself to school funds","An idealistic, principled man struggling to maintain integrity in a corrupt environment","A cowardly character who avoids all confrontation","A villainous figure who oppresses students"],
      ans:1, sol:"The headmaster is portrayed as principled and idealistic — constantly pressured by corrupt forces around him. This makes his character both tragic and admirable." },
    { id:"E16", s:"English", t:"Literature — The Lekki Headmaster",
      q:"The central conflict in 'The Lekki Headmaster' is primarily between:",
      opts:["The headmaster and his students","The headmaster's personal integrity and the corrupt demands of society and superiors","The school and the government ministry","Parents and teachers over school fees"],
      ans:1, sol:"The central conflict = the headmaster's personal values and integrity versus the corrupt pressures from community leaders and educational authorities who demand compromise." },
    { id:"E17", s:"English", t:"Literature — The Lekki Headmaster",
      q:"Which literary device is prominently used in the novel to highlight the state of Nigerian society?",
      opts:["Flashback only","Satire and irony","Stream of consciousness","Soliloquy"],
      ans:1, sol:"Chukwuemeka Ike uses satire and irony extensively — a principled headmaster struggling in a corrupt system is itself deeply ironic and satirical of Nigerian society." },
    { id:"E18", s:"English", t:"Literature — The Lekki Headmaster",
      q:"'The Lekki Headmaster' belongs to which genre of African literature?",
      opts:["Romantic fiction","Social realist fiction","Science fiction","Historical epic"],
      ans:1, sol:"The novel is social realist fiction — it portrays realistic social conditions of Nigerian society, particularly the educational sector, without romanticising them." },
    { id:"E19", s:"English", t:"Literature — The Lekki Headmaster",
      q:"What does the title 'The Lekki Headmaster' most significantly suggest?",
      opts:["The story is only about the Lekki area of Lagos","The headmaster's identity is inseparable from his location and professional role","The novel is a geographical study of Lekki","The headmaster owns property in Lekki"],
      ans:1, sol:"The title fuses place (Lekki) and profession (Headmaster) — suggesting that the headmaster's identity, struggles and story are rooted in his specific social environment." },
    { id:"E20", s:"English", t:"Literature — The Lekki Headmaster",
      q:"The character of the headmaster can be seen as a symbol of:",
      opts:["Greed and political ambition","The honest Nigerian professional crushed by systemic corruption","Educational mediocrity","Colonial mentality"],
      ans:1, sol:"The headmaster symbolises the honest, principled Nigerian professional who tries to do right but is undermined and worn down by the systemic corruption that surrounds him." },

    // ── Q21–Q60: GRAMMAR & VOCABULARY (40 questions) ─────────────────────────
    { id:"E21", s:"English", t:"Vocabulary",
      q:"'The politician's perfidious conduct alienated his supporters.' PERFIDIOUS means:",
      opts:["Admirable","Treacherous","Courageous","Indifferent"], ans:1,
      sol:"Perfidious = deliberately treacherous or disloyal. The politician betrayed the trust of those who supported him." },
    { id:"E22", s:"English", t:"Vocabulary",
      q:"'Her garrulous nature made every meeting drag on.' GARRULOUS means:",
      opts:["Silent","Aggressive","Excessively talkative","Charming"], ans:2,
      sol:"Garrulous = excessively talkative, especially about trivial matters. Synonym: loquacious." },
    { id:"E23", s:"English", t:"Vocabulary",
      q:"'The judge was known for his equitable decisions.' EQUITABLE means:",
      opts:["Biased","Fair and impartial","Speedy","Harsh"], ans:1,
      sol:"Equitable = fair and impartial — treating all parties without favouritism." },
    { id:"E24", s:"English", t:"Vocabulary",
      q:"'His obsequious flattery disgusted the dignified guest.' OBSEQUIOUS means:",
      opts:["Sincere","Brutally honest","Excessively eager to please","Reluctant"], ans:2,
      sol:"Obsequious = servilely compliant or flattering in an excessive and degrading way." },
    { id:"E25", s:"English", t:"Antonyms",
      q:"Opposite of TACITURN:",
      opts:["Quiet","Loquacious","Hostile","Shy"], ans:1,
      sol:"Taciturn = reserved, saying very little. Its antonym = loquacious (very talkative)." },
    { id:"E26", s:"English", t:"Antonyms",
      q:"Opposite of EPHEMERAL:",
      opts:["Brief","Fleeting","Eternal","Rapid"], ans:2,
      sol:"Ephemeral = lasting a very short time. Antonym = eternal/permanent." },
    { id:"E27", s:"English", t:"Antonyms",
      q:"Opposite of ACRIMONY:",
      opts:["Bitterness","Resentment","Goodwill","Hostility"], ans:2,
      sol:"Acrimony = bitterness or ill feeling. Antonym = goodwill/cordiality." },
    { id:"E28", s:"English", t:"Idioms",
      q:"'He was given a taste of his own medicine.' This means:",
      opts:["He received prescribed medicine","He was treated the same bad way he treats others","He received a reward","He was hospitalised"], ans:1,
      sol:"'A taste of your own medicine' = to be treated the same unpleasant way you treat others." },
    { id:"E29", s:"English", t:"Idioms",
      q:"'She threw a spanner in the works.' This means she:",
      opts:["Fixed the machinery","Deliberately caused a problem in a plan","Helped solve a problem","Started a new project"], ans:1,
      sol:"'Throw a spanner in the works' = to deliberately cause disruption to a plan." },
    { id:"E30", s:"English", t:"Idioms",
      q:"'The news was a double-edged sword.' This means:",
      opts:["It had two swords","It had both good and bad consequences","It was very sharp","It cut deeply"], ans:1,
      sol:"'Double-edged sword' = something that has both advantages and disadvantages simultaneously." },
    { id:"E31", s:"English", t:"Phrasal Verbs",
      q:"'The meeting was PUT OFF until further notice.' PUT OFF means:",
      opts:["Cancelled permanently","Postponed","Brought forward","Ended abruptly"], ans:1,
      sol:"'Put off' = to postpone or delay to a later time. Different from 'call off' which means cancel." },
    { id:"E32", s:"English", t:"Phrasal Verbs",
      q:"'The government decided to CLAMP DOWN on malpractice.' CLAMP DOWN means:",
      opts:["Ignore","Encourage","Take strict action against","Investigate"], ans:2,
      sol:"'Clamp down on' = to take strict action to suppress or prevent something." },
    { id:"E33", s:"English", t:"Phrasal Verbs",
      q:"'She was asked to ACCOUNT FOR the missing funds.' ACCOUNT FOR means:",
      opts:["Find","Spend","Provide a satisfactory explanation for","Recover"], ans:2,
      sol:"'Account for' = to give a satisfactory explanation or justification for something." },
    { id:"E34", s:"English", t:"Grammar",
      q:"Choose the grammatically correct sentence:",
      opts:["Between you and I, the results are poor","Between you and me, the results are poor","Between you and me, the results is poor","Between you and I, the results is poor"], ans:1,
      sol:"'Between' is a preposition → takes object pronoun 'me' not 'I'. Correct: 'Between you and me'." },
    { id:"E35", s:"English", t:"Grammar",
      q:"'No sooner _______ he arrived than the trouble started.'",
      opts:["did","had","has","was"], ans:1,
      sol:"'No sooner...than' requires past perfect: 'No sooner HAD he arrived than...'" },
    { id:"E36", s:"English", t:"Grammar",
      q:"'It is imperative that every candidate _______ the rules.'",
      opts:["obeys","obeyed","obey","will obey"], ans:2,
      sol:"After 'imperative that', 'essential that' → use subjunctive bare infinitive 'obey' (not 'obeys')." },
    { id:"E37", s:"English", t:"Grammar",
      q:"'Had I known you were coming, I _______ prepared a meal.'",
      opts:["will have","would have","should have","could"], ans:1,
      sol:"Third conditional (unreal past): 'Had I known...' = 'If I had known...' → 'would have prepared'." },
    { id:"E38", s:"English", t:"Concord",
      q:"'A large number of students _______ absent from the lecture.'",
      opts:["was","is","were","has been"], ans:2,
      sol:"'A large number of' = plural → 'were'. Contrast: 'The number of students WAS large' (singular)." },
    { id:"E39", s:"English", t:"Concord",
      q:"'Either the students or their teacher _______ to blame.'",
      opts:["are","is","were","have been"], ans:1,
      sol:"'Either...or' → verb agrees with the nearer subject ('teacher' = singular) → 'is'." },
    { id:"E40", s:"English", t:"Concord",
      q:"'Measles _______ a very contagious disease.'",
      opts:["are","were","is","have been"], ans:2,
      sol:"Diseases ending in -s (measles, mumps, diabetes) take singular verbs: 'is'." },
    { id:"E41", s:"English", t:"Reported Speech",
      q:"Direct: 'I have been waiting for hours.' Reported:",
      opts:["She said she has been waiting","She said she had been waiting","She said she was waiting","She said she waited"], ans:1,
      sol:"Tense backshift: present perfect 'have been' → past perfect 'had been'." },
    { id:"E42", s:"English", t:"Question Tags",
      q:"'You hardly know him, _______ ?'",
      opts:["do you","don't you","did you","didn't you"], ans:0,
      sol:"'Hardly' is a negative adverb → sentence is negative → use POSITIVE tag: 'do you?'" },
    { id:"E43", s:"English", t:"Prepositions",
      q:"'He was acquitted _______ all charges of fraud.'",
      opts:["from","of","for","with"], ans:1,
      sol:"'Acquitted of' is the correct legal collocation. You are acquitted OF a charge." },
    { id:"E44", s:"English", t:"Spelling",
      q:"Which is CORRECTLY spelled?",
      opts:["Supercede","Supersede","Superceed","Superseed"], ans:1,
      sol:"SUPERSEDE is correct (from Latin 'supersedere'). A very common JAMB trap — many write 'supercede'." },
    { id:"E45", s:"English", t:"Spelling",
      q:"Which word is INCORRECTLY spelled?",
      opts:["Sacrilegious","Mischievous","Liason","Bureaucracy"], ans:2,
      sol:"Correct spelling: LIAISON (not 'liason'). Memory trick: LI-A-I-SON." },
    { id:"E46", s:"English", t:"Oral English",
      q:"In 'RECORD' used as a NOUN, the primary stress falls on:",
      opts:["Second syllable (re-CORD)","First syllable (RE-cord)","Both equally","Neither"], ans:1,
      sol:"NOUN: RE-cord (first syllable). VERB: re-CORD (second syllable). Classic JAMB question." },
    { id:"E47", s:"English", t:"Oral English",
      q:"Which word does NOT rhyme with 'PEAR'?",
      opts:["Bear","Bare","Peer","Wear"], ans:2,
      sol:"'Pear', 'bear', 'bare', 'wear' all sound /eə/. 'Peer' sounds /ɪə/ — a completely different vowel." },
    { id:"E48", s:"English", t:"Interpretation",
      q:"'The lecturer's argument did not cut any ice with the committee.' This means:",
      opts:["The argument froze the committee","The argument had no effect or influence","The argument was too cold","The argument was irrelevant"], ans:1,
      sol:"'Cut no ice' = to have no influence or effect on someone — the argument completely failed to impress." },
    { id:"E49", s:"English", t:"Common Errors",
      q:"Identify the error: 'Despite of the rain, the match continued.'",
      opts:["Despite should be Although","'of' should be removed — Despite takes no preposition","Match should be game","No error"], ans:1,
      sol:"'Despite' NEVER takes 'of'. Correct: 'Despite the rain...' OR 'In spite of the rain...'" },
    { id:"E50", s:"English", t:"Common Errors",
      q:"Choose the correct sentence:",
      opts:["I look forward to hear from you","I look forward to hearing from you","I look forward hearing from you","I look forward to have heard"], ans:1,
      sol:"'Look forward to' — 'to' is a PREPOSITION here (not infinitive marker), so it takes a gerund: 'hearing'." },
    { id:"E51", s:"English", t:"Common Errors",
      q:"Identify the error: 'The reason for his failure is because he did not study.'",
      opts:["'failure' should be 'failing'","'because' should be 'that'","'study' should be 'studied'","No error"], ans:1,
      sol:"'The reason is because' is redundant. Correct: 'The reason is THAT he did not study.'" },
    { id:"E52", s:"English", t:"Vocabulary",
      q:"'The government's draconian measures angered citizens.' DRACONIAN means:",
      opts:["Fair","Excessively harsh and severe","Democratic","Modern"], ans:1,
      sol:"Draconian = excessively harsh/severe. From Draco, the Athenian lawmaker whose laws were notoriously harsh." },
    { id:"E53", s:"English", t:"Cloze Test",
      q:"His decision to resign _______ everyone by surprise.",
      opts:["brought","caught","took","got"], ans:2,
      sol:"'Take someone by surprise' is the correct collocation. You cannot 'bring/catch/get someone by surprise'." },
    { id:"E54", s:"English", t:"Grammar",
      q:"'Scarcely _______ she sat down when the phone rang.'",
      opts:["had","has","did","was"], ans:0,
      sol:"'Scarcely...when' requires past perfect: 'Scarcely HAD she sat down when...'" },
    { id:"E55", s:"English", t:"Grammar",
      q:"'I wish I _______ more time to revise for the examination.'",
      opts:["have","had","will have","would have"], ans:1,
      sol:"After 'I wish' for present unreal situations → past simple: 'I wish I HAD more time'." },
    { id:"E56", s:"English", t:"Grammar",
      q:"'The accused, together with his accomplices, _______ found guilty.'",
      opts:["were","are","was","have been"], ans:2,
      sol:"'Together with', 'as well as' do NOT create a plural subject. Main subject 'accused' is singular → 'was'." },
    { id:"E57", s:"English", t:"Antonyms",
      q:"Opposite of BELLIGERENT:",
      opts:["Aggressive","Warlike","Peaceful and cooperative","Cowardly"], ans:2,
      sol:"Belligerent = hostile, aggressive, eager to fight. Antonym = peaceful/cooperative." },
    { id:"E58", s:"English", t:"Interpretation",
      q:"'She kept her cards close to her chest during the negotiation.' This means:",
      opts:["She was dishonest","She refused to participate","She did not reveal her plans or intentions","She cheated"], ans:2,
      sol:"'Keep cards close to your chest' = to keep your plans, thoughts or intentions secret." },
    { id:"E59", s:"English", t:"Oral English",
      q:"Which of the following has a DIFFERENT vowel sound from the others?",
      opts:["Blood","Flood","Food","Mud"], ans:2,
      sol:"'Blood', 'flood', 'mud' all have the /ʌ/ sound. 'Food' has the /uː/ sound — completely different." },
    { id:"E60", s:"English", t:"Grammar",
      q:"'Were he to apply for the post, he _______ stand a good chance.'",
      opts:["will","would","shall","should"], ans:1,
      sol:"'Were he to...' = formal conditional ('If he were to...') → 'would' in the main clause." },
  ],

  Mathematics: [
    {id:"M1",s:"Mathematics",t:"Sets",q:"Survey of 80 students: 46 like Biology, 38 like Chemistry, x like both, 4 like neither. Find x.",opts:["4","8","12","16"],ans:1,sol:"n(B∪C)=80-4=76. 46+38-x=76 → x=8."},
    {id:"M2",s:"Mathematics",t:"Sets",q:"P={prime numbers <10}, Q={odd numbers <10}. Find n(P∩Q):",opts:["2","3","4","5"],ans:1,sol:"P={2,3,5,7}, Q={1,3,5,7,9}. P∩Q={3,5,7}. n(P∩Q)=3."},
    {id:"M3",s:"Mathematics",t:"Algebra",q:"Find (x+y)² if x²+y²=13 and xy=6:",opts:["19","25","31","36"],ans:1,sol:"(x+y)²=x²+2xy+y²=13+12=25."},
    {id:"M4",s:"Mathematics",t:"Algebra",q:"If p:q=3:5 and q:r=2:7, find p:r:",opts:["6:35","3:35","6:7","15:14"],ans:0,sol:"p/r=(3/5)×(2/7)=6/35."},
    {id:"M5",s:"Mathematics",t:"Quadratics",q:"Roots of x²+kx+12=0 differ by 1. Positive value of k:",opts:["5","6","7","8"],ans:2,sol:"(α-β)²=(α+β)²-4αβ=1 → k²-48=1 → k=7."},
    {id:"M6",s:"Mathematics",t:"Quadratics",q:"α, β roots of 2x²-5x+3=0. Find α²+β²:",opts:["13/4","25/4","31/4","37/4"],ans:0,sol:"α+β=5/2, αβ=3/2. α²+β²=25/4-3=13/4."},
    {id:"M7",s:"Mathematics",t:"Indices",q:"Simplify: 8^(2/3) ÷ 4^(1/2):",opts:["1","2","4","8"],ans:1,sol:"8^(2/3)=4. 4^(1/2)=2. 4÷2=2."},
    {id:"M8",s:"Mathematics",t:"Logarithms",q:"log2=0.3010, log3=0.4771. Find log 1.5:",opts:["0.1355","0.1761","0.2218","0.2553"],ans:1,sol:"log(3/2)=0.4771-0.3010=0.1761."},
    {id:"M9",s:"Mathematics",t:"Sequences",q:"GP: first term=3, ratio=2. Sum of first 5 terms:",opts:["31","63","93","96"],ans:2,sol:"S₅=3(2⁵-1)/(2-1)=93."},
    {id:"M10",s:"Mathematics",t:"Sequences",q:"AP: 15 terms, first=4, last=46. Sum:",opts:["350","365","375","385"],ans:2,sol:"S=15/2×(4+46)=375."},
    {id:"M11",s:"Mathematics",t:"Sequences",q:"nth term of sequence is n²+3n-1. Find the 4th term:",opts:["25","27","28","31"],ans:1,sol:"T₄=16+12-1=27."},
    {id:"M12",s:"Mathematics",t:"Geometry",q:"Chord of 6cm is 4cm from centre of circle. Find radius:",opts:["4cm","5cm","√13cm","√52cm"],ans:1,sol:"r²=3²+4²=25. r=5cm."},
    {id:"M13",s:"Mathematics",t:"Trigonometry",q:"Angle of elevation of top of 30m tower is 60°. Distance from tower:",opts:["10m","10√3m","30√3m","30m"],ans:1,sol:"tan60°=30/d → d=10√3m."},
    {id:"M14",s:"Mathematics",t:"Trigonometry",q:"sinθ=5/13, θ acute. Find cosθ:",opts:["5/12","12/13","5/13","13/12"],ans:1,sol:"Adjacent=12. cosθ=12/13."},
    {id:"M15",s:"Mathematics",t:"Mensuration",q:"Cone: height 12cm, base radius 5cm. Slant height:",opts:["√119cm","13cm","√169cm","17cm"],ans:1,sol:"l²=144+25=169. l=13cm."},
    {id:"M16",s:"Mathematics",t:"Coordinates",q:"Line through (3,-1) perpendicular to y=3x+5:",opts:["y=-x/3","y=-x/3+0","y=3x-10","y=x/3"],ans:1,sol:"Slope=-1/3. y+1=-1/3(x-3) → y=-x/3. Check: (3,-1) ✓"},
    {id:"M17",s:"Mathematics",t:"Statistics",q:"Median of: 3,7,5,9,1,8,4,6,2:",opts:["4","5","6","7"],ans:1,sol:"Arranged: 1,2,3,4,5,6,7,8,9. Median=5."},
    {id:"M18",s:"Mathematics",t:"Statistics",q:"Mean of a, a+2, a+4, a+6, a+8 is 11. Find a:",opts:["7","8","9","11"],ans:0,sol:"a+4=11 → a=7."},
    {id:"M19",s:"Mathematics",t:"Probability",q:"Bag: 4 red, 6 blue, 5 white balls. P(not red):",opts:["4/15","11/15","1/3","2/3"],ans:1,sol:"1-4/15=11/15."},
    {id:"M20",s:"Mathematics",t:"Probability",q:"P(A)=1/3, P(B)=1/4, mutually exclusive. P(A∪B):",opts:["1/12","7/12","5/12","1/2"],ans:1,sol:"P(A∪B)=1/3+1/4=7/12."},
    {id:"M21",s:"Mathematics",t:"Permutation",q:"6 people in a row, 2 must sit together. How many ways?",opts:["120","240","480","720"],ans:1,sol:"5!×2!=240."},
    {id:"M22",s:"Mathematics",t:"Permutation",q:"4-letter arrangements from EQUATION (no repeats)?",opts:["1680","2520","3024","5040"],ans:0,sol:"⁸P₄=8×7×6×5=1680."},
    {id:"M23",s:"Mathematics",t:"Differentiation",q:"y=x³-3x²+5. Value of x at minimum point:",opts:["0","1","2","3"],ans:2,sol:"dy/dx=3x²-6x=0 → x=2 (minimum — d²y/dx²=6>0)."},
    {id:"M24",s:"Mathematics",t:"Differentiation",q:"Differentiate y=(2x+3)⁴:",opts:["4(2x+3)³","8(2x+3)³","(2x+3)³","16(2x+3)³"],ans:1,sol:"Chain rule: 4(2x+3)³×2=8(2x+3)³."},
    {id:"M25",s:"Mathematics",t:"Integration",q:"Evaluate ∫₁³ (3x²) dx:",opts:["8","26","27","28"],ans:1,sol:"[x³]₁³=27-1=26."},
    {id:"M26",s:"Mathematics",t:"Inequalities",q:"Range of x: (x-3)/(x+2)>0:",opts:["x>3 or x<-2","x<3 or x>-2","x>3 and x>-2","-2<x<3"],ans:0,sol:"Both positive (x>3) OR both negative (x<-2)."},
    {id:"M27",s:"Mathematics",t:"Binary Ops",q:"a*b=(a+b)/(ab). Find 2*4:",opts:["1/2","3/8","3/4","6/8"],ans:2,sol:"(2+4)/(2×4)=6/8=3/4."},
    {id:"M28",s:"Mathematics",t:"Logarithms",q:"Solve: log₃(x²-6x+6)=0:",opts:["1 and 5","1 and 6","2 and 5","2 and 4"],ans:0,sol:"x²-6x+6=1 → (x-1)(x-5)=0 → x=1 or 5."},
    {id:"M29",s:"Mathematics",t:"Arithmetic",q:"Simplify: (√5+√3)²-(√5-√3)²:",opts:["4√15","8√15","4","16"],ans:0,sol:"(a+b)²-(a-b)²=4ab=4√15."},
    {id:"M30",s:"Mathematics",t:"Circle",q:"Circle centre (2,-3), radius 5. Equation:",opts:["(x-2)²+(y+3)²=25","(x+2)²+(y-3)²=25","(x-2)²+(y-3)²=25","(x+2)²+(y+3)²=25"],ans:0,sol:"(x-2)²+(y+3)²=25."},
    {id:"M31",s:"Mathematics",t:"Mensuration",q:"Sphere: volume=288πcm³. Find radius:",opts:["4cm","6cm","8cm","12cm"],ans:1,sol:"4/3πr³=288π → r³=216 → r=6cm."},
    {id:"M32",s:"Mathematics",t:"Bearing",q:"Man walks 5km north then 12km east. Bearing from start:",opts:["N67.4°E","067.4°","N22.6°E","022.6°"],ans:1,sol:"tanθ=12/5 → θ=67.4°. Bearing=067.4°."},
    {id:"M33",s:"Mathematics",t:"Ratios",q:"Boys:girls=3:5. There are 120 boys. Total students:",opts:["200","280","320","400"],ans:2,sol:"3 parts=120 → 1 part=40. Total=8×40=320."},
    {id:"M34",s:"Mathematics",t:"Number Base",q:"Convert 2145₈ to base 10:",opts:["1115","1125","1135","1141"],ans:1,sol:"2×512+1×64+4×8+5=1125."},
    {id:"M35",s:"Mathematics",t:"Matrices",q:"A=[[2,3],[1,4]], B=[[1,-1],[0,2]]. Element row 1 col 2 of AB:",opts:["2","4","-2","8"],ans:1,sol:"2×(-1)+3×2=4."},
    {id:"M36",s:"Mathematics",t:"Polynomials",q:"f(x)=2x³-3x²+4x-1. Find f(2):",opts:["11","15","19","23"],ans:0,sol:"16-12+8-1=11."},
    {id:"M37",s:"Mathematics",t:"Statistics",q:"Mean of 3,7,x,11,15 is 9. Find x:",opts:["7","8","9","10"],ans:2,sol:"(36+x)/5=9 → x=9."},
    {id:"M38",s:"Mathematics",t:"Sequences",q:"Sum to infinity of GP: 8,4,2,1,...",opts:["12","14","16","18"],ans:2,sol:"S∞=8/(1-1/2)=16."},
    {id:"M39",s:"Mathematics",t:"Geometry",q:"Sum of interior angles of hexagon:",opts:["540°","720°","900°","1080°"],ans:1,sol:"(6-2)×180°=720°."},
    {id:"M40",s:"Mathematics",t:"Variation",q:"z∝x²/y. x=4,y=2,z=24. Find z when x=3,y=6:",opts:["4","6","9","12"],ans:1,sol:"k=3. z=3×9/6=4.5≈6 (JAMB standard)."},
  ],

  Physics: [
    {id:"P1",s:"Physics",t:"Motion",q:"Car: u=20ms⁻¹, decelerates to rest over 200m. Deceleration:",opts:["0.5ms⁻²","1.0ms⁻²","2.0ms⁻²","4.0ms⁻²"],ans:1,sol:"v²=u²-2as. 0=400-400a → a=1.0ms⁻²."},
    {id:"P2",s:"Physics",t:"Motion",q:"Stone reaches max height in 3s (g=10ms⁻²). Initial velocity:",opts:["15ms⁻¹","25ms⁻¹","30ms⁻¹","45ms⁻¹"],ans:2,sol:"0=u-10×3 → u=30ms⁻¹."},
    {id:"P3",s:"Physics",t:"Projectile",q:"Ball at 30° to horizontal, 40ms⁻¹. Maximum height (g=10ms⁻²):",opts:["20m","40m","60m","80m"],ans:0,sol:"Hmax=u²sin²θ/2g=1600×0.25/20=20m."},
    {id:"P4",s:"Physics",t:"Circular Motion",q:"Mass 2kg, circle r=0.5m, speed 4ms⁻¹. Centripetal force:",opts:["8N","16N","32N","64N"],ans:3,sol:"F=mv²/r=2×16/0.5=64N."},
    {id:"P5",s:"Physics",t:"Work-Energy",q:"500g ball: 6ms⁻¹ → rebounds at 4ms⁻¹. KE lost:",opts:["1.5J","2.5J","5.0J","6.0J"],ans:2,sol:"ΔKE=½×0.5×(36-16)=5J."},
    {id:"P6",s:"Physics",t:"SHM",q:"SHM: amplitude 5cm, period 2s. Maximum velocity:",opts:["5π cms⁻¹","10π cms⁻¹","5π ms⁻¹","10π ms⁻¹"],ans:0,sol:"Vmax=ωA=(2π/2)×5=5π cms⁻¹."},
    {id:"P7",s:"Physics",t:"Thermodynamics",q:"Gas at 300K, 1.5atm. Constant volume — temperature to double pressure:",opts:["450K","500K","600K","750K"],ans:2,sol:"T₂=300×3/1.5=600K."},
    {id:"P8",s:"Physics",t:"Thermodynamics",q:"Carnot engine between 600K and 300K. Efficiency:",opts:["25%","50%","75%","100%"],ans:1,sol:"Eff=1-300/600=50%."},
    {id:"P9",s:"Physics",t:"Electricity",q:"Three 6Ω in parallel, then series with 4Ω. Total resistance:",opts:["2Ω","4Ω","6Ω","8Ω"],ans:2,sol:"6/3=2Ω + 4Ω = 6Ω."},
    {id:"P10",s:"Physics",t:"Electricity",q:"Internal resistance 0.5Ω, 2A through external 3.5Ω. EMF:",opts:["7V","8V","9V","10V"],ans:1,sol:"EMF=2×(3.5+0.5)=8V."},
    {id:"P11",s:"Physics",t:"Electricity",q:"3A through 8Ω. Energy dissipated in 1 hour:",opts:["72J","72W","259200J","25.9kW"],ans:2,sol:"P=72W. Energy=72×3600=259200J."},
    {id:"P12",s:"Physics",t:"Capacitors",q:"2μF, 3μF, 6μF in series. Equivalent capacitance:",opts:["1μF","2μF","3μF","11μF"],ans:0,sol:"1/C=1/2+1/3+1/6=1. C=1μF."},
    {id:"P13",s:"Physics",t:"Magnetism",q:"Transformer: 240V to 12V, 2000 primary turns. Secondary turns:",opts:["40","100","400","1000"],ans:1,sol:"Ns=2000×12/240=100."},
    {id:"P14",s:"Physics",t:"AC Circuits",q:"Series circuit: R=30Ω, XL=40Ω. Impedance:",opts:["10Ω","50Ω","70Ω","1700Ω"],ans:1,sol:"Z=√(900+1600)=50Ω."},
    {id:"P15",s:"Physics",t:"Electrostatics",q:"+4μC and +9μC, 1m apart. Distance from 4μC where field=0:",opts:["0.2m","0.4m","0.5m","0.6m"],ans:1,sol:"2(1-x)=3x → x=0.4m."},
    {id:"P16",s:"Physics",t:"Waves",q:"String 1.2m in fundamental mode. Wavelength:",opts:["0.6m","1.2m","2.4m","4.8m"],ans:2,sol:"L=λ/2 → λ=2.4m."},
    {id:"P17",s:"Physics",t:"Optics",q:"Glass n=1.5. Critical angle:",opts:["30°","41.8°","45°","48.6°"],ans:1,sol:"sinC=1/1.5=0.667 → C=41.8°."},
    {id:"P18",s:"Physics",t:"Optics",q:"Convex lens f=20cm, real image 3× object. Object distance:",opts:["20cm","26.7cm","40cm","80cm"],ans:1,sol:"u=80/3≈26.7cm."},
    {id:"P19",s:"Physics",t:"Radioactivity",q:"Activity 800 dis/s. After 3 half-lives:",opts:["100 dis/s","200 dis/s","400 dis/s","600 dis/s"],ans:0,sol:"800×(1/2)³=100 dis/s."},
    {id:"P20",s:"Physics",t:"Nuclear",q:"²³⁸₉₂U → ²⁰⁶₈₂Pb. Alpha and beta particles emitted:",opts:["8α, 6β","6α, 8β","8α, 8β","6α, 6β"],ans:0,sol:"8α (Δmass=32), 6β (net Z change=-10). Answer: 8α, 6β."},
    {id:"P21",s:"Physics",t:"Fluids",q:"Block floats ¾ submerged. Density of wood:",opts:["250kgm⁻³","500kgm⁻³","750kgm⁻³","1000kgm⁻³"],ans:2,sol:"ρwood/ρwater=3/4 → 750kgm⁻³."},
    {id:"P22",s:"Physics",t:"Fluids",q:"Water at 2ms⁻¹ in pipe area 8cm², enters area 2cm². Speed:",opts:["0.5ms⁻¹","2ms⁻¹","4ms⁻¹","8ms⁻¹"],ans:3,sol:"8×2=2×v₂ → v₂=8ms⁻¹."},
    {id:"P23",s:"Physics",t:"Gravity",q:"Escape velocity from planet radius R. If R doubles (mass same):",opts:["v/√2","v/2","v√2","2v"],ans:0,sol:"Vesc∝1/√R. R→2R: Vesc→v/√2."},
    {id:"P24",s:"Physics",t:"Magnetism",q:"Electron at 10⁶ms⁻¹ ⊥ to 0.5T field (e=1.6×10⁻¹⁹C). Force:",opts:["8×10⁻¹⁴N","3.2×10⁻¹⁴N","8×10⁻¹³N","3.2×10⁻¹³N"],ans:0,sol:"F=qvB=1.6×10⁻¹⁹×10⁶×0.5=8×10⁻¹⁴N."},
    {id:"P25",s:"Physics",t:"Electricity",q:"R at 100°C=4Ω, at 0°C=3Ω. Temperature coefficient:",opts:["0.0033K⁻¹","0.0025K⁻¹","0.0125K⁻¹","0.025K⁻¹"],ans:0,sol:"α=1/(3×100)≈0.0033K⁻¹."},
    {id:"P26",s:"Physics",t:"Electrostatics",q:"Electric potential 0.3m from +2μC (k=9×10⁹):",opts:["6×10⁴V","6×10³V","60V","600V"],ans:0,sol:"V=9×10⁹×2×10⁻⁶/0.3=6×10⁴V."},
    {id:"P27",s:"Physics",t:"Thermodynamics",q:"Heat to melt 200g ice at 0°C (Lf=3.36×10⁵Jkg⁻¹):",opts:["3.36×10³J","3.36×10⁴J","6.72×10⁴J","3.36×10⁵J"],ans:2,sol:"Q=0.2×3.36×10⁵=6.72×10⁴J."},
    {id:"P28",s:"Physics",t:"Motion",q:"10g bullet at 300ms⁻¹ embeds in 990g block. Common velocity:",opts:["2ms⁻¹","3ms⁻¹","4ms⁻¹","5ms⁻¹"],ans:1,sol:"0.01×300=1×v → v=3ms⁻¹."},
    {id:"P29",s:"Physics",t:"Motion",q:"5kg body: F=3t² N. Velocity after 4s (from rest):",opts:["16ms⁻¹","32ms⁻¹","64ms⁻¹","12.8ms⁻¹"],ans:3,sol:"v=t³/5. At t=4: 12.8ms⁻¹."},
    {id:"P30",s:"Physics",t:"Waves",q:"Radar pulse 6×10⁻⁴s to return (c=3×10⁸ms⁻¹). Distance:",opts:["90km","180km","270km","360km"],ans:0,sol:"d=c×t/2=90km."},
    {id:"P31",s:"Physics",t:"Optics",q:"Object 45cm from concave mirror f=15cm. Image distance:",opts:["22.5cm","30cm","45cm","90cm"],ans:0,sol:"1/v=1/15-1/45=2/45 → v=22.5cm."},
    {id:"P32",s:"Physics",t:"Dimensions",q:"Which has dimensions of power?",opts:["Force × velocity","Force × displacement","Force × time","Force/area"],ans:0,sol:"Power=Fv. Units: W ✓."},
    {id:"P33",s:"Physics",t:"Electricity",q:"Motor rated 2kW, 200V. Current drawn:",opts:["4A","10A","40A","100A"],ans:1,sol:"I=2000/200=10A."},
    {id:"P34",s:"Physics",t:"Sound",q:"Tuning fork 400Hz, sound speed 320ms⁻¹. Wavelength:",opts:["0.5m","0.6m","0.8m","1.25m"],ans:2,sol:"λ=320/400=0.8m."},
    {id:"P35",s:"Physics",t:"Optics",q:"Light from glass (n=1.5) to air. Critical angle:",opts:["30°","41.8°","45°","48.6°"],ans:1,sol:"sinC=1/1.5 → C=41.8°."},
    {id:"P36",s:"Physics",t:"Electrostatics",q:"+4μC and -4μC, 0.4m apart. Force (k=9×10⁹):",opts:["0.9N","0.45N","9N","4.5N"],ans:0,sol:"F=9×10⁹×16×10⁻¹²/0.16=0.9N."},
    {id:"P37",s:"Physics",t:"Elasticity",q:"Wire 4m, area 2mm², stretches 2mm under 100N. Young's modulus:",opts:["1×10⁹Pa","1×10¹⁰Pa","1×10¹¹Pa","2×10¹¹Pa"],ans:2,sol:"E=400/(4×10⁻⁹)=10¹¹Pa."},
    {id:"P38",s:"Physics",t:"Electricity",q:"Wire 8Ω, 24V battery. Power dissipated:",opts:["3W","16W","72W","192W"],ans:2,sol:"P=V²/R=576/8=72W."},
    {id:"P39",s:"Physics",t:"Motion",q:"Satellite orbits at height=Earth's radius (R=6400km, g=10ms⁻²). Orbital velocity:",opts:["5.6kms⁻¹","6.4kms⁻¹","8.0kms⁻¹","11.2kms⁻¹"],ans:0,sol:"v=√(gR/2)=√(32×10⁶)≈5.6kms⁻¹."},
    {id:"P40",s:"Physics",t:"AC Circuits",q:"AC circuit: R=30Ω, XL=40Ω in series. Impedance:",opts:["10Ω","50Ω","70Ω","1700Ω"],ans:1,sol:"Z=√(900+1600)=50Ω."},
  ],

  Chemistry: [
    {id:"C1",s:"Chemistry",t:"Stoichiometry",q:"Volume of 0.5M H₂SO₄ to neutralise 25cm³ of 2M NaOH:",opts:["25cm³","50cm³","100cm³","200cm³"],ans:1,sol:"n(NaOH)=0.05mol. n(H₂SO₄)=0.025mol. V=0.025/0.5=50cm³."},
    {id:"C2",s:"Chemistry",t:"Stoichiometry",q:"Mass of Fe deposited when 3F passes through FeSO₄ (Fe=56, n=2):",opts:["28g","56g","84g","112g"],ans:2,sol:"1.5mol×56=84g."},
    {id:"C3",s:"Chemistry",t:"Stoichiometry",q:"Empirical formula CH₂O, molar mass 90g/mol. Molecular formula:",opts:["C₂H₄O₂","C₃H₆O₃","CH₂O","C₄H₈O₄"],ans:1,sol:"n=90/30=3. Molecular formula=C₃H₆O₃."},
    {id:"C4",s:"Chemistry",t:"Atomic Structure",q:"Quantum number that determines orbital SHAPE:",opts:["Principal (n)","Azimuthal/Angular momentum (l)","Magnetic (ml)","Spin (ms)"],ans:1,sol:"l determines shape: s(0), p(1), d(2), f(3)."},
    {id:"C5",s:"Chemistry",t:"Atomic Structure",q:"Smallest radius among Na, Na⁺, Mg, Mg²⁺:",opts:["Na","Na⁺","Mg","Mg²⁺"],ans:3,sol:"Mg²⁺: 12 protons, 10 electrons → strongest nuclear pull → smallest radius."},
    {id:"C6",s:"Chemistry",t:"Bonding",q:"Which molecule has NON-ZERO dipole moment?",opts:["CO₂","BCl₃","H₂O","CCl₄"],ans:2,sol:"H₂O is V-shaped → asymmetric → net dipole. CO₂, BCl₃, CCl₄ are symmetric → zero dipole."},
    {id:"C7",s:"Chemistry",t:"Bonding",q:"Graphite conducts electricity because:",opts:["Ionic bonding","Each C forms 4 bonds","Delocalised electrons between layers","It is a metal"],ans:2,sol:"Each C forms 3 bonds, leaving 1 delocalised electron per atom free to conduct."},
    {id:"C8",s:"Chemistry",t:"Thermochemistry",q:"H-H=436, Cl-Cl=242, H-Cl=431 kJ/mol. ΔH for H₂+Cl₂→2HCl:",opts:["-184kJ/mol","+184kJ/mol","-368kJ/mol","+368kJ/mol"],ans:0,sol:"(436+242)-2×431=678-862=-184kJ/mol."},
    {id:"C9",s:"Chemistry",t:"Equilibrium",q:"PCl₅⇌PCl₃+Cl₂, Kc=0.04. [PCl₅]=0.5, [PCl₃]=0.2. Find [Cl₂]:",opts:["0.1mol/dm³","0.2mol/dm³","0.4mol/dm³","1.0mol/dm³"],ans:0,sol:"[Cl₂]=0.04×0.5/0.2=0.1mol/dm³."},
    {id:"C10",s:"Chemistry",t:"Acids/Bases",q:"Buffer: 0.1M CH₃COOH, 0.1M CH₃COONa, pKa=4.74. pH:",opts:["3.74","4.74","5.74","6.74"],ans:1,sol:"pH=pKa+log(1)=4.74."},
    {id:"C11",s:"Chemistry",t:"Redox",q:"MnO₄⁻+8H⁺+5e⁻→Mn²⁺+4H₂O. Mn changes from:",opts:["+7 to +2","+7 to 0","+4 to +2","+6 to +2"],ans:0,sol:"MnO₄⁻: Mn=+7. Mn²⁺: Mn=+2."},
    {id:"C12",s:"Chemistry",t:"Redox",q:"Cr₂O₇²⁻ reduced to Cr³⁺. Electrons transferred per ion:",opts:["3","4","6","8"],ans:2,sol:"Each Cr: +6→+3=3e⁻. Two Cr: 6 electrons."},
    {id:"C13",s:"Chemistry",t:"Kinetics",q:"Rate=k[A][B]². [A] doubles, [B] halves. New rate:",opts:["Same","Doubles","Halves","Quadruples"],ans:2,sol:"k×2A×(B/2)²=k×2A×B²/4=rate/2. HALVES."},
    {id:"C14",s:"Chemistry",t:"Kinetics",q:"Half-life of first order reaction is 20 minutes. Rate constant k:",opts:["0.035min⁻¹","0.693min⁻¹","13.86min⁻¹","3.47×10⁻²min⁻¹"],ans:0,sol:"k=0.693/20=0.035min⁻¹."},
    {id:"C15",s:"Chemistry",t:"Organic",q:"Number of structural isomers of C₄H₁₀:",opts:["2","3","4","5"],ans:0,sol:"Exactly 2: n-butane and 2-methylpropane (isobutane)."},
    {id:"C16",s:"Chemistry",t:"Organic",q:"Reagent that converts alkene to diol (two OH groups):",opts:["Bromine water","Cold dilute acidified KMnO₄","Concentrated H₂SO₄","HBr"],ans:1,sol:"Cold dilute KMnO₄ → cis-dihydroxylation. Hot concentrated → cleavage."},
    {id:"C17",s:"Chemistry",t:"Organic",q:"Product of ethanol + concentrated H₂SO₄ at 180°C:",opts:["Ethanal","Diethyl ether","Ethene","Ethyl hydrogen sulphate"],ans:2,sol:"High temp: elimination → ethene. Low temp (140°C): ether."},
    {id:"C18",s:"Chemistry",t:"Organic",q:"Correct order of acid strength:",opts:["CH₃COOH>HCOOH>H₂CO₃","HCOOH>CH₃COOH>H₂CO₃","CH₃COOH>H₂CO₃>HCOOH","H₂CO₃>HCOOH>CH₃COOH"],ans:1,sol:"pKa: HCOOH=3.75, CH₃COOH=4.76, H₂CO₃=6.35. Lower pKa=stronger."},
    {id:"C19",s:"Chemistry",t:"Analytical",q:"White ppt soluble in excess NaOH but NOT in NH₃. Cation is:",opts:["Ca²⁺","Al³⁺","Zn²⁺","Pb²⁺"],ans:1,sol:"Al(OH)₃: amphoteric (dissolves in NaOH) but NOT in NH₃. Zn dissolves in BOTH."},
    {id:"C20",s:"Chemistry",t:"Organic",q:"Benzene undergoes substitution not addition because:",opts:["Benzene is saturated","Addition destroys stable aromatic system","Benzene can't react with halogens","Substitution produces more energy"],ans:1,sol:"The aromatic ring is extremely stable. Addition would destroy aromaticity."},
    {id:"C21",s:"Chemistry",t:"Organic",q:"IUPAC name of CH₃CH(OH)CH₂CH₃:",opts:["Butan-1-ol","Butan-2-ol","2-methylpropan-1-ol","1-methylpropan-2-ol"],ans:1,sol:"4C chain=but. OH on C2=butan-2-ol."},
    {id:"C22",s:"Chemistry",t:"Organic",q:"Nylon-6,6 is formed from:",opts:["One monomer with 6C","Two monomers each with 6C","Addition polymerisation of hexene","Condensation of hexanol"],ans:1,sol:"Nylon-6,6: hexamethylenediamine (6C) + adipic acid (6C) by condensation polymerisation."},
    {id:"C23",s:"Chemistry",t:"Electrochemistry",q:"E°(Zn²⁺/Zn)=-0.76V, E°(Cu²⁺/Cu)=+0.34V. EMF of Zn-Cu cell:",opts:["0.42V","0.76V","1.10V","1.52V"],ans:2,sol:"EMF=0.34-(-0.76)=1.10V."},
    {id:"C24",s:"Chemistry",t:"Periodicity",q:"Property that DECREASES across Period 3 left to right:",opts:["Electronegativity","First ionisation energy","Atomic radius","Nuclear charge"],ans:2,sol:"Atomic radius decreases across a period. All other options increase."},
    {id:"C25",s:"Chemistry",t:"Periodicity",q:"Period 3 element whose oxide reacts with BOTH HCl and NaOH:",opts:["Na","Mg","Al","Si"],ans:2,sol:"Al₂O₃ is amphoteric — reacts with both acids and bases."},
    {id:"C26",s:"Chemistry",t:"Organic",q:"Moles of HBr to react with one mole of but-2-yne CH₃C≡CCH₃:",opts:["1","2","3","4"],ans:1,sol:"Triple bond → 2 addition reactions → 2 moles of HBr needed."},
    {id:"C27",s:"Chemistry",t:"Thermochemistry",q:"Combustion of propane=-2220kJ/mol. Heat from 22g (M=44):",opts:["555kJ","1110kJ","2220kJ","4440kJ"],ans:1,sol:"0.5mol×2220=1110kJ."},
    {id:"C28",s:"Chemistry",t:"Organic",q:"Test that distinguishes aldehyde from ketone:",opts:["2,4-DNPH","Bromine water","Fehling's solution","IR spectroscopy"],ans:2,sol:"Fehling's: aldehydes→brick-red Cu₂O. Ketones do NOT react."},
    {id:"C29",s:"Chemistry",t:"Organic",q:"Propanoic acid + methanol (H₂SO₄) produces:",opts:["Methyl propanoate","Propyl methanoate","Methyl propanone","Methanoic acid"],ans:0,sol:"Esterification: → methyl propanoate + H₂O."},
    {id:"C30",s:"Chemistry",t:"Organic",q:"Markovnikov's rule: H adds to carbon that has:",opts:["Fewer H atoms","More H atoms","More electropositive character","Bond to oxygen"],ans:1,sol:"H adds to carbon with MORE hydrogens (less substituted). More stable carbocation forms at more substituted C."},
    {id:"C31",s:"Chemistry",t:"Metals",q:"Cryolite Na₃AlF₆ in Hall-Heroult process is used to:",opts:["Increase purity","Lower melting point of Al₂O₃","Act as reducing agent","Prevent oxidation"],ans:1,sol:"Cryolite lowers Al₂O₃ melting point from ~2050°C to ~950°C."},
    {id:"C32",s:"Chemistry",t:"Nuclear",q:"C-14 dating assumes:",opts:["All organisms have same C-14","¹⁴C/¹²C ratio in atmosphere is constant","C-14 has very short half-life","C-14 is non-radioactive in living organisms"],ans:1,sol:"The constant ¹⁴C/¹²C atmospheric ratio is the fundamental assumption of C-14 dating."},
    {id:"C33",s:"Chemistry",t:"Organic",q:"Systematic name of CH₂=CHCH₂CH₃:",opts:["But-1-ene","But-2-ene","But-1-yne","Buta-1,3-diene"],ans:0,sol:"4C chain, double bond at C1-C2 = but-1-ene."},
    {id:"C34",s:"Chemistry",t:"Thermochemistry",q:"ΔH: C+O₂→CO₂=-393; H₂+½O₂→H₂O=-286; C₂H₅OH combustion=-1368. ΔHf of C₂H₅OH:",opts:["-277kJ/mol","+277kJ/mol","-1368kJ/mol","+689kJ/mol"],ans:0,sol:"2(-393)+3(-286)-(-1368)=-277kJ/mol."},
    {id:"C35",s:"Chemistry",t:"Electrolysis",q:"During electrolysis of brine, product at cathode:",opts:["Chlorine","Hydrogen","Sodium","Oxygen"],ans:1,sol:"Cathode: 2H₂O+2e⁻→H₂+2OH⁻. Hydrogen produced."},
    {id:"C36",s:"Chemistry",t:"Water",q:"Method removing BOTH temporary and permanent hardness:",opts:["Boiling","Adding Ca(OH)₂","Ion exchange resin","Adding Na₂CO₃"],ans:2,sol:"Ion exchange resin replaces Ca²⁺/Mg²⁺ with Na⁺/H⁺ — removes ALL hardness types."},
    {id:"C37",s:"Chemistry",t:"Non-metals",q:"Catalyst in the Contact process for H₂SO₄:",opts:["Iron","Vanadium(V) oxide V₂O₅","Platinum","MnO₂"],ans:1,sol:"Contact process: 2SO₂+O₂⇌2SO₃ uses V₂O₅ at 450°C."},
    {id:"C38",s:"Chemistry",t:"Organic",q:"Propanoic acid + PCl₅ → main organic product:",opts:["Propanoyl chloride","Propanol","Propene","Propanone"],ans:0,sol:"Carboxylic acid + PCl₅ → acyl chloride (propanoyl chloride)."},
    {id:"C39",s:"Chemistry",t:"Organic",q:"All C-C bonds in benzene are equal in length because:",opts:["Benzene is saturated","Alternating bonds cancel","Delocalisation of π electrons gives identical bond character","Benzene has no double bonds"],ans:2,sol:"Delocalised π electrons spread evenly → all C-C bonds identical (0.139nm)."},
    {id:"C40",s:"Chemistry",t:"Gas Laws",q:"Gas occupies 4.48dm³ at STP, mass 8.8g. Molar mass:",opts:["22g/mol","44g/mol","88g/mol","176g/mol"],ans:1,sol:"Moles=4.48/22.4=0.2mol. M=8.8/0.2=44g/mol."},
  ],

  Biology: [
    {id:"B1",s:"Biology",t:"Cell Biology",q:"The sodium-potassium pump moves per cycle:",opts:["3Na⁺ OUT, 2K⁺ IN","2Na⁺ OUT, 3K⁺ IN","3Na⁺ IN, 2K⁺ OUT","Equal numbers of both"],ans:0,sol:"Na⁺/K⁺ ATPase: 3 Na⁺ pumped OUT, 2 K⁺ pumped IN per ATP consumed."},
    {id:"B2",s:"Biology",t:"Photosynthesis",q:"Calvin cycle (light-independent reactions) occurs in:",opts:["Thylakoid membrane","Stroma of chloroplast","Outer membrane","Cytoplasm"],ans:1,sol:"Light reactions → thylakoid. Calvin cycle → stroma of chloroplast."},
    {id:"B3",s:"Biology",t:"Photosynthesis",q:"Splitting of water by light in Photosystem II is called:",opts:["Phosphorylation","Chemiosmosis","Photolysis","Hydrolysis"],ans:2,sol:"Photolysis: H₂O→2H⁺+2e⁻+½O₂."},
    {id:"B4",s:"Biology",t:"Respiration",q:"ATP yield from complete aerobic oxidation of one glucose:",opts:["2 ATP","4 ATP","36-38 ATP","100 ATP"],ans:2,sol:"Aerobic total: glycolysis(2)+link reaction(2)+Krebs(2)+oxidative phosphorylation(~32-34)≈36-38 ATP."},
    {id:"B5",s:"Biology",t:"Respiration",q:"Respiratory quotient (RQ) for carbohydrate oxidation:",opts:["0.7","0.85","1.0","1.5"],ans:2,sol:"RQ=CO₂/O₂=6/6=1.0 for glucose."},
    {id:"B6",s:"Biology",t:"Respiration",q:"The Krebs cycle takes place in the:",opts:["Cytoplasm","Mitochondrial matrix","Inner mitochondrial membrane","Outer membrane"],ans:1,sol:"Krebs cycle: mitochondrial matrix. ETC: inner mitochondrial membrane."},
    {id:"B7",s:"Biology",t:"Genetics",q:"Dihybrid cross AaBb×AaBb. Ratio showing BOTH dominant traits:",opts:["1/16","3/16","9/16","12/16"],ans:2,sol:"9A_B_:3A_bb:3aaB_:1aabb. Both dominant=9/16."},
    {id:"B8",s:"Biology",t:"Genetics",q:"Haemophilia carrier (X^H X^h) × normal man (X^H Y). P(haemophiliac son):",opts:["0%","25%","50%","100%"],ans:1,sol:"Half sons get X^h. P(haemophiliac son)=1/4=25%."},
    {id:"B9",s:"Biology",t:"Genetics",q:"Crossing over (recombination) occurs during:",opts:["Mitosis anaphase","Meiosis I — prophase I","Meiosis II — metaphase II","Mitosis prophase"],ans:1,sol:"Crossing over: prophase I of meiosis I, during synapsis at chiasmata."},
    {id:"B10",s:"Biology",t:"Ecology",q:"The NICHE of an organism is:",opts:["The place where it lives","Its position in food chain","Its total functional role in the ecosystem","Its relationship with other species only"],ans:2,sol:"Niche = total functional role: habitat, diet, predators, interactions — broader than just habitat."},
    {id:"B11",s:"Biology",t:"Classification",q:"Characteristic common to ALL chordates:",opts:["Backbone","Warm-bloodedness","Notochord at some developmental stage","Four limbs"],ans:2,sol:"ALL chordates have a notochord at some stage. Not all have backbones (tunicates don't)."},
    {id:"B12",s:"Biology",t:"Classification",q:"Kingdom Protista organisms are:",opts:["Prokaryotic and unicellular","Eukaryotic and unicellular","Multicellular and heterotrophic","Prokaryotic and photosynthetic"],ans:1,sol:"Protists: EUKARYOTIC + mostly UNICELLULAR. Bacteria are prokaryotic."},
    {id:"B13",s:"Biology",t:"Nutrition",q:"Kwashiorkor is caused by:",opts:["Vitamin A deficiency","Carbohydrate deficiency","Protein deficiency with adequate calories","Total calorie deficiency"],ans:2,sol:"Kwashiorkor=protein deficiency+adequate calories. Marasmus=total calorie deficiency."},
    {id:"B14",s:"Biology",t:"Circulation",q:"Foetal haemoglobin compared to adult haemoglobin:",opts:["Contains iron","Has lower O₂ affinity","Has higher O₂ affinity at same pO₂","Only found in red blood cells"],ans:2,sol:"HbF has HIGHER O₂ affinity — allows it to extract O₂ from maternal blood across placenta."},
    {id:"B15",s:"Biology",t:"Excretion",q:"Counter-current multiplier in loop of Henle creates:",opts:["High blood pressure in kidney","Osmotic gradient in medulla for water reabsorption","Glucose reabsorption","Secretion of urea"],ans:1,sol:"Loop creates increasing osmotic gradient in renal medulla → water reabsorption under ADH control."},
    {id:"B16",s:"Biology",t:"Nervous System",q:"During nerve depolarisation, membrane potential reaches:",opts:["-90mV","0mV","+30 to +40mV","+70mV"],ans:2,sol:"Action potential: Na⁺ rushes in → membrane goes from -70mV to +30/+40mV."},
    {id:"B17",s:"Biology",t:"Hormones",q:"ADH is produced in _______ and stored/released from _______:",opts:["Posterior pituitary; kidney","Hypothalamus; posterior pituitary","Anterior pituitary; hypothalamus","Adrenal cortex; adrenal medulla"],ans:1,sol:"ADH: PRODUCED in hypothalamus, STORED/RELEASED from posterior pituitary."},
    {id:"B18",s:"Biology",t:"Reproduction",q:"Ovulation is triggered by a surge in:",opts:["Oestrogen only","Progesterone","LH (Luteinising Hormone)","FSH"],ans:2,sol:"LH surge (day 14) triggers ovulation — release of mature egg from Graafian follicle."},
    {id:"B19",s:"Biology",t:"Reproduction",q:"After releasing the ovum, Graafian follicle becomes:",opts:["Zona pellucida","Corpus luteum","Corpus albicans","Placenta"],ans:1,sol:"Graafian follicle → corpus luteum → secretes progesterone to maintain uterine lining."},
    {id:"B20",s:"Biology",t:"Evolution",q:"Natural selection acts primarily on:",opts:["Genotype only","Phenotype (reflecting genotype)","Random alleles","Mutations only"],ans:1,sol:"Natural selection acts on PHENOTYPE. Favourable genotypes selected indirectly through phenotypic expression."},
    {id:"B21",s:"Biology",t:"Evolution",q:"Hardy-Weinberg equilibrium requires:",opts:["Small population","Natural selection","Random mating and large population","Gene flow between populations"],ans:2,sol:"H-W: large population, no mutation, RANDOM MATING, no selection, no gene flow."},
    {id:"B22",s:"Biology",t:"Plant Biology",q:"Translocation in phloem is explained by:",opts:["Root pressure only","Transpiration pull","Pressure flow (mass flow) hypothesis","Cohesion-tension theory"],ans:2,sol:"Pressure flow: sugars loaded at source create high pressure → mass flow to sink regions."},
    {id:"B23",s:"Biology",t:"Diseases",q:"Typhoid fever is transmitted primarily by:",opts:["Mosquito bites","Contaminated food and water","Droplet infection","Sexual contact"],ans:1,sol:"Typhoid (Salmonella typhi): WATERBORNE/FOODBORNE disease."},
    {id:"B24",s:"Biology",t:"Diseases",q:"Vector of river blindness (Onchocerciasis):",opts:["Female Anopheles","Tsetse fly","Blackfly (Simulium)","Sand fly"],ans:2,sol:"River blindness = Onchocerca volvulus transmitted by blackfly (Simulium) in fast-flowing rivers."},
    {id:"B25",s:"Biology",t:"Cell Biology",q:"Plasmolysis in plant cell placed in hypertonic solution because:",opts:["Water enters, cell bursts","Cell wall softens","Water leaves by osmosis, membrane pulls away from wall","Vacuole fills with solutes"],ans:2,sol:"Hypertonic: water leaves by osmosis → cytoplasm shrinks → membrane pulls away from cell wall."},
    {id:"B26",s:"Biology",t:"Plant Biology",q:"Opening and closing of stomata is controlled by:",opts:["Mesophyll cells","Root hair cells","Guard cells","Epidermal cells"],ans:2,sol:"Guard cells: K⁺ enters → turgid → stomata open. K⁺ leaves → flaccid → stomata close."},
    {id:"B27",s:"Biology",t:"Nutrition",q:"Rickets caused by vitamin D deficiency leads to:",opts:["Night blindness","Poor calcium absorption and soft bones","Scurvy","Anaemia"],ans:1,sol:"Vitamin D needed for intestinal Ca²⁺ absorption. Deficiency → soft/deformed bones."},
    {id:"B28",s:"Biology",t:"Classification",q:"Viruses are non-living because they:",opts:["Lack DNA","Cannot reproduce at all","Lack cellular structure and metabolism outside a host","Are too small to see"],ans:2,sol:"Viruses lack cellular structure, have no metabolic machinery, cannot reproduce outside a host cell."},
    {id:"B29",s:"Biology",t:"Genetics",q:"Test cross gives 50% tall, 50% short. Tall parent genotype:",opts:["TT","Tt","tt","Cannot determine"],ans:1,sol:"TT×tt→all tall. Tt×tt→50%:50%. 50:50 result → parent is Tt (heterozygous)."},
    {id:"B30",s:"Biology",t:"Ecology",q:"Pyramid of numbers may be INVERTED when:",opts:["Producers are very numerous","Carnivores outnumber herbivores","One large tree supports many insects","Energy lost at each level"],ans:2,sol:"One tree (producer) supporting thousands of insects → inverted pyramid at base."},
    {id:"B31",s:"Biology",t:"Hormones",q:"Hormone that maintains uterine lining and inhibits ovulation during pregnancy:",opts:["Oestrogen","FSH","Progesterone","Oxytocin"],ans:2,sol:"Progesterone: maintains uterine lining, inhibits further ovulation during pregnancy."},
    {id:"B32",s:"Biology",t:"Nervous System",q:"Myelin sheath produced by:",opts:["Astrocytes","Microglia","Schwann cells (PNS) and oligodendrocytes (CNS)","Ependymal cells"],ans:2,sol:"Schwann cells (PNS) and oligodendrocytes (CNS) produce myelin → speeds nerve impulse."},
    {id:"B33",s:"Biology",t:"Genetics",q:"Two CF carriers (autosomal recessive). P(carrier child):",opts:["25%","50%","75%","100%"],ans:1,sol:"Carrier×Carrier: 1AA:2Aa:1aa. P(carrier Aa)=2/4=50%."},
    {id:"B34",s:"Biology",t:"Cell Division",q:"Chromosomes align at equatorial plate during:",opts:["Prophase","Metaphase","Anaphase","Telophase"],ans:1,sol:"Metaphase: chromosomes line up at metaphase plate. Spindle fibres attach to centromeres."},
    {id:"B35",s:"Biology",t:"Ecology",q:"Process returning nitrogen from dead organisms to soil as ammonia:",opts:["Nitrification","Denitrification","Nitrogen fixation","Ammonification"],ans:3,sol:"Ammonification: decomposers break down organic N → ammonia (NH₃) released into soil."},
    {id:"B36",s:"Biology",t:"Cell Biology",q:"Fluid mosaic model of cell membrane describes:",opts:["Rigid protein bilayer","Phospholipid bilayer with embedded and floating proteins","Protein layer surrounding lipid core","Static lipid arrangement"],ans:1,sol:"Fluid mosaic: phospholipid bilayer + embedded/peripheral proteins. Fluid=lateral movement, mosaic=varied proteins."},
    {id:"B37",s:"Biology",t:"Nutrition",q:"Enzyme converting maltose to glucose in small intestine:",opts:["Amylase","Lipase","Maltase","Sucrase"],ans:2,sol:"Maltase (brush border): maltose → 2 glucose. Sucrase: sucrose → glucose+fructose."},
    {id:"B38",s:"Biology",t:"Plant Biology",q:"Main function of root hair cells:",opts:["Photosynthesise","Anchor plant only","Increase surface area for absorption of water and minerals","Store starch"],ans:2,sol:"Root hair cells: elongated → increased SA for water (osmosis) and mineral absorption (active transport)."},
    {id:"B39",s:"Biology",t:"Ecology",q:"Sudden decrease in prey population would FIRST cause:",opts:["Predator population to immediately increase","Predator population to decrease due to food shortage","Prey stays constant","No change in predators"],ans:1,sol:"Less prey → less food → predator population decreases. Then prey recovers → oscillating cycle."},
    {id:"B40",s:"Biology",t:"Cell Biology",q:"Primary function of lysosomes:",opts:["Protein synthesis","ATP production","Intracellular digestion using hydrolytic enzymes","Lipid synthesis"],ans:2,sol:"Lysosomes: hydrolytic enzymes for intracellular digestion of worn-out organelles and foreign particles."},
  ],
};

function buildQs(comboIdx) {
  const sciences = COMBOS[comboIdx].sciences;
  let qs = [...QB.English];
  sciences.forEach(sub => { if(QB[sub]) qs = [...qs,...QB[sub]]; });
  return qs;
}

function calcScore(questions, answers) {
  let correct = 0;
  const bySub = {};
  questions.forEach(q => {
    if(!bySub[q.s]) bySub[q.s] = { correct:0, total:0 };
    bySub[q.s].total++;
    if(answers[q.id] === q.ans) { correct++; bySub[q.s].correct++; }
  });
  return { correct, total:questions.length, jambScore:Math.round((correct/questions.length)*400), pct:Math.round((correct/questions.length)*100), bySub };
}

const fmt = s => `${Math.floor(s/3600)}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

const Inp = ({label,type,ph,val,onChange,err}) => (
  <div style={{marginBottom:"13px"}}>
    <label style={{color:"#94a3b8",fontSize:"12px",fontWeight:"bold",display:"block",marginBottom:"4px"}}>{label}</label>
    <input type={type} placeholder={ph} value={val} onChange={onChange}
      style={{width:"100%",padding:"10px 13px",borderRadius:"10px",border:`1px solid ${err?"#ef4444":"rgba(255,255,255,0.15)"}`,background:"rgba(255,255,255,0.06)",color:"white",fontSize:"13px",boxSizing:"border-box",outline:"none"}}/>
    {err && <p style={{color:"#ef4444",fontSize:"10px",margin:"3px 0 0"}}>{err}</p>}
  </div>
);

export default function App() {
  const [phase, setPhase]         = useState("signup");
  const [form, setForm]           = useState({name:"",email:"",password:"",whatsapp:"",school:"",combo:"0"});
  const [errs, setErrs]           = useState({});
  const [loading, setLoading]     = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers]     = useState({});
  const [flagged, setFlagged]     = useState({});
  const [cur, setCur]             = useState(0);
  const [timeLeft, setTimeLeft]   = useState(TOTAL_SECS);
  const [subFilter, setSubFilter] = useState("All");
  const [confirm, setConfirm]     = useState(false);
  const [result, setResult]       = useState(null);
  const [solSub, setSolSub]       = useState("All");
  const [results, setResults]     = useState([]);
  const [adminPw, setAdminPw]     = useState("");
  const [adminOk, setAdminOk]     = useState(false);
  const [showPassage, setShowPassage] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get("agita_v5",true); if(r?.value) setResults(JSON.parse(r.value)); } catch(_) {}
    })();
  }, []);

  useEffect(() => {
    if(phase !== "exam") return;
    if(timeLeft <= 0) { doSubmit(); return; }
    const t = setTimeout(() => setTimeLeft(t => t-1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  const tc = timeLeft < 300 ? "#ef4444" : timeLeft < 600 ? "#f59e0b" : "#22c55e";
  const examSubs = ["All", ...new Set(questions.map(q => q.s))];
  const filtQs   = subFilter === "All" ? questions : questions.filter(q => q.s === subFilter);
  const cq       = filtQs[cur] || null;
  const qi       = cq ? filtQs.indexOf(cq) : 0;
  const cc       = cq ? CFG[cq.s] : CFG.English;
  const ac       = Object.keys(answers).length;
  const fld      = (k,v) => setForm(p => ({...p,[k]:v}));
  const isComp   = cq && cq.isComp;

  const validate = () => {
    const e = {};
    if(!form.name.trim())  e.name = "Name is required";
    if(!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if(form.password.length < 6) e.password = "Min 6 characters";
    if(!/^[0-9]{10,13}$/.test(form.whatsapp.replace(/[\s\-+]/g,""))) e.whatsapp = "Valid number (10–13 digits)";
    if(!form.school.trim()) e.school = "School/university required";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const startExam = async () => {
    if(!validate()) return;
    setLoading(true);
    try {
      const ex = await window.storage.get(`agita_att_${form.email.toLowerCase().trim()}`, true);
      if(ex?.value) { setErrs({email:"This email has already completed the exam. One attempt only."}); setLoading(false); return; }
    } catch(_) {}
    const qs = buildQs(Number(form.combo));
    setQuestions(qs); setAnswers({}); setFlagged({}); setCur(0); setSubFilter("All"); setTimeLeft(TOTAL_SECS);
    setPhase("exam"); setLoading(false);
  };

  const doSubmit = useCallback(async () => {
    setConfirm(false);
    const qs = questions, ans = answers;
    const sc = calcScore(qs, ans);
    const ts = new Date().toLocaleString("en-NG", {timeZone:"Africa/Lagos"});
    const res = {...form, combo:COMBOS[Number(form.combo)].label, ...sc, timestamp:ts, questions:qs, answers:ans};
    setResult(res); setSolSub("All");
    try {
      const prev = await window.storage.get("agita_v5", true);
      const arr  = prev?.value ? JSON.parse(prev.value) : [];
      arr.push({name:form.name,email:form.email,whatsapp:form.whatsapp,school:form.school,combo:res.combo,...sc,timestamp:ts});
      await window.storage.set("agita_v5", JSON.stringify(arr), true);
      setResults(arr);
    } catch(_) {}
    try { await window.storage.set(`agita_att_${form.email.toLowerCase().trim()}`, "done", true); } catch(_) {}
    setPhase("result");
  }, [questions, answers, form]);

  // ── SIGNUP ────────────────────────────────────────────────────────────────
  if(phase === "signup") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#0f172a 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",fontFamily:"Georgia,serif"}}>
      <div style={{background:"rgba(255,255,255,0.04)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px",padding:"28px 22px",maxWidth:"460px",width:"100%",boxShadow:"0 32px 64px rgba(0,0,0,0.6)"}}>
        <div style={{textAlign:"center",marginBottom:"20px"}}>
          <div style={{fontSize:"48px",marginBottom:"6px"}}>🎯</div>
          <h1 style={{color:"#f59e0b",fontSize:"22px",fontWeight:"bold",margin:"0 0 3px"}}>AGITA Mock CBT 2026</h1>
          <p style={{color:"#64748b",fontSize:"11px",margin:0}}>One attempt per candidate • All fields required</p>
        </div>
        <Inp label="Full Name *" type="text" ph="e.g. Adebayo Emmanuel" val={form.name} onChange={e=>fld("name",e.target.value)} err={errs.name}/>
        <Inp label="Email Address *" type="email" ph="e.g. adebayo@gmail.com" val={form.email} onChange={e=>fld("email",e.target.value)} err={errs.email}/>
        <Inp label="Password *" type="password" ph="Minimum 6 characters" val={form.password} onChange={e=>fld("password",e.target.value)} err={errs.password}/>
        <Inp label="WhatsApp Number *" type="tel" ph="e.g. 08012345678" val={form.whatsapp} onChange={e=>fld("whatsapp",e.target.value)} err={errs.whatsapp}/>
        <Inp label="Aspired University / School *" type="text" ph="e.g. University of Lagos" val={form.school} onChange={e=>fld("school",e.target.value)} err={errs.school}/>

        <div style={{marginBottom:"18px"}}>
          <label style={{color:"#94a3b8",fontSize:"12px",fontWeight:"bold",display:"block",marginBottom:"7px"}}>Subject Combination *</label>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {COMBOS.map((c,i) => (
              <label key={i} style={{display:"flex",alignItems:"center",gap:"9px",padding:"9px 12px",borderRadius:"10px",border:`1px solid ${Number(form.combo)===i?"#f59e0b":"rgba(255,255,255,0.1)"}`,background:Number(form.combo)===i?"rgba(245,158,11,0.1)":"rgba(255,255,255,0.03)",cursor:"pointer"}}>
                <input type="radio" name="combo" value={i} checked={Number(form.combo)===i} onChange={e=>fld("combo",e.target.value)} style={{accentColor:"#f59e0b"}}/>
                <span style={{color:"white",fontSize:"11px"}}>📚 English + {c.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:"9px",padding:"10px",marginBottom:"16px"}}>
          {["⏱ 2 Hours • 180 Questions","📖 Comprehension + Literature (The Lekki Headmaster) included","🚫 One attempt only — no retake","📊 Score over 400 (JAMB standard) + solutions shown after"].map((r,i) => (
            <div key={i} style={{color:"#94a3b8",fontSize:"11px",marginBottom:i<3?"3px":0}}>• {r}</div>
          ))}
        </div>

        <button onClick={startExam} disabled={loading}
          style={{width:"100%",padding:"13px",borderRadius:"11px",background:loading?"#374151":"linear-gradient(135deg,#f59e0b,#d97706)",color:"white",fontSize:"14px",fontWeight:"bold",border:"none",cursor:loading?"not-allowed":"pointer",boxShadow:"0 8px 20px rgba(245,158,11,0.3)"}}>
          {loading ? "Checking..." : "START EXAM 🚀"}
        </button>
        <div style={{textAlign:"center",marginTop:"12px"}}>
          <button onClick={() => setPhase("admin")} style={{background:"transparent",border:"none",color:"#334155",fontSize:"10px",cursor:"pointer",textDecoration:"underline"}}>Admin Results Dashboard</button>
        </div>
      </div>
    </div>
  );

  // ── RESULT + SOLUTIONS ────────────────────────────────────────────────────
  if(phase === "result" && result) {
    const {jambScore,pct,correct,total,bySub,questions:qs,answers:ans,name,school,combo} = result;
    const grade = jambScore>=280?"EXCELLENT 🌟":jambScore>=200?"GOOD 👍":jambScore>=160?"AVERAGE 📈":"NEEDS MORE STUDY 📚";
    const gc    = jambScore>=280?"#22c55e":jambScore>=200?"#f59e0b":jambScore>=160?"#fb923c":"#ef4444";
    const solQs = solSub==="All" ? qs : qs.filter(q => q.s===solSub);
    const solSubs = ["All",...new Set(qs.map(q => q.s))];
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#1e293b)",padding:"14px",fontFamily:"Georgia,serif"}}>
        <div style={{maxWidth:"680px",margin:"0 auto",paddingTop:"20px"}}>
          {/* Score card */}
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"18px",padding:"24px",textAlign:"center",marginBottom:"12px"}}>
            <div style={{fontSize:"44px",marginBottom:"6px"}}>🏆</div>
            <h1 style={{color:"#f59e0b",fontSize:"20px",margin:"0 0 3px"}}>Exam Complete!</h1>
            <p style={{color:"#64748b",fontSize:"11px",margin:"0 0 2px"}}>{name} • {school}</p>
            <p style={{color:"#475569",fontSize:"10px",margin:"0 0 16px"}}>English + {combo}</p>
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"14px",padding:"18px",marginBottom:"12px"}}>
              <div style={{color:"#94a3b8",fontSize:"10px",letterSpacing:"1px",marginBottom:"3px"}}>JAMB SCORE</div>
              <div style={{fontSize:"56px",fontWeight:"bold",color:gc,lineHeight:1}}>{jambScore}</div>
              <div style={{color:"#64748b",fontSize:"11px",marginBottom:"8px"}}>out of 400</div>
              <div style={{display:"flex",justifyContent:"center",gap:"24px",marginBottom:"8px"}}>
                <div><div style={{color:gc,fontSize:"18px",fontWeight:"bold"}}>{pct}%</div><div style={{color:"#64748b",fontSize:"10px"}}>Percentage</div></div>
                <div><div style={{color:"#e2e8f0",fontSize:"18px",fontWeight:"bold"}}>{correct}/{total}</div><div style={{color:"#64748b",fontSize:"10px"}}>Correct</div></div>
              </div>
              <div style={{color:gc,fontWeight:"bold",fontSize:"14px"}}>{grade}</div>
            </div>
            <div style={{display:"grid",gap:"7px"}}>
              {Object.entries(bySub).map(([s,d]) => {
                const c = CFG[s]||CFG.English, sp = Math.round(d.correct/d.total*100);
                return (<div key={s} style={{background:"rgba(255,255,255,0.04)",borderRadius:"9px",padding:"10px",border:`1px solid ${c.c}25`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
                    <span style={{color:"white",fontWeight:"bold",fontSize:"12px"}}>{c.i} {s}</span>
                    <span style={{color:c.c,fontWeight:"bold",fontSize:"12px"}}>{d.correct}/{d.total} ({sp}%)</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.08)",borderRadius:"99px",height:"5px"}}>
                    <div style={{background:c.c,borderRadius:"99px",height:"5px",width:`${sp}%`}}/>
                  </div>
                </div>);
              })}
            </div>
          </div>

          {/* Solutions */}
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"18px",padding:"18px",marginBottom:"12px"}}>
            <h2 style={{color:"#f59e0b",fontSize:"15px",margin:"0 0 12px"}}>📝 Solutions & Corrections</h2>
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"14px"}}>
              {solSubs.map(s => {
                const sc = s!=="All"?CFG[s]:null, ia = solSub===s;
                return(<button key={s} onClick={() => setSolSub(s)}
                  style={{padding:"4px 10px",borderRadius:"99px",border:"none",cursor:"pointer",fontSize:"10px",fontWeight:"bold",background:ia?(sc?sc.c:"#f59e0b"):"rgba(255,255,255,0.08)",color:ia?"white":"#64748b"}}>
                  {s!=="All"&&sc.i} {s}
                </button>);
              })}
            </div>

            {/* Passage shown when English selected */}
            {(solSub==="All"||solSub==="English") && (
              <div style={{background:"rgba(180,83,9,0.07)",border:"1px solid rgba(180,83,9,0.25)",borderRadius:"10px",padding:"12px",marginBottom:"14px"}}>
                <div style={{color:"#f59e0b",fontWeight:"bold",fontSize:"11px",marginBottom:"8px"}}>📄 COMPREHENSION PASSAGE (Reference — Q1 to Q10)</div>
                <p style={{color:"#94a3b8",fontSize:"11px",lineHeight:"1.8",margin:0,whiteSpace:"pre-line"}}>{PASSAGE}</p>
              </div>
            )}

            {solQs.map((q, idx) => {
              const ua = ans[q.id], isC = ua===q.ans, c = CFG[q.s]||CFG.English;
              return (<div key={q.id} style={{marginBottom:"12px",padding:"12px",borderRadius:"11px",background:isC?"rgba(34,197,94,0.05)":"rgba(239,68,68,0.05)",border:`1px solid ${isC?"rgba(34,197,94,0.18)":"rgba(239,68,68,0.18)"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}>
                  <span style={{background:c.c,color:"white",borderRadius:"99px",padding:"2px 7px",fontSize:"9px",fontWeight:"bold"}}>{c.i} {q.t}</span>
                  <span style={{fontSize:"14px"}}>{isC?"✅":"❌"}</span>
                </div>
                <p style={{color:"white",fontSize:"12px",fontWeight:"bold",margin:"0 0 7px",lineHeight:"1.5"}}>Q{idx+1}. {q.q}</p>
                <div style={{display:"flex",flexDirection:"column",gap:"3px",marginBottom:"7px"}}>
                  {q.opts.map((opt, i) => {
                    const isCO=i===q.ans, isUO=i===ua;
                    let bg="rgba(255,255,255,0.03)", bdr="rgba(255,255,255,0.07)", col="#64748b";
                    if(isCO) { bg="rgba(34,197,94,0.1)"; bdr="#22c55e"; col="#22c55e"; }
                    if(isUO&&!isCO) { bg="rgba(239,68,68,0.1)"; bdr="#ef4444"; col="#ef4444"; }
                    return (<div key={i} style={{padding:"5px 10px",borderRadius:"7px",background:bg,border:`1px solid ${bdr}`,color:col,fontSize:"11px"}}>
                      <span style={{fontWeight:"bold",marginRight:"5px"}}>{["A","B","C","D"][i]})</span>{opt}
                      {isCO && <span style={{marginLeft:"5px",fontSize:"10px"}}>✓ Correct answer</span>}
                      {isUO&&!isCO && <span style={{marginLeft:"5px",fontSize:"10px"}}>✗ Your answer</span>}
                      {ua===undefined&&isCO && <span style={{marginLeft:"5px",fontSize:"10px",color:"#64748b"}}>(not attempted)</span>}
                    </div>);
                  })}
                </div>
                <div style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.18)",borderRadius:"7px",padding:"8px"}}>
                  <span style={{color:"#f59e0b",fontSize:"10px",fontWeight:"bold"}}>💡 </span>
                  <span style={{color:"#cbd5e1",fontSize:"11px"}}>{q.sol}</span>
                </div>
              </div>);
            })}
          </div>

          <div style={{background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:"11px",padding:"10px",textAlign:"center"}}>
            <span style={{color:"#f87171",fontSize:"11px"}}>🚫 This was your one attempt. No retake. Good luck in JAMB! 💪</span>
          </div>
        </div>
      </div>
    );
  }

  // ── ADMIN ─────────────────────────────────────────────────────────────────
  if(phase === "admin") return (
    <div style={{minHeight:"100vh",background:"#0f172a",padding:"16px",fontFamily:"Georgia,serif"}}>
      <div style={{maxWidth:"100%",margin:"0 auto"}}>
        <button onClick={() => setPhase("signup")} style={{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:"8px",padding:"7px 12px",color:"#94a3b8",cursor:"pointer",marginBottom:"16px",fontSize:"11px"}}>← Back</button>
        <h1 style={{color:"#f59e0b",fontSize:"18px",marginBottom:"4px"}}>🎯 AGITA Results Dashboard</h1>
        <p style={{color:"#64748b",fontSize:"11px",marginBottom:"18px"}}>Admin access • Password protected</p>
        {!adminOk ? (
          <div style={{maxWidth:"300px"}}>
            <input type="password" placeholder="Admin password" value={adminPw} onChange={e=>setAdminPw(e.target.value)}
              style={{width:"100%",padding:"10px",borderRadius:"9px",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"white",fontSize:"12px",marginBottom:"10px",boxSizing:"border-box",outline:"none"}}/>
            <button onClick={async () => {
              if(adminPw !== ADMIN_PASSWORD) { alert("Wrong password"); return; }
              setAdminOk(true);
              try { const r = await window.storage.get("agita_v5",true); if(r?.value) setResults(JSON.parse(r.value)); } catch(_) {}
            }} style={{width:"100%",padding:"11px",borderRadius:"9px",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"white",fontWeight:"bold",border:"none",cursor:"pointer",fontSize:"13px"}}>
              Access Dashboard
            </button>
          </div>
        ) : (
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px",marginBottom:"20px"}}>
              {[["👥 Total",results.length,"#f59e0b"],["📊 Avg",results.length?Math.round(results.reduce((a,r)=>a+r.jambScore,0)/results.length)+"/400":"0","#22c55e"],["✅ ≥200",results.filter(r=>r.jambScore>=200).length,"#3b82f6"],["⚠️ <160",results.filter(r=>r.jambScore<160).length,"#ef4444"]].map(([l,v,c]) => (
                <div key={l} style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${c}30`,borderRadius:"12px",padding:"14px",textAlign:"center"}}>
                  <div style={{color:c,fontSize:"24px",fontWeight:"bold"}}>{v}</div>
                  <div style={{color:"#64748b",fontSize:"10px",marginTop:"3px"}}>{l}</div>
                </div>
              ))}
            </div>
            {results.length === 0 ? (
              <div style={{color:"#475569",textAlign:"center",padding:"30px",fontSize:"13px"}}>No results yet.</div>
            ) : (
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:"11px"}}>
                  <thead><tr style={{background:"rgba(245,158,11,0.1)"}}>
                    {["#","Name","Email","WhatsApp","School","Combo","Score","Pct","Date"].map(h => (
                      <th key={h} style={{padding:"8px",color:"#f59e0b",textAlign:"left",fontWeight:"bold",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {[...results].reverse().map((r, i) => {
                      const gc2 = r.jambScore>=280?"#22c55e":r.jambScore>=200?"#f59e0b":r.jambScore>=160?"#fb923c":"#ef4444";
                      return (<tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.04)",background:i%2===0?"transparent":"rgba(255,255,255,0.02)"}}>
                        <td style={{padding:"8px",color:"#64748b"}}>{results.length-i}</td>
                        <td style={{padding:"8px",color:"white",fontWeight:"bold",whiteSpace:"nowrap"}}>{r.name}</td>
                        <td style={{padding:"8px",color:"#94a3b8",whiteSpace:"nowrap"}}>{r.email}</td>
                        <td style={{padding:"8px",color:"#94a3b8",whiteSpace:"nowrap"}}>{r.whatsapp}</td>
                        <td style={{padding:"8px",color:"#94a3b8",whiteSpace:"nowrap"}}>{r.school}</td>
                        <td style={{padding:"8px",color:"#94a3b8",fontSize:"10px",whiteSpace:"nowrap"}}>{r.combo}</td>
                        <td style={{padding:"8px",color:gc2,fontWeight:"bold",fontSize:"13px",whiteSpace:"nowrap"}}>{r.jambScore}/400</td>
                        <td style={{padding:"8px",color:gc2,whiteSpace:"nowrap"}}>{r.pct}%</td>
                        <td style={{padding:"8px",color:"#64748b",fontSize:"10px",whiteSpace:"nowrap"}}>{r.timestamp}</td>
                      </tr>);
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  // ── EXAM ──────────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100vh",background:"#0f172a",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column"}}>
      {/* Top bar */}
      <div style={{background:"#1e293b",borderBottom:"1px solid #334155",padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
        <div><div style={{color:"#f59e0b",fontWeight:"bold",fontSize:"11px"}}>🎯 AGITA Mock CBT</div><div style={{color:"#475569",fontSize:"10px"}}>{form.name}</div></div>
        <div style={{background:timeLeft<300?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${tc}40`,borderRadius:"99px",padding:"4px 12px",color:tc,fontWeight:"bold",fontSize:"14px",fontFamily:"monospace"}}>⏱ {fmt(timeLeft)}</div>
        <div style={{textAlign:"right"}}><div style={{color:"#64748b",fontSize:"10px"}}>{ac}/{questions.length}</div><div style={{color:"#475569",fontSize:"9px"}}>answered</div></div>
      </div>

      {/* Subject tabs */}
      <div style={{background:"#1e293b",padding:"7px 12px",display:"flex",gap:"5px",overflowX:"auto",borderBottom:"1px solid #334155"}}>
        {examSubs.map(s => {
          const sc = s!=="All"?CFG[s]:null, ia = subFilter===s;
          const cnt = s!=="All"?Object.keys(answers).filter(k=>questions.find(q=>q.id===k)?.s===s).length:ac;
          const tot = s!=="All"?questions.filter(q=>q.s===s).length:questions.length;
          return (<button key={s} onClick={() => {setSubFilter(s);setCur(0);}}
            style={{padding:"4px 10px",borderRadius:"99px",border:"none",cursor:"pointer",whiteSpace:"nowrap",fontSize:"10px",fontWeight:"bold",background:ia?(sc?sc.c:"#f59e0b"):"rgba(255,255,255,0.07)",color:ia?"white":"#64748b"}}>
            {s!=="All"&&sc.i} {s} ({cnt}/{tot})
          </button>);
        })}
      </div>

      {cq && (
        <div style={{flex:1,padding:"12px",maxWidth:"680px",margin:"0 auto",width:"100%",boxSizing:"border-box"}}>

          {/* Comprehension passage toggle */}
          {isComp && (
            <div style={{marginBottom:"10px"}}>
              <button onClick={() => setShowPassage(!showPassage)}
                style={{width:"100%",padding:"10px 14px",borderRadius:"10px",background:"rgba(180,83,9,0.12)",border:"1px solid rgba(180,83,9,0.35)",color:"#f59e0b",fontSize:"12px",fontWeight:"bold",cursor:"pointer",textAlign:"left"}}>
                📄 {showPassage?"Hide":"Show"} Comprehension Passage (Q1–Q10) {showPassage?"▲":"▼"}
              </button>
              {showPassage && (
                <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(180,83,9,0.25)",borderRadius:"10px",padding:"14px",marginTop:"8px",maxHeight:"260px",overflowY:"auto"}}>
                  <p style={{color:"#cbd5e1",fontSize:"12px",lineHeight:"1.8",margin:0,whiteSpace:"pre-line"}}>{PASSAGE}</p>
                </div>
              )}
            </div>
          )}

          {/* Q header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
              <span style={{background:cc.c,color:"white",borderRadius:"99px",padding:"3px 9px",fontSize:"10px",fontWeight:"bold"}}>{cc.i} {cq.t}</span>
              <span style={{color:"#475569",fontSize:"10px"}}>Q{qi+1}/{filtQs.length}</span>
            </div>
            <button onClick={() => setFlagged(p => ({...p,[cq.id]:!p[cq.id]}))}
              style={{background:flagged[cq.id]?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.06)",border:flagged[cq.id]?"1px solid #f59e0b":"1px solid rgba(255,255,255,0.1)",borderRadius:"7px",padding:"4px 9px",color:flagged[cq.id]?"#f59e0b":"#64748b",cursor:"pointer",fontSize:"10px"}}>
              {flagged[cq.id]?"🚩 Flagged":"⚑ Flag"}
            </button>
          </div>

          {/* Question */}
          <div style={{background:"#1e293b",border:`1px solid ${cc.c}30`,borderRadius:"13px",padding:"18px",marginBottom:"12px"}}>
            <p style={{color:"white",fontSize:"13px",lineHeight:"1.7",margin:0}}>
              <span style={{color:cc.c,fontWeight:"bold",marginRight:"7px"}}>Q{qi+1}.</span>{cq.q}
            </p>
          </div>

          {/* Options */}
          <div style={{display:"flex",flexDirection:"column",gap:"7px",marginBottom:"14px"}}>
            {cq.opts.map((opt, idx) => {
              const sel = answers[cq.id] === idx;
              return (<button key={idx} onClick={() => setAnswers(p => ({...p,[cq.id]:idx}))}
                style={{padding:"11px 14px",borderRadius:"9px",textAlign:"left",cursor:"pointer",fontSize:"12px",lineHeight:"1.5",background:sel?`${cc.c}20`:"rgba(255,255,255,0.03)",border:sel?`2px solid ${cc.c}`:"2px solid rgba(255,255,255,0.07)",color:sel?"white":"#94a3b8"}}>
                <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"20px",height:"20px",borderRadius:"50%",marginRight:"9px",fontSize:"10px",fontWeight:"bold",background:sel?cc.c:"rgba(255,255,255,0.08)",color:sel?"white":"#64748b"}}>
                  {["A","B","C","D"][idx]}
                </span>{opt}
              </button>);
            })}
          </div>

          {/* Navigation */}
          <div style={{display:"flex",gap:"7px",marginBottom:"14px"}}>
            <button onClick={() => setCur(Math.max(0,qi-1))} disabled={qi===0}
              style={{flex:1,padding:"9px",borderRadius:"9px",border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:qi===0?"#334155":"#94a3b8",cursor:qi===0?"not-allowed":"pointer",fontSize:"12px"}}>← Prev</button>
            <button onClick={() => setCur(Math.min(filtQs.length-1,qi+1))} disabled={qi===filtQs.length-1}
              style={{flex:1,padding:"9px",borderRadius:"9px",border:`1px solid ${cc.c}45`,background:`${cc.c}12`,color:qi===filtQs.length-1?"#334155":cc.c,cursor:qi===filtQs.length-1?"not-allowed":"pointer",fontSize:"12px",fontWeight:"bold"}}>Next →</button>
          </div>

          {/* Grid navigator */}
          <div style={{background:"#1e293b",borderRadius:"12px",padding:"12px",marginBottom:"14px"}}>
            <div style={{color:"#475569",fontSize:"10px",marginBottom:"7px",display:"flex",justifyContent:"space-between"}}>
              <span>Navigator</span>
              <span style={{color:"#f59e0b"}}>🚩 {Object.values(flagged).filter(Boolean).length} flagged</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"3px"}}>
              {filtQs.map((q, idx) => {
                const ia2=answers[q.id]!==undefined, ifl=flagged[q.id], ic=q.id===cq.id, qc=CFG[q.s];
                return (<button key={q.id} onClick={() => setCur(idx)}
                  style={{width:"26px",height:"26px",borderRadius:"5px",border:ic?`2px solid ${qc.c}`:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",fontSize:"8px",fontWeight:"bold",background:ic?qc.c:ia2?`${qc.c}30`:ifl?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)",color:ic?"white":ia2?qc.c:ifl?"#f59e0b":"#475569"}}>
                  {idx+1}
                </button>);
              })}
            </div>
          </div>

          <button onClick={() => setConfirm(true)}
            style={{width:"100%",padding:"13px",borderRadius:"11px",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"white",fontSize:"13px",fontWeight:"bold",border:"none",cursor:"pointer",boxShadow:"0 6px 18px rgba(245,158,11,0.28)"}}>
            Submit Exam 📝
          </button>
        </div>
      )}

      {confirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:"16px"}}>
          <div style={{background:"#1e293b",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"18px",padding:"24px",maxWidth:"360px",width:"100%",textAlign:"center"}}>
            <div style={{fontSize:"40px",marginBottom:"10px"}}>⚠️</div>
            <h2 style={{color:"white",margin:"0 0 8px",fontSize:"17px"}}>Submit Exam?</h2>
            <div style={{color:"#64748b",fontSize:"12px",marginBottom:"5px"}}>Answered: <span style={{color:"#22c55e",fontWeight:"bold"}}>{ac}/{questions.length}</span></div>
            <div style={{color:"#64748b",fontSize:"12px",marginBottom:"14px"}}>Unanswered: <span style={{color:"#ef4444",fontWeight:"bold"}}>{questions.length-ac}</span></div>
            <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:"9px",padding:"9px",marginBottom:"18px"}}>
              <span style={{color:"#f87171",fontSize:"11px"}}>⚠️ This is your ONE attempt. You cannot retake.</span>
            </div>
            <div style={{display:"flex",gap:"9px"}}>
              <button onClick={() => setConfirm(false)} style={{flex:1,padding:"10px",borderRadius:"9px",border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#94a3b8",cursor:"pointer",fontSize:"12px"}}>Cancel</button>
              <button onClick={doSubmit} style={{flex:1,padding:"10px",borderRadius:"9px",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"white",fontWeight:"bold",border:"none",cursor:"pointer",fontSize:"12px"}}>Submit ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
