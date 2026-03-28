export const VIRGINIA_LESSONS = [
  { id: 1, slug: "lesson-1", title: "Lesson 1 - Course Introduction", estimatedMinutes: 60 },
  { id: 2, slug: "lesson-2", title: "Lesson 2 - Defensive Driving Habits", estimatedMinutes: 60 },
  { id: 3, slug: "lesson-3", title: "Lesson 3 - Speed Management and Following Distance", estimatedMinutes: 60 },
  { id: 4, slug: "lesson-4", title: "Lesson 4 - Distraction, Fatigue, and Impairment", estimatedMinutes: 60 },
  { id: 5, slug: "lesson-5", title: "Lesson 5 - Sharing the Road Safely", estimatedMinutes: 60 },
  { id: 6, slug: "lesson-6", title: "Lesson 6 - Virginia Traffic Laws and Consequences", estimatedMinutes: 60 },
  { id: 7, slug: "lesson-7", title: "Lesson 7 - Weather, Night Driving, and Emergencies", estimatedMinutes: 60 },
  { id: 8, slug: "lesson-8", title: "Lesson 8 - Attitude, Risk, and Long-Term Responsibility", estimatedMinutes: 60 },
];

export const VIRGINIA_LESSON_CONTENT: Record<
  string,
  {
    intro: string;
    sections: {
      heading: string;
      body: string[];
    }[];
    takeaway: string;
  }
