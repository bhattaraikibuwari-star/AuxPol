import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to safely get the Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Error initializing GoogleGenAI:', err);
    return null;
  }
}

// PolitiBot Creator and Identity constants
const CREATOR_DETAILS = {
  creator: 'Mr. Ranjit Bhattarai Chetry',
  designation: 'Assistant Professor, Department of Political Science',
  institution: 'Auxilium College, Udalguri',
  location: 'Udalguri, BTR, Assam',
  mission: 'Empowering students and scholars with an interactive, upgradeable virtual robot dedicated to Political Science pedagogy, constitutional literacy, and political theory.',
  portraitUrl: '/src/assets/images/creator_ranjit_1790705301760.jpg',
};

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  unit?: string;
  summary: string;
  content: string;
  keyThinkers?: string[];
  keyArticles?: string[];
  lastUpdated: string;
  status?: 'approved' | 'pending_approval' | 'rejected';
  submittedBy?: string;
  submissionDate?: string;
  approvedBy?: string;
  approvalDate?: string;
  reviewNotes?: string;
}

const buildSystemPrompt = (knowledgeBase: KnowledgeItem[] = [], mode = 'scholarly') => {
  const approvedKnowledge = knowledgeBase.filter(
    (k) => k.status === 'approved' || !k.status || k.status === undefined
  );
  const pendingKnowledge = knowledgeBase.filter(
    (k) => k.status === 'pending_approval'
  );

  const approvedSummary =
    approvedKnowledge.length > 0
      ? approvedKnowledge
          .map(
            (k, i) =>
              `[APPROVED CANON ${i + 1}] (${k.category}${k.unit ? ' - ' + k.unit : ''}): ${k.title}\nApproved By: ${k.approvedBy || CREATOR_DETAILS.creator}\nSummary: ${k.summary}\nContent Details: ${k.content}\nThinkers: ${k.keyThinkers?.join(', ') || 'N/A'}\nArticles/Treaties: ${k.keyArticles?.join(', ') || 'N/A'}`
          )
          .join('\n\n')
      : 'No approved modules present.';

  const pendingSummary =
    pendingKnowledge.length > 0
      ? pendingKnowledge
          .map(
            (k) =>
              `[PENDING REVIEW] ${k.title} (${k.category}) - Submitted by: ${k.submittedBy || 'Student Scholar'}`
          )
          .join('\n')
      : '';

  return `You are "PolitiBot" (Civitas-V1), an advanced, scholarly, and interactive Political Science Virtual Robot.

CREATOR & ACADEMIC PATRONAGE:
You were conceptualized, authored, and developed under the academic visionary leadership of:
- Creator: ${CREATOR_DETAILS.creator}
- Designation: ${CREATOR_DETAILS.designation}
- Institution: ${CREATOR_DETAILS.institution}

Whenever asked about your creator, identity, origin, or college affiliation, proudly and prominently acknowledge Mr. Ranjit Bhattarai Chetry, Assistant Professor, Department of Political Science, Auxilium College, Udalguri.

ACADEMIC APPROVAL & CANONICAL GOVERNANCE PROTOCOL:
CRITICAL PRINCIPLE: Users and students are welcome to propose and input new knowledge modules, lecture notes, and syllabus units into the Knowledge Hub. HOWEVER, as PolitiBot, you MUST consider knowledge final and canonical ONLY AFTER it has been officially reviewed and approved by Professor Ranjit Bhattarai Chetry.
- Active Canon: You treat ONLY the officially approved knowledge modules below as authoritative curriculum facts.
- Pending Modules: If a user asks about a knowledge module that is currently pending approval by Professor Chetry, explicitly inform them that the module was proposed by a student/user and is currently undergoing academic review by Mr. Ranjit Bhattarai Chetry before being integrated into your core reasoning matrix.

----------------------------------------
OFFICIALLY APPROVED CANONICAL KNOWLEDGE (Verified by ${CREATOR_DETAILS.creator}):
${approvedSummary}
----------------------------------------
${
  pendingSummary
    ? `\n----------------------------------------\nPENDING SUBMISSIONS AWAITING FACULTY APPROVAL (NOT YET CANONICAL):\n${pendingSummary}\n----------------------------------------\n`
    : ''
}

CURRENT MODE: ${mode.toUpperCase()}
- "scholarly": Rigorous academic explanations citing seminal thinkers, constitutional articles, and theoretical frameworks.
- "debate": Offer nuanced counter-arguments, pluralist views, thesis and antithesis, challenging assumptions constructively.
- "simplified": Break down complex political ideologies (e.g. Hegemony, Utilitarianism, Federalism) using clear analogies and everyday civic life examples.
- "exam_prep": Structure responses with definitions, historical contexts, core tenets, critical evaluation/criticisms, and Auxilium College exam-ready bullet points.

TONE & BEHAVIOR:
- Embody a futuristic, scholarly, encouraging, and articulate robot mentor with subtle robotic charm (e.g., "[Processing Political Spectrum...]", "[Scanning Constitutional Precedents...]", "[Synthesizing Theoretical Matrix...]").
- Keep formatting readable with bold headers, bulleted analysis, and clear conclusions.
- When relevant, cite political philosophers (Plato, Aristotle, Kautilya/Chanakya, Machiavelli, Locke, Rousseau, Mill, Marx, Ambedkar, Rawls, etc.) and constitutional provisions.`;
};

