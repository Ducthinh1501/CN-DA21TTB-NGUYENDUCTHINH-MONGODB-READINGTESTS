const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Test = require('../models/Test');
require('dotenv').config();

const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'user123',
    role: 'user'
  }
];

const tests = [
  {
    title: "Reading Test 1: Climate Change",
    description: "A passage about the impacts of climate change",
    timeLimit: 20,
    passage: `Climate change is one of the most pressing issues facing our planet today. The Earth's average temperature has increased by about 1°C since pre-industrial times, primarily due to human activities. The burning of fossil fuels, deforestation, and industrial processes have led to increased greenhouse gas emissions, particularly carbon dioxide.

    Scientists have observed various effects of this warming, including melting ice caps, rising sea levels, and more frequent extreme weather events. The Arctic is warming twice as fast as the global average, and sea levels have risen by about 8 inches since 1900.

    Many countries have pledged to reduce their carbon emissions through international agreements like the Paris Accord. However, some experts argue that current commitments are insufficient to prevent dangerous levels of warming. Renewable energy sources, such as solar and wind power, are becoming increasingly important in the transition away from fossil fuels.`,
    questions: [
      {
        questionText: "The Earth's temperature has risen by 2°C since pre-industrial times.",
        correctAnswer: "false",
        explanation: "The passage states that the temperature has increased by about 1°C, not 2°C."
      },
      {
        questionText: "The Arctic is warming at double the global average rate.",
        correctAnswer: "true",
        explanation: "The passage explicitly states that the Arctic is warming twice as fast as the global average."
      },
      {
        questionText: "Sea levels have increased by 12 inches since 1900.",
        correctAnswer: "false",
        explanation: "The passage mentions that sea levels have risen by about 8 inches, not 12 inches."
      },
      {
        questionText: "The Paris Accord requires countries to eliminate all carbon emissions by 2030.",
        correctAnswer: "not given",
        explanation: "The passage mentions the Paris Accord but does not specify this requirement."
      },
      {
        questionText: "Renewable energy is replacing fossil fuels completely.",
        correctAnswer: "not given",
        explanation: "The passage only states that renewable energy is becoming increasingly important, not that it's completely replacing fossil fuels."
      }
    ],
    difficulty: 'medium',
    category: 'Environment'
  },
  {
    title: "Reading Test 2: Ocean Pollution",
    description: "A passage about plastic pollution in oceans",
    timeLimit: 15,
    passage: `Ocean pollution has become a major environmental concern in recent decades. Every year, millions of tons of plastic waste enter the oceans, forming large garbage patches in various parts of the world. The largest of these, the Great Pacific Garbage Patch, is estimated to cover an area three times the size of France.

    Marine animals often mistake plastic debris for food, leading to injury or death. Microplastics, which are tiny plastic particles less than 5mm in size, have been found in marine organisms from plankton to whales. These particles can accumulate toxins and move up the food chain, potentially affecting human health.

    Recent studies have shown that plastic pollution reaches even the deepest parts of the ocean. Scientists have discovered plastic bags and candy wrappers at the bottom of the Mariana Trench, the deepest known point on Earth. Some researchers estimate that by 2050, there could be more plastic than fish in the oceans by weight.`,
    questions: [
      {
        questionText: "The Great Pacific Garbage Patch is larger than France.",
        correctAnswer: "true",
        explanation: "The passage states it covers an area three times the size of France."
      },
      {
        questionText: "All marine animals are affected by microplastics.",
        correctAnswer: "not given",
        explanation: "The passage mentions that microplastics are found in many marine organisms but doesn't state that all are affected."
      },
      {
        questionText: "Plastic pollution only affects surface waters.",
        correctAnswer: "false",
        explanation: "The passage mentions that plastic pollution reaches the deepest parts of the ocean."
      },
      {
        questionText: "Scientists have found plastic in the Mariana Trench.",
        correctAnswer: "true",
        explanation: "The passage explicitly states that plastic bags and candy wrappers were found in the Mariana Trench."
      },
      {
        questionText: "By 2050, there will definitely be more plastic than fish in the oceans.",
        correctAnswer: "false",
        explanation: "The passage states that 'some researchers estimate', indicating it's a possibility, not a certainty."
      }
    ],
    difficulty: 'medium',
    category: 'Environment'
  },
  {
    title: "Reading Test 3: Space Exploration",
    description: "A passage about recent developments in space exploration",
    timeLimit: 15,
    passage: `Space exploration has entered a new era with the rise of private companies joining government space agencies in the race to the stars. Companies like SpaceX and Blue Origin have revolutionized space travel by developing reusable rockets, significantly reducing the cost of launching payloads into orbit.

    Mars has become a primary target for future human exploration. NASA plans to send astronauts to the Red Planet in the 2030s, while private companies have proposed their own ambitious missions. Scientists have already discovered evidence of liquid water beneath Mars' surface, raising hopes about the possibility of finding microbial life.

    The search for exoplanets - planets orbiting other stars - has also yielded exciting results. Using advanced telescopes, astronomers have discovered thousands of planets outside our solar system, including some that might be capable of supporting life. These "potentially habitable" worlds have temperatures that could allow liquid water to exist on their surfaces.`,
    questions: [
      {
        questionText: "Private companies have made space travel more expensive.",
        correctAnswer: "false",
        explanation: "The passage states that reusable rockets have reduced the cost of launching payloads."
      },
      {
        questionText: "NASA will send humans to Mars before 2025.",
        correctAnswer: "false",
        explanation: "The passage mentions NASA plans to send astronauts in the 2030s."
      },
      {
        questionText: "Liquid water has been found on the surface of Mars.",
        correctAnswer: "false",
        explanation: "The passage mentions water beneath Mars' surface, not on it."
      },
      {
        questionText: "All discovered exoplanets can support life.",
        correctAnswer: "false",
        explanation: "The passage only mentions that some might be capable of supporting life."
      },
      {
        questionText: "SpaceX was the first private company to develop reusable rockets.",
        correctAnswer: "not given",
        explanation: "The passage doesn't specify which company developed reusable rockets first."
      }
    ],
    difficulty: 'hard',
    category: 'Science'
  },
  {
    title: "Reading Test 4: Artificial Intelligence",
    description: "A passage about AI development and its impact",
    timeLimit: 20,
    passage: `Artificial Intelligence (AI) has made remarkable progress in recent years, transforming various aspects of our daily lives. Machine learning algorithms now power everything from virtual assistants and recommendation systems to autonomous vehicles and medical diagnosis tools. These systems can process vast amounts of data and identify patterns that humans might miss.

    However, the rapid advancement of AI also raises important ethical concerns. Questions about privacy, job displacement, and algorithmic bias have become increasingly prominent. Some experts worry about the potential development of artificial general intelligence (AGI) - AI systems that could match or exceed human intelligence across all domains.

    Despite these concerns, AI continues to evolve and find new applications. In healthcare, AI systems are helping doctors detect diseases earlier and develop personalized treatment plans. In education, AI-powered adaptive learning systems are providing students with customized learning experiences. The challenge lies in harnessing AI's potential while ensuring its development remains beneficial and ethical.`,
    questions: [
      {
        questionText: "AI systems can only process small amounts of data.",
        correctAnswer: "false",
        explanation: "The passage states that AI systems can process vast amounts of data."
      },
      {
        questionText: "Privacy is mentioned as an ethical concern regarding AI.",
        correctAnswer: "true",
        explanation: "The passage explicitly mentions privacy as one of the ethical concerns."
      },
      {
        questionText: "AGI currently exists and is widely used.",
        correctAnswer: "false",
        explanation: "The passage only mentions it as a potential future development."
      },
      {
        questionText: "AI is being used to create personalized medical treatments.",
        correctAnswer: "true",
        explanation: "The passage mentions AI helping develop personalized treatment plans."
      },
      {
        questionText: "All experts agree that AI development is completely safe.",
        correctAnswer: "false",
        explanation: "The passage mentions various concerns about AI development."
      }
    ],
    difficulty: 'hard',
    category: 'Technology'
  },
  {
    title: "Reading Test 5: Ancient Egypt",
    description: "A passage about ancient Egyptian civilization",
    timeLimit: 15,
    passage: `Ancient Egypt was one of the world's first great civilizations, flourishing along the Nile River for over 3,000 years. The ancient Egyptians are famous for their massive pyramids, intricate hieroglyphics, and complex religious beliefs. The Nile's annual flooding provided fertile soil for agriculture, which formed the backbone of their economy.

    The pyramids were built as tombs for pharaohs and their consorts during the Old and Middle Kingdom periods. The Great Pyramid of Giza, built for Pharaoh Khufu, remained the tallest human-made structure in the world for over 3,800 years. The ancient Egyptians also developed sophisticated systems of mathematics, medicine, and astronomy.

    Their writing system, hieroglyphics, remained a mystery until the discovery of the Rosetta Stone in 1799. This artifact, containing the same text in hieroglyphics, demotic script, and ancient Greek, provided the key to understanding ancient Egyptian writing.`,
    questions: [
      {
        questionText: "The Nile's flooding was harmful to Egyptian agriculture.",
        correctAnswer: "false",
        explanation: "The passage states that the flooding provided fertile soil for agriculture."
      },
      {
        questionText: "The Great Pyramid was built for Pharaoh Khufu.",
        correctAnswer: "true",
        explanation: "This is explicitly stated in the passage."
      },
      {
        questionText: "Ancient Egyptians only built pyramids.",
        correctAnswer: "false",
        explanation: "The passage mentions they also developed mathematics, medicine, and astronomy."
      },
      {
        questionText: "The Rosetta Stone contained three different scripts.",
        correctAnswer: "true",
        explanation: "The passage lists hieroglyphics, demotic script, and ancient Greek."
      },
      {
        questionText: "Egyptian civilization lasted exactly 3,000 years.",
        correctAnswer: "false",
        explanation: "The passage states it flourished for over 3,000 years."
      }
    ],
    difficulty: 'medium',
    category: 'History'
  },
  {
    title: "Reading Test 6: Renewable Energy",
    description: "A passage about renewable energy sources",
    timeLimit: 20,
    passage: `Renewable energy sources are becoming increasingly important in the global effort to reduce carbon emissions and combat climate change. Solar, wind, hydroelectric, and geothermal power offer clean alternatives to fossil fuels. These sources are naturally replenished and produce minimal greenhouse gases during operation.

    Solar energy has seen dramatic cost reductions in recent years, making it competitive with traditional power sources in many regions. Wind power has also expanded rapidly, with offshore wind farms becoming particularly popular in coastal areas. Advances in energy storage technology, particularly battery systems, are helping to address the intermittent nature of these renewable sources.

    Many countries have set ambitious targets for renewable energy adoption. Some nations have already achieved significant milestones, with certain regions occasionally generating 100% of their electricity from renewable sources. However, challenges remain, including grid integration, storage capacity, and the need for substantial infrastructure investments.`,
    questions: [
      {
        questionText: "Renewable energy sources cannot be replenished.",
        correctAnswer: "false",
        explanation: "The passage states they are naturally replenished."
      },
      {
        questionText: "Solar energy costs have decreased significantly.",
        correctAnswer: "true",
        explanation: "The passage mentions dramatic cost reductions in solar energy."
      },
      {
        questionText: "All countries have achieved 100% renewable energy.",
        correctAnswer: "false",
        explanation: "The passage only mentions certain regions occasionally achieving this."
      },
      {
        questionText: "Battery technology helps manage renewable energy supply.",
        correctAnswer: "true",
        explanation: "The passage states that battery systems help address intermittency."
      },
      {
        questionText: "Renewable energy has no implementation challenges.",
        correctAnswer: "false",
        explanation: "The passage mentions several challenges including grid integration and storage."
      }
    ],
    difficulty: 'medium',
    category: 'Environment'
  },
  {
    title: "Reading Test 7: Human Brain",
    description: "A passage about the complexity of the human brain",
    timeLimit: 25,
    passage: `The human brain is often considered the most complex organ in the known universe. Containing approximately 86 billion neurons, each connected to thousands of others, it processes vast amounts of information every second. The brain controls everything from basic bodily functions to complex cognitive tasks like problem-solving and creative thinking.

    Recent advances in neuroscience have revealed that the brain continues to change throughout our lives through a process called neuroplasticity. This ability allows the brain to form new neural connections and modify existing ones in response to experiences, learning, and injury. Scientists have also discovered that regular exercise, proper sleep, and mental stimulation can enhance brain function and may help prevent cognitive decline.

    Despite significant progress in brain research, many mysteries remain. Consciousness, memory formation, and the nature of intelligence are still not fully understood. New technologies like functional MRI have provided unprecedented insights into brain activity, but researchers estimate that we've only begun to scratch the surface of understanding this remarkable organ.`,
    questions: [
      {
        questionText: "The human brain has exactly 100 billion neurons.",
        correctAnswer: "false",
        explanation: "The passage states approximately 86 billion neurons."
      },
      {
        questionText: "The brain stops changing after childhood.",
        correctAnswer: "false",
        explanation: "The passage states that the brain continues to change throughout our lives."
      },
      {
        questionText: "Exercise can positively affect brain function.",
        correctAnswer: "true",
        explanation: "This is explicitly mentioned in the passage."
      },
      {
        questionText: "Scientists fully understand how memory works.",
        correctAnswer: "false",
        explanation: "The passage states that memory formation is still not fully understood."
      },
      {
        questionText: "Neuroplasticity allows the brain to form new connections.",
        correctAnswer: "true",
        explanation: "This is explicitly stated in the passage."
      }
    ],
    difficulty: 'hard',
    category: 'Science'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reading-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing data
    await User.deleteMany({});
    await Test.deleteMany({});

    // Create users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword
      });
    }
    console.log('✓ Users created successfully');

    // Create tests
    await Test.insertMany(tests);
    console.log('✓ Tests created successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();