export const PROJECTS = {
  yotrade: {
    id: 0,
    slug: "yotrade",
    number: "First Story",
    title: "YoTrade Nepse",
    desc: "help investors analyze the market, be aware of own status and invest in safe manner",
    color: "0x8BA1CD",
    images: {
      main: "/assets/images/terminmeister.png"
    },
    content: {
      layouts: [{
        id: 0,
        type: "text",
        title: ["About the", "internship"],
        emoji: "🛠",
        subtitle: "Intro",
        paragraphs: ["A few weeks after I released my first portfolio in 2017, I was contacted by Ming Labs, a creative digital agency that was interested in having me as a design intern.", "One month later, I landed in Berlin to begin my 4 month internship. I worked on a lot of projects and learned about service design, business design, how to run workshops and more. All of the things I learned there truly changed the way I see our industry."]
      }, {
        id: 1,
        type: "custom",
        name: "islands"
      }, {
        id: 2,
        type: "text",
        title: ["German", "Aerospace Ct."],
        emoji: "🚀",
        subtitle: "Client",
        paragraphs: ["I worked on several projects at Ming Labs. One of which was a landing website for an app that was created internally for the German Aerospace Center (DLR).", "The app’s goal was to facilitate craftsmen in movement by giving them an easy way to plan their appointments through GPS technologies and traffic information."]
      }, {
        id: 3,
        type: "slider",
        slides: ["/assets/images/projects/minglabs/slide-1.jpg", "/assets/images/projects/minglabs/slide-2.jpg", "/assets/images/projects/minglabs/slide-3.jpg", "/assets/images/projects/minglabs/slide-4.jpg"]
      }, {
        id: 4,
        type: "text",
        title: ["Iterate and", "explore"],
        emoji: "🤔",
        subtitle: "Intro",
        paragraphs: ["What you’re seing is one of the many iterations that we made for the landing page. Clement, who was the developer on this project (and also the guy who’s coding this line 🍺), worked  with me on implementing ideas, findind solutions to gather as much inspiration as possible.", "We were asked by our lead designer, Erica Salvetti, to explore as much as possible and take time to explore our most crazy ideas and this one, who was based on storytelling, was the one we explored the most."]
      }, {
        id: 5,
        type: "cover",
        image: "/assets/images/projects/minglabs/cover.jpg"
      }, {
        id: 6,
        type: "text",
        title: ["Illustration and", "storytelling"],
        emoji: "📝",
        subtitle: "Method",
        paragraphs: ["How can we explain a product that is complicated to a target who’s not necessarily fond of digital services ? Our main answer to that was storytelling through illustration. It was a way to enhance the visual aspect of the product while explaining it in a instinctive way. ", "Exploring something that was supposed to be a classic landing page and turning it into something new was appealing and exciting. We loved it. ⚡️"]
      }, {
        id: 7,
        type: "picture",
        image: "/assets/images/projects/minglabs/picture.jpg"
      }, {
        id: 8,
        type: "text",
        title: ["Marketing and", "business goals"],
        emoji: "🎯",
        subtitle: "Ending",
        paragraphs: ["This version that I wanted to show was not the final version. After a lot of exploration, we decided to go back to our first path, which was something more business and marketing oriented, more than storytelling. Even though it lacked storytelling visually, the wording and general vibe was more self-explaining. ", "The exploration eventually lead us to rething our very first marketing-version and the client was happy with that. We gave a talk to the team about our process and the way we, as 1 designer and 1 dev worked together in the creative process and they loved it. Happy ending. 🎉"]
      }, {
        id: 9,
        type: "thanks",
        title: "Special thanks ✌️",
        people: [{
          name: "Ivan Provenzale",
          role: "Creative Director"
        }, {
          name: "Erica Salvetti",
          role: "Lead Designer"
        }, {
          name: "Luca Migliore",
          role: "Design Support"
        }, {
          name: "Clément Vion",
          role: "Creative Developer"
        }]
      }]
    }
  },
  npfeed: {
    id: 1,
    slug: "npfeed",
    number: "Second Story",
    title: "NPFeed",
    desc: "launched an aggregator for various news portals of Nepal. Get the feed you need.",
    color: "0xCD8B8B",
    images: {
      main: "/assets/images/chair.png"
    },
    content: {
      layouts: [{
        id: 0,
        type: "text",
        title: ["Self-flying", "drone"],
        emoji: "📸",
        subtitle: "Intro",
        paragraphs: ["Our mission was to redesign, as a team of 10, the overall Tesla interface, including the app, the Cluster, the Watch app and the dashboard. The tricky part was that we had to find a brand and imagine a partnership between that brand and Tesla.", "We chose Go Pro. And the fun part of that project is that we could find and design a feature that would make sense with the according brand. So we imagined a way to launch a drone and start recording, while the car’s driving itself."]
      }, {
        id: 1,
        type: "tripleScreens",
        images: ["/assets/images/projects/tesla/screen-1.jpg", "/assets/images/projects/tesla/screen-2.jpg", "/assets/images/projects/tesla/screen-3.jpg"]
      }, {
        id: 2,
        type: "text",
        title: ["Building the", "future"],
        emoji: "🔭",
        subtitle: "Philosophy",
        paragraphs: ["I loved the idea of designing for a screen I’m not used to design for. Besides, Go Pro and Tesla are companies with strong branding that actually somehow matched. It didn’t feel like I was designing a fake interface, I truly cared about how futuristic that actually looked like.\u2028", "I would not even be suprised if we could actually soon launch a drone from a car we’re not even driving, and do nothing but see this drone follow the car and shoot a film."]
      }, {
        id: 3,
        type: "fourScreens",
        images: ["/assets/images/projects/tesla/dashboard-1.png", "/assets/images/projects/tesla/dashboard-2.png", "/assets/images/projects/tesla/dashboard-3.png", "/assets/images/projects/tesla/dashboard-4.png"]
      }, {
        id: 4,
        type: "text",
        title: ["Sitting in the", "front seat"],
        emoji: "🚘",
        subtitle: "Learnings",
        paragraphs: ["Designing for a context such as this one is quite interesting since there are a lot of things you can’t really do for security matters. You need to come back to the core of design and think deeply about each feature you’re building, and put yourself in the front seat.", "For instance, we added scrolling on the main screen, and we then learned it was somehow forbidden to do that in Europe. 🤷‍♀️"]
      }, {
        id: 5,
        type: "cover",
        image: "/assets/images/projects/tesla/cover.jpg"
      }, {
        id: 6,
        type: "text",
        title: ["Consistency’s", "the key"],
        emoji: "🔑",
        subtitle: "Learnings",
        paragraphs: ["If there’s one thing we learned from this exercice is how hard being consistent between platforms can be. Designing an Watch App, a Phone app, a car dashboard and cluster was a challenge consistency wise. Especially when you’re working with a big team on the same design.", "So we build a UI kit everybody in the team could refer to, and used Abstract as a tool for design management. It all worked out perfect."]
      }, {
        id: 7,
        type: "video",
        sources: [{
          type: "mp4",
          url: "/assets/images/projects/tesla/video.mp4"
        }, {
          type: "webm",
          url: "/assets/images/projects/tesla/video.webm"
        }]
      }, {
        id: 8,
        type: "thanks",
        title: "Special thanks ✌️",
        people: [{
          name: "Margaux Tellier",
          role: "Lead Motion"
        }, {
          name: "Lucie Zevaco",
          role: "UI/UX"
        }, {
          name: "Clément Vion",
          role: "UI/UX, Creative Dev"
        }, {
          name: "Arnaud Villani",
          role: "UI/UX"
        }, {
          name: "Claire Zunda",
          role: "UI/UX"
        }, {
          name: "Adrien Menegaux",
          role: "UI/UX"
        }, {
          name: "Victor Gossioux",
          role: "UI/UX"
        }]
      }]
    }
  },
  medilens: {
    id: 2,
    slug: "medilens",
    number: "Third Story",
    title: "MediLens, Drug Directory",
    desc: "browse detailed information regarding all pharmaceutical drugs available in Nepal",
    color: "0x8BCDA6",
    images: {
      main: "/assets/images/fruits.png"
    },
    content: {
      layouts: [{
        id: 0,
        type: "text",
        title: ["About the", "project"],
        emoji: "🍗",
        subtitle: "Intro",
        paragraphs: ["Weekmeal is a project that came to live at HETIC, as we had only one week to conceive, create and develop an Android and iOs app on the theme we wanted.", "We chose to create an app that would help one find ideas of things to cook for a week. The user could choose the number of meals he wanted ideas for and the app would learn to know its user and offer a variety of meals that would suit his taste."]
      }, {
        id: 1,
        type: "tripleScreens",
        images: ["/assets/images/projects/weekmeal/phone-1.png", "/assets/images/projects/weekmeal/phone-2.png", "/assets/images/projects/weekmeal/phone-3.png"]
      }, {
        id: 2,
        type: "text",
        title: ["Features and", "AI"],
        emoji: "💡",
        subtitle: "Product",
        paragraphs: ["We were asked by our teacher to use AI to somehow add value to our idea. Therefore, we added individualization to our product through the way the recipes are shown to the user.", "Throughout the weeks and months during which the user’s using the app, we create a profile that is his only, and show only the recipes that we’re pretty sure he will like."]
      }, {
        id: 3,
        type: "sliderParallax",
        slides: [{
          image: "/assets/images/projects/weekmeal/slider-1.png",
          title: "Step one",
          desc: "Giving the detail of your eventual diet and desires "
        }, {
          image: "/assets/images/projects/weekmeal/slider-2.png",
          title: "Step two",
          desc: "Choosing among the list, the recipes you want to try and the ones you’re not interested in."
        }, {
          image: "/assets/images/projects/weekmeal/slider-3.png",
          title: "Step three",
          desc: "Access the list of your weekly meals sorted by dates."
        }, {
          image: "/assets/images/projects/weekmeal/slider-4.png",
          title: "Step four",
          desc: "Access the page of a given recipe, with all the ingredients you need to buy."
        }, {
          image: "/assets/images/projects/weekmeal/slider-5.png",
          title: "Step five",
          desc: "Get access to your total shopping list with all recipe’s ingredients mixed and the possibility to find the closest store."
        }]
      }, {
        id: 4,
        type: "text",
        title: ["Adding value", "to the app"],
        emoji: "🌟",
        subtitle: "Service Design",
        paragraphs: ["The main issue when you’re designing an idea that is quite common is to find a good business value. Among those was AI, but also the idea to rather than only design the app, try to design the service behind that.", "So we decided to go beyond giving only recipes according to your taste. The app also gives you the estimated budget for the ingredients (calculated with the prices of the place you live in), the closest store and the map to go there. We managed to design the full scope of the situation our users ar in."]
      }, {
        id: 5,
        type: "cover",
        image: "/assets/images/projects/weekmeal/cover.jpg"
      }, {
        id: 6,
        type: "text",
        title: ["Design, outside", "of the box"],
        emoji: "📦",
        subtitle: "Learnings",
        paragraphs: ["It’s quite fun to design an app that a lot of people already had the idea of. We learned that only designing what you first think of doesn’t lead anywhere. You need to learn from the users, think outside of the box and redesign the whole service to create something interesting.", "Only dealing with finding a recipe idea isn’t interesting. The goal of the app was to design everything, from the moment you’re asking yourself what you want for dinner and the moment you’ve finished eating."]
      }]
    }
  },
  meddent: {
    id: 3,
    slug: "meddent",
    number: "Fourth Story",
    title: "MedDent Nepal",
    desc: "an e-commerce website for all your medical and dental needs.",
    color: "0x8B8CCD",
    images: {
      main: "/assets/images/ohmygeorge.png"
    },
    content: {
      layouts: [{
        id: 0,
        type: "text",
        title: ["Play, be brave,", "trade"],
        emoji: "📈",
        subtitle: "Intro",
        paragraphs: ["When I was a second year student, I got hired as a junior designer at Oh My George, a start-up aiming at creating the first trading mobile game. The goal of the app was to make trading accessible to anyone to understand the feelings traders could have when doing their job.", "It was a cool experience because I had lots of responsabilities as the only designer of the start-up, and was able to travel to Bangkok for a month to work with the rest of the team."]
      }, {
        id: 1,
        type: "tripleScreens",
        images: ["/assets/images/projects/ohmygeorge/screen-1.png", "/assets/images/projects/ohmygeorge/screen-2.png", "/assets/images/projects/ohmygeorge/screen-3.png"]
      }, {
        id: 2,
        type: "text",
        title: ["Emotional", "design"],
        emoji: "🙉",
        subtitle: "Product",
        paragraphs: ["Trading is all about emotions. One of my first task was to somehow help trigger those emotions through the design of the game.", "When you play the game, you have access to real and live data of the trading market. When you bet and it goes up, you win, and if the market goes down you lose. The game is all about knowing when to start betting and when to stop. Emotions were triggered through color. When you’re losing, the whole screen goes red, wherehas when you’re winning it goes green."]
      }, {
        id: 3,
        type: "sliderParallax",
        slides: [{
          image: "/assets/images/projects/ohmygeorge/slider-1.png",
          title: "Step one",
          desc: "Place your bet on whether or not the EUR/USD market will rise or fall. Choose how much you want to bet."
        }, {
          image: "/assets/images/projects/ohmygeorge/slider-2.png",
          title: "Step two",
          desc: "Looks like you put a bet that it will rise, and it’s true ! You’re winning $9 !"
        }, {
          image: "/assets/images/projects/ohmygeorge/slider-3.png",
          title: "Step three",
          desc: "You closed the bet ! Great choice, you just earned nearly 50$. Be careful not to lose it in the next game."
        }]
      }, {
        id: 4,
        type: "text",
        title: ["Challenge", "your friends"],
        emoji: "🏆",
        subtitle: "Competition",
        paragraphs: ["Trading is also about competition. So I also a designed a platform for traders and friends to challenge each other on their bets. You could search for random games as well, and then bet on a chosen market.", "The social part of the game was also an added business value, as it allowed people to talk more about the game and play in situations in which other people could hear of OhMyGeorge and download the app."]
      }, {
        id: 5,
        type: "cover",
        image: "/assets/images/projects/ohmygeorge/cover.jpg"
      }, {
        id: 6,
        type: "text",
        title: ["Working in a", "startup"],
        emoji: "🏓",
        subtitle: "Learnings",
        paragraphs: ["This internship was my first occasion to work for a start-up, and it truly is quite different from working for an agency. The opportunity to work on the same product for a few months is good and refreshing and I liked it, as I could focus on UX elements and try my best to do the right thing without being rushed.", "It’s obvious both have their pros and cons and I believe a student needs to live both before choosing a field rather than the other."]
      }]
    }
  },
  pasalify: {
    id: 4,
    slug: "pasalify",
    number: "Fifth Story",
    title: "Pasalify, E-Commerce Platform",
    desc: "contact us for all your e-commerce requirements. Build your store on cloud. Make business easy.",
    color: "0xCD8BB3",
    images: {
      main: "/assets/images/pickorr.png"
    },
    content: {
      layouts: [{
        id: 0,
        type: "text",
        title: ["The rise of", "curation"],
        emoji: "📰",
        subtitle: "Intro",
        paragraphs: ["During my third year I was contacted through Behance by Alexis Raison, an entrepeneur from Paris wanting to create a medecine curation media for doctors and students. ", "I accepted the challenge and started thinking and designing on this new form of media that has been rising lately."]
      }, {
        id: 1,
        type: "slider",
        slides: ["/assets/images/projects/pickorr/slider-1.jpg", "/assets/images/projects/pickorr/slider-2.jpg", "/assets/images/projects/pickorr/slider-3.jpg"]
      }, {
        id: 2,
        type: "text",
        title: ["About design", "thinking"],
        emoji: "💊",
        subtitle: "Method",
        paragraphs: ["Using design thinking on this project was crucial. My client, Alexis, had a precise idea in his head of what he wanted but didn’t have the design approach needed to create his product. ", "So we worked close together and met each other a lot to think together about what he had in mind, iterate on that and I gave him the tools to design his own ideas with me."]
      }, {
        id: 3,
        type: "tripleScreens",
        images: ["/assets/images/projects/pickorr/phone-1.png", "/assets/images/projects/pickorr/phone-2.png", "/assets/images/projects/pickorr/phone-3.png"]
      }, {
        id: 4,
        type: "text",
        title: ["Customer", "journeys"],
        emoji: "🗺️",
        subtitle: "Method",
        paragraphs: ["Curating content is useful for people who have neither time nor envy to go through long reads. For people working in the medecine industry, it truly makes sense to curate since : first, they have uncommon working hours, and second, new discoveries are made all the time.", "Thus, Alexis and I had to come up with a lot of customer journeys to create the product accordingly, and put ourselves in the shoes of the honorable people working in medecine."]
      }, {
        id: 5,
        type: "cover",
        image: "/assets/images/projects/pickorr/cover.jpg"
      }, {
        id: 6,
        type: "text",
        title: ["Working as a", "freelance"],
        emoji: "👨‍💻",
        subtitle: "Learnings",
        paragraphs: ["Pickorr was not my first experience as a freelance digital designer. But it was a perfect exemple of why I love freelancing. Not only is it interesting and refreshing, it enables you to meet new people and work on new exiting stuff. Alexis was a great client and human being and showed great empathy towards me as a young student and freelance designer.", "It’d be also a pleasure to work with you too, so don’t hesitate to drop me a line if you have project in mind."]
      }]
    }
  }
}