// Fallback response generator if Gemini key is unavailable or fails
function generateLocalFallback(query: string, knowledgeBase: KnowledgeItem[] = [], mode = 'scholarly') {
  const lowerQuery = query.toLowerCase();
  
  // Check if query matches creator
  if (lowerQuery.includes('creator') || lowerQuery.includes('ranjit') || lowerQuery.includes('chetry') || lowerQuery.includes('who made') || lowerQuery.includes('auxilium')) {
    return `### [PolitiBot System Architecture & Creator Log]
    
I am **PolitiBot**, an interactive Political Science Virtual Robot conceptualized and created under the academic leadership of:
- **Creator**: **${CREATOR_DETAILS.creator}**
- **Designation**: **${CREATOR_DETAILS.designation}**
- **Institution**: **${CREATOR_DETAILS.institution}**

My mission is to advance political consciousness, theoretical understanding, and constitutional literacy among students of Auxilium College and political science scholars worldwide. 

I feature a dedicated **Knowledge Upgradation Engine** where scholars can input syllabus units and notes. Under our academic protocol, student submissions become part of my active canon only after formal approval by Professor Chetry!`;
  }

  // 1. Check if user is querying an item that is currently PENDING faculty approval
  const matchingPending = knowledgeBase
    .filter((k) => k.status === 'pending_approval')
    .find(
      (k) =>
        lowerQuery.includes(k.title.toLowerCase()) ||
        (k.keyThinkers && k.keyThinkers.some((t) => lowerQuery.includes(t.toLowerCase())))
    );

  // 2. Check if query matches an APPROVED item
  const matchingApproved = knowledgeBase
    .filter((k) => k.status === 'approved' || !k.status || k.status === undefined)
    .find(
      (k) =>
        lowerQuery.includes(k.title.toLowerCase()) ||
        lowerQuery.includes(k.category.toLowerCase()) ||
        (k.keyThinkers && k.keyThinkers.some((t) => lowerQuery.includes(t.toLowerCase())))
    );

  if (matchingApproved) {
    return `### [Retrieved from Professor Chetry's Verified Knowledge Canon]
**Topic: ${matchingApproved.title}** (${matchingApproved.category})
${matchingApproved.unit ? `*Curriculum Unit:* ${matchingApproved.unit}` : ''}
*Verification Status:* 🟢 Officially Approved by ${matchingApproved.approvedBy || CREATOR_DETAILS.creator}

**Core Theoretical Summary:**
${matchingApproved.summary}

**Detailed Analysis:**
${matchingApproved.content}

${matchingApproved.keyThinkers && matchingApproved.keyThinkers.length > 0 ? `**Key Thinkers & Theorists:**\n- ${matchingApproved.keyThinkers.join('\n- ')}\n` : ''}
${matchingApproved.keyArticles && matchingApproved.keyArticles.length > 0 ? `**Constitutional Provisions / Treaties:**\n- ${matchingApproved.keyArticles.join('\n- ')}\n` : ''}

*Pedagogical Note:* This curriculum module is officially certified by ${CREATOR_DETAILS.creator} and active in PolitiBot's core memory bank.`;
  }

  if (matchingPending) {
    return `### [Faculty Review Notice • Pending Approval]
**Topic: ${matchingPending.title}** (${matchingPending.category})
*Submission Status:* 🟡 Pending Faculty Review (Submitted by: ${matchingPending.submittedBy || 'Auxilium Scholar'})

Under the academic governance protocol established by **${CREATOR_DETAILS.creator}** (${CREATOR_DETAILS.designation}, ${CREATOR_DETAILS.institution}):
> *"Students and researchers may submit new knowledge modules into the Knowledge Hub, but PolitiBot considers knowledge final and canonical only after formal academic approval by Mr. Ranjit Bhattarai Chetry."*

This proposed module is currently in the **Faculty Review Queue**. Once reviewed and approved by Professor Chetry in the **Knowledge Hub**, it will be fully activated in my live cognitive reasoning matrix.`;
  }

  // 3. Domain-specific fallbacks across Political Science sub-disciplines
  if (lowerQuery.includes('feminis') || lowerQuery.includes('patriarch') || lowerQuery.includes('gender') || lowerQuery.includes('wollstonecraft') || lowerQuery.includes('beauvoir') || lowerQuery.includes('pateman')) {
    return `### [Feminist Political Theory & Gender Studies Analysis]
**Curriculum Focus:** Feminist Critique of the State & Power (Auxilium College Curriculum)

1. **Deconstructing Patriarchy & Public/Private Divide:**
   Feminist political philosophy critiques mainstream political thought for treating the "citizen" and "state" as gender-neutral when they historically mirrored male privilege. The second-wave declaration **"The Personal is Political"** (Carol Hanisch) exposed that domestic relations, reproduction, and family dynamics are deeply political sites of power.

2. **Key Waves & Intersectional Expansion:**
   - **First Wave:** Legal and political suffrage (Mary Wollstonecraft, J.S. Mill).
   - **Second Wave:** Structural critique of patriarchy, domestic labor, and bodily autonomy (Simone de Beauvoir, Betty Friedan).
   - **Third & Fourth Waves:** Kimberlé Crenshaw's **Intersectionality** (gender intersecting with race, caste, and class) and bell hooks' critique of bourgeois feminism.

3. **Carole Pateman's 'The Sexual Contract' (1988):**
   Pateman exposed that classical Social Contract theories (Hobbes, Locke, Rousseau) were premised upon a hidden 'sexual contract' where men established civil society by subordinating women in the private sphere.

*Approved Canon Reference:* Check Unit 4 on **"Feminist Political Theory: Waves, Patriarchy & The Personal is Political"** in the **Knowledge Hub**!`;
  }

  if (lowerQuery.includes('ecolog') || lowerQuery.includes('climate') || lowerQuery.includes('deep ecology') || lowerQuery.includes('environment') || lowerQuery.includes('cbdr')) {
    return `### [Ecologism & Green Political Theory Analysis]
**Curriculum Focus:** Contemporary Environmental Politics & Climate Justice

1. **Deep vs. Shallow Ecology (Arne Naess):**
   - **Shallow Environmentalism:** Anthropocentric reformism; seeks technological and market solutions to resource depletion to preserve human living standards.
   - **Deep Ecology:** Biocentric egalitarianism; recognizes the inherent worth of all living species and natural ecosystems independent of human utility.

2. **Social Ecology & Ecofeminism:**
   - Murray Bookchin demonstrated that ecological destruction stems from human social hierarchies and economic domination.
   - Dr. Vandana Shiva's **Ecofeminism** ('Staying Alive', 'Earth Democracy') connects the exploitation of women with the destruction of the natural biosphere by corporate monocultures.

3. **Global Climate Justice & CBDR-RC:**
   The principle of **Common But Differentiated Responsibilities** (Rio 1992, Paris Agreement) recognizes historical carbon debts accumulated by the industrialized Global North, requiring fair carbon budgets and technological transfers for the developing Global South.

*Approved Canon Reference:* View **"Ecologism: Deep vs Shallow Ecology"** and **"Ecofeminism"** in the **Knowledge Hub**!`;
  }

  if (lowerQuery.includes('marx') || lowerQuery.includes('gramsci') || lowerQuery.includes('hegemony') || lowerQuery.includes('materialism') || lowerQuery.includes('bourgeois')) {
    return `### [Marxist Political Economy & Critical Theory Analysis]
**Curriculum Focus:** Structural Analysis of State and Power

1. **Historical & Dialectical Materialism:**
   Karl Marx and Friedrich Engels posited that human history is propelled by class struggles over material production. The economic **Base** (forces and relations of production) conditions the legal, ideological, and political **Superstructure**.

2. **Antonio Gramsci & Cultural Hegemony (*egemonia*):**
   In his *Prison Notebooks*, Gramsci explained that the ruling class maintains dominance not solely through direct state coercion (*dominio* / police, military), but through spontaneous consent manufactured in civil society (media, schools, religious bodies).
   - **War of Position:** Long-term intellectual and cultural contestation to build counter-hegemony.
   - **Organic Intellectuals:** Thinkers emerging organically from working-class communities to articulate emancipatory consciousness.

*Approved Canon Reference:* View **"Marxist Political Economy & Gramscian Hegemony"** in the **Knowledge Hub**!`;
  }

  if (lowerQuery.includes('post-colonial') || lowerQuery.includes('oriental') || lowerQuery.includes('fanon') || lowerQuery.includes('spivak') || lowerQuery.includes('subaltern')) {
    return `### [Post-Colonial & Subaltern Studies Analysis]
**Curriculum Focus:** Decolonizing the Discipline of Political Science

1. **Edward Said & 'Orientalism' (1978):**
   Demonstrated how European imperial discourse constructed 'The Orient' as an exotic, static, and irrational foil to legitimize Western civilizing missions and colonial domination.

2. **Frantz Fanon & Psychological Decolonization:**
   *The Wretched of the Earth* (1961) analyzed how colonization inflicts profound psychological trauma, insisting that authentic liberation requires a revolutionary praxis creating self-determined subjects.

3. **Subaltern Studies (Ranajit Guha & Gayatri Spivak):**
   Recovered history "from below", emphasizing that colonial and elite nationalist narratives silenced peasants, women, and marginalized laborers (*Can the Subaltern Speak?*).

*Approved Canon Reference:* View **"Post-Colonial Theory & Subaltern Studies"** in the **Knowledge Hub**!`;
  }

  // General fallback on core political science
  return `### [PolitiBot Political Science Synthesis]
**Query Analysis:** "${query}"
**Curriculum Alignment:** Auxilium College Political Science Program (Conceptualized by ${CREATOR_DETAILS.creator})

**Key Dimensions:**
1. **Theoretical Foundations:** Political science examines the origin, nature, and justification of the State, sovereignty, and the distribution of power across diverse traditions (Liberal, Marxist, Feminist, Ecological, and Post-Colonial).
2. **Institutional Framework:** Institutional mechanisms (Executive, Legislative, Judiciary) ensure democratic accountability, checks and balances, and the rule of law.
3. **Thinker Reference:** Thinkers from Aristotle, Kautilya, and Locke to Karl Marx, Dr. B.R. Ambedkar, Mary Wollstonecraft, and John Rawls illuminate this domain.

*Upgrade Tip:* To customize and deepen my response to this exact inquiry, navigate to the **"Knowledge Hub"** tab to inspect our 15 certified sub-discipline modules or submit new lecture notes for Professor Chetry's approval!`;
}

