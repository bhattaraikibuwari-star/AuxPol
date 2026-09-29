import { KnowledgeItem } from '../types';

const RAW_INITIAL_KNOWLEDGE_BASE: Omit<KnowledgeItem, 'status' | 'approvedBy' | 'approvalDate'>[] = [
  {
    id: 'kb-1',
    title: "Kautilya's Saptanga Theory of State",
    category: 'Indian Political Thought',
    unit: 'Unit 1: Ancient Indian Statecraft',
    summary: 'An organic theory of statehood from the Arthashastra comprising seven limbs (elements) necessary for sovereignty and political order.',
    content: `In the 'Arthashastra', Kautilya (Chanakya) introduces the Saptanga theory, comparing the sovereign state to a living organism with seven interdependent organs:
1. Swami (The Sovereign King) - The head and primary executive possessing moral character, intellect, and decisiveness.
2. Amatya (Ministers and Bureaucracy) - The eyes of the state providing administrative competence and objective counsel.
3. Janapada (Territory and Citizens) - The legs supporting state agricultural revenue, demography, and natural resources.
4. Durga (Fortified Garrison) - The arms safeguarding national security, borders, and defensive bastions.
5. Kosha (Permanent Treasury) - The mouth ensuring fiscal solvency, emergency buffers, army upkeep, and civic welfare.
6. Danda/Bala (Armed Forces/Army) - The mind and coercive authority upholding the Rule of Law (Dharma) and deterring external aggression.
7. Mitra (Allies and Diplomatic Partners) - The ears guiding foreign diplomacy and alliances under the Mandala Theory of interstate politics.

A deficiency in any one element compromises the state's sovereign equilibrium.`,
    keyThinkers: ['Kautilya (Chanakya)'],
    keyArticles: ['Mandala Doctrine', 'Arthashastra Book VI'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-2',
    title: 'Aristotle’s Classification of Constitutions',
    category: 'Western Political Thought',
    unit: 'Unit 2: Classical Greek Political Philosophy',
    summary: 'Taxonomic matrix of states based on the number of rulers and their ethical objective (common good vs selfish interests).',
    content: `Aristotle in 'Politics' formulated a dual-criterion matrix to classify constitutions:
- Quantitative criterion: Rule by One, Rule by Few, Rule by Many.
- Qualitative teleological criterion: Pure/Normal forms (governing for the collective common good) vs Perverted forms (governing solely for the rulers' private advantage).

The Taxonomic Matrix:
1. Rule by One: Monarchy/Royalty (Pure) degenerates into Tyranny (Perverted).
2. Rule by Few: Aristocracy (Pure) degenerates into Oligarchy (Perverted).
3. Rule by Many: Polity (Pure, governed by the virtuous middle class) degenerates into Democracy/Mobocracy (Perverted).

Aristotle celebrated 'Polity' as the most practicable stable state, as the predominance of the middle class mitigates the dangerous polarization between extreme wealth and acute poverty.`,
    keyThinkers: ['Aristotle', 'Plato'],
    keyArticles: ['Aristotle’s Politics Books III & IV'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-3',
    title: 'Fundamental Rights vs Directive Principles (DPSPs)',
    category: 'Indian Constitution',
    unit: 'Unit 3: Constitutional Foundations of India',
    summary: 'The dialectic synthesis between justiciable civil liberties (Part III) and non-justiciable socio-economic justice mandates (Part IV).',
    content: `The Constitution of India creates an egalitarian welfare democracy through two interdependent pillars:
- Part III: Fundamental Rights (Articles 12-35) - Justiciable civil-political liberties that protect the citizen against state arbitrariness, guaranteeing equality, freedom of speech, personal liberty, and constitutional remedies (Article 32).
- Part IV: Directive Principles of State Policy (Articles 36-51) - Non-justiciable socio-economic guidelines directing the State to minimize inequalities, secure humane working conditions, organize village panchayats, and provide universal education.

Landmark Judicial Evolution:
1. State of Madras v. Champakam Dorairajan (1951): Supreme Court held FRs are sacrosanct and take precedence over DPSPs.
2. I.C. Golak Nath v. State of Punjab (1967): Declared Fundamental Rights transcendent; Parliament cannot abridge them even for Directive Principles.
3. Kesavananda Bharati v. State of Kerala (1973): Established the Basic Structure Doctrine; both Parts form the core identity.
4. Minerva Mills v. Union of India (1980): Justice Chandrachud held: "The Indian Constitution is founded on the bedrock of the balance between Parts III and IV. To give absolute primacy to one over the other is to destroy the harmony of the Constitution."`,
    keyThinkers: ['Dr. B.R. Ambedkar', 'Sir B.N. Rau', 'Pandit Jawaharlal Nehru'],
    keyArticles: ['Article 14, 19, 21', 'Article 32', 'Article 37', 'Article 39(b) & (c)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-4',
    title: 'The Social Contract: Hobbes, Locke, and Rousseau',
    category: 'Political Theory',
    unit: 'Unit 2: Theories of the Origin of State',
    summary: 'How Thomas Hobbes, John Locke, and Jean-Jacques Rousseau conceptualized human nature, the state of nature, and sovereign legitimacy.',
    content: `The Social Contract paradigm explains the transition from the prepolitical State of Nature into civil society:
1. Thomas Hobbes (Leviathan, 1651):
   - Human Nature: Driven by fear of death, self-interest, and glory.
   - State of Nature: "Solitary, poor, nasty, brutish, and short"; perpetual war of all against all.
   - Contract: Individuals alienate all natural rights to an indivisible, absolute sovereign (Leviathan) in exchange for physical security and order.

2. John Locke (Two Treatises of Government, 1689):
   - Human Nature: Rational, social, and moral governed by Natural Law.
   - State of Nature: A state of peace and liberty, but plagued by inconvenience in impartially enforcing property boundaries.
   - Contract: Limited fiduciary trust; citizens surrender only the right to interpret and enforce natural law to establish government. If the state infringes upon "Life, Liberty, or Estate", citizens possess the right to rebellion.

3. Jean-Jacques Rousseau (The Social Contract, 1762):
   - Human Nature: The Noble Savage, naturally peaceful and compassionate.
   - State of Nature: Corrupted once private property arose ("The first man who having enclosed a piece of ground...").
   - Contract: Total alienation of individual wills into the 'General Will' (Volonté Générale); liberty is obedience to self-prescribed law.`,
    keyThinkers: ['Thomas Hobbes', 'John Locke', 'Jean-Jacques Rousseau'],
    keyArticles: ['Leviathan (1651)', 'Two Treatises (1689)', 'The Social Contract (1762)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-5',
    title: 'Max Weber’s Bureaucratic Theory & Public Administration',
    category: 'Public Administration',
    unit: 'Unit 4: Classical Administrative Thought',
    summary: 'The rational-legal ideal type of bureaucracy characterized by hierarchy, written rules, impersonality, and specialization.',
    content: `Sociologist Max Weber posited that modern administrative efficiency relies upon "Rational-Legal Authority":
Core Tenets of Weberian Bureaucracy:
1. Fixed Jurisdictional Areas: Official duties are formally codified and ordered by laws or administrative regulations.
2. Hierarchy of Offices: Clear levels of graded authority where lower offices are supervised by higher ones.
3. Management Based on Written Documents: All decisions, rules, and administrative actions are meticulously preserved in permanent files.
4. Impersonality and Objectivity: Decisions are conducted sine ira et studio (without hatred or passion), eliminating nepotism and favoritism.
5. Merit-based Recruitment and Tenure: Officials are appointed based on technical qualifications, receive regular salaries, and enjoy career tenure protections.

Critiques:
- Robert K. Merton warned of bureaucratic "trained incapacity" and goal displacement, where rigid adherence to procedural rules replaces substantive mission accomplishment.`,
    keyThinkers: ['Max Weber', 'Robert K. Merton', 'Woodrow Wilson'],
    keyArticles: ['Economy and Society', 'Politics as a Vocation'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-6',
    title: 'Realism vs Liberalism in International Relations',
    category: 'International Relations',
    unit: 'Unit 5: International Politics & Paradigms',
    summary: 'The grand debate between power-centric anarchy realism and institutional cooperation liberalism in world politics.',
    content: `The primary theoretical axis of International Relations theory:
1. Political Realism (Hans Morgenthau, Kenneth Waltz, John Mearsheimer):
   - Systemic Condition: International anarchy with no central world government.
   - Primary Unit: Sovereign nation-states acting as rational, unitary egoists.
   - Motivations: National interest defined in terms of power, survival, military security, and balance of power.
   - Zero-sum worldview: Cooperation is fragile due to the security dilemma and fears over relative gains.

2. Liberalism and Neoliberal Institutionalism (Immanuel Kant, Robert Keohane, Joseph Nye):
   - Systemic Condition: Anarchy exists, but its negative effects can be mitigated through multilateral regimes and norms.
   - Core Mechanisms: Democratic Peace Theory (democracies seldom fight one another), economic interdependence, and international organizations (UN, WTO, ICJ).
   - Positive-sum worldview: Absolute gains incentivize cooperation and treaty adherence.`,
    keyThinkers: ['Hans Morgenthau', 'Kenneth Waltz', 'Robert Keohane', 'Joseph Nye', 'Immanuel Kant'],
    keyArticles: ['UN Charter Chapter VII', 'Peace of Westphalia (1648)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-7',
    title: 'John Rawls: A Theory of Justice & The Original Position',
    category: 'Political Theory',
    unit: 'Unit 1: Contemporary Theories of Justice',
    summary: 'Rawls’s deontological contractarian theory of justice as fairness, utilizing the Veil of Ignorance and Two Principles of Justice.',
    content: `John Rawls revived normative political philosophy in 1971 with 'A Theory of Justice':
1. The Original Position & The Veil of Ignorance:
   - A hypothetical heuristic thought experiment where rational contractors choose fundamental societal principles without knowing their own class, race, gender, natural talents, or conception of the good.
   - This informational blackout forces individuals to choose principles that protect the worst-off (Maximin rule).

2. The Two Principles of Justice (Lexically Ordered):
   - First Principle (Equal Liberty Principle): Each person has an equal right to the most extensive scheme of equal basic liberties compatible with a similar scheme for all.
   - Second Principle: Social and economic inequalities must satisfy two conditions:
     a) Fair Equality of Opportunity: Offices and positions must be open to all under conditions of fair opportunity.
     b) The Difference Principle: Inequalities are justified only if they operate to the greatest benefit of the least-advantaged members of society.

Rawls rejects utilitarianism because it treats individuals as mere aggregates, failing to respect the separateness of persons.`,
    keyThinkers: ['John Rawls', 'Robert Nozick', 'Michael Sandel', 'Amartya Sen'],
    keyArticles: ['A Theory of Justice (1971)', 'Political Liberalism (1993)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-8',
    title: 'Dr. B.R. Ambedkar: Constitutional Morality & Social Democracy',
    category: 'Indian Political Thought',
    unit: 'Unit 3: Modern Indian Political Philosophy',
    summary: 'Ambedkar’s vision of constitutional morality, annihilation of caste, and the indispensable nexus between political and social democracy.',
    content: `Dr. Bhimrao Ramji Ambedkar, Chief Architect of the Constitution of India, advanced a transformative conception of the democratic state:
1. Constitutional Morality:
   - In his historic address to the Constituent Assembly on November 25, 1949, Ambedkar emphasized that constitutional morality is not a natural sentiment but must be cultivated.
   - It requires strict adherence to constitutional methods over unconstitutional street agitation (the "Grammar of Anarchy") and prohibits hero-worship/Bhakti in politics.

2. Social Democracy:
   - "Political democracy cannot last unless there lies at the base of it social democracy."
   - Defined as a way of life that recognizes liberty, equality, and fraternity as the principles of life. Without equality, liberty produces the supremacy of the few over the many; without fraternity, liberty and equality cannot become a natural course of things.

3. Annihilation of Caste:
   - Denounced caste as an anti-social division of laborers, insisting that genuine democratization demands the destruction of the caste hierarchy and religious sanction behind graded inequality.`,
    keyThinkers: ['Dr. B.R. Ambedkar', 'Jyotirao Phule', 'Periyar E. V. Ramasamy'],
    keyArticles: ['Constituent Assembly Debates (Nov 1949)', 'Annihilation of Caste (1936)', 'Preamble to the Constitution of India'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-9',
    title: 'Feminist Political Theory: Waves, Patriarchy & The Personal is Political',
    category: 'Feminist Political Theory',
    unit: 'Unit 4: Modern Feminist Theories & Gender Justice',
    summary: 'A critical sub-discipline deconstructing patriarchal structures, public/private dichotomies, and gendered power relations through successive waves.',
    content: `Feminist Political Theory challenges the patriarchal biases of mainstream political science, arguing that traditional concepts (power, sovereignty, citizen, state) historically assumed an unacknowledged male subject:

1. Evolution of the Four Waves of Feminism:
   - First Wave (Late 19th - Early 20th Century): Focused on formal legal and political equality, notably women's suffrage (voting rights) and property ownership. Championed by Mary Wollstonecraft ('A Vindication of the Rights of Woman', 1792), John Stuart Mill, and Harriet Taylor Mill.
   - Second Wave (1960s - 1980s): Coined the seminal maxim "The Personal is Political" (Carol Hanisch). Critiqued the artificial liberal divide between the public realm (politics, state, marketplace) and the private realm (family, domestic labor, reproduction). Addressed systemic patriarchy, domestic violence, workplace discrimination, and bodily autonomy. Key texts: Simone de Beauvoir's 'The Second Sex' ("One is not born, but rather becomes, a woman") and Betty Friedan's 'The Feminine Mystique'.
   - Third Wave (1990s - 2000s): Emphasized diversity, post-structuralism, and Kimberlé Crenshaw's groundbreaking concept of 'Intersectionality' (1989)—highlighting how gender intersects inextricably with race, caste, class, and colonial history. bell hooks ('Feminist Theory: From Margin to Center') challenged white bourgeois feminist hegemony.
   - Fourth Wave (2010s - Present): Driven by digital activism (#MeToo, Nirbhaya movement in India), combating sexual harassment, campus safety, and reproductive justice.

2. Carole Pateman & The Sexual Contract (1988):
   - Political theorist Carole Pateman exposed that the classic Social Contract (Hobbes, Locke, Rousseau) was inherently a 'Sexual Contract'. By establishing civil society, men subordinated women in the private family, creating a patriarchal fraternity disguised as universal democratic equality.

3. Strands of Feminist Thought:
   - Liberal Feminism: Equal civil rights, legal reforms, and educational parity within existing democratic institutions.
   - Radical Feminism: Identifies patriarchy as the most fundamental, universal form of oppression, requiring deep cultural and institutional reconstruction.
   - Socialist/Marxist Feminism: Analyzes how capitalism and patriarchy operate together, exploiting women's unpaid domestic and reproductive labor.`,
    keyThinkers: ['Mary Wollstonecraft', 'Simone de Beauvoir', 'Carole Pateman', 'bell hooks', 'Kimberlé Crenshaw', 'Iris Marion Young', 'Betty Friedan'],
    keyArticles: ['A Vindication of the Rights of Woman (1792)', 'The Second Sex (1949)', 'The Sexual Contract (1988)', 'CEDAW (1979)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-10',
    title: 'Ecofeminism: Nature, Gender, and Environmental Justice',
    category: 'Feminist Political Theory',
    unit: 'Unit 5: Intersectional Political Ideologies',
    summary: 'A vital synthesis demonstrating the parallel patriarchal exploitation of women and the natural biosphere, advocating Earth Democracy.',
    content: `Ecofeminism emerged in the mid-1970s (coined by Françoise d'Eaubonne) to examine the profound connections between the domination of women and the exploitation of nature:

1. Theoretical Foundations:
   - Critiques Western patriarchal dualisms: Culture vs. Nature, Reason vs. Emotion, Male vs. Female, Human vs. Non-Human.
   - In each hierarchical binary, the first term is valued as superior and dominant, while the second is devalued and subjected to extraction and control.
   - Carolyn Merchant ('The Death of Nature', 1980) traced how the Scientific Revolution and early industrial capitalism transformed nature from a living nurturing mother into inert raw material for mechanical exploitation.

2. Vandana Shiva & Indian Ecofeminism:
   - Dr. Vandana Shiva and Maria Mies ('Ecofeminism', 1993; 'Staying Alive', 1988) foregrounded Global South perspectives, demonstrating that rural and indigenous women are the first victims of environmental degradation and water privatization because of their traditional roles as water carriers, seed conservers, and forest gatherers.
   - Celebrates grassroots resistance like the historic Chipko Movement in the Himalayas (where women led by Gaura Devi hugged trees to prevent commercial logging).
   - Introduces 'Earth Democracy' and 'Seed Sovereignty' (Navdanya) as political alternatives to corporate globalization and monocultures.`,
    keyThinkers: ['Vandana Shiva', 'Maria Mies', 'Carolyn Merchant', 'Karen Warren', 'Françoise d’Eaubonne'],
    keyArticles: ['Staying Alive: Women, Ecology and Development (1988)', 'The Death of Nature (1980)', 'Earth Democracy (2005)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-11',
    title: 'Marxist Political Economy: Historical Materialism & Gramscian Hegemony',
    category: 'Marxist & Critical Theory',
    unit: 'Unit 3: Structural Theories of State and Economy',
    summary: 'Dialectical materialism, the economic base and ideological superstructure, and Gramsci’s concept of cultural hegemony manufactured through civil society.',
    content: `Marxist political analysis offers a critical structural critique of liberal capitalist democracy:

1. Classical Marxism (Karl Marx & Friedrich Engels):
   - Historical Materialism: The economic mode of production forms the foundational 'Base' (forces of production and relations of production).
   - Superstructure: Legal, political, religious, and philosophical institutions arise upon this base to legitimize the property relations of the ruling bourgeois class ("The executive of the modern state is but a committee for managing the common affairs of the whole bourgeoisie").
   - Class Struggle: History is propelled by conflict between owning classes and exploited classes (master/slave, lord/serf, capitalist/proletariat). Extraction of surplus value constitutes the exploitation of labor.

2. Antonio Gramsci & Cultural Hegemony (Prison Notebooks):
   - Italian theorist Antonio Gramsci re-evaluated why socialist revolution did not occur in advanced Western capitalist democracies.
   - Coined 'Cultural Hegemony' (*egemonia*): The bourgeoisie maintains power not solely through direct state coercion (*dominio* / force via police and army), but by securing the active spontaneous consent of the subordinate classes through civil society (schools, church, media, literature).
   - Distinguishes between:
     a) War of Maneuver: Frontal military assault on state apparatus (effective in pre-1917 Tsarist Russia with weak civil society).
     b) War of Position: Long-term intellectual, cultural, and ideological battle within civil society institutions to build counter-hegemony.
   - The Crucial Role of 'Organic Intellectuals': Scholars, educators, and organizers emerging organically from working-class communities to articulate counter-hegemonic narratives.`,
    keyThinkers: ['Karl Marx', 'Friedrich Engels', 'Antonio Gramsci', 'Louis Althusser', 'V.I. Lenin'],
    keyArticles: ['The Communist Manifesto (1848)', 'Das Kapital (1867)', 'Gramsci’s Prison Notebooks (1929-1935)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-12',
    title: 'Ecologism: Deep vs. Shallow Ecology & Global Climate Justice',
    category: 'Ecologism & Green Politics',
    unit: 'Unit 6: Contemporary Political Ecology & Green Ideology',
    summary: 'Biocentric vs anthropocentric environmental paradigms, limits to growth, and the geopolitics of Common But Differentiated Responsibilities (CBDR).',
    content: `Ecologism is a distinctive modern political ideology founded upon the premise that the non-human natural world possesses intrinsic value and that human society must harmonize with planetary ecological limits:

1. Arne Naess: Shallow Ecology vs. Deep Ecology (1973):
   - Shallow Environmentalism: Anthropocentric (human-centered). Views nature as a resource reservoir; advocates technological fixes, recycling, carbon taxes, and efficiency reforms solely to protect human economic prosperity and health.
   - Deep Ecology: Biocentric/Ecocentric egalitarianism. Asserts that all living beings (species, ecosystems, rivers) have an equal intrinsic right to live and flourish, completely independent of their utility to humans. Demands fundamental economic downscaling, consumption curbs, and human humility.

2. Murray Bookchin & Social Ecology:
   - Radical political theorist Murray Bookchin argued that ecological crises do not stem from abstract human nature, but from social hierarchies and economic inequality: "The very idea of dominating nature stems from the domination of human by human."

3. Global Climate Justice & CBDR-RC:
   - In international political economy, the Principle of 'Common But Differentiated Responsibilities and Respective Capabilities' (CBDR-RC, Rio 1992 & Paris 2015) acknowledges that while all nations share responsibility for the planet, historical emissions were overwhelmingly caused by industrialized nations of the Global North.
   - Developing nations like India advocate for climate justice, fair carbon budgets, technological transfers, and compensation for Loss and Damage.`,
    keyThinkers: ['Arne Naess', 'Murray Bookchin', 'Rachel Carson', 'Ulrich Beck', 'Sunita Narain'],
    keyArticles: ['Silent Spring (1962)', 'UNFCCC Rio Declaration (1992)', 'Paris Climate Agreement (2015)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-13',
    title: 'Post-Colonial Theory & Subaltern Studies: Decolonizing the Discipline',
    category: 'Post-Colonial & Subaltern Studies',
    unit: 'Unit 5: Post-Colonial Political Philosophy',
    summary: 'Challenging Eurocentric universalism, analyzing colonial discourse, epistemic violence, and recovering marginalized voices from below.',
    content: `Post-Colonial Political Theory interrogates how imperial conquests, racism, and colonial power relations continue to structure modern geopolitics, knowledge systems, and political identities:

1. Edward Said & Orientalism (1978):
   - Palestinian-American scholar Edward Said demonstrated that 'The Orient' (the East) was not an objective geographic reality, but an intellectual construct fabricated by European colonial discourse.
   - Western scholarship, literature, and imperial policy represented the East as irrational, exotic, static, and despotic in order to define the West as rational, progressive, moral, and destined to rule ("The White Man's Burden").

2. Frantz Fanon: Decolonization & Psychological Liberation:
   - In 'Black Skin, White Masks' (1952) and 'The Wretched of the Earth' (1961), Martinican psychiatrist and anti-colonial revolutionary Frantz Fanon examined the profound psychological trauma of colonization.
   - Argued that decolonization is not merely the replacement of a white governor with a brown governor, but a thorough revolutionary praxis that creates a "new man" free of internalized inferiority.

3. Subaltern Studies Collective (Ranajit Guha, Partha Chatterjee, Gayatri Spivak):
   - Founded in India to rewrite South Asian historiography "from below". Criticized both British colonial historians and elite Indian nationalist historians for portraying freedom as an elite accomplishment.
   - Gayatri Chakravorty Spivak ('Can the Subaltern Speak?', 1988): Examined epistemic violence and structural silencing, illustrating how imperial rulers and patriarchal elites jointly spoke over subaltern women.`,
    keyThinkers: ['Edward Said', 'Frantz Fanon', 'Gayatri Chakravorty Spivak', 'Ranajit Guha', 'Partha Chatterjee', 'Homi K. Bhabha'],
    keyArticles: ['Orientalism (1978)', 'The Wretched of the Earth (1961)', 'Can the Subaltern Speak? (1988)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-14',
    title: 'Comparative Politics: Electoral Systems & Duverger’s Law',
    category: 'Comparative Politics',
    unit: 'Unit 2: Comparative Institutional Analysis & Parties',
    summary: 'Institutional comparison of electoral formulas, mechanics of majoritarian vs proportional representation, and party system stability.',
    content: `Comparative electoral politics analyzes how different constitutional electoral rules translate citizen votes into legislative seats, shaping political competition:

1. Major Electoral Formulas:
   - Majoritarian / First-Past-The-Post (FPTP / Single Member Plurality): Candidate with the most votes in a single-member district wins the seat, regardless of whether they achieve an absolute majority (e.g., UK, USA, Indian Lok Sabha).
     * Strengths: Simplicity, produces decisive stable parliamentary majorities, strong local constituency representation.
     * Weaknesses: Severe disproportionality between popular vote share and seat share; encourages wasted votes and regional polarization.
   - Proportional Representation (PR - Party List, Single Transferable Vote): Seats allocated in proportion to the percentage of votes received by each party in multi-member districts (e.g., Germany, Netherlands, South Africa).
     * Strengths: High democratic fairness, mirrors diverse societal cleavages, inclusion of minority parties and women.
     * Weaknesses: Frequent coalition instability, potential leverage by extremist fringe parties.

2. Maurice Duverger’s Law (1951):
   - Formulated the seminal relationship between electoral rules and party systems:
     a) "The simple-majority single-ballot system (FPTP) favors the two-party system."
     b) "Proportional representation and double-ballot systems favor multi-party systems."
   - Two Driving Mechanisms:
     * Mechanical Factor: Third/minor parties are systematically penalized under-represented unless regionally concentrated.
     * Psychological Factor: Voters strategically avoid voting for minor party candidates to avoid "wasting" their vote on a perceived spoiler.

3. Giovanni Sartori’s Typology of Party Systems:
   - Distinguishes Two-Party Systems, Moderate Pluralism (centripetal competition, low ideological distance), and Polarized Pluralism (centrifugal competition, anti-system parties, high ideological distance).`,
    keyThinkers: ['Maurice Duverger', 'Giovanni Sartori', 'Arend Lijphart', 'Robert Dahl'],
    keyArticles: ['Duverger’s Political Parties (1951)', 'Sartori’s Parties and Party Systems (1976)', 'Patterns of Democracy (1999)'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'kb-15',
    title: 'Good Governance, Citizen’s Charters & New Public Management (NPM)',
    category: 'Public Policy & Governance',
    unit: 'Unit 4: Modern Public Administration & Policy Delivery',
    summary: 'The shift from bureaucratic red-tape to citizen-centric governance, transparency mandates, and the 8 pillars of Good Governance.',
    content: `Contemporary public administration has evolved from the rigid, command-and-control Weberian bureaucracy toward participatory, citizen-centric "Good Governance":

1. The 8 Principles of Good Governance (UNESCAP / World Bank):
   - 1. Participation: Meaningful involvement of all citizens, including marginalized groups, in decision-making.
   - 2. Rule of Law: Fair, impartial legal frameworks enforced with human rights protections.
   - 3. Transparency: Free and direct accessibility of information and government procedures to those affected.
   - 4. Responsiveness: Public institutions serve all stakeholders within a reasonable timeframe.
   - 5. Consensus Orientation: Mediation of differing societal interests to reach broad societal consensus on policies.
   - 6. Equity & Inclusiveness: Ensuring all citizens have opportunities to improve or maintain their well-being.
   - 7. Effectiveness & Efficiency: Sustainable stewardship of public resources to meet societal needs.
   - 8. Accountability: Governmental, private, and civil society actors are answerable to the public.

2. New Public Management (NPM - Osborne & Gaebler, Christopher Hood):
   - "Reinventing Government": Encouraged governments to "steer rather than row", introduce market mechanisms, competitive contracting, decentralization, and focus on customer/citizen outcomes rather than procedural inputs.

3. Institutional Accountability in India:
   - Right to Information (RTI) Act, 2005: Transformative legislative tool turning subjects into questioning citizens, holding public authorities accountable.
   - Citizen’s Charters: Formal commitments by public departments on service standards, timelines, and grievance redressal mechanisms.`,
    keyThinkers: ['David Osborne', 'Ted Gaebler', 'Christopher Hood', 'Amartya Sen', 'Aruna Roy'],
    keyArticles: ['Reinventing Government (1992)', 'UNESCAP Good Governance Framework', 'Right to Information Act, 2005 (India)'],
    lastUpdated: '2026-09-29'
  }
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeItem[] = RAW_INITIAL_KNOWLEDGE_BASE.map(item => ({
  ...item,
  status: 'approved',
  approvedBy: 'Mr. Ranjit Bhattarai Chetry',
  approvalDate: '2026-09-29',
}));
