// Single source of truth for: open roles, role → required-skills mapping,
// the full skills catalog (grouped into categories for the "add more skills"
// picker), and proficiency levels. Imported by both apply.astro (form +
// client script via define:vars) and admin.astro (score breakdown + display)
// so the two never drift out of sync.

export type Role = {
  value: string;
  label: string;
  dept: string;
  skills: string[];
};

export const ROLES: Role[] = [
  { value: 'senior-ml-engineer',           label: 'Senior ML Engineer',          dept: 'Engineering', skills: ['Python', 'PyTorch', 'TensorFlow', 'MLflow', 'Kubernetes', 'Docker', 'Ray', 'CUDA'] },
  { value: 'nlp-llm-specialist',           label: 'NLP / LLM Specialist',        dept: 'Engineering', skills: ['Python', 'HuggingFace', 'LangChain', 'vLLM', 'RAG', 'Prompt Engineering', 'Fine-tuning', 'Bahasa Indonesia NLP'] },
  { value: 'ai-strategy-consultant',       label: 'AI Strategy Consultant',      dept: 'Consulting',  skills: ['AI Strategy', 'Stakeholder Management', 'Business Analysis', 'Presentations', 'Change Management', 'ROI Modeling'] },
  { value: 'data-scientist',               label: 'Data Scientist',             dept: 'Engineering', skills: ['Python', 'SQL', 'Spark', 'Statistical Modeling', 'Machine Learning', 'Data Visualization', 'Experiment Design'] },
  { value: 'computer-vision-engineer',     label: 'Computer Vision Engineer',   dept: 'Engineering', skills: ['Python', 'OpenCV', 'YOLO', 'TensorRT', 'ONNX', 'Deep Learning', 'Object Detection', 'Video Analytics'] },
  { value: 'business-development-manager',label: 'Business Development Manager',dept: 'Growth',      skills: ['Enterprise Sales', 'CRM', 'AI Market Knowledge', 'Bahasa Indonesia', 'Negotiation', 'Account Management'] },
  { value: 'open-application',             label: 'Open Application',           dept: 'General',     skills: ['Python', 'Machine Learning', 'AI Strategy', 'Data Visualization', 'Bahasa Indonesia NLP', 'Object Detection', 'Leadership', 'Communication'] },
];

export const ROLE_SKILLS: Record<string, string[]> = {};
ROLES.forEach(r => { ROLE_SKILLS[r.value] = r.skills; });

// ── Stage 0 scorecard: how much each role's overall score leans on character
// vs. capability (see doc/recruitment-funnel.md §6). Character-trait and
// capability-question anchors themselves live in interview-questions.ts —
// this is just the per-role blend weight `w` in:
//   Overall = w·Character + (1-w)·Capability
// Higher w = character matters more (client-facing / early-stage roles);
// lower w = capability matters more (deep technical execution roles).
export const ROLE_CHARACTER_WEIGHT: Record<string, number> = {
  'senior-ml-engineer':            0.40,
  'nlp-llm-specialist':             0.40,
  'ai-strategy-consultant':         0.60,
  'data-scientist':                 0.45,
  'computer-vision-engineer':       0.40,
  'business-development-manager':  0.65,
  'open-application':               0.55,
};

// 1/3/5 anchored interview rating → 0–100 scale (shared with api/interview-score.ts).
export const INTERVIEW_LEVEL_TO_PCT: Record<number, number> = { 1: 20, 3: 60, 5: 100 };

// Capability attributes scored in the offline interview (see interview-questions.ts
// CAPABILITY_QUESTIONS) — distinct from the 7 character traits, which the interview
// only probes/confirms rather than re-scoring into the Stage 2 character score.
const CAPABILITY_INTERVIEW_KEYS = ['techDepth', 'problemSolving', 'communication'];

// Stage 5 mechanical roll-up (doc/recruitment-funnel.md §6):
//   Capability score = 0.55·job-knowledge + 0.45·interview-capability
//   Overall (professional) = w·Character + (1-w)·Capability
//   Overall (builder/internship, no capability layer) = Character score
// Returns null when there isn't yet enough signal to compute anything —
// callers should render that as "pending", not 0.
export function computeOverallScore(input: {
  role: string;
  characterScore: number | null;
  jobKnowledgeScore: number | null;
  interviewScores: Record<string, number> | null;
  hasCapabilityLayer: boolean; // true for the professional/job track only
}): number | null {
  const { role, characterScore, jobKnowledgeScore, interviewScores, hasCapabilityLayer } = input;
  if (!hasCapabilityLayer) return characterScore;

  const capInterviewVals = CAPABILITY_INTERVIEW_KEYS
    .map(k => interviewScores?.[k])
    .filter((v): v is number => v != null)
    .map(v => INTERVIEW_LEVEL_TO_PCT[v] ?? 0);
  const capInterviewAvg = capInterviewVals.length ? capInterviewVals.reduce((a, b) => a + b, 0) / capInterviewVals.length : null;

  let capability: number | null = null;
  if (jobKnowledgeScore != null && capInterviewAvg != null) capability = 0.55 * jobKnowledgeScore + 0.45 * capInterviewAvg;
  else if (jobKnowledgeScore != null) capability = jobKnowledgeScore;
  else if (capInterviewAvg != null) capability = capInterviewAvg;

  if (characterScore == null) return null;
  if (capability == null) return characterScore; // no capability signal yet — don't penalize
  const w = ROLE_CHARACTER_WEIGHT[role] ?? 0.5;
  return Math.round(w * characterScore + (1 - w) * capability);
}