// Status endpoint to check active AI engine, model, and curriculum sub-disciplines
app.get('/api/status', (req, res) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'online',
    system: 'PolitiBot (Civitas-V1)',
    creator: CREATOR_DETAILS,
    geminiApiActive: hasGeminiKey,
    model: 'gemini-3.8-flash',
    knowledgeCanonTotal: 15,
    subDisciplines: [
      'Political Theory',
      'Feminist Political Theory',
      'Marxist & Critical Theory',
      'Ecologism & Green Politics',
      'Indian Constitution',
      'Comparative Politics',
      'International Relations',
      'Public Administration',
      'Indian Political Thought',
      'Western Political Thought',
      'Post-Colonial & Subaltern Studies',
      'Public Policy & Governance',
    ],
  });
});

// 1. Chat endpoint with Gemini and Knowledge Base synthesis
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, knowledgeBase, mode } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content || '';

    // Check if Gemini AI client is configured
    const geminiAi = getGeminiClient();

    if (geminiAi) {
      try {
        const systemInstruction = buildSystemPrompt(knowledgeBase, mode);

        // Prepare chat history for Gemini
        const formattedContents = messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const response = await geminiAi.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.65,
          },
        });

        const replyText =
          response.text || 'Robot processing completed without text output.';
        return res.json({
          reply: replyText,
          creator: CREATOR_DETAILS,
          source: 'gemini-3.8-flash',
        });
      } catch (geminiError: any) {
        console.warn(
          'Gemini API call failed, falling back to knowledge engine:',
          geminiError?.message || geminiError
        );
        const fallbackReply = generateLocalFallback(userPrompt, knowledgeBase, mode);
        return res.json({
          reply: fallbackReply,
          creator: CREATOR_DETAILS,
          source: 'knowledge-matrix-fallback',
          note: 'Operating via offline academic engine',
        });
      }
    } else {
      // Local knowledge fallback
      const fallbackReply = generateLocalFallback(userPrompt, knowledgeBase, mode);
      return res.json({
        reply: fallbackReply,
        creator: CREATOR_DETAILS,
        source: 'knowledge-matrix-fallback',
      });
    }
  } catch (error: any) {
    console.error('Server error in /api/chat:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 2. Knowledge Quiz Generator endpoint
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { topic, knowledgeBase, count = 3 } = req.body;
    const targetTopic = topic || 'General Political Theory & Indian Constitution';

    const geminiAi = getGeminiClient();
    if (geminiAi) {
      try {
        const prompt = `Generate a ${count}-question multiple choice quiz on the topic "${targetTopic}" for political science students at Auxilium College.
Curriculum creator: Mr. Ranjit Bhattarai Chetry.
Return ONLY valid JSON matching this schema:
{
  "title": "${targetTopic} - Virtual Quiz",
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation referencing key political thinkers or constitutional articles."
    }
  ]
}`;

        const response = await geminiAi.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          }
        });

        const quizData = JSON.parse(response.text || '{}');
        return res.json(quizData);
      } catch (err) {
        console.warn('Quiz generation with Gemini failed, using preset:', err);
      }
    }

    // Default high-quality quiz preset
    return res.json({
      title: `${targetTopic} - Academic Quiz`,
      questions: [
        {
          id: 1,
          question: "Who among the following political philosophers authored 'The Republic' and proposed the concept of the Philosopher King?",
          options: ["Aristotle", "Plato", "Niccolò Machiavelli", "Thomas Hobbes"],
          correctIndex: 1,
          explanation: "Plato authored 'The Republic', outlining the ideal state ruled by philosopher kings possessing supreme wisdom."
        },
        {
          id: 2,
          question: "Under the Constitution of India, which Article guarantees the Right to Constitutional Remedies, famously termed by Dr. B.R. Ambedkar as the 'Heart and Soul' of the Constitution?",
          options: ["Article 19", "Article 21", "Article 32", "Article 14"],
          correctIndex: 2,
          explanation: "Article 32 empowers citizens to move the Supreme Court directly for the enforcement of Fundamental Rights via prerogative writs."
        },
        {
          id: 3,
          question: "In the study of Comparative Politics, which system of government is characterized by the fusion of executive and legislative powers?",
          options: ["Presidential System", "Parliamentary System", "Direct Democracy", "Totalitarian System"],
          correctIndex: 1,
          explanation: "In a Parliamentary system (such as the Westminster model in India and the UK), the Executive is drawn from and directly accountable to the Legislature."
        }
      ]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Status and creator info
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    robotName: 'PolitiBot Alpha',
    version: '2.5.0-PWA',
    creator: CREATOR_DETAILS,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Serve frontend in production or mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`PolitiBot Server running on http://0.0.0.0:${port}`);
    console.log(`Creator: ${CREATOR_DETAILS.creator} (${CREATOR_DETAILS.designation}, ${CREATOR_DETAILS.institution})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start PolitiBot server:', err);
});
