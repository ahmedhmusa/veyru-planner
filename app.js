(function(){
'use strict';
var KEY='veyru-planner-v1';

/* ---------- Data from the playbook ---------- */
var CATS={action:'Action',id:'Fish ID',gear:'Gear & tips',life:'Lifestyle',comm:'Community',long:'Long video'};
var IDEAS=[
[1,'action','Big catch reveal','LOOK WHAT CAME UP FROM THE DEEP','Open on the fish, then strike, fight, hero shot held 2-3 sec.'],
[2,'action','Hardest strike of the day','THIS FISH HIT HARD','Best rod-bend clip with natural drag sound.'],
[3,'action','GT on the cast','GIANT TREVALLY ATTACK','Cast, boil at the surface, rod loads, GT reveal. Name the lure.'],
[4,'action','Rod bent double','WILL THE ROD SURVIVE?','Slow-mo of the rod under load, then the payoff.'],
[5,'action','Fish coming up from the deep','WATCH THIS COME UP FROM 100M','Show the color flash appearing in the blue water.'],
[6,'action','The one that got away','SO CLOSE...','Fight, then the loss; end with the lesson you learned.'],
[7,'action','Double hook-up','TWO AT ONCE!','Both rods bent, two reactions, two fish.'],
[8,'action','Release in slow motion','SEE YOU NEXT TIME','60 fps release clip, calm music, logo at the end.'],
[9,'action','Fight in 15 seconds','45 MINUTES IN 15 SECONDS','Time-compressed fight with text counters.'],
[10,'action','Reaction only','MY FACE SAYS IT ALL','Face close-up during the fight, then reveal the fish.'],
[11,'id','Teeth close-up tease','WHAT FISH IS THIS?','2-3 sec close-up, then the full fish, then the name in large text.'],
[12,'id','Guess the fish','GUESS BEFORE THE REVEAL','Show 3 clues (color, teeth, eye), reveal at the end.'],
[13,'id','Weird fish of the week','STRANGEST FISH TODAY','Unusual shape or color, one fact only.'],
[14,'id','Reef fish vs deep fish','REEF VS DEEP','Two fish side by side, one difference each.'],
[15,'id','Colors out of water','THE COLORS ARE INSANE','Slow pan over the fish in daylight.'],
[16,'id','Would you touch those teeth?','WOULD YOU TOUCH THIS?','Close-up of the teeth, ask the viewer to comment.'],
[17,'id','Guess the weight','HOW HEAVY IS IT?','Hold the fish clearly, hide the answer, reveal at the end.'],
[18,'id','Local name vs English name','WHAT DO YOU CALL THIS?','Show the fish, both names on screen, invite Dhivehi comments.'],
[19,'gear','What caught it','THIS is what caught it','Open on the catch, cut to the lure, show weight and color.'],
[20,'gear','Jig weight test','60G VS 120G','Same spot, two jigs, one simple result.'],
[21,'gear','Best color today','WHICH COLOR WON?','Line up the lures used, show which one got the fish.'],
[22,'gear','Quick tip: jig cadence','STOP JIGGING LIKE THIS','15-30 sec showing wrong vs right movement.'],
[23,'gear','Quick tip: leader and knot','DON\'T LOSE FISH TO THIS','Close-up of the knot, one sentence of explanation.'],
[24,'gear','Myth check','DO YOU NEED HEAVY GEAR?','Short answer from your own experience with footage.'],
[25,'gear','Tackle box tour','INSIDE MY TACKLE BOX','Fast cuts of 5 must-have items.'],
[26,'gear','Budget vs pro setup','CHEAP VS EXPENSIVE','Compare two setups on one criterion only.'],
[27,'life','Sunset montage','THIS IS WHY WE FISH THE MALDIVES','Sunset, boat wake, island, rods, slow music.'],
[28,'life','Morning departure','5AM IN THE MALDIVES','Loading the boat, sunrise, first cast.'],
[29,'life','Trip prep','WHAT IT TAKES TO FISH 100M DEEP','Fuel, tackle, bait, weather check, quick voiceover.'],
[30,'life','Dinner from the sea','CAN WE CATCH DINNER?','Catch, clean, cook, eat; a short challenge story.'],
[31,'life','Day in the life','A FISHERMAN\'S DAY','Cut of the whole day in 20 seconds.'],
[32,'life','Island life','LOCAL FISHING LIFE','Harbor, boats, people, sunset; keep it authentic.'],
[33,'comm','Answer a viewer question','YOU ASKED, HERE\'S THE ANSWER','Show the comment briefly, then answer with footage.'],
[34,'comm','Community choice','YOU CHOOSE THE NEXT TRIP','Offer 2-3 options (fish, lure, spot type) and vote in comments.'],
[35,'comm','Beginner mistakes','3 MISTAKES I MADE','Three fast clips, one lesson each.'],
[36,'comm','Monthly recap','BEST OF THIS MONTH','Best 5 clips in 20 seconds, then point to the best long video.'],
[37,'long','Deep Jigging in the Maldives: What Lives 100m Below?','','Full deep-jigging day with the mystery of what will come up. 8-12 min.'],
[38,'long','Can We Catch Dinner Before Sunset?','','Time-limited challenge; end with cooking the catch. 6-10 min.'],
[39,'long','Giant Trevally on the Cast: Maldives GT Session','','Casting from the boat or reef edge, lure choices, multiple strikes. 8-12 min.'],
[40,'long','24 Hours of Fishing in the Maldives','','Sunrise to night, different species by time of day. 10-15 min.'],
[41,'long','I Tried Only One Jig Color All Day','','A simple test with a clear result and lesson. 6-10 min.'],
[42,'long','Fishing the Maldives With Beginner Gear','','Cheap setup against big fish; honest results. 8-12 min.'],
[43,'long','Monster Snapper From Deep Water','','Build the whole video around one target species. 8-12 min.'],
[44,'long','A Local Fishing Trip With Friends','','Personality and community; fun moments plus fish. 10-14 min.'],
[45,'long','Everything You Need for Maldives Jigging','','Gear list, rigs and depth guide from your real experience. 8-10 min.'],
[46,'long','Best and Worst Day of the Month','','Compare a slow trip with a great one; what changed. 8-12 min.']
];
var IDX={}; IDEAS.forEach(function(r){IDX[r[0]]={id:r[0],cat:r[1],title:r[2],hook:r[3],how:r[4]};});

/* Month 1 starter plan. Each slot: [day, role, ideaId (0 = none), note].
   Month 2 and later are generated automatically (see genMonth). */
var MONTH1=[
 [['Tue','Big catch',1,''],['Thu','Fish ID',11,''],['Sun','Mini story',0,'Cast or drop, strike, fight, fish, reaction. 15-25 sec.']],
 [['Tue','Hard strike',2,''],['Thu','Gear and lure',19,''],['Sun','Long video #1',37,'Plus a 15 sec teaser for Reels and TikTok.']],
 [['Tue','Guess the weight',17,''],['Thu','GT casting',3,''],['Sun','Lifestyle montage',27,'']],
 [['Tue','Hero Short',0,'Your best catch of the month. Spend extra time on hook and pacing.'],['Thu','Fish fact',13,''],['Sun','Long video #2',38,'Use your best-performing topic, plus a 15 sec teaser.']]
];
var DAYOFF={Tue:1,Thu:3,Sun:6};

/* Step-by-step editing guides. Steps: [title, detail, minutes] */
var GUIDES={
 catch:{name:'Big catch Short',spec:'15-25 sec | 1080x1920 (9:16) | 30 fps, or 60 fps if you want slow motion',steps:[
  ['Create the project','New project, vertical 9:16, 1080x1920. Pick 30 fps, or 60 fps if you filmed at 60 and want a slow-motion strike.',2],
  ['Import only this fish','Import the clips from one catch: strike, fight, fish at the boat, landing, hero shot, release. Leave everything else out.',5],
  ['Lay out the silent cut','Order: strike, fight (2-3 clips), fish appears, landing, hero shot. Your first frame must show the fish, the bent rod or the strike. Never open with the logo.',7],
  ['Tighten every clip','Trim each clip to 0.5-2.5 seconds. Cut waiting at the start and end. Keep the hero shot 1.5-3 seconds. Total length 15-25 seconds.',8],
  ['Add a speed ramp','On the strike or splash clip, slow to about 40% for about 1 second, then return to 100% for the fight. Needs 60 fps footage to look smooth.',4],
  ['Add the hook text','3-7 words in the first second, such as THIS FISH HIT HARD! Bold white text with a soft shadow, upper third, clear of the app buttons. Keep it on screen about 2 seconds.',3],
  ['Add one useful fact','After the reveal, one line: species, depth or lure, for example 120g jig | 80m. One fact only.',3],
  ['Mix the sound','Keep natural drag and ocean sound. If you add music, set it to 15-25% volume and dip it for one second before the reveal.',4],
  ['Adjust the color','Slightly raise contrast, protect bright sky highlights, keep ocean blue and fish colors realistic. Avoid heavy saturation.',3],
  ['Add the end card','Last 1-2 seconds: Follow for more Maldives fishing, with the original VeyruKeyolhu logo unchanged.',2],
  ['Review and export','Watch once with sound and once muted. Export 1080x1920 at the highest quality. Pick a cover frame showing the fish.',3]]},
 fishid:{name:'Fish ID or fish fact',spec:'15-25 sec | 1080x1920 (9:16) | 30 fps',steps:[
  ['Choose the odd feature','Pick the one thing that makes people curious: teeth, color, eye, shape or size.',2],
  ['Create the project','New 9:16 project, 1080x1920, 30 fps. Import the close-up clips and one clean clip of the whole fish.',3],
  ['Build the tease','First 2-3 seconds: a tight close-up of that feature with the text WHAT FISH IS THIS?',4],
  ['Show the whole fish','Follow with a 3-4 second shot of the full fish so viewers can inspect it. Keep text off the fish.',4],
  ['Reveal the name','Show the species name in large clean text for about 1.5 seconds. Check the spelling.',3],
  ['Add one fact','One sentence only, spoken or on screen, 12 words or fewer.',3],
  ['Ask one question','Text such as Have you caught one? Use one question only.',2],
  ['Add captions','If you speak, use auto captions, then correct fish and gear names by hand.',5],
  ['Make it loop','End on the opening close-up so the video loops. A 1 second logo flash is optional.',3],
  ['Review and export','Watch with sound and muted. Export 1080x1920, highest quality.',3]]},
 gear:{name:'Gear or lure video',spec:'15-30 sec | 1080x1920 (9:16) | 30 fps',steps:[
  ['Open with the catch','Put the best catch clip first for about 2 seconds with the text THIS is what caught it.',3],
  ['Cut to the lure','2-3 second close-up of the jig or lure, steady and well lit.',4],
  ['Add the spec line','One line, same place every video: 120g jig | 80m | fast jigging.',3],
  ['Flash the rod and reel','Show them for 1-2 seconds, no more.',2],
  ['Show it working','One short action clip of the lure being used.',4],
  ['Return to the catch','Finish with the catch again so the payoff lands.',3],
  ['Add one question','Text such as Would you use this color? Use one call to action only.',2],
  ['Sound and color','Natural sound first, light music under it. Keep colors realistic.',4],
  ['Review and export','Watch with sound and muted. Export 1080x1920.',3]]},
 gt:{name:'GT or casting action',spec:'15-25 sec | 1080x1920 (9:16) | 60 fps recommended',steps:[
  ['Start at the strike','Open right before or right after the GT hits. No intro.',4],
  ['Keep the cast only if it is short','Use the cast only if it looks strong and lasts about 2 seconds or less.',3],
  ['Build the fight','Rod loading, drag sound, then your reaction. Keep natural reel and drag audio loud.',4],
  ['Add the surface boil','If you captured the splash or boil, slow it to about 40% for a moment.',3],
  ['Reveal the GT clearly','Hold the fish for 1.5-3 seconds with no text over it.',3],
  ['Add one line','Lure and technique, for example popper | 120g | fast retrieve.',2],
  ['End strongly','Finish on the release or a strong hero shot, then the logo for 1-2 seconds.',3],
  ['Review and export','Watch with sound and muted. Export 1080x1920.',3]]},
 montage:{name:'Lifestyle montage',spec:'20-30 sec | 1080x1920 (9:16) | 30 fps',steps:[
  ['Pick the theme and the track','Choose a slow or medium-tempo track and one theme, for example This is why we fish the Maldives.',5],
  ['Select 12-18 clips','Sunrise, boat wake, island, hands rigging, rods, sunset. Pick the most beautiful, steadiest shots.',7],
  ['Mark the beats','Play the track and add a marker on each strong beat.',4],
  ['Cut on the beats','Place clips on the markers, each 0.5-1.2 seconds. Put your best shot first.',10],
  ['Add match cuts','Link scenes by shape or movement, for example rod tip to horizon, wake to wake.',5],
  ['Grade the color','Warm the highlights slightly, lift the shadows, keep the ocean blue realistic.',5],
  ['Add one text line','Optional. One short line near the start or end.',2],
  ['End with the logo','Finish on sunset or the boat, then the original logo for 1-2 seconds.',3],
  ['Review and export','Watch with sound and muted. Export 1080x1920.',3]]},
 tip:{name:'Quick tip, question or myth',spec:'15-30 sec | 1080x1920 (9:16) | 30 fps',steps:[
  ['Write the one-sentence answer','One practical point, in your words, from your own experience.',3],
  ['Show the question','Put the viewer question or the myth on screen for about 2 seconds at the start.',3],
  ['Record or place the voice','Record a short voiceover or talk to camera in a quiet spot. Keep it under 20 seconds.',6],
  ['Cover it with footage','Lay clips over your voice that prove the point: the knot, the cadence, the gear.',7],
  ['Add captions','Auto captions, then fix gear names. One to three words at a time.',5],
  ['Add one call to action','One question or one follow line only.',2],
  ['Review and export','Watch with sound and muted. Export 1080x1920.',3]]},
 long:{name:'Long YouTube video',spec:'6-12 min | 1920x1080 (16:9) or 4K | 30 or 60 fps | about 4-5 hours in total',steps:[
  ['Set up the project','New 16:9 project at 1080p or 4K. Make folders: talking, B-roll, action, audio. Name clips by date and place.',15],
  ['Pull your selects','Skim all footage and mark the best moments. Delete dead time and bad takes.',30],
  ['Build the cold open','Put your best strike or catch first for 10-15 seconds. Promise the story before any intro.',15],
  ['Rough-cut the story','Follow the order: intro (15-35 sec), setup, fishing starts, first payoff, middle story, main payoff, wrap-up.',60],
  ['Tighten the pacing','Remove waiting, repeated casts and talk that does not move the story. Change the visual every 3-8 seconds.',30],
  ['Cover talking with B-roll','Lay ocean, tackle, lure, hands and boat shots over speech and jump cuts.',25],
  ['Mix the audio','Make speech clear, keep music about 15-20% under speech, and let drag and ocean sounds breathe.',20],
  ['Add on-screen info','Species, depth and lure only. Keep text short and consistent.',10],
  ['Grade the color','Even out shots, protect highlights, keep fish colors and skin tones realistic.',15],
  ['Write the wrap-up and chapters','Last 30-60 seconds: what worked, what you caught, one lesson, next-trip teaser, and one next video to watch. Add chapter timestamps for the description.',10],
  ['Make the thumbnail','Follow the thumbnail guide in the chips above.',15],
  ['Export and upload','Export H.264, 16:9. Add a clean title, a description with 3-5 hashtags and chapters. Publish on a Sunday.',15]]},
 thumb:{name:'YouTube thumbnail',spec:'1280x720 JPG | under 2 MB | readable at phone size',steps:[
  ['Choose the hero frame','Pick the best frame: fish plus a strong reaction when possible.',5],
  ['Crop tight','Crop so the fish and face are big and readable on a phone.',3],
  ['Boost contrast','Separate the subject from the background. Keep fish colors realistic.',3],
  ['Add 0-4 words','Examples: 100M DEEP, GIANT GT, MONSTER SNAPPER. Large, high contrast.',4],
  ['Keep the fish clear','Never cover the fish with text. Keep the logo small or leave it out.',2],
  ['Check at phone size','Shrink it to about 2 inches wide. If it is not instantly clear, simplify.',3],
  ['Export','Export 1280x720 JPG under 2 MB.',2]]}
};
var GKEYS=['catch','fishid','gear','gt','montage','tip','long','thumb'];

var LISTS={
 before:['Before the trip',['Clean the lens, charge phone and camera, free up storage','Set vertical mode (9:16), 1080p or 4K; 60 fps for splashes, strikes and releases','Note lure, jig weight, rod and reel, depth and location type','Pick your must-capture moments: preparation, cast or drop, strike, fight, reveal, release','Have the original VeyruKeyolhu logo ready for the last 1-2 seconds']],
 shots:['Shot list during the trip',['Establishing clip, 5-10 sec: sunrise, ocean, island or boat leaving','Close-ups of rod, reel, lure and hands rigging tackle','Vertical clip of the cast or jig drop','The strike (start recording before the bite when you can)','Rod bent under load with drag sound','Your reaction during the fight','Fish coming into view, then the landing','Hero shot from 2-3 angles','Close-ups of teeth, colors, lure placement','The release','10-second talk-to-camera summary','Extra B-roll: sunset, boat wake, tackle box, friends']],
 after:['After the trip (15 min, same evening)',['Copy every clip into one folder named by date and place','Favorite only action, clear fish, reactions, useful details, scenery','Mark your 3 best strikes and best hero shots','Write fish, lure, depth and technique into a note for captions']],
 edit:['Edit workflow (Short, Reel, TikTok)',['Import all clips and select the best','Build a silent cut first','Tighten: most clips 0.5-2.5 sec','Add hook text in the first second (3-7 words)','Add natural sound, music only to support pace','Keep colors realistic','Add captions and check spelling','Original logo at the end for 1-2 sec','Export 1080x1920 or higher; watch once with sound, once muted']],
 pub:['Publish checklist',['Watch the full export once','Check the first frame: would you stop scrolling?','Check spelling of species, gear and VeyruKeyolhu','Clean title, 3-5 relevant hashtags','Pick the cover or thumbnail','Share only location details you are happy to be public','Use one call to action only','Reply to early genuine comments','After 24-48 hours, log views, saves, shares and followers']],
 sun:['Sunday 10-minute review',['Top 3 posts by views','Top 3 posts by shares, saves and comments','Which post gained the most followers','Shorts: viewed vs swiped away, average percentage viewed','Long videos: thumbnail click-through and first-30-second retention','Name one pattern: species, hook, length, action or topic','Next week: repeat the winner once, test one new idea once']]
};
var LKEYS=['before','shots','after','edit','pub','sun'];
LKEYS.forEach(function(k){var v=LISTS[k]; if(typeof v[0]!=='string'){LISTS[k]={t:v[0],items:v[1]};}});
['before','shots','after','edit','pub','sun'].forEach(function(k){var v=LISTS[k]; if(Array.isArray(v)){LISTS[k]={t:v[0],items:v[1]};}});

var CAPCATS={curi:'Curiosity',act:'Action',gear:'Gear',life:'Lifestyle',comm:'Community'};
var CAPS=[
['curi','What is this thing?','What is this thing?\n{fish} from {depth}m in the Maldives. Look at those colors.\nHave you ever caught one?'],
['curi','Nobody knew','Nobody on the boat knew what it was.\nCame up from {depth}m on a {lure}. Name it in the comments if you know.\nWhat do you think it is?'],
['curi','Guess first','Guess before the reveal.\nHint: it hit a {lure} at {depth}m and fought hard.\nWhat is your guess?'],
['act','That strike','That strike though.\n{fish} hit the {lure} the second it got to depth.\nWould you have held on?'],
['act','Rod bent double','Rod bent double at {depth}m.\nThis {fish} did not want to come up. Full fight on YouTube.\nFollow for more Maldives fishing.'],
['act','Fish on','Fish on!\n{fish} on a {lure}. 15 seconds of chaos.\nWhat is the biggest fish you have fought?'],
['act','Release','See you next time.\nReleased this {fish} healthy after a great fight.\nWould you release it too?'],
['gear','What caught it','This is what caught it.\n{lure}, {depth}m, fast jigging. Simple setup.\nWould you use this color?'],
['gear','Two jigs, one winner','Same spot, two jigs, one winner.\nToday the {lure} beat everything else.\nWhich jig would you pick?'],
['gear','One tip','One tip that changed my jigging.\nLet it drop, then short fast lifts around {depth}m.\nWhat is your favorite cadence?'],
['life','Why we fish here','This is why we fish the Maldives.\nSunrise, warm water and a bent rod.\nWhere would you fish next?'],
['life','5AM start','5AM start, worth it.\nFuel, ice, tackle and the first cast at sunrise.\nWould you wake up for this?'],
['life','Dinner from the sea','Dinner from the sea.\nCaught, cleaned and cooked the same day.\nWhat would you cook first?'],
['comm','You asked','You asked, I answered.\nSomeone asked how deep we fish. Today: {depth}m with a {lure}.\nWhat should I answer next?'],
['comm','You choose','You choose the next trip.\nDeep jigging, GT casting or reef fishing?\nVote in the comments.'],
['comm','Follow line','New catch every Tuesday, Thursday and Sunday.\nMaldives fishing, jigging and ocean adventures.\nFollow for more Maldives fishing.']
];
var EDCATS={act:'Action',id:'Fish ID',gear:'Gear',life:'Lifestyle',long:'Long video',all:'Every video'};
var EDITS=[
['act','Cut on the strike','Start the clip one frame before the bite and hard-cut straight into the fight. No fade in.'],
['act','Speed ramp the splash','Film at 60 fps. Slow the strike or splash to about 40% speed, then ramp back to full speed for the fight.'],
['act','Punch-in on the hit','Scale the clip to 110-120% for 6-8 frames on the strike or the fish reveal, then settle back.'],
['act','Hold the hero shot','Keep the fish on screen 1.5-3 seconds with no text over it, so viewers can inspect it.'],
['act','Sound swell','Let the drag sound rise, drop the music for one second before the reveal, then bring it back.'],
['act','Freeze and label','Freeze on the reveal frame, pop up species or weight, then release the freeze.'],
['act','Rewind trick','Reverse the last 1-2 seconds of the fight to jump back to the drop, then play forward to the payoff.'],
['id','Blur to reveal','Open on a tight close-up (teeth, eye, color) with a slight blur, then pull out to the full fish.'],
['id','Three-clue countdown','Show clue 1, 2, 3 (color, teeth, eye) as short 1 second clips, then reveal the name.'],
['id','Name card','Large clean text with the species name. Hold 1.5 seconds and keep it clear of the fish.'],
['id','Loop ending','End on the same close-up you opened with so the Short loops and gets replayed.'],
['gear','Result first','Catch, then lure close-up, then spec text, then a short action clip, then the catch again.'],
['gear','One-line spec overlay','One line only: 120g jig | 80m | fast jigging. Same position and style every time.'],
['gear','Split-screen compare','Two lures or setups side by side, judged on one simple criterion, with a clear winner at the end.'],
['life','Beat-matched montage','Cut on the beat with 0.5-1.2 second clips: sunset, wake, island, rods, hands.'],
['life','Golden-hour grade','Warm the highlights slightly, lift the shadows, and keep the ocean blue realistic.'],
['life','Match cut','Cut from the rod tip to the horizon line, or from one boat wake to another, to link scenes.'],
['long','B-roll over talking','Cover jump cuts with tackle, ocean and lure shots. Change the visual every 3-8 seconds.'],
['long','J-cut voiceover','Start the next scene\'s audio a moment before its picture so the story flows.'],
['long','Cold open and chapters','Best strike in the first 15 seconds, then chapters so viewers can jump to the fight.'],
['all','Muted test','Watch the export with sound off. If the story still works, your captions and visuals are doing their job.'],
['all','Caption style','1-3 words on screen at a time for Shorts, bold with a soft shadow, kept away from app buttons.'],
['all','Logo last','Original VeyruKeyolhu logo for the last 1-2 seconds, unchanged. Never open with it.']
];
var PLATS=['YouTube Short','YouTube long video','Instagram Reel','TikTok','Not set'];
var NAVS=[['today','Today'],['plan','Plan'],['ideas','Ideas'],['track','Track'],['write','Write']];
var TITLES={today:'Today',plan:'Plan',ideas:'Idea bank',track:'Tracker',write:'Writer'};

/* ---------- State ---------- */
var S={ideas:{},slots:{},checks:{},posts:[],favs:{},tried:{},plans:{},notes:{},start:null,wr:{fish:'Giant Trevally',depth:'100',lure:'120g jig',hook:'',ask:'',emoji:true,plat:'Instagram'}};
var UI={pm:0,g:'catch',wsub:'writer',ccat:'all',ecat:'any',onlyfav:false,tab:'today',sub:'cal',cat:'all',st:'all',q:'',open:0,range:'all',edit:null,form:null,confirm:null,openMonth:0};
try{var raw=localStorage.getItem(KEY); if(raw){var p=JSON.parse(raw); if(p&&typeof p==='object'){for(var k in p){S[k]=p[k];}}}}catch(e){}
S.favs=S.favs||{}; S.tried=S.tried||{}; S.plans=S.plans||{}; S.notes=S.notes||{};
try{var t=localStorage.getItem(KEY+'-tab'); if(t&&TITLES[t]) UI.tab=t;}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function saveTab(){try{localStorage.setItem(KEY+'-tab',UI.tab);}catch(e){}}

/* ---------- Helpers ---------- */
function $(s,r){return (r||document).querySelector(s);}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function pad(n){return n<10?'0'+n:''+n;}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function today(){return new Date();}
function fmtNum(n){n=Number(n)||0; return n>=10000?(Math.round(n/100)/10)+'k':n.toLocaleString('en-US');}
function monday(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()); var dow=(x.getDay()+6)%7; x.setDate(x.getDate()-dow); return x;}
var toastT;
function toast(m){var t=$('#toast'); t.textContent=m; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(function(){t.hidden=true;},1600);}
function copy(text){
  function fb(){try{var a=document.createElement('textarea');a.value=text;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();document.execCommand('copy');document.body.removeChild(a);toast('Copied');}catch(e){toast('Select and copy manually');}}
  try{ if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){toast('Copied');},fb);} else fb(); }catch(e){fb();}
}