// One line per role: what "deep" technical/domain capability looks like here.
// Interviewers read this alongside the generic techDepth/problemSolving anchors
// in interview-questions.ts so a 5-out-of-5 means the same thing across roles.
export const ROLE_CAPABILITY_FOCUS: Record<string, string> = {
  'senior-ml-engineer':            'Can debug a model that trains fine but fails in production — data drift, serving latency, GPU memory, not just notebook accuracy.',
  'nlp-llm-specialist':             'Has hit and worked around real LLM failure modes (hallucination, context limits, retrieval gaps) on Bahasa Indonesia or low-resource text, not just English demos.',
  'ai-strategy-consultant':         'Can translate a vague executive ask into a scoped, sequenced AI roadmap with a believable ROI case — not a slide of buzzwords.',
  'data-scientist':                 'Designs an experiment or model with the business decision in mind, knows when the data cannot support the question, not just runs a notebook.',
  'computer-vision-engineer':       'Has shipped a CV model under real-world constraints — lighting, camera placement, edge hardware — not just a benchmark dataset score.',
  'business-development-manager':  'Can read a client\'s actual problem, not just pitch a deck; understands what AI can and cannot credibly deliver enough to not overpromise.',
  'open-application':               'No fixed focus — probe whatever domain they claim depth in using the same standard: can they go deep, honest about limits, articulate trade-offs.',
};

// Full catalog, grouped for the "+ Add more skills" picker. Mirrors the
// 14-category IT-recruitment-portal catalog, plus two categories
// (Computer Vision, Business/Strategy/Languages) split out because
// TransMetaTek's actual roles need skills that a generalist IT catalog
// doesn't cover.
export const SKILL_CATEGORIES: Record<string, string[]> = {
  'Programming Languages': ['Python', 'Java', 'JavaScript', 'TypeScript', 'C#', 'C++', 'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Rust'],
  'AI / Machine Learning / Data Science': ['Machine Learning', 'Deep Learning', 'Statistical Modeling', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Keras', 'Pandas', 'NumPy', 'R', 'MATLAB', 'Jupyter', 'Colab', 'MLflow', 'Ray', 'CUDA', 'HuggingFace', 'LangChain', 'vLLM', 'RAG', 'Prompt Engineering', 'Fine-tuning', 'Bahasa Indonesia NLP'],
  'Computer Vision': ['OpenCV', 'YOLO', 'TensorRT', 'ONNX', 'Object Detection', 'Video Analytics', 'Image Segmentation', 'Edge Deployment'],
  'Data Engineering & Analytics': ['Hadoop', 'Spark', 'Kafka', 'RabbitMQ', 'Airflow', 'Tableau', 'Power BI', 'Looker', 'SQL Optimization', 'NoSQL Optimization', 'Data Visualization', 'Experiment Design', 'Feature Engineering', 'A/B Testing'],
  'Web Frameworks & Libraries': ['React', 'Angular', 'Vue.js', 'Svelte', 'Node.js', 'Express', 'Django', 'Flask', 'Next.js', 'Nuxt.js', 'Spring Boot', 'ASP.NET'],
  'Databases & Data Stores': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Microsoft SQL Server', 'Oracle', 'Cassandra', 'Neo4j'],
  'DevOps & CI/CD': ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Travis CI', 'CircleCI', 'Terraform', 'Ansible', 'Puppet', 'Chef', 'AWS CloudFormation'],
  'Cloud Platforms': ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform (GCP)', 'IBM Cloud', 'Oracle Cloud'],
  'Version Control & Collaboration': ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'JIRA', 'Confluence', 'Slack', 'Microsoft Teams'],
  'Testing & QA': ['Jest', 'Mocha', 'JUnit', 'NUnit', 'Selenium', 'Cypress', 'Postman', 'SoapUI', 'TestRail'],
  'Security': ['OWASP Top 10', 'Penetration Testing', 'Firewall & VPN Configuration', 'SIEM', 'Splunk', 'ELK', 'Identity & Access Management'],
  'Networking & Infrastructure': ['TCP/IP', 'DNS', 'DHCP', 'Load Balancers', 'Proxies', 'VPN', 'SSL', 'TLS', 'Cisco', 'Juniper', 'VMware', 'Hyper-V', 'VirtualBox'],
  'Mobile Development': ['Android (Java/Kotlin)', 'iOS (Swift/Objective-C)', 'Flutter', 'React Native'],
  'Systems Administration': ['Linux', 'Ubuntu', 'CentOS', 'Red Hat', 'Windows Server', 'Active Directory', 'LDAP', 'Backup & Disaster Recovery'],
  'Enterprise & Emerging Tech': ['SAP', 'Oracle ERP', 'Salesforce', 'Dynamics CRM', 'Blockchain', 'Ethereum', 'Hyperledger', 'IoT Platforms', 'AR/VR Development'],
  'Business, Strategy & Communication': ['AI Strategy', 'Stakeholder Management', 'Business Analysis', 'Presentations', 'Change Management', 'ROI Modeling', 'Enterprise Sales', 'CRM', 'AI Market Knowledge', 'Negotiation', 'Account Management', 'Pipeline Management', 'Proposal Writing', 'Leadership', 'Communication', 'Bahasa Indonesia'],
};

