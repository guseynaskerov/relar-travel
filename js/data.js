const destinations = [
  {id:'maldives',name:'Maldives',region:'Indian Ocean',text:'Overwater villas, shallow lagoons and islands edged in white sand.',stops:['Malé’s waterfront','a sandbank picnic','a guided reef swim']},
  {id:'bali',name:'Bali',region:'Indonesia',text:'Follow the scent of frangipani from terraced hillsides to the surf.',stops:['Ubud’s morning market','the rice terraces','a sunset on the Bukit coast']},
  {id:'seychelles',name:'Seychelles',region:'Indian Ocean',text:'Granite coves, palm forests and slow afternoons on island bicycles.',stops:['Mahé’s market','the palms of Praslin','La Digue’s granite coves']},
  {id:'thailand',name:'Thailand',region:'Southeast Asia',text:'Sail between limestone cliffs and find a quiet corner of the Andaman Sea.',stops:['Krabi’s riverside market','a longtail boat trip','the coves of Railay']},
  {id:'dubai',name:'Dubai',region:'United Arab Emirates',text:'Creekside courtyards and desert dunes beyond the glittering skyline.',stops:['the lanes of Al Fahidi','a creek crossing by abra','the dunes at dusk']},
  {id:'turkey',name:'Turkey',region:'Mediterranean',text:'Trace the Turquoise Coast through tiny harbours and sheltered bays.',stops:['the old streets of Kaş','the Kekova coastline','a swim at Kaputaş']},
  {id:'greece',name:'Greece',region:'Aegean Sea',text:'Whitewashed villages rise above blue harbours and volcanic shores.',stops:['the paths above the caldera','a village taverna','the volcanic coast']}
];
const tourRows = [
  ['lagoon-days','maldives','Maldives Lagoon Retreat',7,2190,'Island retreat','Settle into lagoon life with barefoot mornings and a sunset dhoni cruise.'],
  ['ubud-coast','bali','Ubud to the Ocean',8,1480,'Nature & culture','Pair the cool highlands around Ubud with three slow days by the sea.'],
  ['granite-isles','seychelles','The Granite Isles',7,1940,'Island hopping','Travel between the islands by ferry, setting aside time for secluded beaches.'],
  ['andaman','thailand','Andaman by Longtail',6,1140,'Island hopping','Follow southern Thailand’s limestone coast with small boat excursions.'],
  ['creek-dunes','dubai','Creek to the Dunes',5,1320,'Nature & culture','Start beside Dubai Creek and finish among the quiet desert dunes.'],
  ['turquoise','turkey','Turquoise Coast Hideaway',6,1260,'Island retreat','Base yourself in Kaş for swims, harbour walks and a day on the water.'],
  ['aegean','greece','Aegean Blue Escape',7,1760,'Island retreat','Explore Santorini’s cliff paths, fishing harbours and black-sand beaches.'],
  ['atoll','maldives','Beyond the House Reef',9,2890,'Island retreat','Take extra days to explore the atoll and its sheltered snorkelling spots.'],
  ['bali-gardens','bali','Bali Garden Hideaway',5,980,'Nature & culture','Stay amid tropical gardens with time for craft workshops and village walks.'],
  ['la-digue','seychelles','Slow Days on La Digue',5,1560,'Island hopping','Discover the quiet rhythm of La Digue on two wheels.'],
  ['railay','thailand','Railay Cove Retreat',8,1490,'Island retreat','Wake up below soaring cliffs and paddle between sheltered coves.'],
  ['aegean-table','greece','The Aegean Table',5,1390,'Nature & culture','Explore island food through markets, family kitchens and harbour tavernas.'],
  ['lycian','turkey','Along the Lycian Shore',9,1710,'Nature & culture','Walk short coastal trails between ancient ruins and inviting blue bays.'],
  ['desert','dubai','Desert & Sea Weekend',4,1090,'Island retreat','Pair a night by the dunes with unhurried days on the Gulf.']
];
const tours = tourRows.map(([id,destination,name,days,price,style,description]) => ({id,destination,name,days,price,style,description}));
const originalOfferPrices = {'lagoon-days': 2490, 'ubud-coast': 1680, 'granite-isles': 2140};
for (const tour of tours) tour.originalPrice = originalOfferPrices[tour.id];