/* ---------- Monthly plan engine ----------
   A "month" is a 28-day cycle of 4 Monday-to-Sunday weeks, 12 posts (Tue, Thu, Sun).
   Month 1 is the fixed starter plan. When a new cycle begins, the next month is built
   automatically from your logged results and the idea bank. */
var MONS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], DOWS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function addDays(d,n){return new Date(d.getFullYear(),d.getMonth(),d.getDate()+n,12);}
function fmtDate(d){return DOWS[d.getDay()]+' '+d.getDate()+' '+MONS[d.getMonth()];}
function startDate(){return S.start?new Date(S.start+'T12:00:00'):null;}
function dateOf(s){var sd=startDate(); return sd?addDays(sd,(s.m-1)*28+s.w*7+DAYOFF[s.day]):null;}
function curMonth(){var sd=startDate(); if(!sd) return 1; var t=today(); var days=Math.floor((new Date(t.getFullYear(),t.getMonth(),t.getDate(),12)-sd)/864e5); return days<0?1:Math.floor(days/28)+1;}
function monthRange(m){var sd=startDate(); if(!sd) return ''; return fmtDate(addDays(sd,(m-1)*28))+' to '+fmtDate(addDays(sd,m*28-1));}
function monthRows(m){return m===1?MONTH1:(S.plans&&S.plans[m])||null;}
function mkSlots(m,rows){var out=[]; rows.forEach(function(w,wi){w.forEach(function(x,si){out.push({key:'M'+m+'-'+wi+'-'+si,m:m,w:wi,day:x[0],role:x[1],idea:x[2],note:x[3]||'',title:x[2]?IDX[x[2]].title:x[1]});});}); return out;}
function monthSlots(m){var r=monthRows(m); return r?mkSlots(m,r):[];}
function planMonths(){var a=[1]; Object.keys(S.plans||{}).map(Number).sort(function(x,y){return x-y;}).forEach(function(m){if(m>1)a.push(m);}); return a;}
function findSlot(key){var ms=planMonths(); for(var i=0;i<ms.length;i++){var sl=monthSlots(ms[i]); for(var j=0;j<sl.length;j++){if(sl[j].key===key) return sl[j];}} return null;}
function countDone(sl){var n=0; sl.forEach(function(s){if(S.slots[s.key])n++;}); return n;}
function nextSlot(){var ms=planMonths(), cm=curMonth(); for(var i=0;i<ms.length;i++){if(ms[i]<cm) continue; var sl=monthSlots(ms[i]); for(var j=0;j<sl.length;j++){if(!S.slots[sl[j].key]) return sl[j];}} return null;}
function perf(){var agg={}; S.posts.forEach(function(p){if(p.ex||p.nostats||!p.cat||p.cat==='long') return; var a=agg[p.cat]=agg[p.cat]||{n:0,v:0}; a.n++; a.v+=Number(p.views)||0;});
  var best=null,bv=0; for(var c in agg){var av=agg[c].v/agg[c].n; if(av>bv){bv=av;best=c;}} return best?{cat:best,avg:bv}:null;}