export type SkillLevel = {
  value: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  label: string;
  weight: number; // used to weight the role-skills-match score
};

export const SKILL_LEVELS: SkillLevel[] = [
  { value: 'beginner',     label: 'Beginner',     weight: 0.25 },
  { value: 'intermediate', label: 'Intermediate', weight: 0.5 },
  { value: 'advanced',     label: 'Advanced',     weight: 0.75 },
  { value: 'expert',       label: 'Expert',       weight: 1.0 },
];

export const SKILL_LEVEL_WEIGHT: Record<string, number> = {};
SKILL_LEVELS.forEach(l => { SKILL_LEVEL_WEIGHT[l.value] = l.weight; });

export type SkillEntry = {
  skill: string;
  category: string;
  yearStarted: string;
  proficiency: SkillLevel['value'];
};

export function countWords(s: string) {
  const t = (s ?? '').trim();
  return t ? t.split(/\s+/).length : 0;
}

// Recreates the matchScore breakdown (see apply.astro updateScore()) so admin
// can show *why* a candidate scored what they did. Skills match is weighted
// by proficiency: a matched "expert" skill counts fully, a matched
// "beginner" skill counts a quarter, etc.
export function scoreBreakdown(a: {
  role: string;
  firstName: string;
  email: string;
  city: string;
  experience: string;
  skills: string;
  linkedin: string;
  whyTmk: string;
  aiProject: string;
}) {
  const roleSkills = ROLE_SKILLS[a.role] ?? [];
  let entries: SkillEntry[] = [];
  try {
    const parsed = JSON.parse(a.skills ?? '[]');
    // Backward compatible with the old format: a flat array of skill-name strings.
    entries = parsed.map((s: any) =>
      typeof s === 'string' ? { skill: s, category: '', yearStarted: '', proficiency: 'intermediate' } : s
    );
  } catch {
    entries = [];
  }

  const bySkill = new Map(entries.map(e => [e.skill, e]));
  const matched = roleSkills.filter(s => bySkill.has(s));
  const weightedSum = matched.reduce((sum, s) => sum + (SKILL_LEVEL_WEIGHT[bySkill.get(s)!.proficiency] ?? 0.5), 0);
  const skillPts = roleSkills.length > 0 ? Math.round((weightedSum / roleSkills.length) * 20) : 0;

  const words = countWords(a.whyTmk ?? '') + countWords(a.aiProject ?? '');
  const storyPts = words > 40 ? Math.min(Math.round(words / 10), 20) : 0;

  return {
    rows: [
      { label: 'Role selected',        pts: a.role ? 15 : 0, max: 15, note: a.role.replace(/-/g, ' ') },
      { label: 'Identity complete',    pts: (a.firstName && a.email?.includes('@') && a.city) ? 20 : 0, max: 20, note: `${a.firstName ?? ''} · ${a.city ?? ''}` },
      { label: 'Experience provided',  pts: a.experience ? 15 : 0, max: 15, note: a.experience },
      { label: 'Skills match for role', pts: skillPts, max: 20, note: `${matched.length}/${roleSkills.length} role skills, weighted by proficiency` },
      { label: 'LinkedIn provided',    pts: a.linkedin ? 10 : 0, max: 10, note: a.linkedin ? 'yes' : 'no' },
      { label: 'Story depth (why + AI project)', pts: storyPts, max: 20, note: `${words} words` },
    ],
    entries,
    matched,
  };
}