> = {
  "lesson-1": {
    intro:
      "Virginia driver improvement courses are designed to reduce unsafe driving behavior, strengthen decision-making, and encourage responsible habits behind the wheel. This course helps drivers understand risk, review important safety principles, and build a mindset focused on prevention rather than reaction.",

    sections: [
      {
        heading: "Why driver improvement matters",
        body: [
          "Crashes are often caused by preventable behavior such as distraction, speeding, following too closely, poor judgment, or failure to anticipate hazards.",
          "Many drivers believe crashes happen because of bad luck, but most collisions are linked to decisions made seconds beforehand.",
          "Driver improvement training focuses on identifying these patterns so they can be corrected before they lead to another incident.",
          "Reducing repeat violations is one of the main goals of this course, but more importantly, it is about preventing injuries and saving lives.",
          "Every improvement in awareness and judgment directly reduces risk for you and everyone around you on the road.",
        ],
      },
      {
        heading: "The concept of risk in driving",
        body: [
          "Driving is one of the most complex daily activities people perform, requiring constant attention, coordination, and decision-making.",
          "Risk increases when drivers take shortcuts, rush decisions, or allow distractions to interfere with awareness.",
          "Each choice a driver makes, including speed, spacing, and attention, either increases or decreases overall risk.",
          "Safe drivers continuously evaluate their environment and adjust behavior accordingly.",
          "Understanding risk is the first step toward controlling it.",
        ],
      },
      {
        heading: "Common causes of crashes",
        body: [
          "The most common causes of crashes include distracted driving, speeding, tailgating, aggressive driving, and impaired driving.",
          "Distraction reduces reaction time and situational awareness.",
          "Speed limits the time available to respond and increases crash severity.",
          "Following too closely removes your margin for error.",
          "Recognizing these causes helps drivers actively avoid repeating them.",
        ],
      },
      {
        heading: "How this course is structured",
        body: [
          "This course is divided into multiple lessons, each focusing on a specific aspect of safe driving.",
          "Topics include defensive driving, speed management, traffic laws, road sharing, weather conditions, and driver attitude.",
          "Each lesson builds upon the previous one, reinforcing key safety principles.",
          "The course is designed to be completed over time, allowing drivers to absorb and apply information gradually.",
          "By the end of the course, you should have a stronger understanding of safe driving habits and decision-making.",
        ],
      },
      {
        heading: "Your role as a responsible driver",
        body: [
          "Safe driving is not just about following rules. It is about making good decisions consistently.",
          "Every driver has a responsibility to protect themselves and others.",
          "This includes passengers, pedestrians, cyclists, and other drivers.",
          "Being a responsible driver means staying alert, remaining patient, and avoiding unnecessary risks.",
          "Your attitude behind the wheel has a direct impact on safety outcomes.",
        ],
      },
      {
        heading: "Developing a defensive mindset",
        body: [
          "A defensive driver anticipates problems before they occur.",
          "Instead of reacting late, defensive drivers plan ahead and stay prepared.",
          "They assume other drivers may make mistakes and adjust accordingly.",
          "This mindset significantly reduces the likelihood of collisions.",
          "Defensive driving is one of the most important skills you can develop.",
        ],
      },
      {
        heading: "Long-term benefits of safe driving",
        body: [
          "Improving your driving habits can reduce the likelihood of future violations and crashes.",
          "Safe driving also lowers stress and improves overall confidence on the road.",
          "Insurance costs may be reduced over time with fewer incidents.",
          "Most importantly, safe driving protects lives.",
          "The habits you build during this course should continue long after it is completed.",
        ],
      },
    ],

    takeaway:
      "Safe driving starts with awareness and responsibility. Every decision you make behind the wheel either increases or reduces risk.",
  },

  "lesson-2": {
    intro:
      "Defensive driving means actively looking for danger before it becomes an emergency. It is a habit of scanning, predicting, and keeping enough time and space to respond safely.",

    sections: [
      {
        heading: "What defensive driving really means",
        body: [
          "Defensive driving is the practice of operating your vehicle in a way that reduces risk, even when other road users make mistakes.",
          "It does not mean driving timidly or hesitating unnecessarily. It means staying alert, thinking ahead, and choosing the safest option available.",
          "A defensive driver does not assume traffic will behave perfectly. Instead, the driver watches for clues that a problem may be developing.",
          "Good defensive driving creates a safety cushion around the vehicle so there is time and room to avoid hazards.",
          "This approach lowers stress, improves control, and reduces the chance of a crash.",
        ],
      },
      {
        heading: "Scanning the road ahead",
        body: [
          "Defensive drivers look far ahead rather than focusing only on the car directly in front of them.",
          "Looking farther ahead helps you identify brake lights, congestion, road work, crossing pedestrians, stopped vehicles, debris, and changing traffic signals earlier.",
          "The earlier you notice a problem, the more options you have. You may be able to change lanes smoothly, reduce speed gradually, or prepare to stop safely.",
          "Scanning should include the area ahead, your mirrors, both sides of the roadway, and any intersections you are approaching.",
          "Frequent scanning reduces surprise and helps you stay mentally prepared for quick but controlled decisions.",
        ],
      },
      {
        heading: "Maintaining a space cushion",
        body: [
          "One of the most important defensive driving habits is keeping enough space around your vehicle.",
          "A safe following distance gives you time to react if traffic slows or stops unexpectedly.",
          "You also want side space whenever possible. Avoid driving boxed in between vehicles if you can create an escape path.",
          "When another driver tailgates you, it is usually safer to increase your following distance rather than brake suddenly or respond aggressively.",
          "Space is time, and time is safety.",
        ],
      },
      {
        heading: "Watching for hidden hazards",
        body: [
          "Many hazards are not obvious at first. A ball rolling into the street may be a sign that a child is nearby. A parked truck may block your view of a pedestrian. A driver creeping forward at an intersection may be preparing to pull out.",
          "Defensive drivers look for warning signs, not just direct threats.",
          "You should be especially cautious near crosswalks, school zones, shopping areas, buses, construction zones, and places with limited visibility.",
          "A hazard often gives subtle clues before it becomes immediate.",
          "Learning to recognize those clues is a major part of defensive driving.",
        ],
      },
      {
        heading: "Predicting what others may do",
        body: [
          "Defensive driving requires more than observation. It requires prediction.",
          "Ask yourself what another road user is likely to do next. Could that car merge without signaling? Could that pedestrian step into the road? Could the vehicle ahead stop suddenly to turn?",
          "Prediction helps you slow early, change position, or prepare your foot for the brake.",
          "This habit reduces reaction delay because your mind has already considered possible outcomes.",
          "Drivers who predict well are usually calmer and more controlled in unexpected situations.",
        ],
      },
      {
        heading: "Using mirrors and checking blind spots",
        body: [
          "Mirror checks are part of continuous defensive awareness.",
          "A defensive driver regularly checks rearview and side mirrors to know what is happening behind and beside the vehicle.",
          "Before changing lanes, turning, or slowing abruptly, you should know whether another vehicle is approaching from behind or sitting in a blind spot.",
          "Mirrors do not show everything, so shoulder checks remain important when changing lanes.",
          "Knowing your surroundings helps you avoid creating a hazard while responding to one.",
        ],
      },
      {
        heading: "Managing intersections safely",
        body: [
          "Intersections are one of the highest-risk areas on the road because traffic crosses paths and many decisions happen quickly.",
          "Approach intersections prepared for others to make mistakes, such as running a light, failing to yield, or turning from the wrong lane.",
          "Even when you have the right of way, scan left, right, and ahead before entering.",
          "Watch for pedestrians who may begin crossing late and for vehicles trying to beat the light.",
          "Defensive drivers treat intersections as areas of increased risk requiring extra caution.",
        ],
      },
      {
        heading: "Avoiding overconfidence",
        body: [
          "Some drivers assume experience alone will keep them safe. That can lead to delayed reactions and poor risk assessment.",
          "Defensive drivers stay humble. They recognize that conditions can change quickly and that anyone can make an error.",
          "The safest drivers are often the least complacent.",
          "Experience is helpful only when combined with constant attention and sound judgment.",
          "Defensive habits must be practiced every trip, not only in heavy traffic or poor weather.",
        ],
      },
    ],

    takeaway:
      "Defensive driving means scanning early, predicting hazards, protecting your space, and staying prepared for mistakes from others.",
  },

  "lesson-3": {
    intro:
      "Speed affects reaction time, stopping distance, and crash severity. Managing speed is not just about the posted limit. It is about choosing a speed that matches conditions and preserves control.",

    sections: [
      {
        heading: "Why speed changes everything",
        body: [
          "Speed affects nearly every part of driving safety. It changes how far your vehicle travels before you can react, how much distance you need to stop, and how severe a crash may be if one occurs.",
          "As speed increases, your margin for error decreases. Small mistakes become harder to correct and consequences become more serious.",
          "Drivers often underestimate how quickly stopping distance increases with speed.",
          "Even a modest increase in speed can significantly reduce your ability to respond safely.",
          "Safe speed is about control, not convenience.",
        ],
      },
      {
        heading: "Perception, reaction, and braking distance",
        body: [
          "Stopping distance includes more than braking distance. First, you must recognize a hazard. Then you must decide how to respond. Only after that does braking begin.",
          "During this perception and reaction time, your vehicle continues moving.",
          "At higher speeds, you travel much farther before your foot even reaches the brake pedal.",
          "Then the vehicle still needs braking distance to actually stop.",
          "This is why early attention and lower speed are so important.",
        ],
      },
      {
        heading: "Following distance and rear-end prevention",
        body: [
          "Following too closely is a common cause of rear-end crashes.",
          "A proper following distance gives you a time cushion, not just a space cushion.",
          "If traffic slows unexpectedly, that extra time can be the difference between a smooth stop and a collision.",
          "Following distance should be increased in rain, fog, darkness, heavy traffic, on unfamiliar roads, and behind large vehicles that limit visibility.",
          "If you cannot see far ahead, you should leave even more room.",
        ],
      },
      {
        heading: "Posted speed limits and real safe speed",
        body: [
          "A posted speed limit is the maximum speed under ideal conditions. It is not a guarantee that the speed is safe at all times.",
          "Construction, weather, heavy traffic, narrow roads, curves, road damage, and poor visibility may all require slower speeds.",
          "Safe drivers adjust speed before conditions force them to.",
          "Driving at the speed limit in dangerous conditions can still be unsafe.",
          "Drivers are responsible for choosing a speed that fits the situation.",
        ],
      },
      {
        heading: "Curves, hills, and limited visibility",
        body: [
          "Roads with curves, hills, and blocked sight lines require special speed control.",
          "If you cannot see what is ahead, you should reduce speed early and stay prepared for a stopped vehicle, sharp turn, pedestrian, or roadway obstruction.",
          "Entering a curve too fast may cause loss of control, especially in wet or icy conditions.",
          "A hill crest can hide traffic congestion, turning vehicles, or road hazards.",
          "Safe drivers slow before visibility becomes a problem.",
        ],
      },
      {
        heading: "Speed and crash severity",
        body: [
          "The faster a vehicle is traveling, the greater the force in a collision.",
          "Higher force means more severe injuries, more property damage, and less likelihood of avoiding the impact completely.",
          "Speeding does not just make crashes more likely. It makes them more dangerous when they happen.",
          "Reducing speed is one of the most direct ways to reduce crash severity.",
          "A few seconds saved is rarely worth the added risk.",
        ],
      },
      {
        heading: "Speed management in traffic",
        body: [
          "Traffic flow can pressure drivers into maintaining unsafe speed or spacing.",
          "Defensive drivers resist pressure and focus on safety first.",
          "Abrupt speed changes can create risk for vehicles behind you, but maintaining excessive speed in a crowded environment is also dangerous.",
          "The goal is steady, controlled driving with gradual adjustments whenever possible.",
          "Smooth speed management improves safety and reduces driver stress.",
        ],
      },
      {
        heading: "Choosing patience over speed",
        body: [
          "Many speed-related risks begin with impatience. A driver feels delayed, frustrated, or rushed and begins making aggressive decisions.",
          "This can lead to speeding, tailgating, unsafe passing, or harsh braking.",
          "Choosing patience protects your judgment.",
          "Safe driving often means accepting small delays instead of creating major danger.",
          "Patience is a practical safety skill, not just a personality trait.",
        ],
      },
    ],

    takeaway:
      "Safe speed is the speed that lets you see, react, stop, and stay in control under current conditions.",
  },

  "lesson-4": {
    intro:
      "Distraction, fatigue, alcohol, drugs, and emotional overload can all impair driving. A vehicle requires full attention, and even short lapses can lead to serious consequences.",

    sections: [
      {
        heading: "Why full attention matters",
        body: [
          "Driving requires continuous visual, physical, and mental attention.",
          "You must observe the road, control the vehicle, interpret traffic, anticipate hazards, and make decisions in real time.",
          "Even a brief lapse can cause you to miss a traffic signal, brake late, drift out of a lane, or fail to notice a pedestrian.",
          "Many serious crashes begin with only a few seconds of inattention.",
          "Attention is one of the driver's most important safety tools.",
        ],
      },
      {
        heading: "Types of distraction",
        body: [
          "Distraction usually falls into three categories: visual, manual, and cognitive.",
          "Visual distraction means taking your eyes off the road. Manual distraction means removing one or both hands from vehicle control. Cognitive distraction means your mind is focused on something other than driving.",
          "Some activities combine all three, such as using a phone while driving.",
          "Even if an activity seems brief, it may still create a dangerous gap in awareness.",
          "Safe drivers reduce unnecessary tasks while the vehicle is moving.",
        ],
      },
      {
        heading: "Phone use and device risk",
        body: [
          "Phones are especially dangerous because they can involve looking away, touching the device, and thinking about something unrelated to traffic at the same time.",
          "Reading a message, changing navigation settings, searching for music, or checking notifications all reduce awareness.",
          "Hands-free technology may reduce manual distraction, but it does not eliminate cognitive distraction.",
          "The safest habit is to prepare navigation, music, and messages before starting the trip.",
          "If something needs attention during the drive, pull over safely first.",
        ],
      },
      {
        heading: "Drowsy driving",
        body: [
          "Fatigue reduces alertness, slows reaction time, impairs judgment, and increases the chance of drifting or missing hazards.",
          "Drowsy drivers may not recognize how impaired they are until a dangerous situation occurs.",
          "Warning signs include frequent yawning, missing signs or exits, trouble remembering recent miles, drifting within the lane, or difficulty keeping your eyes open.",
          "The safest response to drowsiness is not to push through it. The safe response is to stop and rest.",
          "No amount of determination replaces alertness.",
        ],
      },
      {
        heading: "Alcohol and drug impairment",
        body: [
          "Alcohol and drugs affect coordination, judgment, concentration, vision, and reaction time.",
          "Impairment can come from illegal substances, prescription medications, over-the-counter medicines, or a combination of substances.",
          "Some drivers assume they are safe because they 'do not feel impaired,' but judgment itself is one of the first things impairment affects.",
          "A driver under the influence is more likely to make poor decisions, react slowly, and misjudge speed or distance.",
          "The safest decision is simple: never drive while impaired.",
        ],
      },
      {
        heading: "Medication and hidden impairment",
        body: [
          "Some medications can cause drowsiness, blurred vision, slowed reactions, or dizziness even when used correctly.",
          "Cold medicine, sleep aids, pain medication, and some anxiety medications are common examples.",
          "Read warning labels carefully and do not assume prescription use automatically means safe driving.",
          "If you are unsure how a medication affects you, avoid driving until you know.",
          "Responsible drivers take medication effects seriously.",
        ],
      },
      {
        heading: "Stress, anger, and mental distraction",
        body: [
          "A driver may be physically looking at the road but mentally focused on a disagreement, work problem, or emotional event.",
          "Mental distraction can be just as dangerous as looking away.",
          "Stress can narrow attention and reduce patience.",
          "Anger can lead to aggressive decisions such as tailgating, speeding, or retaliating against other drivers.",
          "Drivers should recognize emotional overload early and reset before it affects judgment.",
        ],
      },
      {
        heading: "Reducing impairment risk before the trip",
        body: [
          "The safest strategy is prevention. Sleep enough before long drives. Avoid alcohol or impairing substances. Plan trips when you are alert. Prepare navigation and other settings before moving.",
          "Keep the inside of the vehicle organized so you are not searching for items while driving.",
          "If you feel overwhelmed, delayed, or emotionally unsettled, take a moment to regain focus before starting the vehicle.",
          "Safe driving begins before the wheels move.",
          "Preparation reduces distraction and supports better judgment.",
        ],
      },
    ],

    takeaway:
      "Driving safely requires your eyes, hands, and mind to stay focused. If you are distracted, drowsy, or impaired, you are not at your safest.",
  },

  "lesson-5": {
    intro:
      "Safe drivers understand that the road is shared with many types of users, each with different risks and limitations. Good judgment and patience help prevent collisions with more vulnerable road users.",

    sections: [
      {
        heading: "Sharing the road is a safety responsibility",
        body: [
          "Roads are used by drivers, pedestrians, cyclists, motorcyclists, buses, trucks, emergency vehicles, and sometimes construction or service workers.",
          "Each road user has different size, speed, visibility, and vulnerability.",
          "A safe driver adjusts behavior based on who else is present.",
          "Sharing the road safely means more than avoiding direct contact. It means giving space, slowing down when needed, and anticipating how others may move.",
          "Patience and awareness protect the most vulnerable users.",
        ],
      },
      {
        heading: "Pedestrians",
        body: [
          "Pedestrians have no physical protection in a collision and may be difficult to see, especially at night, in rain, near parked cars, or in complex intersections.",
          "Children may move unpredictably. Older adults may cross more slowly. Distracted pedestrians may step into the roadway unexpectedly.",
          "Drivers should slow down near crosswalks, schools, neighborhoods, transit stops, and crowded parking areas.",
          "Never assume a pedestrian sees you or will stay out of your path.",
          "A cautious approach saves lives.",
        ],
      },
      {
        heading: "Bicyclists",
        body: [
          "Cyclists share the road but are harder to see than larger vehicles and are more vulnerable in any collision.",
          "Bicyclists may move to avoid potholes, debris, parked cars, or opening doors.",
          "Drivers should allow plenty of room when passing and avoid squeezing cyclists toward the curb.",
          "Before turning or opening a parked car door, check carefully for approaching bicycles.",
          "Respecting cyclist space is part of safe driving, not an optional courtesy.",
        ],
      },
      {
        heading: "Motorcycles",
        body: [
          "Motorcycles are smaller than cars and often harder to judge in terms of distance and speed.",
          "Drivers may incorrectly assume a motorcycle is farther away or moving slower than it actually is.",
          "Always check mirrors and blind spots carefully before changing lanes or turning in front of a motorcycle.",
          "Do not crowd motorcycles or attempt to share a lane.",
          "Motorcyclists deserve a full lane and careful attention from surrounding drivers.",
        ],
      },
      {
        heading: "Large trucks and buses",
        body: [
          "Large vehicles need more space to stop, more room to turn, and more time to maneuver.",
          "They also create large blind spots beside the cab, alongside the trailer, and behind the vehicle.",
          "If you cannot see the truck driver's mirrors, the driver may not be able to see you.",
          "Avoid lingering beside large trucks and do not cut in closely after passing.",
          "Give buses and trucks the room they need to operate safely.",
        ],
      },
      {
        heading: "Emergency vehicles and roadway responders",
        body: [
          "Emergency vehicles need immediate attention because delays can affect lives and safety on the scene.",
          "When you see emergency lights or hear sirens, stay calm and respond safely according to the law.",
          "Drivers should also use extra caution around stopped emergency vehicles, tow trucks, and roadway workers.",
          "Reduced speed and increased space are essential in these situations.",
          "Protecting responders protects everyone.",
        ],
      },
      {
        heading: "School zones and residential areas",
        body: [
          "School zones and residential neighborhoods require heightened caution because children, parked vehicles, buses, pets, and unexpected movement are more likely.",
          "Children may act impulsively or focus more on friends than traffic.",
          "Drivers should reduce speed, scan carefully, and be ready to stop quickly but smoothly.",
          "A few seconds of caution in these areas can prevent tragedy.",
          "Safe drivers assume hidden movement is possible whenever visibility is limited.",
        ],
      },
      {
        heading: "Patience reduces conflict",
        body: [
          "Many sharing-the-road conflicts begin with impatience: squeezing past a cyclist, following a slow vehicle too closely, or competing for space.",
          "Patience helps drivers make safer choices and avoid escalating tension.",
          "Giving others time and room is not weakness. It is sound risk management.",
          "A calm driver sees more clearly and reacts more safely.",
          "Sharing the road safely is one of the clearest signs of mature driving judgment.",
        ],
      },
    ],

    takeaway:
      "Sharing the road safely means adjusting for vulnerable users, giving space, and using patience instead of pressure.",
  },

  "lesson-6": {
    intro:
      "Virginia traffic laws are meant to improve safety and reduce preventable crashes. Understanding common violations and their consequences helps drivers make better choices.",

    sections: [
      {
        heading: "Why traffic laws matter",
        body: [
          "Traffic laws create predictable behavior on the road. Predictability is essential for safety.",
          "When drivers follow signals, speed limits, lane rules, and right-of-way rules, other road users can better anticipate what will happen next.",
          "When drivers ignore these rules, confusion and conflict increase.",
          "Laws are not just technical requirements. They are tools for reducing preventable crashes.",
          "Understanding them helps drivers make safer and more consistent decisions.",
        ],
      },
      {
        heading: "Common moving violations",
        body: [
          "Common violations include speeding, following too closely, failure to yield, improper lane changes, distracted driving, running traffic controls, and reckless driving.",
          "Each of these violations may seem minor to some drivers, but each directly increases crash risk.",
          "For example, following too closely removes reaction time, while improper lane changes create side-swipe or merge conflict risk.",
          "Repeated violations often reflect unsafe driving habits rather than isolated mistakes.",
          "Improving those habits is one of the main purposes of driver improvement training.",
        ],
      },
      {
        heading: "Speeding and aggressive driving",
        body: [
          "Speeding increases stopping distance and crash severity, while aggressive driving combines risky behaviors such as tailgating, weaving, and abrupt lane changes.",
          "Aggressive driving is often driven by frustration, impatience, or overconfidence.",
          "Drivers may justify these behaviors as saving time, but the actual safety cost is significant.",
          "Aggressive driving also increases stress for everyone else on the road and can provoke further unsafe behavior.",
          "Choosing patience over aggression is both lawful and safer.",
        ],
      },
      {
        heading: "Distracted driving violations",
        body: [
          "Distraction-related violations exist because a distracted driver cannot respond as effectively to changing conditions.",
          "Using a phone, manipulating a device, or otherwise diverting attention creates serious risk.",
          "A driver who is distracted may drift, brake late, overlook traffic controls, or fail to see pedestrians.",
          "Even a short distraction can create a long chain of consequences.",
          "Safe drivers treat attention as non-negotiable.",
        ],
      },
      {
        heading: "Reckless or careless decisions",
        body: [
          "Some driving behavior goes beyond simple error and reflects disregard for safety.",
          "Very high speed, dangerous passing, racing, or ignoring obvious hazards are examples of serious unsafe choices.",
          "These behaviors can lead to major legal, financial, and personal consequences.",
          "Drivers should recognize that a moment of poor judgment can affect employment, insurance, licensing, finances, and physical safety.",
          "The best strategy is prevention through calm, lawful, attentive driving.",
        ],
      },
      {
        heading: "Consequences beyond a ticket",
        body: [
          "Many drivers focus only on fines, but the total cost of unsafe driving is often much greater.",
          "Traffic violations can lead to court costs, insurance increases, loss of time, license consequences, employment issues, and long-term financial burden.",
          "If a collision occurs, the consequences may include injuries, death, civil liability, and emotional trauma.",
          "The real price of careless driving can extend far beyond the day of the incident.",
          "That is why prevention is always the safer and cheaper choice.",
        ],
      },
      {
        heading: "Good habits that reduce violations",
        body: [
          "Most violations can be reduced by simple but consistent habits: scanning ahead, maintaining following distance, checking mirrors, using signals, obeying signs, and controlling speed.",
          "Preparation also matters. A calm, organized driver is less likely to rush, improvise, or overlook traffic conditions.",
          "Safe drivers treat the law as a minimum standard and aim to exceed it with good judgment.",
          "The best drivers are not just rule-followers. They are risk reducers.",
          "Routine safe habits lower both crash risk and violation risk.",
        ],
      },
      {
        heading: "Responsibility and decision-making",
        body: [
          "Responsible driving requires honesty about how choices affect outcomes.",
          "Blaming traffic, stress, or other drivers does not change the fact that your own decisions matter.",
          "Improvement begins when drivers accept that safer choices are available even in frustrating conditions.",
          "Better judgment protects your record, your finances, and the people around you.",
          "Safe driving is an ongoing responsibility, not a one-time test.",
        ],
      },
    ],

    takeaway:
      "Traffic laws support safety, but the safest drivers go beyond simple compliance by using caution, judgment, and consistent good habits.",
  },

  "lesson-7": {
    intro:
      "Weather, darkness, and emergencies change driving conditions quickly. Drivers must be ready to reduce speed, increase following distance, and adapt to reduced visibility or traction.",

    sections: [
      {
        heading: "Why conditions matter",
        body: [
          "Driving conditions can change faster than many drivers expect.",
          "Rain, snow, ice, fog, darkness, vehicle problems, and roadway incidents all reduce your margin for error.",
          "A safe driver does not wait for loss of control or a near miss before adapting.",
          "Condition-based driving means adjusting speed, spacing, scanning, and expectations before risk becomes immediate.",
          "Early adjustment is one of the most important safety habits.",
        ],
      },
      {
        heading: "Rain and wet roads",
        body: [
          "Rain reduces traction and visibility and may increase stopping distance.",
          "Oil and debris on the road can make the first minutes of rainfall especially slippery.",
          "Drivers should reduce speed, increase following distance, and avoid abrupt steering, braking, or acceleration.",
          "Headlights may improve visibility and help other drivers see you.",
          "Smooth control matters more in wet conditions than quick reactions.",
        ],
      },
      {
        heading: "Snow, ice, and freezing conditions",
        body: [
          "Snow and ice can make even familiar roads dangerous.",
          "Stopping distance increases dramatically and steering response becomes less predictable.",
          "Bridges, shaded areas, and untreated surfaces may freeze first.",
          "Drivers should slow down well before turns or intersections and avoid sudden inputs.",
          "In severe conditions, the safest choice may be delaying travel altogether.",
        ],
      },
      {
        heading: "Fog and low visibility",
        body: [
          "Fog limits how far ahead you can see and makes it harder for others to see you.",
          "When visibility drops, speed must drop with it.",
          "You should drive at a speed that allows you to stop within the distance you can clearly see ahead.",
          "Following too closely in fog is especially dangerous because hazards may appear with little warning.",
          "Low visibility should always lead to more cautious driving decisions.",
        ],
      },
      {
        heading: "Night driving",
        body: [
          "Darkness reduces visual information and makes hazards harder to detect.",
          "Pedestrians, cyclists, animals, debris, and disabled vehicles may be visible only at short distance.",
          "Fatigue is also more common at night, which adds another layer of risk.",
          "Headlights should be used appropriately, and windshield cleanliness becomes even more important.",
          "At night, slower and more attentive driving is often the safest choice.",
        ],
      },
      {
        heading: "Glare and limited visual adaptation",
        body: [
          "Oncoming headlights, wet pavement reflections, bright sun, or sudden transitions between light and dark can reduce visibility.",
          "When glare affects vision, drivers should slow down and avoid staring into bright light sources.",
          "Use lane markings and the roadway edge for reference if needed.",
          "Visual adaptation takes time, and poor decisions during that period can create danger.",
          "Protecting your ability to see is a key part of safe driving.",
        ],
      },
      {
        heading: "Vehicle breakdowns and roadside emergencies",
        body: [
          "If your vehicle develops a problem, your first goal is to move to a safer location if possible.",
          "Use hazard lights and make your vehicle visible to other traffic.",
          "Stay calm and avoid standing in dangerous traffic areas unless necessary for safety.",
          "Call for assistance when needed and be cautious when exiting the vehicle.",
          "A controlled response is safer than a panicked one.",
        ],
      },
      {
        heading: "Crash scenes and unexpected roadway events",
        body: [
          "Approaching a crash scene, stopped traffic, or roadway emergency requires immediate caution.",
          "Drivers should reduce speed early, watch for responders and disabled vehicles, and be ready for sudden lane changes or stopped traffic ahead.",
          "Rubbernecking reduces attention and creates additional risk.",
          "The safest approach is to pass carefully, keep moving if appropriate, and focus on your own lane and surroundings.",
          "Emergency areas are high-risk zones for both responders and drivers.",
        ],
      },
    ],

    takeaway:
      "Bad conditions demand early adjustment. Slow down, increase space, improve visibility, and stay calm when conditions become difficult.",
  },

  "lesson-8": {
    intro:
      "A driver's attitude strongly affects risk. Anger, impatience, overconfidence, and poor emotional control can lead to aggressive or impulsive decisions that increase danger.",

    sections: [
      {
        heading: "Attitude affects driving choices",
        body: [
          "Driving behavior is influenced not only by skill but also by mindset.",
          "A patient, alert driver is more likely to make safe decisions than an angry, rushed, or overconfident driver.",
          "Unsafe driving often begins before the vehicle moves, when a driver starts the trip frustrated, distracted, or determined to rush.",
          "Attitude shapes speed choices, following distance, reactions to mistakes by others, and overall judgment.",
          "Safe driving begins with self-control.",
        ],
      },
      {
        heading: "Impatience and time pressure",
        body: [
          "Many risky decisions come from feeling late, delayed, or inconvenienced.",
          "Time pressure can lead to speeding, tailgating, cutting across lanes, or forcing turns.",
          "These choices may save very little time while greatly increasing risk.",
          "Drivers should remember that arriving safely is more important than arriving a few minutes earlier.",
          "Patience is one of the most practical defensive driving tools.",
        ],
      },
      {
        heading: "Anger and aggressive behavior",
        body: [
          "Anger can quickly turn a normal trip into a dangerous one.",
          "A frustrated driver may follow too closely, gesture at others, weave through traffic, or retaliate against perceived slights.",
          "This behavior narrows attention and reduces sound judgment.",
          "Aggressive driving also escalates tension with other road users.",
          "The safest response to frustration is to disengage, create space, and refocus on control.",
        ],
      },
      {
        heading: "Overconfidence and complacency",
        body: [
          "Drivers who believe they are highly skilled sometimes take risks they would not accept from others.",
          "Overconfidence can lead to speeding, casual phone use, close following, late braking, or reduced mirror checks.",
          "Complacency grows when driving feels routine and uneventful.",
          "Safe drivers understand that experience does not eliminate risk.",
          "Staying humble helps preserve attention and judgment.",
        ],
      },
      {
        heading: "Stress and emotional carryover",
        body: [
          "Work problems, family stress, financial pressure, and emotional conflict can follow a driver into the vehicle.",
          "This reduces patience and may distract the mind from the roadway.",
          "Drivers should notice when they are mentally overloaded and take a moment to reset before driving.",
          "A short pause, a calm breath, or a change in pace may improve decision-making.",
          "Emotional awareness is part of safe driving.",
        ],
      },
      {
        heading: "Choosing the safer option early",
        body: [
          "Safe driving often means making a safer choice before the situation becomes urgent.",
          "Examples include leaving earlier, slowing sooner, increasing following distance, or simply letting another driver go first.",
          "These early decisions reduce conflict and preserve options.",
          "The longer a driver waits to adjust, the fewer safe choices remain.",
          "Good judgment usually acts early, not late.",
        ],
      },
      {
        heading: "Building long-term safe habits",
        body: [
          "A driver improvement course is most useful when it changes behavior after the course is over.",
          "That means practicing patience, scanning ahead, managing speed, staying attentive, and controlling emotion on every trip.",
          "Safety becomes more reliable when it is based on habit rather than mood.",
          "The best driving habits are the ones you use even when no one is watching.",
          "Long-term change comes from consistency.",
        ],
      },
      {
        heading: "Personal responsibility and maturity",
        body: [
          "Mature driving means accepting that your decisions affect other people's lives.",
          "A safe driver does not blame everyone else for road frustration or use inconvenience as an excuse for unsafe behavior.",
          "Responsibility means staying composed, adjusting to conditions, and protecting others even when traffic is irritating.",
          "This mindset supports both legal compliance and real safety.",
          "A calm driver is usually a safer driver.",
        ],
      },
    ],

    takeaway:
      "Attitude matters. Patience, humility, and emotional control help drivers make safer choices and reduce preventable risk.",
  },
};