function pickIdea(cat,taken,prior,m,salt){
  var list=IDEAS.filter(function(r){return r[1]===cat;}).map(function(r){return r[0];});
  if(!list.length) return {id:0,redo:false};
  var off=(m*5+salt)%list.length, ord=list.slice(off).concat(list.slice(0,off));
  function st(i){return S.ideas[i]||'new';}
  var pool=ord.filter(function(i){return taken.indexOf(i)<0;});
  var id=pool.filter(function(i){return st(i)==='new'&&prior.indexOf(i)<0;})[0]||pool.filter(function(i){return st(i)==='new';})[0]||pool.filter(function(i){return st(i)==='planned';})[0]||pool[0]||ord[0];
  taken.push(id); return {id:id,redo:st(id)==='posted'};
}
function genMonth(m){
  var P=perf(), win=P?P.cat:'action', taken=[], prior=[];
  MONTH1.forEach(function(w){w.forEach(function(x){if(x[2])prior.push(x[2]);});});
  Object.keys(S.plans).forEach(function(k){if(Number(k)===m) return; S.plans[k].forEach(function(w){w.forEach(function(x){if(x[2])prior.push(x[2]);});});});
  function sl(day,role,cat,salt,note){var r=pickIdea(cat,taken,prior,m,salt), n=note||''; if(r.redo) n+=(n?' ':'')+'You posted this one already, so film a fresh version with new footage.'; return [day,role,r.id,n];}
  var rows=[
   [sl('Tue','Repeat the winner',win,0,P?'Your best format so far.':'No stats yet, so this is a solid all-round pick.'),sl('Thu','Viewer question','comm',0,'Pick a real comment or question and answer it with footage.'),sl('Sun','Series episode','id',1,'Part of a series so viewers know what to expect.')],
   [sl('Tue','Action','action',1,'Use your strongest unused strike or fight footage.'),sl('Thu','Quick tip','gear',0,'One practical tip in 15-30 seconds.'),sl('Sun','Long video','long',0,'Build it around one challenge or target species. Cut a 15 sec teaser.')],
   [sl('Tue','Winner again',win,2,P?'Same format, different footage.':'Try a second one of the same format.'),sl('Thu','Gear comparison','gear',1,'Compare two setups on one simple measure.'),sl('Sun','Lifestyle or behind the scenes','life',0,'Trip prep, sunrise departure or a sunset montage.')],
   [sl('Tue','Best unused action','action',2,'Pick the best clip you have not used yet.'),sl('Thu','Community choice','comm',1,'Offer 2-3 options and let viewers choose the next video.'),sl('Sun','Long video and recap','long',1,'Cut a 20 sec recap Short of the month\'s best 5 clips.')]
  ];
  S.notes[m]=P?'Built from your results: '+CATS[P.cat]+' posts average '+fmtNum(P.avg)+' views, so weeks 1 and 3 repeat that format.':'No post stats are logged yet, so this month rotates every format. Log views in Track and the next month adapts.';
  return rows;
}
function ensurePlans(){var cm=curMonth(), ch=false; for(var m=2;m<=cm;m++){if(!S.plans[m]){S.plans[m]=genMonth(m); ch=true;}} if(ch) save();}
function guideFor(s){var i=s.idea?IDX[s.idea]:null; if(!i) return 'catch'; if(i.id===3) return 'gt'; if(i.cat==='id') return 'fishid'; if(i.cat==='gear') return (i.id===22||i.id===23||i.id===24)?'tip':'gear'; if(i.cat==='life') return 'montage'; if(i.cat==='comm') return 'tip'; if(i.cat==='long') return 'long'; return 'catch';}
function dueTag(s){var dt=dateOf(s); if(!dt||S.slots[s.key]) return ''; var t=ymd(dt), n=ymd(today()); if(t<n) return '<span class="tag due">Overdue</span>'; if(t===n) return '<span class="tag ok">Due today</span>'; return '';}
function eng(p){return (Number(p.saves)||0)+(Number(p.shares)||0)+(Number(p.comments)||0);}

