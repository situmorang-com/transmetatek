// Stage 2 capability layer: a short, timed, role-specific job-knowledge test
// (see doc/recruitment-funnel.md §5 Stage 2). This is the fake-resistant
// substitute for a work sample we deliberately opted out of — answered under
// time, scored against a hidden key, nothing built or submitted as an artifact.
//
// IMPORTANT: this question bank is a first draft written without a subject-
// matter expert per role. Before relying on it for real hiring decisions, have
// someone who actually does each job review the questions and keys for
// accuracy and difficulty — a wrong key here silently penalizes good answers.

export type JKQuestion = {
  question: string;
  options: string[];
  correctIndex: number; // never sent to the client — see api/job-knowledge.ts
};

export const TIME_LIMIT_SECONDS = 8 * 60; // 8 minutes for the whole test

export const JOB_KNOWLEDGE: Record<string, JKQuestion[]> = {
  'senior-ml-engineer': [
    {
      question: 'A model scores well offline but its production predictions degrade within weeks. What is the most likely first thing to check?',
      options: ['Increase the learning rate and retrain', 'Data/feature drift between training and live traffic', 'Switch to a bigger model architecture', 'Add more layers to increase capacity'],
      correctIndex: 1,
    },
    {
      question: 'You need to serve a large model with strict p99 latency requirements on limited GPU memory. Which approach helps most directly?',
      options: ['Train for more epochs', 'Quantization / distillation to shrink the model', 'Add dropout during inference', 'Increase batch size at inference time'],
      correctIndex: 1,
    },
    {
      question: 'Training loss keeps decreasing but validation loss starts rising after epoch 10. What is happening?',
      options: ['Underfitting', 'Overfitting', 'The learning rate is too low', 'The dataset is too large'],
      correctIndex: 1,
    },
    {
      question: 'Two GPUs in a training job report wildly different throughput despite identical hardware. What should you check first?',
      options: ['Model architecture bug', 'Data loading / I/O bottleneck on the slower node', 'Loss function choice', 'Optimizer choice (Adam vs SGD)'],
      correctIndex: 1,
    },
  ],
  'nlp-llm-specialist': [
    {
      question: 'An LLM-backed support bot confidently invents policy details that do not exist. What is this called, and what is the most direct mitigation?',
      options: ['Overfitting — reduce training epochs', 'Hallucination — ground responses with retrieval (RAG) over real policy docs', 'Tokenization error — change the tokenizer', 'Prompt injection — sanitize user input only'],
      correctIndex: 1,
    },
    {
      question: 'A RAG pipeline returns confident but wrong answers for Bahasa Indonesia queries, though it works well in English. What is the most likely root cause to check first?',
      options: ['The LLM itself cannot understand Indonesian at all', 'The retrieval embeddings or chunking were tuned/tested only on English content', 'The temperature setting is too low', 'The vector database is too slow'],
      correctIndex: 1,
    },
    {
      question: 'A prompt works reliably in testing but breaks when real users paste long, messy text. What is the most likely issue?',
      options: ['The model needs fine-tuning', 'Context window / token limit being exceeded or truncated', 'The API key has expired', 'The model temperature is too high'],
      correctIndex: 1,
    },
    {
      question: 'You need consistent structured JSON output from an LLM for a downstream system. What is the most reliable approach?',
      options: ['Ask nicely in the prompt and hope for the best', 'Use function calling / constrained decoding or a schema-validating output parser with retries', 'Lower the temperature to 0 and nothing else', 'Switch to a larger model'],
      correctIndex: 1,
    },
  ],
  'ai-strategy-consultant': [
    {
      question: 'A client executive asks for "an AI strategy" with no further detail. What is the most useful first move?',
      options: ['Propose a large AI platform build immediately', 'Identify 2-3 specific business problems where AI could plausibly move a real metric, and scope from there', 'Recommend hiring a data science team first', 'Send a generic AI capability slide deck'],
      correctIndex: 1,
    },
    {
      question: 'A client wants an ROI estimate for an AI project before any pilot has run. What is the most defensible approach?',
      options: ['Give a precise number based on industry averages alone', 'Build a transparent range tied to specific assumptions (volume, cost-per-unit, expected accuracy) that can be revisited after a pilot', 'Decline to give any estimate', 'Promise the number leadership wants to hear'],
      correctIndex: 1,
    },
    {
      question: 'Three internal teams disagree on priorities for an AI initiative. What is the most useful thing to do before recommending a roadmap?',
      options: ['Pick the loudest team\'s priority', 'Surface the actual trade-offs each team is optimizing for, then sequence based on business impact and dependencies', 'Average all three teams\' requests', 'Escalate immediately to the CEO'],
      correctIndex: 1,
    },
    {
      question: 'A pilot AI project shows promising results in a demo but the client\'s data is messy and inconsistent in production. What should the roadmap account for?',
      options: ['Ignore data quality — the model will adapt', 'A data-readiness phase (cleaning, pipelines, governance) before or alongside scaling the model', 'Skip straight to full deployment', 'Recommend abandoning AI entirely'],
      correctIndex: 1,
    },
  ],
  'data-scientist': [
    {
      question: 'A churn model shows 95% accuracy but the business says it is useless in practice. What is the most likely explanation?',
      options: ['The model is actually excellent and the business is wrong', 'Severe class imbalance — accuracy is misleading; precision/recall or AUC would tell a different story', 'The model needs more features', 'The dataset is too small'],
      correctIndex: 1,
    },
    {
      question: 'You want to know if a new pricing page increased conversions, not just observe that conversions went up. What is the right approach?',
      options: ['Compare this month to last month', 'A/B test with a randomized control group', 'Ask the marketing team for their opinion', 'Look at the trend line and eyeball it'],
      correctIndex: 1,
    },
    {
      question: 'A stakeholder asks you to find a model that confirms a hypothesis they already believe is true. What is the right response?',
      options: ['Build whatever gets the desired result to keep the stakeholder happy', 'Test the hypothesis honestly with appropriate methodology and report what the data actually shows', 'Refuse to do any analysis', 'Quietly tell other team members the result is rigged'],
      correctIndex: 1,
    },
    {
      question: 'Your training data was collected only from urban customers, but the model will be deployed nationwide including rural areas. What is the main risk?',
      options: ['No risk — models generalize automatically', 'Sampling bias — the model may perform poorly or unfairly on the unrepresented population', 'The model will run slower', 'This only matters for image data'],
      correctIndex: 1,
    },
  ],
  'computer-vision-engineer': [
    {
      question: 'An object-detection model performs well in the lab but misses detections in real deployment with changing lighting and camera angles. What is the most likely fix?',
      options: ['Use a deeper backbone network', 'Augment training data with realistic lighting/angle variation matching deployment conditions', 'Increase the confidence threshold', 'Switch to a different bounding-box format'],
      correctIndex: 1,
    },
    {
      question: 'You need real-time inference on an edge device with limited compute. Which is most directly relevant?',
      options: ['Train a larger model for better accuracy', 'Model optimization for the target hardware (e.g. TensorRT/ONNX export, quantization)', 'Increase the input image resolution', 'Add more output classes'],
      correctIndex: 1,
    },
    {
      question: 'Your video analytics pipeline double-counts the same person walking past a camera. What is the most likely missing component?',
      options: ['A bigger detection model', 'Object tracking (e.g. re-identification across frames) on top of per-frame detection', 'More training epochs', 'Higher frame rate alone'],
      correctIndex: 1,
    },
    {
      question: 'A client\'s cameras are mounted at an unusual angle not represented in your training set. What is the most direct mitigation?',
      options: ['Tell the client to remount all cameras', 'Collect or augment training data to cover that camera angle, or fine-tune on a sample of their footage', 'Ignore it — accuracy will be the same', 'Switch to a classification model instead of detection'],
      correctIndex: 1,
    },
  ],
  'business-development-manager': [
    {
      question: 'A prospective client asks if your AI solution can guarantee a specific outcome you are not confident about. What is the right move?',
      options: ['Promise it to close the deal', 'Be honest about what can realistically be delivered and propose a way to validate it (e.g. a scoped pilot)', 'Avoid answering the question', 'Tell them to ask engineering instead'],
      correctIndex: 1,
    },
    {
      question: 'A deal is stalling because the client doesn\'t see how the AI solution maps to their actual P&L. What is the most useful next step?',
      options: ['Send more technical documentation', 'Work with the client to translate the solution into a concrete cost/revenue impact specific to their business', 'Discount the price significantly', 'Wait for them to come back'],
      correctIndex: 1,
    },
    {
      question: 'You are negotiating a contract and the client pushes for scope far beyond what was originally priced. What is the right approach?',
      options: ['Agree to everything to keep the relationship', 'Clearly separate the original scope from new asks, and price the additional scope transparently', 'Walk away from the deal entirely', 'Quietly absorb the extra work without telling anyone internally'],
      correctIndex: 1,
    },
    {
      question: 'A long-time client is unhappy with project delays caused by an internal team, not by sales. What is the right move?',
      options: ['Blame the internal team to the client', 'Own the relationship, give the client an honest status update, and work internally to fix the root cause', 'Avoid the client until the issue resolves itself', 'Promise a new unrealistic deadline to placate them'],
      correctIndex: 1,
    },
  ],
};

// Open Application has no fixed role, so it draws a mixed sample across domains.
JOB_KNOWLEDGE['open-application'] = [
  JOB_KNOWLEDGE['data-scientist'][0],
  JOB_KNOWLEDGE['ai-strategy-consultant'][0],
  JOB_KNOWLEDGE['business-development-manager'][0],
  JOB_KNOWLEDGE['senior-ml-engineer'][0],
];

export function scoreJobKnowledge(role: string, answers: (number | null)[]): { score: number; correctCount: number; total: number } {
  const questions = JOB_KNOWLEDGE[role] ?? JOB_KNOWLEDGE['open-application'];
  let correct = 0;
  questions.forEach((q, i) => { if (answers[i] === q.correctIndex) correct++; });
  return { score: Math.round((correct / questions.length) * 100), correctCount: correct, total: questions.length };
}

// What gets sent to the browser — never includes correctIndex.
export function publicQuestions(role: string): { question: string; options: string[] }[] {
  const questions = JOB_KNOWLEDGE[role] ?? JOB_KNOWLEDGE['open-application'];
  return questions.map(q => ({ question: q.question, options: q.options }));
}
