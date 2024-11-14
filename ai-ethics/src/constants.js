const glossaryWords = [
  {
    description:
      "A large language model (LLM) is an AI model that has been trained on large amounts of text so that it can understand language and generate human-like text.",
    title: "Large language model (LLM)",
  },
  {
    title: "Natural language processing (NLP)",
    description:
      "Natural language processing (NLP) is a type of AI that enables computers to understand spoken and written human language. NLP enables features like text and speech recognition on devices.",
  },
  {
    description: "Acronym standing for application programming interface",
    title: "API",
  },
  {
    title: "Algorithm",
    description:
      "An algorithm is a sequence of rules given to an AI machine to perform a task or solve a problem. Common algorithms include classification, regression, and clustering.",
  },
  {
    description:
      "A hyperparameter is a parameter, or value, that affects the way an AI model learns. It is usually set manually outside of the model.",
    title: "Hyperparameter",
  },
  {
    title: "Voice recognition",
    description:
      "Voice recognition, also called speech recognition, is a method of human-computer interaction in which computers listen and interpret human dictation (speech) and produce written or spoken outputs. Examples include Apple’s Siri and Amazon’s Alexa, devices that enable hands-free requests and tasks.",
  },
  {
    title: "Cognitive computing",
    description:
      "Cognitive computing is essentially the same as AI. It’s a computerized model that focuses on mimicking human thought processes such as pattern recognition and learning. Marketing teams sometimes use this term to eliminate the sci-fi mystique of AI.",
  },
  {
    title: "Limited memory",
    description:
      "Limited memory is a type of AI system that receives knowledge from real-time events and stores it in the database to make better predictions.",
  },
  {
    description:
      "Machine learning is a subset of AI that incorporates aspects of computer science, mathematics, and coding. Machine learning focuses on developing algorithms and models that help machines learn from data and predict trends and behaviors, without human assistance.",
    title: "Machine Learning",
  },
  {
    description:
      "Data mining is the process of sorting through large data sets to identify patterns that can improve models or solve problems.",
    title: "Data mining",
  },
  {
    title: "Big data",
    description:
      "Big data refers to the large data sets that can be studied to reveal patterns and trends to support business decisions. It’s called “big” data because organizations can now gather massive amounts of complex data using data collection tools and systems. Big data can be collected very quickly and stored in a variety of formats.",
  },
  {
    description:
      "Also known as opinion mining, sentiment analysis is the process of using AI to analyze the tone and opinion of a given text.",
    title: "Sentiment analysis",
  },
  {
    description:
      "Overfitting occurs in machine learning training when the algorithm can only work on specific examples within the training data. A typical functioning AI model should be able to generalize patterns in the data to tackle new tasks.",
    title: "Overfitting",
  },
  {
    description:
      "Hallucination refers to an incorrect response from an AI system, or false information in an output that is presented as factual information.",
    title: "Hallucination",
  },
  {
    description:
      "A chatbot is a software application that is designed to imitate human conversation through text or voice commands.",
    title: "Chatbot",
  },
  {
    title: "Prompt",
    description:
      "A prompt is an input that a user feeds to an AI system in order to get a desired result or output.",
  },
  {
    description:
      "Emergent behavior, also called emergence, is when an AI system shows unpredictable or unintended capabilities.",
    title: "Emergent behavior",
  },
  {
    title: "Structured data",
    description:
      "Structured data is data that is defined and searchable. This includes data like phone numbers, dates, and product SKUs.",
  },
  {
    title: "Turing test",
    description:
      "The Turing test was created by computer scientist Alan Turing to evaluate a machine’s ability to exhibit intelligence equal to humans, especially in language and behavior. When facilitating the test, a human evaluator judges conversations between a human and machine. If the evaluator cannot distinguish between responses, then the machine passes the Turing test.",
  },
  {
    title: "Training data",
    description:
      "Training data is the information or examples given to an AI system to enable it to learn, find patterns, and create new content.",
  },
  {
    description:
      "Quantum computing is the process of using quantum-mechanical phenomena such as entanglement and superposition to perform calculations. Quantum machine learning uses these algorithms on quantum computers to expedite work because it performs much faster than a classic machine learning program and computer.",
    title: "Quantum computing",
  },
  {
    title: "Prescriptive analytics",
    description:
      "Prescriptive analytics is a type of analytics that uses technology to analyze data for factors such as possible situations and scenarios, past and present performance, and other resources to help organizations make better strategic decisions.",
  },
  {
    description:
      "A neural network is a deep learning technique designed to resemble the human brain’s structure. Neural networks require large data sets to perform calculations and create outputs, which enables features like speech and vision recognition.",
    title: "Neural network",
  },
  {
    title: "Pattern recognition",
    description:
      "Pattern recognition is the method of using computer algorithms to analyze, detect, and label regularities in data. This informs how the data gets classified into different categories.",
  },
  {
    description:
      "Reinforcement learning is a type of machine learning in which an algorithm learns by interacting with its environment and then is either rewarded or penalized based on its actions.",
    title: "Reinforcement learning",
  },
  {
    description:
      "Unsupervised learning is a type of machine learning in which an algorithm is trained with unclassified and unlabeled data so that it acts without supervision.",
    title: "Unsupervised learning",
  },
  {
    description:
      "AI ethics refers to the issues that AI stakeholders such as engineers and government officials must consider to ensure that the technology is developed and used responsibly. This means adopting and implementing systems that support a safe, secure, unbiased, and environmentally friendly approach to artificial intelligence.",
    title: "A.I. ethics",
  },
  {
    description:
      "Computer vision is an interdisciplinary field of science and technology that focuses on how computers can gain understanding from images and videos. For AI engineers, computer vision allows them to automate activities that the human visual system typically performs.",
    title: "Computer vision",
  },
  {
    description:
      "Transfer learning is a machine learning system that takes existing, previously learned data and applies it to new tasks and activities.",
    title: "Transfer learning",
  },
  {
    description:
      "A token is a basic unit of text that an LLM uses to understand and generate language. A token may be an entire word or parts of a word.",
    title: "Token",
  },
  {
    title: "A.I.",
    description: "An acronym standing for artificial intelligence.",
  },
  {
    title: "Image recognition",
    description:
      "Image recognition is the process of identifying an object, person, place, or text in an image or video. ",
  },
  {
    title: "Application programming interface (API)",
    description:
      "An application programming interface, often referred to as an API, or application programming interface, is a set of protocols that determine how two software applications will interact with each other. APIs tend to be written in programming languages such as C++ or JavaScript.",
  },
  {
    title: "Artificial Intelligence",
    description:
      "AI stands for artificial intelligence, which is the simulation of human intelligence processes by machines or computer systems. AI can mimic human capabilities such as communication, learning, and decision-making.",
  },
  {
    description:
      "Predictive analytics is a type of analytics that uses technology to predict what will happen in a specific time frame based on historical data and patterns.",
    title: "Predictive analytics",
  },
  {
    description:
      "Data science is an interdisciplinary field of technology that uses algorithms and processes to gather and analyze large amounts of data to uncover patterns and insights that inform business decisions.",
    title: "Data science",
  },
  {
    title: "Deep learning",
    description:
      "Deep learning is a function of AI that imitates the human brain by learning from how it structures and processes information to make decisions. Instead of relying on an algorithm that can only perform one specific task, this subset of machine learning can learn from unstructured data without supervision.",
  },
  {
    title: "Unstructured data",
    description:
      "Unstructured data is data that is undefined and difficult to search. This includes audio, photo, and video content. Most of the data in the world is unstructured.",
  },
  {
    description:
      "Generative AI is a type of technology that uses AI to create content, including text, video, code and images. A generative AI system is trained using large amounts of data, so that it can find patterns for generating new content.",
    title: "Generative AI",
  },
  {
    title: "Guardrails",
    description:
      "Guardrails refers to restrictions and rules placed on AI systems to make sure that they handle data appropriately and don't generate unethical content.",
  },
  {
    title: "Supervised learning",
    description:
      "Supervised learning is a type of machine learning in which classified output data is used to train the machine and produce the correct algorithms. It is much more common than unsupervised learning.",
  },
];

export { glossaryWords };