/* ---------- Views ---------- */
function ideaBlock(i,opts){
  var st=S.ideas[i.id]||'new';
  return '<div class="grow"><div class="row between"><b>'+esc(i.title)+'</b></div>'+
   '<div class="row small muted" style="margin-top:2px"><span class="tag">'+CATS[i.cat]+'</span><span class="mono">#'+i.id+'</span></div></div>';
}
function viewToday(){
  var d=today(), dow=d.getDay(), wd=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dow];
  var post=(dow===2||dow===4||dow===0);
  var nextDay=''; if(!post){var add=1; while(true){var t=(dow+add)%7; if(t===2||t===4||t===0){nextDay=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][t]+(add===1?' (tomorrow)':' (in '+add+' days)'); break;} add++;}}
  var cm=curMonth(), slot=nextSlot(), ms=monthSlots(cm), done=countDone(ms);
  var mon=monday(d); var monS=ymd(mon);
  var weekPosts=S.posts.filter(function(p){return p.date>=monS && p.date<=ymd(new Date(mon.getFullYear(),mon.getMonth(),mon.getDate()+6)) && !p.ex;});
  var days=[['Tue',2],['Thu',4],['Sun',0]]; var dots='';
  var dayHit={}; weekPosts.forEach(function(p){var pd=new Date(p.date+'T12:00:00'); dayHit[pd.getDay()]=1;});
  days.forEach(function(x){dots+='<div class="dot'+(dayHit[x[1]]?' on':'')+'" title="'+x[0]+'">'+x[0].charAt(0)+'</div>';});
  var h='';
  if(!isStandalone()){ if(DEFERRED) h+='<section class="card"><div class="row between"><div class="grow"><b>Install this app</b><div class="small muted">Add it to your home screen and use it offline.</div></div><button class="btn pri" data-act="install">Install</button></div></section>'; else if(isIOS()) h+='<section class="card"><b>Install on iPhone</b><div class="small muted">Tap Share, then Add to Home Screen.</div></section>'; }
  if(!S.start){
    var x=new Date(d.getFullYear(),d.getMonth(),d.getDate(),12); while(x.getDay()!==1) x.setDate(x.getDate()+1);
    h+='<section class="card next"><div class="lab">Start your 30-day plan</div><div class="big" style="margin-top:4px">Pick your first Monday</div><p class="small muted" style="margin:6px 0 0">Weeks run Monday to Sunday and posts land on Tuesday, Thursday and Sunday. After 4 weeks the next month is built for you from your results.</p><div class="row" style="margin-top:10px;flex-wrap:nowrap"><input type="date" id="st-date" value="'+ymd(x)+'" style="max-width:190px" aria-label="First Monday"><button class="btn pri" data-act="startplan">Start plan</button></div></section>';
  }
  h+='<section class="card"><div class="row between"><div><div class="lab">'+wd+'</div><div class="big">'+(post?'Post day':'Film and prep day')+'</div></div><div class="days" aria-label="This week">'+dots+'</div></div>'+
    '<p class="muted small" style="margin:8px 0 0">'+(post?'Ship one post today. Fish first, one question, one action clip, one payoff, one call to action.':'Next post day: '+nextDay+'. Use today to film, select clips or build a silent cut.')+'</p>'+
    '<div class="small muted" style="margin-top:8px">'+weekPosts.length+' of 3 posts logged this week</div><div class="bar" style="margin-top:4px"><i style="width:'+Math.min(100,weekPosts.length/3*100)+'%"></i></div></section>';
  if(slot){
    var idea=slot.idea?IDX[slot.idea]:null, dt=dateOf(slot);
    h+='<section class="card next"><div class="lab">Up next: Month '+slot.m+', Week '+(slot.w+1)+', '+(dt?fmtDate(dt):slot.day)+'</div>'+
      '<div class="row" style="margin-top:6px"><span class="tag">'+esc(slot.role)+'</span>'+dueTag(slot)+'</div>'+
      '<div class="big" style="margin-top:6px">'+esc(slot.title)+'</div>';
    if(idea&&idea.cat!=='long'){h+='<div style="margin:10px 0 6px" class="lab">Hook text</div><div class="hook">'+esc(idea.hook)+'</div><p class="small" style="margin:8px 0 0">'+esc(idea.how)+'</p>';}
    else if(idea){h+='<p class="small" style="margin:8px 0 0">'+esc(idea.how)+' Pick any long-video idea that fits your trip.</p>';}
    else{h+='<p class="small muted" style="margin:8px 0 0">No fixed idea for this slot. Use your best unused footage and the emergency formula.</p>';}
    if(slot.note) h+='<p class="small muted" style="margin:6px 0 0">'+esc(slot.note)+'</p>';
    h+='<div class="row" style="margin-top:12px"><button class="btn pri" data-act="quick" data-k="'+slot.key+'">Mark posted</button>'+
      '<button class="btn" data-act="guide" data-g="'+guideFor(slot)+'">Edit steps</button>'+
      '<button class="btn" data-act="logslot" data-k="'+slot.key+'">Log stats</button>'+
      '<button class="btn ghost" data-act="skip" data-k="'+slot.key+'">Skip</button>'+
      (idea?'<button class="btn ghost" data-act="jump" data-id="'+idea.id+'">Open idea</button>':'')+'</div></section>';
  } else {
    var unlock=startDate()?fmtDate(addDays(startDate(),cm*28)):'';
    h+='<section class="card next"><div class="big">Month '+cm+' complete</div><p class="muted small" style="margin:6px 0 10px">'+(S.plans[cm+1]?'Month '+(cm+1)+' is ready in the Plan tab.':'Your next plan builds itself'+(unlock?' on '+unlock:' when the next cycle starts')+', using what worked this month.')+'</p>'+(S.plans[cm+1]?'':'<button class="btn pri" data-act="genext">Build next month now</button>')+'</section>';
  }
  h+='<section class="card"><div class="row between"><div class="lab">Month '+cm+' progress</div><span class="mono">'+done+' / '+ms.length+'</span></div><div class="bar" style="margin-top:8px"><i style="width:'+(done/ms.length*100)+'%"></i></div>'+(S.start?'<div class="small muted" style="margin-top:6px">'+monthRange(cm)+(S.plans[cm+1]?'':'. Next month builds itself on '+fmtDate(addDays(startDate(),cm*28))+'.')+'</div>':'')+(cm>1&&S.notes[cm]?'<p class="small" style="margin:8px 0 0">'+esc(S.notes[cm])+'</p>':'')+'</section>';
  h+='<section class="card"><div class="lab">Emergency formula</div><div class="big" style="margin-top:4px">Fish first, 1 question, 1 action clip, 1 payoff, 1 call to action</div><p class="small muted" style="margin:6px 0 0">Show the GT, ask "Would you cast here?", strike, fight, reveal, "Follow for more Maldives fishing."</p></section>';
  h+='<section class="card"><div class="row between"><div class="lab">Trip-day checklists</div></div><div class="row" style="margin-top:8px"><button class="btn sm" data-act="sub" data-v="lists" data-k="before">Before</button><button class="btn sm" data-act="sub" data-v="lists" data-k="shots">Shot list</button><button class="btn sm" data-act="sub" data-v="lists" data-k="after">After</button><button class="btn sm" data-act="sub" data-v="lists" data-k="pub">Publish</button></div></section>';
  return h;
}
function checklist(k){
  var L=LISTS[k], n=0; var h='<section class="card"><div class="row between"><h3>'+esc(L.t)+'</h3><button class="btn sm ghost" data-act="reset" data-k="'+k+'">Reset</button></div><div style="margin-top:6px">';
  L.items.forEach(function(it,i){var id=k+'.'+i, on=!!S.checks[id]; if(on)n++; h+='<label class="chk'+(on?' done':'')+'"><input type="checkbox" data-in="chk" data-id="'+id+'"'+(on?' checked':'')+'><span>'+esc(it)+'</span></label>';});
  h+='</div><div class="small muted" style="margin-top:6px">'+n+' of '+L.items.length+' done</div></section>'; return h;
}
function viewPlan(){
  var h='<div class="chips"><button class="chip" aria-pressed="'+(UI.sub==='cal')+'" data-act="sub" data-v="cal">Calendar</button><button class="chip" aria-pressed="'+(UI.sub==='lists')+'" data-act="sub" data-v="lists">Checklists</button></div>';
  if(UI.sub==='lists'){LKEYS.forEach(function(k){h+=checklist(k);}); return h;}
  var months=planMonths(), cm=curMonth(), last=months[months.length-1];
  if(!UI.pm||months.indexOf(UI.pm)<0) UI.pm=Math.min(cm,last);
  h+='<div class="chips">';
  months.forEach(function(m){h+='<button class="chip" aria-pressed="'+(UI.pm===m)+'" data-act="pm" data-v="'+m+'">Month '+m+(m===cm?' (now)':'')+'</button>';});
  if(last<=cm) h+='<button class="chip" data-act="genext">Build next month</button>';
  h+='</div>';
  var m=UI.pm, sl=monthSlots(m), dn=countDone(sl), sd=startDate();
  var note=m===1?'Starter plan: one of each format so you learn what your audience likes. Month 2 builds itself from your results.':(S.notes[m]||'');
  h+='<section class="card"><div class="row between"><div><div class="lab">Month '+m+(sd?': '+monthRange(m):'')+'</div><div class="big">'+dn+' of '+sl.length+' posted</div></div>'+(m>1&&dn===0?'<button class="btn sm" data-act="regen" data-m="'+m+'">Rebuild from latest stats</button>':'')+'</div><div class="bar" style="margin-top:8px"><i style="width:'+(dn/sl.length*100)+'%"></i></div><p class="small" style="margin:8px 0 0">'+esc(note)+'</p>'+
    '<details style="margin-top:8px"><summary class="small">'+(sd?'Plan started '+fmtDate(sd)+'. Change start date':'Set your start date')+'</summary><div class="row" style="margin-top:8px;flex-wrap:nowrap"><input type="date" id="st-date" value="'+(S.start||'')+'" style="max-width:190px" aria-label="Start date"><button class="btn sm pri" data-act="startplan">Save</button></div><p class="small muted">The date snaps to that week\'s Monday.</p></details></section>';
  for(var w=0;w<4;w++){
    var wk=sl.filter(function(x){return x.w===w;});
    h+='<section class="card"><div class="row between"><h3>Week '+(w+1)+'</h3>'+(sd?'<span class="mono small muted">'+fmtDate(addDays(sd,(m-1)*28+w*7))+' to '+fmtDate(addDays(sd,(m-1)*28+w*7+6))+'</span>':'')+'</div><div class="wk">';
    wk.forEach(function(s){
      var on=!!S.slots[s.key], dt=dateOf(s);
      h+='<div class="slot'+(on?' done':'')+'"><input type="checkbox" data-in="slot" data-k="'+s.key+'" aria-label="Mark done"'+(on?' checked':'')+'><span class="dayl">'+s.day+'</span><div class="grow t">'+esc(s.title)+
        '<div class="row small muted" style="margin-top:3px"><span class="tag">'+esc(s.role)+'</span>'+(dt?'<span class="mono">'+fmtDate(dt)+'</span>':'')+dueTag(s)+'</div>'+
        (s.note?'<div class="small muted" style="margin-top:3px">'+esc(s.note)+'</div>':'')+
        '<div class="row" style="margin-top:6px">'+(s.idea?'<button class="btn sm ghost" data-act="jump" data-id="'+s.idea+'">Idea</button>':'')+'<button class="btn sm ghost" data-act="guide" data-g="'+guideFor(s)+'">Edit steps</button></div></div></div>';
    });
    h+='</div></section>';
  }
  return h;
}
function ideaList(){
  var q=UI.q.trim().toLowerCase(), out='', n=0;
  IDEAS.forEach(function(r){
    var i=IDX[r[0]], st=S.ideas[i.id]||'new';
    if(UI.cat!=='all'&&i.cat!==UI.cat) return;
    if(UI.st!=='all'&&st!==UI.st) return;
    if(q&&(i.title+' '+i.hook+' '+i.how).toLowerCase().indexOf(q)<0) return;
    n++;
    var open=UI.open===i.id;
    out+='<section class="card" id="idea-'+i.id+'"><div class="row between" style="flex-wrap:nowrap"><button class="btn ghost grow" style="text-align:left;border:0;padding:0;min-height:0" data-act="toggle" data-id="'+i.id+'" aria-expanded="'+open+'"><div><b>'+esc(i.title)+'</b></div><div class="row small muted" style="margin-top:3px"><span class="tag">'+CATS[i.cat]+'</span><span class="mono">#'+i.id+'</span></div></button>'+
      '<button class="st '+st+'" data-act="status" data-id="'+i.id+'" aria-label="Status: '+st+'. Tap to change">'+(st==='new'?'New':st==='planned'?'Planned':'Posted')+'</button></div>';
    if(open){
      if(i.hook) out+='<div class="lab" style="margin:12px 0 4px">Hook text</div><div class="row" style="flex-wrap:nowrap"><div class="hook grow">'+esc(i.hook)+'</div><button class="btn sm" data-act="copy" data-t="'+esc(i.hook)+'">Copy</button></div>';
      out+='<div class="lab" style="margin:12px 0 4px">'+(i.cat==='long'?'Story angle':'How to film and edit')+'</div><p style="margin:0">'+esc(i.how)+'</p>'+
       '<div class="row" style="margin-top:12px"><button class="btn sm pri" data-act="logidea" data-id="'+i.id+'">Log a post of this</button></div>';
    }
    out+='</section>';
  });
  if(!n) out='<div class="empty">No ideas match. Clear the filters or search.</div>';
  return '<div class="small muted">'+n+' idea'+(n===1?'':'s')+'</div>'+out;
}
function viewIdeas(){
  var h='<input type="text" id="q" placeholder="Search ideas, hooks, fish" value="'+esc(UI.q)+'" aria-label="Search ideas" data-in="q">';
  h+='<div class="chips"><button class="chip" aria-pressed="'+(UI.cat==='all')+'" data-act="cat" data-v="all">All</button>';
  for(var k in CATS){h+='<button class="chip" aria-pressed="'+(UI.cat===k)+'" data-act="cat" data-v="'+k+'">'+CATS[k]+'</button>';}
  h+='</div><div class="chips">';
  [['all','Any status'],['new','New'],['planned','Planned'],['posted','Posted']].forEach(function(x){h+='<button class="chip" aria-pressed="'+(UI.st===x[0])+'" data-act="st" data-v="'+x[0]+'">'+x[1]+'</button>';});
  h+='</div><div id="ilist" style="display:flex;flex-direction:column;gap:10px">'+ideaList()+'</div>';
  return h;
}
function review(){
  var mon=monday(today()), from=ymd(mon);
  var ps=S.posts.filter(function(p){return !p.nostats && (UI.range==='all'||p.date>=from);});
  var h='<section class="card"><div class="row between"><div><div class="lab">Sunday review</div><div class="big">What worked</div></div><div class="chips"><button class="chip" aria-pressed="'+(UI.range==='week')+'" data-act="range" data-v="week">This week</button><button class="chip" aria-pressed="'+(UI.range==='all')+'" data-act="range" data-v="all">All time</button></div></div>';
  if(!ps.length){h+='<div class="empty" style="margin-top:10px">Log a post with its numbers and your review fills in here. Use the example button below to preview it.</div></section>'; return h;}
  var byV=ps.slice().sort(function(a,b){return (Number(b.views)||0)-(Number(a.views)||0);}).slice(0,3);
  var byE=ps.slice().sort(function(a,b){return eng(b)-eng(a);}).slice(0,3);
  var byF=ps.slice().sort(function(a,b){return (Number(b.followers)||0)-(Number(a.followers)||0);})[0];
  function rk(list,fn){var s=''; list.forEach(function(p,i){s+='<div class="rank"><b>'+(i+1)+'</b><span class="grow">'+esc(p.title||'Untitled')+(p.ex?' <span class="tag ex">Example</span>':'')+'</span><span class="v">'+fn(p)+'</span></div>';}); return s;}
  h+='<div class="lab" style="margin:12px 0 2px">Top 3 by views</div>'+rk(byV,function(p){return fmtNum(p.views);});
  h+='<div class="lab" style="margin:12px 0 2px">Top 3 by saves, shares, comments</div>'+rk(byE,function(p){return fmtNum(eng(p));});
  if(byF&&Number(byF.followers)>0) h+='<div class="lab" style="margin:12px 0 2px">Most followers gained</div>'+rk([byF],function(p){return '+'+fmtNum(p.followers);});
  var agg={}; ps.forEach(function(p){var c=p.cat||'other'; agg[c]=agg[c]||{n:0,v:0}; agg[c].n++; agg[c].v+=Number(p.views)||0;});
  var rows=[]; for(var c in agg){rows.push({c:c,avg:agg[c].v/agg[c].n,n:agg[c].n});} rows.sort(function(a,b){return b.avg-a.avg;});
  var max=rows[0]?rows[0].avg||1:1;
  h+='<div class="lab" style="margin:12px 0 4px">Average views by type</div>';
  rows.forEach(function(r){h+='<div class="cbar"><span class="nm">'+(CATS[r.c]||'Other')+' ('+r.n+')</span><span class="b"><i style="width:'+Math.max(2,r.avg/max*100)+'%"></i></span><span class="val">'+fmtNum(Math.round(r.avg))+'</span></div>';});
  if(rows.length>1&&rows[0].avg>0){var rest=rows.slice(1), ra=rest.reduce(function(a,r){return a+r.avg*r.n;},0)/rest.reduce(function(a,r){return a+r.n;},0); var ratio=ra>0?(rows[0].avg/ra):0;
    h+='<p style="margin:10px 0 0"><b>Pattern:</b> '+(CATS[rows[0].c]||'Other')+' posts lead'+(ratio?' at '+ratio.toFixed(1)+'x your other types':'')+'. Repeat one this week, then test one new idea.</p>';}
  return h+'</section>';
}
function viewTrack(){
  var f=UI.form||{date:ymd(today()),plat:'Instagram Reel',title:'',idea:'',cat:'',views:'',saves:'',shares:'',comments:'',followers:'',ret:''};
  var opts='<option value="">No idea (free title)</option>'; IDEAS.forEach(function(r){opts+='<option value="'+r[0]+'"'+(String(f.idea)===String(r[0])?' selected':'')+'>#'+r[0]+' '+esc(r[2].length>44?r[2].slice(0,44)+'...':r[2])+'</option>';});
  var po=''; PLATS.forEach(function(p){po+='<option'+(p===f.plat?' selected':'')+'>'+p+'</option>';});
  var h=review();
  h+='<section class="card"><h3>'+(UI.edit?'Edit post':'Log a post')+'</h3><form id="pf" style="display:flex;flex-direction:column;gap:10px;margin-top:10px" autocomplete="off">'+
   '<div class="grid2"><label class="f">Date<input type="date" id="f-date" value="'+esc(f.date)+'"></label><label class="f">Platform<select id="f-plat">'+po+'</select></label></div>'+
   '<label class="f">Idea from your bank<select id="f-idea">'+opts+'</select></label>'+
   '<label class="f">Post title<input type="text" id="f-title" value="'+esc(f.title)+'" placeholder="What did you post?"></label>'+
   '<div class="grid3"><label class="f">Views<input type="number" min="0" inputmode="numeric" id="f-views" value="'+esc(f.views)+'"></label><label class="f">Saves<input type="number" min="0" inputmode="numeric" id="f-saves" value="'+esc(f.saves)+'"></label><label class="f">Shares<input type="number" min="0" inputmode="numeric" id="f-shares" value="'+esc(f.shares)+'"></label></div>'+
   '<div class="grid3"><label class="f">Comments<input type="number" min="0" inputmode="numeric" id="f-comments" value="'+esc(f.comments)+'"></label><label class="f">Followers gained<input type="number" min="0" inputmode="numeric" id="f-followers" value="'+esc(f.followers)+'"></label><label class="f">Avg % viewed<input type="number" min="0" max="100" inputmode="numeric" id="f-ret" value="'+esc(f.ret)+'"></label></div>'+
   '<div class="row"><button class="btn pri" type="submit">'+(UI.edit?'Save changes':'Add to tracker')+'</button>'+(UI.edit?'<button class="btn ghost" type="button" data-act="canceledit">Cancel</button>':'')+'</div></form></section>';
  var list=S.posts.slice().sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:0;});
  h+='<section class="card"><div class="row between"><h3>Your posts</h3><span class="mono small muted">'+list.length+'</span></div>';
  if(!list.length){h+='<div class="empty" style="margin-top:10px">No posts yet. Add your first one above, or preview the tracker with example posts.</div>';}
  else{h+='<div class="tblw" style="margin-top:8px"><table><thead><tr><th>Date</th><th>Post</th><th class="n">Views</th><th class="n">Eng.</th><th class="n">+Fol.</th><th></th></tr></thead><tbody>';
    list.forEach(function(p){h+='<tr><td class="mono">'+esc(p.date.slice(5))+'</td><td style="white-space:normal;min-width:150px">'+esc(p.title||'Untitled')+(p.ex?' <span class="tag ex">Example</span>':'')+(p.nostats?' <span class="tag">Add stats</span>':'')+'<div class="small muted">'+esc(p.plat||'')+'</div></td><td class="n">'+(p.nostats?'-':fmtNum(p.views))+'</td><td class="n">'+(p.nostats?'-':fmtNum(eng(p)))+'</td><td class="n">'+(p.nostats?'-':'+'+fmtNum(p.followers))+'</td><td><button class="btn sm" data-act="edit" data-id="'+p.id+'">Edit</button> <button class="btn sm ghost" data-act="delpost" data-id="'+p.id+'">'+(UI.confirm===p.id?'Tap to confirm':'Delete')+'</button></td></tr>';});
    h+='</tbody></table></div>';}
  var hasEx=S.posts.some(function(p){return p.ex;});
  h+='<div class="row" style="margin-top:10px">'+(hasEx?'<button class="btn sm" data-act="clrex">Remove example posts</button>':'<button class="btn sm" data-act="sample">Preview with example posts</button>')+'</div></section>';
  h+='<section class="card"><div class="lab">Sunday checklist</div>'+checklist('sun').replace('<section class="card">','<div>').replace(/<\/section>$/,'</div>')+'</section>';
  h+='<section class="card"><details><summary>Backup and restore</summary><p class="small muted">Your data lives in this browser only. Copy a backup to keep it safe or move it to another device.</p><div class="row"><button class="btn sm" data-act="backup">Copy backup</button></div><label class="f" style="margin-top:10px">Paste a backup to restore<textarea id="rb" placeholder="Paste backup text here"></textarea></label><div class="row" style="margin-top:8px"><button class="btn sm hot" data-act="restore">Restore from paste</button></div></details></section>';
  return h;
}
function wrOut(){
  var w=S.wr, f=(w.fish||'').trim()||'Giant Trevally', d=(w.depth||'').trim()||'100';
  var titles=[['Curiosity','Why Does This Maldives '+f+' Look Like This?'],['Action','This '+f+' Hit the Lure HARD!'],['Depth / mystery','What Lives '+d+'m Below the Maldives?'],['Result','We Pulled This '+f+' From Deep Water!'],['Challenge','Can We Catch '+f+' Before Sunset?']];
  var hooks=['THIS CAME FROM '+d+'M','THIS '+f.toUpperCase()+' HIT HARD!','LOOK WHAT CAME UP FROM THE DEEP','WHAT FISH IS THIS?','GUESS THE WEIGHT','WOULD YOU CAST HERE?'];
  var lure=(w.lure||'').trim();
  var l1=(w.hook||'').trim()||('Deep jigging in the Maldives'); if(w.emoji) l1+=' 🇲🇻🎣';
  var l2=f+' on '+(lure?('a '+lure):'the jig')+' in '+d+'m of water.';
  var ask=(w.ask||'').trim()||'What color jig would you try here?';
  var tags={Instagram:'#maldivesfishing #maldives #jigging #fishing #veyrukeyolhu',TikTok:'#maldivesfishing #fishing #jigging #maldives',YouTube:'#shorts #maldivesfishing #fishing #jigging'}[w.plat]||'';
  var cap=l1+'\n'+l2+'\n'+ask+'\n\n'+tags;
  var h='<div class="lab">Titles</div>';
  titles.forEach(function(t){h+='<div class="row" style="flex-wrap:nowrap;padding:6px 0;border-top:1px solid var(--line)"><div class="grow"><div class="small muted">'+t[0]+'</div><div>'+esc(t[1])+'</div></div><button class="btn sm" data-act="copy" data-t="'+esc(t[1])+'">Copy</button></div>';});
  h+='<div class="lab" style="margin-top:14px">Hook text (3-7 words)</div>';
  hooks.forEach(function(t){h+='<div class="row" style="flex-wrap:nowrap;padding:6px 0;border-top:1px solid var(--line)"><div class="grow mono">'+esc(t)+'</div><button class="btn sm" data-act="copy" data-t="'+esc(t)+'">Copy</button></div>';});
  h+='<div class="lab" style="margin-top:14px">Caption for '+esc(w.plat)+'</div><textarea readonly style="min-height:150px;margin-top:6px" aria-label="Generated caption">'+esc(cap)+'</textarea><div class="row between" style="margin-top:6px"><span class="small muted mono">'+cap.length+' characters</span><button class="btn pri sm" data-act="copy" data-t="'+esc(cap)+'">Copy caption</button></div>';
  return h;
}
function fillCap(t){var w=S.wr,f=(w.fish||'').trim()||'Giant Trevally',d=(w.depth||'').trim()||'100',l=(w.lure||'').trim()||'jig';
  return t.replace(/\{fish\}/g,f).replace(/\{depth\}/g,d).replace(/\{lure\}/g,l);}