export type LessonCheckQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export const VIRGINIA_LESSON_CHECKS: Record<string, LessonCheckQuestion[]> = {
  "lesson-1": [
    {
      id: 1,
      question: "What is one major goal of driver improvement training?",
      options: [
        "Help drivers ignore traffic laws",
        "Reduce repeat unsafe driving behavior",
        "Teach drivers to react later",
        "Increase risk tolerance",
      ],
      correctAnswer: 1,
      explanation:
        "Driver improvement training is meant to reduce unsafe habits, improve judgment, and lower crash risk.",
    },
    {
      id: 2,
      question: "What is the best way to think about driving risk?",
      options: [
        "It is mostly random and cannot be controlled",
        "It depends only on vehicle size",
        "Driver choices can increase or reduce it",
        "It matters only in bad weather",
      ],
      correctAnswer: 2,
      explanation:
        "Speed, attention, spacing, and decision-making all affect driving risk.",
    },
    {
      id: 3,
      question: "Which of the following is a common preventable cause of crashes?",
      options: [
        "Defensive planning",
        "Tailgating",
        "Patience",
        "Scanning ahead",
      ],
      correctAnswer: 1,
      explanation:
        "Following too closely is one of the most common preventable crash causes.",
    },
    {
      id: 4,
      question: "A responsible driver should primarily focus on:",
      options: [
        "Saving time no matter what",
        "Proving confidence to other drivers",
        "Protecting everyone on the road",
        "Driving only by instinct",
      ],
      correctAnswer: 2,
      explanation:
        "Responsible driving means protecting yourself, your passengers, and everyone sharing the road.",
    },
    {
      id: 5,
      question: "What is a defensive mindset?",
      options: [
        "Assuming other drivers will not make mistakes",
        "Planning ahead and anticipating hazards",
        "Driving faster to avoid problems",
        "Ignoring conditions until danger appears",
      ],
      correctAnswer: 1,
      explanation:
        "Defensive driving means preparing early and expecting that others may make errors.",
    },
  ],
  "lesson-2": [
    {
      id: 1,
      question: "Defensive driving mainly means:",
      options: [
        "Driving aggressively to stay ahead of traffic",
        "Waiting until danger is obvious before reacting",
        "Reducing risk by scanning, predicting, and protecting space",
        "Driving slowly in all situations",
      ],
      correctAnswer: 2,
      explanation:
        "Defensive driving is an active process of scanning ahead, predicting hazards, and keeping enough space and time to respond safely.",
    },
    {
      id: 2,
      question: "Why should drivers look farther ahead than the vehicle directly in front of them?",
      options: [
        "To reduce mirror use",
        "To identify hazards earlier and gain more response options",
        "To avoid using the brakes",
        "To drive faster through traffic",
      ],
      correctAnswer: 1,
      explanation:
        "Looking farther ahead helps drivers recognize brake lights, congestion, hazards, and changing traffic conditions sooner.",
    },
    {
      id: 3,
      question: "A space cushion is important because it:",
      options: [
        "Lets you follow more closely in traffic",
        "Improves fuel economy only",
        "Gives time and room to avoid hazards safely",
        "Allows faster lane changes",
      ],
      correctAnswer: 2,
      explanation:
        "Keeping space around your vehicle creates time to react and space to maneuver if something unexpected happens.",
    },
    {
      id: 4,
      question: "Which situation calls for extra defensive awareness?",
      options: [
        "Open roads with no intersections",
        "Areas near schools, crosswalks, and parked cars",
        "Only interstate highways",
        "Only nighttime rural roads",
      ],
      correctAnswer: 1,
      explanation:
        "Places with hidden hazards and vulnerable road users require increased scanning and prediction.",
    },
    {
      id: 5,
      question: "A strong defensive driving habit is to:",
      options: [
        "Assume other drivers will always obey the rules",
        "Predict what others might do next",
        "Avoid mirror checks when traffic is light",
        "Brake late to maintain speed",
      ],
      correctAnswer: 1,
      explanation:
        "Defensive drivers watch for clues and think ahead about what other road users may do.",
    },
  ],
  "lesson-3": [
    {
      id: 1,
      question: "Why does higher speed increase risk?",
      options: [
        "It reduces both reaction time and stopping distance",
        "It increases the time available to think",
        "It shortens only trip time, not safety margin",
        "It guarantees better vehicle control",
      ],
      correctAnswer: 0,
      explanation:
        "Higher speed reduces the time available to react and increases the distance needed to stop safely.",
    },
    {
      id: 2,
      question: "Stopping distance includes:",
      options: [
        "Only braking distance",
        "Only reaction time",
        "Perception, reaction, and braking distance",
        "Only tire traction",
      ],
      correctAnswer: 2,
      explanation:
        "Drivers travel distance while recognizing the hazard and reacting, then additional distance while braking.",
    },
    {
      id: 3,
      question: "A posted speed limit should be understood as:",
      options: [
        "Always safe regardless of conditions",
        "A maximum under ideal conditions",
        "A minimum required speed",
        "Optional when roads are empty",
      ],
      correctAnswer: 1,
      explanation:
        "Drivers must reduce speed when conditions such as weather, curves, or visibility make the posted speed unsafe.",
    },
    {
      id: 4,
      question: "Following too closely is dangerous because it:",
      options: [
        "Improves vehicle control",
        "Reduces time available to stop safely",
        "Helps traffic move faster",
        "Makes lane changes easier",
      ],
      correctAnswer: 1,
      explanation:
        "Tailgating removes reaction time and is a common cause of rear-end crashes.",
    },
    {
      id: 5,
      question: "What is a safer response to time pressure while driving?",
      options: [
        "Speed up and pass more often",
        "Brake later to maintain momentum",
        "Choose patience and keep a safe pace",
        "Follow closer so other cars move sooner",
      ],
      correctAnswer: 2,
      explanation:
        "Patience reduces risky speed-related behavior and helps drivers maintain control and judgment.",
    },
  ],
  "lesson-4": [
    {
      id: 1,
      question: "Why is full attention important while driving?",
      options: [
        "Because driving requires continuous observation and decision-making",
        "Because traffic laws apply only when drivers are tired",
        "Because distractions matter only at high speed",
        "Because attention mainly affects parking",
      ],
      correctAnswer: 0,
      explanation:
        "Driving requires constant visual, physical, and mental attention to changing conditions.",
    },
    {
      id: 2,
      question: "Which combination best describes distraction types?",
      options: [
        "Speed, space, and timing",
        "Visual, manual, and cognitive",
        "Urban, rural, and highway",
        "Night, rain, and fog",
      ],
      correctAnswer: 1,
      explanation:
        "Distraction can involve your eyes, your hands, and your mental focus.",
    },
    {
      id: 3,
      question: "What is the safest response to drowsy driving?",
      options: [
        "Increase speed to get there faster",
        "Open a window and ignore it",
        "Stop and rest",
        "Use your phone to stay alert",
      ],
      correctAnswer: 2,
      explanation:
        "Fatigue impairs judgment and reaction time. The safe choice is to stop driving and rest.",
    },
    {
      id: 4,
      question: "Why can medication create hidden impairment?",
      options: [
        "All medications automatically improve focus",
        "Some medications cause drowsiness or slowed reactions",
        "Medication only affects long trips",
        "Prescription labels never matter for driving",
      ],
      correctAnswer: 1,
      explanation:
        "Some medications can affect alertness, coordination, and reaction time even when taken properly.",
    },
    {
      id: 5,
      question: "Which statement about phones is most accurate?",
      options: [
        "Phones are safe if used briefly",
        "Hands-free use removes all distraction",
        "Phones can create multiple forms of distraction at once",
        "Phones matter only when texting",
      ],
      correctAnswer: 2,
      explanation:
        "Phone use often combines visual, manual, and cognitive distraction, which is especially risky.",
    },
  ],
  "lesson-5": [
    {
      id: 1,
      question: "Why do pedestrians require extra caution?",
      options: [
        "They are always predictable",
        "They have no protection in a collision",
        "They move faster than vehicles",
        "They never appear near parked cars",
      ],
      correctAnswer: 1,
      explanation:
        "Pedestrians are vulnerable and may be difficult to see, especially in busy or low-visibility areas.",
    },
    {
      id: 2,
      question: "What is a safe approach around bicyclists?",
      options: [
        "Pass closely if traffic is light",
        "Assume they will stay perfectly straight",
        "Give extra room and expect possible movement",
        "Use your horn to force them aside",
      ],
      correctAnswer: 2,
      explanation:
        "Cyclists may move to avoid debris or hazards, so drivers should allow plenty of space.",
    },
    {
      id: 3,
      question: "What is true about motorcycles?",
      options: [
        "They are easy to judge for speed and distance",
        "They should share lanes with cars when possible",
        "They can be harder to see and judge accurately",
        "They require less caution than bicycles",
      ],
      correctAnswer: 2,
      explanation:
        "Motorcycles are smaller than cars and can be harder for drivers to detect and judge properly.",
    },
    {
      id: 4,
      question: "Why should drivers be careful around large trucks?",
      options: [
        "They stop faster than small vehicles",
        "They have large blind spots and need more room",
        "They can always see every nearby vehicle",
        "They turn more easily in tight spaces",
      ],
      correctAnswer: 1,
      explanation:
        "Trucks need more space to stop and maneuver and have significant blind spots.",
    },
    {
      id: 5,
      question: "What is one of the best ways to share the road safely?",
      options: [
        "Use impatience to keep traffic moving",
        "Force space before others take it",
        "Use patience and adjust for more vulnerable users",
        "Ignore road users moving slower than you",
      ],
      correctAnswer: 2,
      explanation:
        "Patience and awareness help drivers protect pedestrians, cyclists, motorcyclists, and other vulnerable users.",
    },
  ],
  "lesson-6": [
    {
      id: 1,
      question: "Why do traffic laws improve safety?",
      options: [
        "They make roads less crowded",
        "They create predictable behavior",
        "They replace the need for judgment",
        "They apply only in city traffic",
      ],
      correctAnswer: 1,
      explanation:
        "Traffic laws help road users predict what others will do, which reduces confusion and conflict.",
    },
    {
      id: 2,
      question: "Which is a common moving violation?",
      options: [
        "Defensive scanning",
        "Proper lane use",
        "Following too closely",
        "Yielding appropriately",
      ],
      correctAnswer: 2,
      explanation:
        "Following too closely is a common violation and a common cause of collisions.",
    },
    {
      id: 3,
      question: "Why is aggressive driving dangerous?",
      options: [
        "It saves time without affecting risk",
        "It combines risky behaviors and reduces judgment",
        "It only matters on highways",
        "It affects only the aggressive driver",
      ],
      correctAnswer: 1,
      explanation:
        "Aggressive driving often includes speeding, tailgating, and abrupt maneuvers that increase crash risk.",
    },
    {
      id: 4,
      question: "What is a consequence of unsafe driving beyond a ticket?",
      options: [
        "Automatic better insurance rates",
        "Reduced stopping distance",
        "Higher insurance costs and possible injury",
        "Guaranteed license protection",
      ],
      correctAnswer: 2,
      explanation:
        "Unsafe driving can lead to fines, insurance increases, collisions, injury, and other serious consequences.",
    },
    {
      id: 5,
      question: "A good way to reduce violations is to:",
      options: [
        "Rely on instinct instead of scanning",
        "Use consistent safe driving habits",
        "Ignore minor traffic controls",
        "Drive faster when the road is open",
      ],
      correctAnswer: 1,
      explanation:
        "Consistent habits such as scanning, spacing, signaling, and speed control reduce both violations and crashes.",
    },
  ],
  "lesson-7": [
    {
      id: 1,
      question: "What is one of the safest first responses to bad weather?",
      options: [
        "Speed up to get through it faster",
        "Reduce speed and increase following distance",
        "Follow traffic more closely for guidance",
        "Brake sharply whenever visibility drops",
      ],
      correctAnswer: 1,
      explanation:
        "Bad conditions require slower speed and more space so drivers can react safely.",
    },
    {
      id: 2,
      question: "Why are the first minutes of rainfall often especially risky?",
      options: [
        "Rain removes all visibility instantly",
        "Oil and debris can make the road slippery",
        "Drivers stop using headlights",
        "Traffic signals work differently",
      ],
      correctAnswer: 1,
      explanation:
        "Oil and debris on the roadway can mix with water and create slippery conditions early in rainfall.",
    },
    {
      id: 3,
      question: "What is a safe rule in fog or limited visibility?",
      options: [
        "Drive at the posted speed if traffic is light",
        "Drive at a speed that allows you to stop within what you can see",
        "Follow the taillights ahead very closely",
        "Use speed to clear the hazard faster",
      ],
      correctAnswer: 1,
      explanation:
        "When visibility decreases, speed must also decrease so you can stop within your visible distance.",
    },
    {
      id: 4,
      question: "Night driving is more dangerous mainly because:",
      options: [
        "Roads are always more crowded",
        "Vehicles lose braking power",
        "Hazards are harder to detect",
        "Speed limits no longer apply",
      ],
      correctAnswer: 2,
      explanation:
        "Darkness reduces visual information, making pedestrians, debris, and disabled vehicles harder to see.",
    },
    {
      id: 5,
      question: "If your vehicle breaks down, your first goal should be to:",
      options: [
        "Stop in the travel lane immediately",
        "Move to a safer location if possible",
        "Exit into traffic quickly",
        "Ignore it and keep driving",
      ],
      correctAnswer: 1,
      explanation:
        "If possible, move to a safer location, make your vehicle visible, and respond in a controlled way.",
    },
  ],
  "lesson-8": [
    {
      id: 1,
      question: "Why does attitude matter in driving?",
      options: [
        "It determines only music choice",
        "It affects judgment and driving behavior",
        "It matters only when traffic is heavy",
        "It replaces the need for attention",
      ],
      correctAnswer: 1,
      explanation:
        "A driver's mindset affects speed choices, patience, reactions, and willingness to take risks.",
    },
    {
      id: 2,
      question: "What can impatience lead to?",
      options: [
        "Safer following distance",
        "Better anticipation",
        "Speeding and risky maneuvers",
        "Improved calmness",
      ],
      correctAnswer: 2,
      explanation:
        "Impatience often leads to speeding, tailgating, and other risky decisions.",
    },
    {
      id: 3,
      question: "Why is overconfidence dangerous?",
      options: [
        "It always improves reaction time",
        "It can encourage risky choices and complacency",
        "It affects only new drivers",
        "It makes distraction impossible",
      ],
      correctAnswer: 1,
      explanation:
        "Overconfidence can cause drivers to underestimate risk and reduce safe habits.",
    },
    {
      id: 4,
      question: "What is a safer response to frustration on the road?",
      options: [
        "Retaliate against other drivers",
        "Drive faster to escape the situation",
        "Create space and refocus on control",
        "Use close following to pressure traffic",
      ],
      correctAnswer: 2,
      explanation:
        "The safest response to anger or frustration is to disengage, create space, and regain self-control.",
    },
    {
      id: 5,
      question: "Long-term safe driving depends most on:",
      options: [
        "Mood on a given day",
        "Consistent safe habits",
        "Winning interactions with other drivers",
        "Driving aggressively when needed",
      ],
      correctAnswer: 1,
      explanation:
        "Safety becomes more reliable when it is based on consistent habits rather than moment-to-moment emotion.",
    },
  ],
};

export function getVirginiaLessonBySlug(slug: string) {
    return VIRGINIA_LESSONS.find((lesson) => lesson.slug === slug) ?? null;
}