function capList(){
  var out='',n=0;
  CAPS.forEach(function(c,i){
    if(UI.ccat!=='all'&&c[0]!==UI.ccat) return;
    if(UI.onlyfav&&!S.favs[i]) return;
    n++; var txt=fillCap(c[2]), fav=!!S.favs[i];
    out+='<section class="card"><div class="row between" style="flex-wrap:nowrap"><div class="row"><b>'+esc(c[1])+'</b><span class="tag">'+CAPCATS[c[0]]+'</span></div><button class="st'+(fav?' planned':'')+'" data-act="favcap" data-i="'+i+'" aria-pressed="'+fav+'">'+(fav?'Saved':'Save')+'</button></div>'+
     '<p style="white-space:pre-line;margin:10px 0">'+esc(txt)+'</p><div class="row"><button class="btn sm pri" data-act="copy" data-t="'+esc(txt+'\n\n#maldivesfishing #fishing #jigging #veyrukeyolhu')+'">Copy with hashtags</button><button class="btn sm" data-act="copy" data-t="'+esc(txt)+'">Copy text</button></div></section>';
  });
  if(!n) out='<div class="empty">'+(UI.onlyfav?'No saved captions yet. Tap Save on a caption you like.':'No captions here.')+'</div>';
  return out;
}
function viewCaps(){
  var h='<div class="small muted">Captions fill in your fish, depth and lure from the Writer tab. Each one ends with a single question or call to action.</div><div class="chips"><button class="chip" aria-pressed="'+(UI.ccat==='all'&&!UI.onlyfav)+'" data-act="ccat" data-v="all">All</button>';
  for(var k in CAPCATS){h+='<button class="chip" aria-pressed="'+(UI.ccat===k&&!UI.onlyfav)+'" data-act="ccat" data-v="'+k+'">'+CAPCATS[k]+'</button>';}
  h+='<button class="chip" aria-pressed="'+UI.onlyfav+'" data-act="onlyfav">Saved</button></div><div style="display:flex;flex-direction:column;gap:10px">'+capList()+'</div>';
  return h;
}
function viewEdits(){
  var h='<div class="small muted">Editing techniques that fit your footage. Tick the ones you have tried.</div><div class="chips"><button class="chip" aria-pressed="'+(UI.ecat==='any')+'" data-act="ecat" data-v="any">All</button>';
  for(var k in EDCATS){h+='<button class="chip" aria-pressed="'+(UI.ecat===k)+'" data-act="ecat" data-v="'+k+'">'+EDCATS[k]+'</button>';}
  h+='</div><div style="display:flex;flex-direction:column;gap:10px">';
  var n=0;
  EDITS.forEach(function(e,i){
    if(UI.ecat!=='any'&&e[0]!==UI.ecat) return; n++;
    var on=!!S.tried[i];
    h+='<section class="card"><label class="chk" style="padding:0;border:0"><input type="checkbox" data-in="tried" data-i="'+i+'"'+(on?' checked':'')+'><span class="grow"><b style="text-decoration:none;color:var(--ink)">'+esc(e[1])+'</b> <span class="tag">'+EDCATS[e[0]]+'</span></span></label><p style="margin:8px 0 0 34px">'+esc(e[2])+'</p></section>';
  });
  return h+'</div>';
}
function viewGuide(){
  var key=GUIDES[UI.g]?UI.g:'catch', g=GUIDES[key], total=0, n=0;
  g.steps.forEach(function(st,i){total+=st[2]; if(S.checks['g.'+key+'.'+i]) n++;});
  var h='<div class="chips">';
  GKEYS.forEach(function(k){h+='<button class="chip" aria-pressed="'+(key===k)+'" data-act="gsel" data-v="'+k+'">'+esc(GUIDES[k].name)+'</button>';});
  h+='</div><section class="card"><div class="row between"><div><div class="lab">Step-by-step edit</div><div class="big">'+esc(g.name)+'</div></div><button class="btn sm ghost" data-act="resetg" data-g="'+key+'">Reset</button></div><p class="small muted" style="margin:6px 0 0">'+esc(g.spec)+'</p><div class="row between small" style="margin-top:10px"><span class="mono">'+n+' of '+g.steps.length+' steps</span><span class="mono muted">About '+(total>=90?(Math.round(total/6)/10)+' hours':total+' min')+'</span></div><div class="bar" style="margin-top:4px"><i style="width:'+(n/g.steps.length*100)+'%"></i></div><div style="margin-top:8px">';
  g.steps.forEach(function(st,i){
    var id='g.'+key+'.'+i, on=!!S.checks[id];
    h+='<label class="chk gstep'+(on?' gdone':'')+'"><input type="checkbox" data-in="chk" data-id="'+id+'"'+(on?' checked':'')+'><span class="grow"><b>'+(i+1)+'. '+esc(st[0])+'</b> <span class="mono small muted">'+st[2]+' min</span><span class="small" style="display:block;margin-top:2px">'+esc(st[1])+'</span></span></label>';
  });
  return h+'</div></section>';
}
function viewWrite(){
  var subs=[['writer','Writer'],['guide','Edit guide'],['caps','Caption ideas'],['edits','Editing ideas']], h='<div class="chips">';
  subs.forEach(function(s){h+='<button class="chip" aria-pressed="'+(UI.wsub===s[0])+'" data-act="wsub" data-v="'+s[0]+'">'+s[1]+'</button>';});
  h+='</div>';
  return h+(UI.wsub==='caps'?viewCaps():UI.wsub==='edits'?viewEdits():UI.wsub==='guide'?viewGuide():viewWriter());
}
function viewWriter(){
  var w=S.wr, po=''; ['Instagram','TikTok','YouTube'].forEach(function(p){po+='<option'+(w.plat===p?' selected':'')+'>'+p+'</option>';});
  return '<section class="card"><h3>Details from your catch</h3><div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">'+
   '<div class="grid2"><label class="f">Fish<input type="text" id="w-fish" data-in="wr" data-f="fish" value="'+esc(w.fish)+'"></label><label class="f">Depth (m)<input type="text" id="w-depth" inputmode="numeric" data-in="wr" data-f="depth" value="'+esc(w.depth)+'"></label></div>'+
   '<div class="grid2"><label class="f">Lure or jig<input type="text" id="w-lure" data-in="wr" data-f="lure" value="'+esc(w.lure)+'"></label><label class="f">Platform<select id="w-plat" data-in="wr" data-f="plat">'+po+'</select></label></div>'+
   '<label class="f">Your own hook line (optional)<input type="text" id="w-hook" data-in="wr" data-f="hook" value="'+esc(w.hook)+'" placeholder="Deep jigging in the Maldives"></label>'+
   '<label class="f">Question or call to action (one only)<input type="text" id="w-ask" data-in="wr" data-f="ask" value="'+esc(w.ask)+'" placeholder="What color jig would you try here?"></label>'+
   '<label class="chk" style="border:0;padding:0"><input type="checkbox" id="w-emoji" data-in="wr" data-f="emoji"'+(w.emoji?' checked':'')+'><span>Add flag and fishing emoji to the first line</span></label></div></section>'+
   '<section class="card" id="wout">'+wrOut()+'</section>';
}

/* ---------- Render ---------- */
function render(){
  ensurePlans();
  $('#ttl').textContent=TITLES[UI.tab];
  var d=today(); $('#dt').textContent=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]+' '+d.getDate()+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  var nv=''; NAVS.forEach(function(n){nv+='<button data-act="tab" data-v="'+n[0]+'"'+(UI.tab===n[0]?' aria-current="page"':'')+'>'+n[1]+'</button>';}); $('#nav').innerHTML=nv;
  var v={today:viewToday,plan:viewPlan,ideas:viewIdeas,track:viewTrack,write:viewWrite}[UI.tab]();
  $('#main').innerHTML=v;
}

/* ---------- Actions ---------- */
function setTab(t){UI.tab=t; saveTab(); render(); window.scrollTo(0,0);}
function newId(){return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function markSlot(k,idea,val){S.slots[k]=val; if(idea&&val){S.ideas[idea]='posted';}}
var DEFERRED=null;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault(); DEFERRED=e; if(UI.tab==='today') render();});
window.addEventListener('appinstalled',function(){DEFERRED=null; if(UI.tab==='today') render();});
function isStandalone(){return (window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;}
function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}
var ACT={
  install:function(){if(!DEFERRED)return; DEFERRED.prompt(); DEFERRED.userChoice.then(function(){DEFERRED=null; render();});},
  tab:function(el){setTab(el.dataset.v);},
  startplan:function(){var v=$('#st-date').value; if(!v){toast('Pick a date first');return;} S.start=ymd(monday(new Date(v+'T12:00:00'))); save(); ensurePlans(); render(); toast('Plan starts '+fmtDate(startDate()));},
  genext:function(){var m=planMonths().slice(-1)[0]+1; S.plans[m]=genMonth(m); UI.pm=m; save(); UI.tab='plan'; saveTab(); render(); toast('Month '+m+' is ready');},
  regen:function(el){var m=Number(el.dataset.m); S.plans[m]=genMonth(m); save(); render(); toast('Month '+m+' rebuilt');},
  pm:function(el){UI.pm=Number(el.dataset.v); render();},
  guide:function(el){UI.tab='write'; UI.wsub='guide'; UI.g=el.dataset.g; saveTab(); render(); window.scrollTo(0,0);},
  gsel:function(el){UI.g=el.dataset.v; render();},
  resetg:function(el){var k=el.dataset.g; GUIDES[k].steps.forEach(function(_,i){delete S.checks['g.'+k+'.'+i];}); save(); render();},
  sub:function(el){UI.sub=el.dataset.v; if(el.dataset.k){UI.tab='plan'; saveTab(); render(); var t=document.querySelectorAll('.card'); for(var i=0;i<t.length;i++){var h=t[i].querySelector('h3'); if(h&&h.textContent===LISTS[el.dataset.k].t){t[i].scrollIntoView({block:'start'});break;}} return;} render();},
  quick:function(el){var s=findSlot(el.dataset.k); markSlot(s.key,s.idea,ymd(today())); S.posts.push({id:newId(),date:ymd(today()),plat:'Not set',title:s.title,cat:s.idea?IDX[s.idea].cat:'',nostats:true,slot:s.key,idea:s.idea||''}); save(); render(); toast('Marked posted. Add stats in Track.');},
  logslot:function(el){var s=findSlot(el.dataset.k); UI.form={date:ymd(today()),plat:'Instagram Reel',title:s.title,idea:s.idea||'',cat:s.idea?IDX[s.idea].cat:'',slot:s.key}; UI.edit=null; setTab('track');},
  skip:function(el){S.slots[el.dataset.k]='skipped'; save(); render();},
  jump:function(el){UI.tab='ideas'; UI.cat='all'; UI.st='all'; UI.q=''; UI.open=Number(el.dataset.id); saveTab(); render(); var t=document.getElementById('idea-'+el.dataset.id); if(t) t.scrollIntoView({block:'start'});},
  toggle:function(el){var id=Number(el.dataset.id); UI.open=UI.open===id?0:id; $('#ilist').innerHTML=ideaList();},
  status:function(el){var id=el.dataset.id, c=S.ideas[id]||'new'; S.ideas[id]=c==='new'?'planned':c==='planned'?'posted':'new'; save(); $('#ilist').innerHTML=ideaList();},
  cat:function(el){UI.cat=el.dataset.v; render();},
  st:function(el){UI.st=el.dataset.v; render();},
  copy:function(el){copy(el.dataset.t);},
  reset:function(el){var k=el.dataset.k; LISTS[k].items.forEach(function(_,i){delete S.checks[k+'.'+i];}); save(); render();},
  range:function(el){UI.range=el.dataset.v; render();},
  wsub:function(el){UI.wsub=el.dataset.v; render();},
  ccat:function(el){UI.ccat=el.dataset.v; UI.onlyfav=false; render();},
  onlyfav:function(){UI.onlyfav=!UI.onlyfav; render();},
  ecat:function(el){UI.ecat=el.dataset.v; render();},
  favcap:function(el){var i=el.dataset.i; if(S.favs[i]) delete S.favs[i]; else S.favs[i]=1; save(); render();},
  logidea:function(el){var i=IDX[el.dataset.id]; UI.form={date:ymd(today()),plat:'Instagram Reel',title:i.title,idea:i.id,cat:i.cat}; UI.edit=null; setTab('track');},
  edit:function(el){var p=S.posts.filter(function(x){return x.id===el.dataset.id;})[0]; UI.edit=p.id; UI.form={date:p.date,plat:p.plat,title:p.title,idea:p.idea||'',cat:p.cat||'',views:p.nostats?'':p.views,saves:p.saves,shares:p.shares,comments:p.comments,followers:p.followers,ret:p.ret,slot:p.slot}; render(); window.scrollTo(0,document.getElementById('pf').getBoundingClientRect().top+window.scrollY-120);},
  canceledit:function(){UI.edit=null; UI.form=null; render();},
  delpost:function(el){var id=el.dataset.id; if(UI.confirm===id){S.posts=S.posts.filter(function(p){return p.id!==id;}); UI.confirm=null; save(); render();} else {UI.confirm=id; render(); setTimeout(function(){if(UI.confirm===id){UI.confirm=null; if(UI.tab==='track')render();}},3000);}},
  sample:function(){var d=today(); function dd(n){return ymd(new Date(d.getFullYear(),d.getMonth(),d.getDate()-n));}
    S.posts.push({id:newId(),ex:true,date:dd(2),plat:'Instagram Reel',title:'Teeth close-up tease',cat:'id',views:6200,saves:210,shares:140,comments:38,followers:41,ret:71},
      {id:newId(),ex:true,date:dd(4),plat:'YouTube Short',title:'Big catch reveal',cat:'action',views:3100,saves:60,shares:52,comments:14,followers:12,ret:58},
      {id:newId(),ex:true,date:dd(6),plat:'TikTok',title:'What caught it',cat:'gear',views:1800,saves:95,shares:20,comments:9,followers:6,ret:49}); save(); render();},
  clrex:function(){S.posts=S.posts.filter(function(p){return !p.ex;}); save(); render();},
  backup:function(){copy(JSON.stringify(S));},
  restore:function(){var t=$('#rb').value.trim(); if(!t){toast('Paste a backup first');return;} try{var p=JSON.parse(t); if(!p||typeof p!=='object'||!Array.isArray(p.posts)) throw 0; S=Object.assign({ideas:{},slots:{},checks:{},posts:[],favs:{},tried:{},plans:{},notes:{},start:null,wr:S.wr},p); S.plans=S.plans||{}; S.notes=S.notes||{}; save(); render(); toast('Backup restored');}catch(e){toast('That is not a valid backup');}}
};
document.addEventListener('click',function(e){var el=e.target.closest('[data-act]'); if(!el) return; var f=ACT[el.dataset.act]; if(f){f(el);}});
document.addEventListener('input',function(e){var el=e.target, k=el.dataset&&el.dataset.in; if(!k) return;
  if(k==='q'){UI.q=el.value; $('#ilist').innerHTML=ideaList();}
  else if(k==='wr'){S.wr[el.dataset.f]=el.type==='checkbox'?el.checked:el.value; save(); $('#wout').innerHTML=wrOut();}
});
document.addEventListener('change',function(e){var el=e.target, k=el.dataset&&el.dataset.in; if(!k){ if(el.id==='f-idea'){var i=IDX[el.value]; if(i){$('#f-title').value=i.title;}} return;}
  if(k==='chk'){if(el.checked)S.checks[el.dataset.id]=1; else delete S.checks[el.dataset.id]; save(); render();}
  else if(k==='tried'){if(el.checked)S.tried[el.dataset.i]=1; else delete S.tried[el.dataset.i]; save(); render();}
  else if(k==='slot'){var s=findSlot(el.dataset.k); if(el.checked){markSlot(s.key,s.idea,ymd(today()));} else {delete S.slots[s.key];} save(); render();}
  else if(k==='wr'&&el.tagName==='SELECT'){S.wr[el.dataset.f]=el.value; save(); $('#wout').innerHTML=wrOut();}
});
document.addEventListener('submit',function(e){
  if(e.target.id!=='pf') return; e.preventDefault();
  function v(id){return $('#'+id).value;} function n(id){var x=parseInt(v(id),10); return isNaN(x)?0:Math.max(0,x);}
  var idea=v('f-idea'), title=v('f-title').trim();
  if(!title&&idea){title=IDX[idea].title;}
  if(!title){toast('Add a title or pick an idea'); return;}
  var cat=idea?IDX[idea].cat:((UI.form&&UI.form.cat)||'');
  var rec={date:v('f-date')||ymd(today()),plat:v('f-plat'),title:title,idea:idea||'',cat:cat,views:n('f-views'),saves:n('f-saves'),shares:n('f-shares'),comments:n('f-comments'),followers:n('f-followers'),ret:n('f-ret'),nostats:false};
  var slot=UI.form&&UI.form.slot;
  if(UI.edit){S.posts=S.posts.map(function(p){return p.id===UI.edit?Object.assign({},p,rec):p;});}
  else{rec.id=newId(); if(slot) rec.slot=slot; S.posts.push(rec);}
  if(idea) S.ideas[idea]='posted';
  if(slot&&!S.slots[slot]){S.slots[slot]=rec.date;}
  UI.edit=null; UI.form=null; save(); render(); toast('Saved');
});

render();
})();


if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('./sw.js').catch(function(){});});}
